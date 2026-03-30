'use client'

import { useState } from 'react'

type OrderLine = { title: string; price: string }

type ContactModalProps = {
  isOpen: boolean
  onClose: () => void
  orderLines?: OrderLine[]
  totalPrice?: string
}

function phoneMask(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  let result = ''
  if (digits.length > 0) result = '8'
  if (digits.length > 1) result += ' ' + digits.slice(1, 4)
  if (digits.length > 4) result += ' ' + digits.slice(4, 7)
  if (digits.length > 7) result += ' ' + digits.slice(7, 9)
  if (digits.length > 9) result += ' ' + digits.slice(9, 11)
  return result
}

export default function ContactModal({ isOpen, onClose, orderLines, totalPrice }: ContactModalProps) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [telegram, setTelegram] = useState('')
  const [consent, setConsent] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const canSubmit = name.trim() && phone.replace(/\D/g, '').length >= 11 && consent

  function handleSubmit() {
    if (!canSubmit) return
    // TODO: отправка заявки на сервер
    setSubmitted(true)
  }

  function handleClose() {
    onClose()
    setTimeout(() => {
      setName('')
      setPhone('')
      setTelegram('')
      setConsent(false)
      setSubmitted(false)
    }, 300)
  }

  return (
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center p-5
        bg-gray-950/40 backdrop-blur-md
        transition-all duration-300
        ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
      `}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose()
      }}
    >
      <div
        className={`
          bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/60 w-full max-w-[400px] p-7 relative
          transition-all duration-300
          ${isOpen ? 'translate-y-0 scale-100' : 'translate-y-5 scale-[0.95]'}
        `}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="4" y1="4" x2="12" y2="12" />
            <line x1="12" y1="4" x2="4" y2="12" />
          </svg>
        </button>

        {!submitted ? (
          <>
            <h3 className="text-lg font-bold text-center mb-4 font-[family-name:var(--font-display)]">Контактные данные</h3>

            {/* Order summary */}
            {orderLines && orderLines.length > 0 && (
              <div className="mb-4 bg-gray-50 rounded-lg p-3 max-h-[140px] overflow-y-auto">
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
                    <span className="text-cyan-600">{totalPrice}</span>
                  </div>
                )}
              </div>
            )}

            <div className="space-y-3.5">
              <input
                type="text"
                placeholder="Фамилия Имя Отчество"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm bg-gray-50 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 focus:shadow-[0_0_0_4px_rgba(6,182,212,0.08)] transition-all"
              />
              <input
                type="tel"
                placeholder="8 900 000 00 00"
                value={phone}
                onChange={(e) => setPhone(phoneMask(e.target.value))}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm bg-gray-50 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 focus:shadow-[0_0_0_4px_rgba(6,182,212,0.08)] transition-all"
              />
              <div className="relative">
                <input
                  type="tel"
                  placeholder="Telegram (необязательно)"
                  value={telegram}
                  onChange={(e) => setTelegram(phoneMask(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm bg-gray-50 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 focus:shadow-[0_0_0_4px_rgba(6,182,212,0.08)] transition-all"
                />
              </div>

              {/* Consent checkbox */}
              <label className="flex items-start gap-2.5 cursor-pointer">
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
                  <a href="https://lazepil.ru/privacy" target="_blank" rel="noopener noreferrer" className="text-cyan-600 underline hover:text-cyan-700">
                    обработку персональных данных
                  </a>
                </span>
              </label>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="w-full mt-5 py-3.5 rounded-lg bg-gradient-to-r from-cyan-600 via-cyan-500 to-emerald-400 text-white font-bold hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cyan-500/30 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none relative overflow-hidden group"
            >
              <span className="relative z-10">Отправить заявку</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
            </button>
          </>
        ) : (
          <div className="text-center py-5">
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
