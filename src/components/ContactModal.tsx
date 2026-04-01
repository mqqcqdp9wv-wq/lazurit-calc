'use client'

import { useState, useRef, useEffect } from 'react'

type OrderLine = { title: string; price: string }

type ContactModalProps = {
  isOpen: boolean
  onClose: () => void
  orderLines?: OrderLine[]
  totalPrice?: string
  sessions?: number
  gender?: 'female' | 'male'
  mode?: 'form' | 'payment'
  paymentAmount?: number
}

const COUNTRIES = [
  { code: '+7', flag: '🇷🇺', name: 'Россия', maxDigits: 10 },
  { code: '+374', flag: '🇦🇲', name: 'Армения', maxDigits: 8 },
  { code: '+39', flag: '🇮🇹', name: 'Италия', maxDigits: 10 },
  { code: '+34', flag: '🇪🇸', name: 'Испания', maxDigits: 9 },
  { code: '+1', flag: '🇺🇸', name: 'США', maxDigits: 10 },
  { code: '+90', flag: '🇹🇷', name: 'Турция', maxDigits: 10 },
  { code: '+971', flag: '🇦🇪', name: 'ОАЭ', maxDigits: 9 },
  { code: '+49', flag: '🇩🇪', name: 'Германия', maxDigits: 11 },
]

function formatPhoneDigits(digits: string): string {
  if (digits.length === 0) return ''
  let result = ''
  if (digits.length > 0) result = digits.slice(0, 3)
  if (digits.length > 3) result += ' ' + digits.slice(3, 6)
  if (digits.length > 6) result += ' ' + digits.slice(6, 8)
  if (digits.length > 8) result += ' ' + digits.slice(8, 10)
  if (digits.length > 10) result += ' ' + digits.slice(10)
  return result
}

function buildMessengerText(orderLines: OrderLine[], totalPrice: string, sessions: number, gender: string): string {
  const genderText = gender === 'male' ? 'мужской' : 'женский'
  const lines = orderLines.map(l => `${l.title} — ${l.price}`).join('\n')
  return `Здравствуйте! Рассчитал(а) в калькуляторе (${genderText}):\n\n${lines}\n\nИтого: ${totalPrice}\nСеансов: ${sessions}\n\nХочу записаться на консультацию`
}

export default function ContactModal({ isOpen, onClose, orderLines, totalPrice, sessions = 1, gender = 'female', mode = 'form', paymentAmount = 0 }: ContactModalProps) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [telegram, setTelegram] = useState('')
  const [consent, setConsent] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [countryIdx, setCountryIdx] = useState(0)
  const [countryOpen, setCountryOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const country = COUNTRIES[countryIdx]
  const isPayment = mode === 'payment'

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCountryOpen(false)
      }
    }
    if (countryOpen) document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [countryOpen])

  const phoneDigits = phone.replace(/\D/g, '')
  const canSubmit = name.trim().length >= 2 && phoneDigits.length >= 7 && consent && !sending

  function handlePhoneChange(val: string) {
    const digits = val.replace(/\D/g, '').slice(0, country.maxDigits)
    setPhone(digits)
  }

  async function handleSubmit() {
    if (!canSubmit) return
    setSending(true)

    const fullPhone = `${country.code}${phoneDigits}`
    const services = orderLines?.map(l => l.title).join(', ') || ''

    if (isPayment) {
      // Payment mode: create payment via JSONP then redirect
      const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT
      if (!endpoint) { setSending(false); return }

      // Also save to Google Sheets via POST (no-cors)
      fetch(endpoint, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: fullPhone,
          telegram: telegram.trim(),
          gender,
          sessions,
          services,
          total: totalPrice || '',
          date: new Date().toISOString(),
        }),
      }).catch(() => {})

      // Create payment via JSONP
      const callbackName = '_yukassa_cb_' + Date.now()
      const params = new URLSearchParams({
        action: 'payment',
        amount: String(paymentAmount),
        services,
        sessions: String(sessions),
        gender,
        name: name.trim(),
        phone: fullPhone,
        telegram: telegram.trim(),
        return_url: window.location.origin + window.location.pathname + '?payment=success',
        callback: callbackName,
      })

      try {
        await new Promise<void>((resolve, reject) => {
          const timeout = setTimeout(() => { reject(new Error('timeout')); cleanup() }, 15000)

          function cleanup() {
            clearTimeout(timeout)
            delete (window as unknown as Record<string, unknown>)[callbackName]
            script.remove()
          }

          ;(window as unknown as Record<string, unknown>)[callbackName] = (data: { confirmation_url?: string; error?: string }) => {
            cleanup()
            if (data.confirmation_url) {
              window.location.href = data.confirmation_url
              resolve()
            } else {
              reject(new Error(data.error || 'Payment failed'))
            }
          }

          const script = document.createElement('script')
          script.src = endpoint + '?' + params.toString()
          script.onerror = () => { cleanup(); reject(new Error('Script load failed')) }
          document.head.appendChild(script)
        })
      } catch {
        alert('Не удалось создать платёж. Попробуйте позже.')
        setSending(false)
      }
    } else {
      // Form mode: just submit to Google Sheets
      try {
        const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT
        if (endpoint) {
          await fetch(endpoint, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: name.trim(),
              phone: fullPhone,
              telegram: telegram.trim(),
              gender,
              sessions,
              services,
              total: totalPrice || '',
              date: new Date().toISOString(),
            }),
          })
        }
        setSubmitted(true)
      } catch {
        setSubmitted(true)
      } finally {
        setSending(false)
      }
    }
  }

  function handleClose() {
    onClose()
    setTimeout(() => {
      setName('')
      setPhone('')
      setTelegram('')
      setConsent(false)
      setSubmitted(false)
      setSending(false)
    }, 300)
  }

  const messengerText = buildMessengerText(orderLines || [], totalPrice || '', sessions, gender)
  const tgLink = `https://t.me/Lazurit_msk?text=${encodeURIComponent(messengerText)}`
  const waLink = `https://wa.me/79999990144?text=${encodeURIComponent(messengerText)}`

  return (
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center p-4
        bg-black/30 backdrop-blur-sm
        transition-all duration-300
        ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
      `}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose()
      }}
    >
      <div
        className={`
          bg-white rounded-2xl shadow-elevated w-full max-w-[420px] relative
          transition-all duration-300 max-h-[90vh] overflow-y-auto
          ${isOpen ? 'translate-y-0 scale-100' : 'translate-y-5 scale-[0.95]'}
        `}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors z-10"
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="4" y1="4" x2="12" y2="12" />
            <line x1="12" y1="4" x2="4" y2="12" />
          </svg>
        </button>

        {!submitted ? (
          <div className="p-6">
            <h3 className="text-lg font-bold text-center mb-4 font-[family-name:var(--font-display)]">
              {isPayment ? 'Оплата онлайн' : 'Записаться'}
            </h3>

            {/* Order summary */}
            {orderLines && orderLines.length > 0 && (
              <div className="mb-5 bg-gray-50 rounded-xl p-3 max-h-[120px] overflow-y-auto scrollbar-thin">
                <ul className="space-y-1">
                  {orderLines.map((line, i) => (
                    <li key={i} className="flex justify-between text-xs text-gray-600">
                      <span className="truncate mr-2">{line.title}</span>
                      <span className="text-gray-800 font-medium whitespace-nowrap">{line.price}</span>
                    </li>
                  ))}
                </ul>
                {totalPrice && (
                  <div className="flex justify-between mt-2 pt-2 border-t border-gray-200 text-sm font-bold text-gray-800">
                    <span>Итого</span>
                    <span className={isPayment ? 'text-emerald-600' : 'text-cyan-600'}>{totalPrice}</span>
                  </div>
                )}
              </div>
            )}

            {/* Form fields */}
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">ФИО</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Фамилия Имя Отчество"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 outline-none transition-all bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">Телефон</label>
                <div className="flex gap-0">
                  <div className="relative" ref={dropdownRef}>
                    <button
                      type="button"
                      onClick={() => setCountryOpen(!countryOpen)}
                      className="flex items-center gap-1 px-2.5 py-2.5 rounded-l-xl border border-r-0 border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors text-sm min-w-[80px]"
                    >
                      <span className="text-base">{country.flag}</span>
                      <span className="text-gray-700 font-medium">{country.code}</span>
                      <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400 ml-0.5">
                        <polyline points="2,3 5,7 8,3" />
                      </svg>
                    </button>

                    {countryOpen && (
                      <div className="absolute top-full left-0 mt-1 bg-white rounded-xl shadow-elevated border border-gray-100 py-1 z-20 min-w-[200px]">
                        {COUNTRIES.map((c, idx) => (
                          <button
                            key={c.code}
                            onClick={() => { setCountryIdx(idx); setCountryOpen(false); setPhone('') }}
                            className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm hover:bg-gray-50 transition-colors ${idx === countryIdx ? 'bg-cyan-50 text-cyan-700' : 'text-gray-700'}`}
                          >
                            <span className="text-base">{c.flag}</span>
                            <span className="font-medium">{c.code}</span>
                            <span className="text-gray-400">{c.name}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <input
                    type="tel"
                    value={formatPhoneDigits(phone)}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    placeholder=""
                    className="flex-1 px-3.5 py-2.5 rounded-r-xl border border-gray-200 text-sm focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 outline-none transition-all bg-white min-w-0"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">Telegram для связи <span className="text-gray-300">(необязательно)</span></label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 text-sm">@</span>
                  <input
                    type="text"
                    value={telegram}
                    onChange={(e) => setTelegram(e.target.value.replace(/^@/, ''))}
                    placeholder="username"
                    className="w-full pl-8 pr-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 outline-none transition-all bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Consent */}
            <label className="flex items-start gap-2.5 cursor-pointer mt-4">
              <div
                onClick={() => setConsent(!consent)}
                className={`
                  w-5 h-5 rounded flex items-center justify-center flex-shrink-0 border-2 mt-0.5 transition-all cursor-pointer
                  ${consent ? 'bg-cyan-600 border-cyan-600' : 'border-gray-300'}
                `}
              >
                <svg width="12" height="12" fill="none" stroke="white" strokeWidth="2.5"
                  className={`transition-all ${consent ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
                >
                  <polyline points="2,6 5,9 10,3" />
                </svg>
              </div>
              <span className="text-xs text-gray-500 leading-relaxed">
                Я даю согласие на{' '}
                <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-cyan-600 underline hover:text-cyan-700">
                  обработку персональных данных
                </a>
              </span>
            </label>

            {/* Submit button */}
            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className={`w-full mt-4 py-3 rounded-xl text-white text-sm font-bold tracking-wide transition-all
                ${canSubmit
                  ? isPayment
                    ? 'bg-emerald-600 hover:bg-emerald-700 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0'
                    : 'bg-cyan-600 hover:bg-cyan-700 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0'
                  : 'bg-gray-300 cursor-not-allowed'
                }`}
            >
              {sending
                ? (isPayment ? 'Создаём платёж...' : 'Отправка...')
                : (isPayment ? 'Перейти к оплате' : 'Отправить заявку')
              }
            </button>

            {/* Messenger section — only in form mode */}
            {!isPayment && (
              <>
                <div className="flex items-center gap-3 my-4">
                  <div className="flex-1 border-t border-gray-100" />
                  <span className="text-xs text-gray-300">или напишите нам</span>
                  <div className="flex-1 border-t border-gray-100" />
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <a
                    href={tgLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#2AABEE]/10 text-[#2AABEE] text-sm font-medium hover:bg-[#2AABEE]/20 transition-colors"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.49 8.18l-1.81 8.52c-.14.6-.5.75-.99.47l-2.76-2.04-1.33 1.28c-.15.15-.27.27-.56.27l.2-2.82 5.12-4.63c.22-.2-.05-.31-.34-.12l-6.33 3.99-2.73-.85c-.59-.19-.61-.59.12-.88l10.68-4.12c.5-.18.93.12.77.87z"/>
                    </svg>
                    Telegram
                  </a>
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#25D366]/10 text-[#25D366] text-sm font-medium hover:bg-[#25D366]/20 transition-colors"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2zm5.82 13.81c-.25.71-1.48 1.35-2.04 1.41-.53.05-1.02.24-3.41-.71-2.89-1.15-4.73-4.11-4.87-4.3-.15-.19-1.17-1.56-1.17-2.97 0-1.42.74-2.12 1-2.41.27-.29.58-.36.78-.36.19 0 .39.01.56.01.18.01.42-.07.66.5.24.58.82 2 .89 2.15.07.15.12.32.02.51-.1.19-.15.31-.29.48-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.3.78 1.28 1.67 2.07 1.14 1.01 2.11 1.32 2.41 1.47.29.15.46.13.64-.08.17-.21.75-.88.95-1.18.2-.29.39-.24.66-.15.27.1 1.7.8 1.99.95.29.15.49.22.56.34.07.12.07.71-.18 1.42z"/>
                    </svg>
                    WhatsApp
                  </a>
                </div>
                <p className="text-[10px] text-gray-300 text-center mt-2">Ваш расчёт подтянется в сообщение автоматически</p>
              </>
            )}
          </div>
        ) : (
          <div className="p-6 text-center py-8">
            <svg width="48" height="48" fill="none" className="mx-auto mb-3">
              <circle cx="24" cy="24" r="20" stroke="#10B981" strokeWidth="2" className="animate-circle-draw" />
              <polyline points="14,24 22,32 34,18" stroke="#10B981" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="animate-draw-check" />
            </svg>
            <h4 className="text-base font-bold text-gray-800 mb-1">Заявка отправлена!</h4>
            <p className="text-sm text-gray-500 mb-4">
              Мы перезвоним в течение 15 минут<br />в рабочее время (9:00–20:00)
            </p>
            <button
              onClick={handleClose}
              className="px-6 py-2.5 rounded-lg bg-gray-100 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
            >
              Закрыть
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
