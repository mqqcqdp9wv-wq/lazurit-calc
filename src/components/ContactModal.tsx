'use client'

import { useState } from 'react'

type ContactModalProps = {
  isOpen: boolean
  onClose: () => void
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

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
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
        bg-gray-900/50 backdrop-blur-sm
        transition-all duration-300
        ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
      `}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose()
      }}
    >
      <div
        className={`
          glass-strong rounded-2xl shadow-2xl w-full max-w-[400px] p-7 relative
          transition-all duration-300
          ${isOpen ? 'translate-y-0 scale-100' : 'translate-y-5 scale-[0.97]'}
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
            <h3 className="text-lg font-bold text-center mb-5">Контактные данные</h3>

            <div className="space-y-3.5">
              <input
                type="text"
                placeholder="Фамилия Имя Отчество"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm bg-gray-50 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 transition-all"
              />
              <input
                type="tel"
                placeholder="8 900 000 00 00"
                value={phone}
                onChange={(e) => setPhone(phoneMask(e.target.value))}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm bg-gray-50 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 transition-all"
              />
              <input
                type="tel"
                placeholder="Telegram (номер телефона)"
                value={telegram}
                onChange={(e) => setTelegram(phoneMask(e.target.value))}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm bg-gray-50 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 transition-all"
              />

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
              className="w-full mt-5 py-3.5 rounded-lg bg-gradient-to-r from-cyan-600 to-cyan-500 text-white font-bold hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cyan-500/30 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none"
            >
              Отправить заявку
            </button>
          </>
        ) : (
          <div className="text-center py-5">
            <svg width="48" height="48" fill="none" stroke="#10B981" strokeWidth="2" className="mx-auto mb-3">
              <circle cx="24" cy="24" r="20" />
              <polyline points="14,24 22,32 34,18" />
            </svg>
            <p className="text-sm text-gray-500">
              Заявка отправлена!<br />Мы скоро свяжемся с вами.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
