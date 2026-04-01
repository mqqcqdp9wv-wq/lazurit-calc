/**
 * Google Apps Script для калькулятора Лазурит
 * Форма заявки (POST) + Счёт ЮKassa (GET/JSONP)
 */

const EMAIL_TO = 'lazuritbeauty@yandex.ru'
const SHEET_NAME = 'Заявки'
const YUKASSA_SHOP_ID = '834068'
const YUKASSA_SECRET = 'live_L06F_QFWVrub7HDxGHLHpldYygc4rxrjYBBgmHupnTQ'

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents)
    return handleForm(data)
  } catch (err) {
    return respond({ error: err.toString() })
  }
}

function doGet(e) {
  var params = e && e.parameter ? e.parameter : {}
  if (params.action === 'payment') return handlePaymentJsonp(params)
  return respond({ status: 'ok' })
}

function handleForm(data) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME)
  if (!sheet) return respond({ error: 'Sheet not found' })

  var date = new Date(data.date)
  var dateStr = Utilities.formatDate(date, 'Europe/Moscow', 'dd.MM.yyyy HH:mm')

  sheet.appendRow([
    dateStr, data.name || '', "'" + (data.phone || ''),
    data.telegram ? '@' + data.telegram : '',
    data.gender === 'male' ? 'М' : 'Ж',
    data.services || '', data.sessions || 1, data.total || '', 'Новая'
  ])

  MailApp.sendEmail(EMAIL_TO, 'Новая заявка — ' + data.name, [
    'Новая заявка с калькулятора calc.lazepil.ru',
    '', 'ФИО: ' + data.name, 'Телефон: ' + data.phone,
    'Telegram: ' + (data.telegram ? '@' + data.telegram : '—'),
    'Пол: ' + (data.gender === 'male' ? 'Мужской' : 'Женский'),
    '', 'Услуги: ' + data.services, 'Сеансов: ' + data.sessions,
    'Сумма: ' + data.total, '', 'Дата: ' + dateStr
  ].join('\n'))

  return respond({ success: true })
}

function handlePaymentJsonp(params) {
  var callback = params.callback || 'callback'
  var amount = parseFloat(params.amount)

  if (!amount || amount <= 0) {
    return ContentService.createTextOutput(callback + '({"error":"Invalid amount"})')
      .setMimeType(ContentService.MimeType.JAVASCRIPT)
  }

  var sessionsNum = parseInt(params.sessions) || 1
  var services = params.services || 'Лазерная эпиляция'

  // Описание: ФИО. Телефон. Услуги. 5+1 сеансов. 50% скидка
  var descParts = []
  if (params.name) descParts.push(params.name)
  if (params.phone) descParts.push(params.phone)
  descParts.push(services)
  if (sessionsNum >= 5) descParts.push(sessionsNum + '+1 сеансов. 50% скидка')
  else if (sessionsNum > 1) descParts.push(sessionsNum + ' сеансов')

  var description = descParts.join('. ')
  if (description.length > 128) description = description.substring(0, 125) + '...'

  // Товар в корзине счёта
  var cartDesc = services
  if (sessionsNum >= 5) cartDesc += '. ' + sessionsNum + '+1 сеансов. 50% скидка'
  else if (sessionsNum > 1) cartDesc += '. ' + sessionsNum + ' сеансов'

  var expires = new Date()
  expires.setHours(expires.getHours() + 24)

  var payload = {
    payment_data: {
      amount: { value: amount.toFixed(2), currency: 'RUB' },
      capture: true,
      description: description,
      metadata: {
        name: params.name || '',
        phone: params.phone || '',
        telegram: params.telegram || '',
        services: services,
        sessions: String(sessionsNum)
      }
    },
    cart: [{
      description: cartDesc,
      price: { value: amount.toFixed(2), currency: 'RUB' },
      quantity: 1
    }],
    delivery_method_data: { type: 'self' },
    locale: 'ru_RU',
    expires_at: expires.toISOString(),
    description: description
  }

  // Данные клиента — «Кому выставили»
  if (params.name || params.phone) {
    payload.personalization = { customer: {} }
    if (params.name) payload.personalization.customer.full_name = params.name
    if (params.phone) payload.personalization.customer.phone = params.phone.replace(/[^+\d]/g, '')
  }

  var options = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      'Authorization': 'Basic ' + Utilities.base64Encode(YUKASSA_SHOP_ID + ':' + YUKASSA_SECRET),
      'Idempotence-Key': Utilities.getUuid()
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  }

  var response = UrlFetchApp.fetch('https://api.yookassa.ru/v3/invoices', options)
  var result = JSON.parse(response.getContentText())

  var paymentUrl = null
  if (result.delivery_method && result.delivery_method.url) {
    paymentUrl = result.delivery_method.url
  }

  if (paymentUrl) {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME)
    if (sheet) {
      var dateStr = Utilities.formatDate(new Date(), 'Europe/Moscow', 'dd.MM.yyyy HH:mm')
      sheet.appendRow([
        dateStr, params.name || '—', "'" + (params.phone || '—'),
        params.telegram ? '@' + params.telegram : '',
        params.gender === 'male' ? 'М' : 'Ж',
        services, sessionsNum,
        amount.toFixed(0) + ' ₽', 'Оплата'
      ])
    }

    MailApp.sendEmail(EMAIL_TO, 'Онлайн-оплата — ' + (params.name || 'Клиент'), [
      'Клиент перешёл к оплате на calc.lazepil.ru', '',
      'ФИО: ' + (params.name || '—'),
      'Телефон: ' + (params.phone || '—'),
      'Telegram: ' + (params.telegram ? '@' + params.telegram : '—'),
      '', 'Услуги: ' + services,
      'Сеансов: ' + (sessionsNum >= 5 ? sessionsNum + '+1' : sessionsNum),
      'Сумма: ' + amount.toFixed(0) + ' ₽',
      '', 'ID: ' + result.id
    ].join('\n'))

    return ContentService.createTextOutput(callback + '({"confirmation_url":"' + paymentUrl + '"})')
      .setMimeType(ContentService.MimeType.JAVASCRIPT)
  }

  var errMsg = result.description || result.code || 'Invoice creation failed'
  return ContentService.createTextOutput(callback + '({"error":"' + errMsg.replace(/"/g, '\\"') + '"})')
    .setMimeType(ContentService.MimeType.JAVASCRIPT)
}

function respond(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON)
}

function testPermission() {
  UrlFetchApp.fetch('https://api.yookassa.ru/v3/payments', {method: 'get', muteHttpExceptions: true})
}
