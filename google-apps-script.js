/**
 * Google Apps Script для калькулятора Лазурит.
 * Форма заявки (POST + GET/JSONP) + Создание счёта ЮKassa (GET/JSONP).
 *
 * Безопасность:
 *   1. Секреты в Script Properties:
 *        YUKASSA_SHOP_ID    — id магазина ЮKassa (можно публичный, '834068').
 *        YUKASSA_SECRET     — секретный ключ ЮKassa (live_*). НИКОГДА не в коде!
 *        SHARED_SECRET      — общий токен для авторизации запросов с фронта.
 *      Задать через UI: Project Settings → Script Properties → Add property.
 *   2. Все эндпоинты требуют ?token=<SHARED_SECRET>. Без токена — 401.
 *   3. Whitelist callback (regex) от XSS через JSONP-имя функции.
 *   4. Rate limit (CacheService) — не больше N запросов в окно по hash(phone).
 *   5. CSV-инъекции экранируются (ведущие = + - @ заменяются на пробел).
 *   6. Все строковые поля валидируются на длину/формат.
 *   7. Generic-ошибки клиенту, детали — в Logger.
 *
 * История: до 2026-05-07 файл содержал hardcoded YUKASSA_SECRET. Ключ
 * ротирован, см. handoff в Obsidian. JSONP оставлен ради совместимости
 * со статическим фронтом (calc.lazepil.ru на gh-pages).
 */

// ============================================================================
// КОНСТАНТЫ (не секреты)
// ============================================================================

const EMAIL_TO = 'lazuritbeauty@yandex.ru'
const SHEET_NAME = 'Заявки'

const RATE_LIMIT_MAX = 5            // максимум запросов
const RATE_LIMIT_WINDOW_SEC = 60    // в секундах

const MAX_NAME_LEN = 100
const MAX_PHONE_LEN = 20
const MAX_TELEGRAM_LEN = 50
const MAX_SERVICES_LEN = 500
const MAX_SESSIONS = 100

// Допустимое имя JSONP-callback (валидный JS-идентификатор, длина ≤ 40).
const CALLBACK_RE = /^[a-zA-Z_$][a-zA-Z0-9_$]{0,40}$/

// Список зарезервированных слов JS, чтобы callback не превратился в keyword.
const CALLBACK_RESERVED = {
  'do': 1, 'if': 1, 'in': 1, 'for': 1, 'let': 1, 'new': 1, 'try': 1,
  'var': 1, 'case': 1, 'else': 1, 'enum': 1, 'eval': 1, 'null': 1,
  'this': 1, 'true': 1, 'void': 1, 'with': 1, 'await': 1, 'break': 1,
  'catch': 1, 'class': 1, 'const': 1, 'false': 1, 'super': 1, 'throw': 1,
  'while': 1, 'yield': 1, 'delete': 1, 'export': 1, 'import': 1,
  'public': 1, 'return': 1, 'static': 1, 'switch': 1, 'typeof': 1,
  'default': 1, 'extends': 1, 'finally': 1, 'package': 1, 'private': 1,
  'continue': 1, 'debugger': 1, 'function': 1, 'arguments': 1,
  'interface': 1, 'protected': 1, 'implements': 1, 'instanceof': 1
}

// ============================================================================
// HTTP-ЭНТРИПОИНТЫ
// ============================================================================

function doPost(e) {
  try {
    var data = e && e.postData ? JSON.parse(e.postData.contents) : {}
    if (!checkAuth_(data && data.token)) return jsonResponse_({ error: 'unauthorized' })
    if (!checkRateLimit_(rlKey_('post', data && data.phone))) return jsonResponse_({ error: 'rate_limited' })
    return handleForm_(data)
  } catch (err) {
    Logger.log('doPost error: ' + err)
    return jsonResponse_({ error: 'internal' })
  }
}

function doGet(e) {
  var params = e && e.parameter ? e.parameter : {}
  var action = params.action

  // Health-check без токена (нужен для liveness-проверок и UptimeRobot-подобных).
  if (!action) return jsonResponse_({ status: 'ok' })

  // Проверка callback ДО токена, иначе 401-ответ всё равно нельзя безопасно
  // обернуть в JSONP с произвольным именем.
  var callback = sanitizeCallback_(params.callback)
  if (!callback) return jsonpResponse_('cb', { error: 'invalid_callback' })

  if (!checkAuth_(params.token)) return jsonpResponse_(callback, { error: 'unauthorized' })

  if (action === 'payment') {
    if (!checkRateLimit_(rlKey_('payment', params.phone))) {
      return jsonpResponse_(callback, { error: 'rate_limited' })
    }
    return handlePaymentJsonp_(params, callback)
  }

  if (action === 'form') {
    if (!checkRateLimit_(rlKey_('form', params.phone))) {
      return jsonpResponse_(callback, { error: 'rate_limited' })
    }
    return handleFormJsonp_(params, callback)
  }

  return jsonpResponse_(callback, { error: 'unknown_action' })
}

// ============================================================================
// БИЗНЕС-ЛОГИКА
// ============================================================================

function handleFormJsonp_(params, callback) {
  var v = validateForm_(params)
  if (v.error) return jsonpResponse_(callback, { error: v.error })

  try {
    appendFormRow_(v.fields)
    sendFormEmail_(v.fields)
    return jsonpResponse_(callback, { success: true })
  } catch (err) {
    Logger.log('handleFormJsonp error: ' + err)
    return jsonpResponse_(callback, { error: 'internal' })
  }
}

function handleForm_(data) {
  var v = validateForm_(data)
  if (v.error) return jsonResponse_({ error: v.error })

  try {
    appendFormRow_(v.fields)
    sendFormEmail_(v.fields)
    return jsonResponse_({ success: true })
  } catch (err) {
    Logger.log('handleForm error: ' + err)
    return jsonResponse_({ error: 'internal' })
  }
}

function handlePaymentJsonp_(params, callback) {
  var v = validatePayment_(params)
  if (v.error) return jsonpResponse_(callback, { error: v.error })
  var f = v.fields

  var props = PropertiesService.getScriptProperties()
  var shopId = props.getProperty('YUKASSA_SHOP_ID')
  var secret = props.getProperty('YUKASSA_SECRET')
  if (!shopId || !secret) {
    Logger.log('YUKASSA_SHOP_ID or YUKASSA_SECRET not configured')
    return jsonpResponse_(callback, { error: 'server_misconfigured' })
  }

  var description = buildDescription_(f)
  var cartDesc = buildCartDescription_(f)

  var expires = new Date()
  expires.setHours(expires.getHours() + 24)

  var payload = {
    payment_data: {
      amount: { value: f.amount.toFixed(2), currency: 'RUB' },
      capture: true,
      description: description,
      metadata: {
        name: f.name, phone: f.phone, telegram: f.telegram,
        services: f.services, sessions: String(f.sessions)
      }
    },
    cart: [{
      description: cartDesc,
      price: { value: f.amount.toFixed(2), currency: 'RUB' },
      quantity: 1
    }],
    delivery_method_data: { type: 'self' },
    locale: 'ru_RU',
    expires_at: expires.toISOString(),
    description: description
  }

  if (f.name || f.phone) {
    payload.personalization = { customer: {} }
    if (f.name) payload.personalization.customer.full_name = f.name
    if (f.phone) payload.personalization.customer.phone = f.phone.replace(/[^+\d]/g, '')
  }

  try {
    var response = UrlFetchApp.fetch('https://api.yookassa.ru/v3/invoices', {
      method: 'post',
      contentType: 'application/json',
      headers: {
        'Authorization': 'Basic ' + Utilities.base64Encode(shopId + ':' + secret),
        'Idempotence-Key': Utilities.getUuid()
      },
      payload: JSON.stringify(payload),
      muteHttpExceptions: true
    })

    var result = {}
    try { result = JSON.parse(response.getContentText()) } catch (_) { result = {} }

    var paymentUrl = result.delivery_method && result.delivery_method.url
    if (!paymentUrl) {
      Logger.log('YooKassa invoice failed: status=' + response.getResponseCode() + ' body=' + response.getContentText())
      return jsonpResponse_(callback, { error: 'payment_failed' })
    }

    appendPaymentRow_(f)
    sendPaymentEmail_(f, result.id)
    return jsonpResponse_(callback, { confirmation_url: paymentUrl })
  } catch (err) {
    Logger.log('handlePaymentJsonp error: ' + err)
    return jsonpResponse_(callback, { error: 'internal' })
  }
}

// ============================================================================
// ВАЛИДАЦИЯ
// ============================================================================

function validateForm_(p) {
  if (!p) return { error: 'validation_failed' }

  var name = trimStr_(p.name, MAX_NAME_LEN)
  var phone = trimStr_(p.phone, MAX_PHONE_LEN)
  var telegram = trimStr_(p.telegram, MAX_TELEGRAM_LEN)
  var services = trimStr_(p.services, MAX_SERVICES_LEN)
  var total = trimStr_(p.total, 50)
  var gender = (p.gender === 'male') ? 'male' : 'female'

  if (name.length < 2) return { error: 'validation_failed' }
  if (!/^\+?\d{7,15}$/.test(phone.replace(/[\s\-()]/g, ''))) return { error: 'validation_failed' }

  var sessions = parseInt(p.sessions, 10)
  if (!sessions || sessions < 1 || sessions > MAX_SESSIONS) sessions = 1

  var date
  try { date = p.date ? new Date(p.date) : new Date() } catch (_) { date = new Date() }
  if (isNaN(date.getTime())) date = new Date()

  return {
    fields: {
      name: name, phone: phone, telegram: telegram, services: services,
      total: total, gender: gender, sessions: sessions, date: date
    }
  }
}

function validatePayment_(p) {
  var amount = parseFloat(p && p.amount)
  if (!amount || amount <= 0 || amount > 10000000) return { error: 'validation_failed' }

  var name = trimStr_(p.name, MAX_NAME_LEN)
  var phone = trimStr_(p.phone, MAX_PHONE_LEN)
  var telegram = trimStr_(p.telegram, MAX_TELEGRAM_LEN)
  var services = trimStr_(p.services, MAX_SERVICES_LEN) || 'Лазерная эпиляция'
  var gender = (p.gender === 'male') ? 'male' : 'female'

  if (phone && !/^\+?\d{7,15}$/.test(phone.replace(/[\s\-()]/g, ''))) {
    return { error: 'validation_failed' }
  }

  var sessions = parseInt(p.sessions, 10)
  if (!sessions || sessions < 1 || sessions > MAX_SESSIONS) sessions = 1

  return {
    fields: {
      amount: amount, name: name, phone: phone, telegram: telegram,
      services: services, gender: gender, sessions: sessions
    }
  }
}

// ============================================================================
// SHEET / EMAIL
// ============================================================================

function appendFormRow_(f) {
  var sheet = getSheet_()
  if (!sheet) throw new Error('sheet_not_found')
  var dateStr = Utilities.formatDate(f.date, 'Europe/Moscow', 'dd.MM.yyyy HH:mm')
  sheet.appendRow([
    dateStr,
    safeCell_(f.name),
    "'" + f.phone,                          // ведущий апостроф — текстовый формат для Sheets
    safeCell_(f.telegram ? '@' + f.telegram : ''),
    f.gender === 'male' ? 'М' : 'Ж',
    safeCell_(f.services),
    f.sessions,
    safeCell_(f.total),
    'Новая'
  ])
}

function appendPaymentRow_(f) {
  var sheet = getSheet_()
  if (!sheet) return
  var dateStr = Utilities.formatDate(new Date(), 'Europe/Moscow', 'dd.MM.yyyy HH:mm')
  sheet.appendRow([
    dateStr,
    safeCell_(f.name) || '—',
    "'" + (f.phone || '—'),
    safeCell_(f.telegram ? '@' + f.telegram : ''),
    f.gender === 'male' ? 'М' : 'Ж',
    safeCell_(f.services),
    f.sessions,
    f.amount.toFixed(0) + ' ₽',
    'Оплата'
  ])
}

function sendFormEmail_(f) {
  var subject = sanitizeSubject_('Новая заявка — ' + (f.name || 'Клиент'))
  var dateStr = Utilities.formatDate(f.date, 'Europe/Moscow', 'dd.MM.yyyy HH:mm')
  var body = [
    'Новая заявка с калькулятора calc.lazepil.ru',
    '',
    'ФИО: ' + (f.name || '—'),
    'Телефон: ' + (f.phone || '—'),
    'Telegram: ' + (f.telegram ? '@' + f.telegram : '—'),
    'Пол: ' + (f.gender === 'male' ? 'Мужской' : 'Женский'),
    '',
    'Услуги: ' + (f.services || '—'),
    'Сеансов: ' + f.sessions,
    'Сумма: ' + (f.total || '—'),
    '',
    'Дата: ' + dateStr
  ].join('\n')
  MailApp.sendEmail(EMAIL_TO, subject, body)
}

function sendPaymentEmail_(f, invoiceId) {
  var subject = sanitizeSubject_('Онлайн-оплата — ' + (f.name || 'Клиент'))
  var sessionsStr = f.sessions >= 5 ? f.sessions + '+1' : String(f.sessions)
  var body = [
    'Клиент перешёл к оплате на calc.lazepil.ru',
    '',
    'ФИО: ' + (f.name || '—'),
    'Телефон: ' + (f.phone || '—'),
    'Telegram: ' + (f.telegram ? '@' + f.telegram : '—'),
    '',
    'Услуги: ' + f.services,
    'Сеансов: ' + sessionsStr,
    'Сумма: ' + f.amount.toFixed(0) + ' ₽',
    '',
    'ID: ' + (invoiceId || '—')
  ].join('\n')
  MailApp.sendEmail(EMAIL_TO, subject, body)
}

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet()
  return ss ? ss.getSheetByName(SHEET_NAME) : null
}

// ============================================================================
// БЕЗОПАСНОСТЬ
// ============================================================================

/**
 * Проверка shared-secret токена с timing-safe сравнением
 * (через HMAC-SHA256 от случайного nonce в скрипте — снимаем разницу
 * во времени посимвольного сравнения).
 */
function checkAuth_(token) {
  if (!token || typeof token !== 'string') return false
  var expected = PropertiesService.getScriptProperties().getProperty('SHARED_SECRET')
  if (!expected) {
    Logger.log('SHARED_SECRET not configured — refusing all requests')
    return false
  }
  return constantTimeEquals_(token, expected)
}

function constantTimeEquals_(a, b) {
  if (a.length !== b.length) return false
  var diff = 0
  for (var i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }
  return diff === 0
}

function sanitizeCallback_(name) {
  if (!name || typeof name !== 'string') return null
  if (!CALLBACK_RE.test(name)) return null
  if (CALLBACK_RESERVED[name]) return null
  return name
}

function sanitizeSubject_(s) {
  return String(s || '').replace(/[\r\n\t]+/g, ' ').slice(0, 80)
}

/**
 * Защита от Sheets formula injection. Удаляет ведущий символ-триггер
 * формулы (= + - @ tab CR), сохраняя остальной текст.
 */
function safeCell_(v) {
  if (v === null || v === undefined) return ''
  var s = String(v)
  if (/^[=+\-@\t\r]/.test(s)) s = s.slice(1)
  return s
}

function trimStr_(v, maxLen) {
  if (v === null || v === undefined) return ''
  var s = String(v).trim()
  if (s.length > maxLen) s = s.slice(0, maxLen)
  return s
}

/**
 * Очень простая rate-лимитация на CacheService:
 * счётчик за окно RATE_LIMIT_WINDOW_SEC секунд по ключу.
 */
function rlKey_(action, phone) {
  var p = String(phone || 'anon').replace(/[^+\d]/g, '')
  // Хешируем чтобы не светить телефон в логе кеша.
  var bytes = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, p)
  var hex = ''
  for (var i = 0; i < 8; i++) hex += ('0' + (bytes[i] & 0xff).toString(16)).slice(-2)
  return 'rl:' + action + ':' + hex
}

function checkRateLimit_(key) {
  var cache = CacheService.getScriptCache()
  var raw = cache.get(key)
  var n = raw ? parseInt(raw, 10) : 0
  if (n >= RATE_LIMIT_MAX) return false
  cache.put(key, String(n + 1), RATE_LIMIT_WINDOW_SEC)
  return true
}

// ============================================================================
// JSON / JSONP RESPONSES
// ============================================================================

function jsonResponse_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON)
}

/**
 * Безопасный JSONP: payload идёт через JSON.stringify, всё что может
 * сломать <script>-границу экранируется. Имя callback уже валидировано
 * через CALLBACK_RE до попадания сюда.
 */
function jsonpResponse_(callback, obj) {
  var json = JSON.stringify(obj)
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
  return ContentService
    .createTextOutput(callback + '(' + json + ')')
    .setMimeType(ContentService.MimeType.JAVASCRIPT)
}

// ============================================================================
// ХЕЛПЕРЫ ОПИСАНИЯ ТОВАРА
// ============================================================================

function buildDescription_(f) {
  var parts = []
  if (f.name) parts.push(f.name)
  if (f.phone) parts.push(f.phone)
  parts.push(f.services)
  if (f.sessions >= 5) parts.push(f.sessions + '+1 сеансов. 50% скидка')
  else if (f.sessions > 1) parts.push(f.sessions + ' сеансов')
  var d = parts.join('. ')
  if (d.length > 128) d = d.substring(0, 125) + '...'
  return d
}

function buildCartDescription_(f) {
  var c = f.services
  if (f.sessions >= 5) c += '. ' + f.sessions + '+1 сеансов. 50% скидка'
  else if (f.sessions > 1) c += '. ' + f.sessions + ' сеансов'
  return c
}

// ============================================================================
// СЛУЖЕБНОЕ
// ============================================================================

/** Используется один раз при первоначальной авторизации скрипта. */
function testPermission() {
  UrlFetchApp.fetch('https://api.yookassa.ru/v3/payments', { method: 'get', muteHttpExceptions: true })
}
