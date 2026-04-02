'use client'

import { useState, useCallback, useEffect } from 'react'
import { ZONES, COMPLEXES, DISCOUNT, MALE_MULTIPLIER, formatPrice, resolveZone, PARENT_CHILD_MAP, CHILD_PARENT_MAP } from '@/data/services'
import BodyMap from '@/components/BodyMap'
import ServiceList from '@/components/ServiceList'
import Cart from '@/components/Cart'
import ComplexHint from '@/components/ComplexHint'
import ContactModal from '@/components/ContactModal'

type Gender = 'female' | 'male'

declare global {
  interface Window { ym?: (id: number, method: string, goal: string, params?: Record<string, unknown>) => void }
}
function ym(goal: string, params?: Record<string, unknown>) {
  window.ym?.(108371124, 'reachGoal', goal, params)
}

export default function Calculator() {
  const [gender, setGender] = useState<Gender>('female')
  const [activeZone, setActiveZone] = useState<string | null>(null)
  const [selected, setSelected] = useState<Record<string, Set<number>>>({
    head: new Set(),
    hands: new Set(),
    body: new Set(),
    legs: new Set(),
  })
  const [sessions, setSessions] = useState(1)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<'form' | 'payment'>('form')
  const [paymentAmount, setPaymentAmount] = useState(0)
  const [orderLines, setOrderLines] = useState<{ title: string; price: string }[]>([])
  const [totalPriceText, setTotalPriceText] = useState('')
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [paymentLoading, setPaymentLoading] = useState(false)

  const priceMultiplier = gender === 'male' ? MALE_MULTIPLIER : 1

  // Проверка возврата после оплаты
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('payment') === 'success') {
      setPaymentSuccess(true)
      window.history.replaceState({}, '', window.location.pathname)
    }
  }, [])

  // При смене пола — убрать услуги, недоступные для нового пола
  const handleGenderChange = useCallback((newGender: Gender) => {
    setGender(newGender)
    setSelected(prev => {
      const next = { ...prev }
      for (const [zone, ids] of Object.entries(next)) {
        const filtered = new Set<number>()
        ids.forEach(id => {
          const item = ZONES[zone]?.items.find(i => i.id === id)
          if (item && (!item.genderOnly || item.genderOnly === newGender)) {
            filtered.add(id)
          }
        })
        next[zone] = filtered
      }
      return next
    })
  }, [])

  const selectedCounts: Record<string, number> = {}
  Object.entries(selected).forEach(([zone, ids]) => {
    selectedCounts[zone] = ids.size
  })

  const handleZoneClick = useCallback((rawZone: string) => {
    const zone = resolveZone(rawZone)
    setActiveZone(zone)
    // На мобильном — проскроллить к списку услуг
    setTimeout(() => {
      const el = document.getElementById('service-list')
      if (el && window.innerWidth < 1024) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 100)
  }, [])

  const handleToggleService = useCallback((zoneKey: string, itemId: number) => {
    setSelected((prev) => {
      const next = { ...prev }
      const set = new Set(prev[zoneKey])
      if (set.has(itemId)) {
        // Removing — just remove
        set.delete(itemId)
      } else {
        // Adding — also remove conflicting items
        set.add(itemId)

        // If this is a "full" zone, remove its sub-zones
        const children = PARENT_CHILD_MAP[itemId]
        if (children) {
          children.forEach(childId => set.delete(childId))
        }

        // If this is a sub-zone, remove its parent "full" zones
        const parents = CHILD_PARENT_MAP[itemId]
        if (parents) {
          parents.forEach(parentId => set.delete(parentId))
        }
      }
      next[zoneKey] = set
      return next
    })
  }, [])

  const handleRemoveItem = useCallback((zone: string, id: number) => {
    setSelected((prev) => {
      const next = { ...prev }
      const set = new Set(prev[zone])
      set.delete(id)
      next[zone] = set
      return next
    })
  }, [])

  const handleAddItems = useCallback((items: { zone: string; id: number }[]) => {
    setSelected((prev) => {
      const next = { ...prev }
      for (const { zone, id } of items) {
        const set = new Set(next[zone])
        set.add(id)

        // Автоснятие: "полная" зона снимает подзоны
        const children = PARENT_CHILD_MAP[id]
        if (children) {
          children.forEach(childId => set.delete(childId))
        }
        // Автоснятие: подзона снимает "полную" зону
        const parents = CHILD_PARENT_MAP[id]
        if (parents) {
          parents.forEach(parentId => set.delete(parentId))
        }

        next[zone] = set
      }
      return next
    })
  }, [])

  const handleOpenModal = useCallback(() => {
    const allIds = new Set<number>()
    Object.values(selected).forEach(ids => ids.forEach(id => allIds.add(id)))

    const usedInComplex = new Set<number>()
    const lines: { title: string; price: string }[] = []
    const sortedComplexes = [...COMPLEXES]
      .map(c => {
        const sep = c.requiredItemIds.reduce((s, id) => {
          for (const z of Object.values(ZONES)) {
            const item = z.items.find(i => i.id === id)
            if (item) return s + item.price
          }
          return s
        }, 0)
        return { ...c, saving: sep - c.price }
      })
      .sort((a, b) => b.saving - a.saving)

    for (const c of sortedComplexes) {
      if (c.requiredItemIds.every(id => allIds.has(id) && !usedInComplex.has(id))) {
        c.requiredItemIds.forEach(id => usedInComplex.add(id))
        lines.push({ title: c.title, price: formatPrice(Math.round(c.price * priceMultiplier)) })
      }
    }

    Object.entries(selected).forEach(([zone, ids]) => {
      ZONES[zone].items
        .filter(i => ids.has(i.id) && !usedInComplex.has(i.id))
        .forEach(item => {
          lines.push({ title: item.title, price: formatPrice(Math.round(item.price * priceMultiplier)) })
        })
    })

    let basePerSession = 0
    lines.forEach(l => { basePerSession += parseInt(l.price.replace(/\D/g, '')) })
    const baseTotal = basePerSession * sessions
    const canDiscount = sessions >= DISCOUNT.minSessions
    const final = canDiscount ? Math.round(baseTotal / 2) : baseTotal
    const suffix = sessions > 1 ? ` (${sessions} сеансов)` : ''

    setOrderLines(lines)
    setTotalPriceText(formatPrice(final) + suffix)
    setModalMode('form')
    setModalOpen(true)
    ym('open_form', { services: lines.length, sessions })
  }, [selected, sessions, priceMultiplier])

  const handleClear = useCallback(() => {
    setSelected({
      head: new Set(),
      hands: new Set(),
      body: new Set(),
      legs: new Set(),
    })
    setActiveZone(null)
    setSessions(1)
  }, [])

  const handlePayOnline = useCallback((amount: number, _services: string, _sessionCount: number) => {
    // Reuse handleOpenModal logic to build order lines, then open modal in payment mode
    const allIds = new Set<number>()
    Object.values(selected).forEach(ids => ids.forEach(id => allIds.add(id)))

    const usedInComplex = new Set<number>()
    const lines: { title: string; price: string }[] = []
    const sortedComplexes = [...COMPLEXES]
      .map(c => {
        const sep = c.requiredItemIds.reduce((s, id) => {
          for (const z of Object.values(ZONES)) {
            const item = z.items.find(i => i.id === id)
            if (item) return s + item.price
          }
          return s
        }, 0)
        return { ...c, saving: sep - c.price }
      })
      .sort((a, b) => b.saving - a.saving)

    for (const c of sortedComplexes) {
      if (c.requiredItemIds.every(id => allIds.has(id) && !usedInComplex.has(id))) {
        c.requiredItemIds.forEach(id => usedInComplex.add(id))
        lines.push({ title: c.title, price: formatPrice(Math.round(c.price * priceMultiplier)) })
      }
    }

    Object.entries(selected).forEach(([zone, ids]) => {
      ZONES[zone].items
        .filter(i => ids.has(i.id) && !usedInComplex.has(i.id))
        .forEach(item => {
          lines.push({ title: item.title, price: formatPrice(Math.round(item.price * priceMultiplier)) })
        })
    })

    const suffix = sessions > 1 ? ` (${sessions} сеансов)` : ''
    setOrderLines(lines)
    setTotalPriceText(formatPrice(amount) + suffix)
    setPaymentAmount(amount)
    setModalMode('payment')
    setModalOpen(true)
    ym('open_payment', { amount, services: lines.length, sessions })
  }, [selected, sessions, priceMultiplier])

  const hasAnySelected = Object.values(selected).some((s) => s.size > 0)

  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    function onScroll() {
      setShowScrollTop(window.scrollY > 400 && window.innerWidth < 1024)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const els = document.querySelectorAll('.scroll-reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Beta banner */}
      <div className="bg-gray-100 border-b border-gray-200 text-center py-1.5 px-4">
        <span className="text-xs text-gray-500">
          Бета-версия · <a href="https://t.me/Lazurit_msk" target="_blank" rel="noopener noreferrer" className="text-cyan-600 hover:text-cyan-700 transition-colors">Напишите, что улучшить</a>
        </span>
      </div>

      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 py-8 pb-14">
        {/* Приветственное окно — на мобильном перед фигурой */}
        {!activeZone && !hasAnySelected && (
          <div className="lg:hidden card p-5 mb-5">
            <div className="flex flex-col items-center text-center mb-4">
              <h3 className="text-base font-bold text-gray-800 font-[family-name:var(--font-display)]">Выберите зону</h3>
              <p className="text-sm text-gray-400">Нажмите на любую часть тела</p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center p-2.5 rounded-xl bg-gray-50">
                <span className="text-base font-extrabold text-cyan-600 font-[family-name:var(--font-display)] block">−50%</span>
                <span className="text-[10px] text-gray-500 block mt-0.5">Скидка от 5 сеансов</span>
              </div>
              <div className="text-center p-2.5 rounded-xl bg-gray-50">
                <span className="text-base font-extrabold text-amber-500 font-[family-name:var(--font-display)] block">✦</span>
                <span className="text-[10px] text-gray-500 block mt-0.5">Совмещайте зоны — цена ниже</span>
              </div>
              <div className="text-center p-2.5 rounded-xl bg-gray-50">
                <span className="text-base font-extrabold text-emerald-600 font-[family-name:var(--font-display)] block">от 5</span>
                <span className="text-[10px] text-gray-500 block mt-0.5">+1 сеанс в подарок</span>
                <span className="text-[10px] text-gray-400 block">при оплате онлайн</span>
              </div>
            </div>
          </div>
        )}

        {/* Main grid — 3 columns on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr_280px] gap-5 items-start">
          {/* Left: Body diagram */}
          <BodyMap
            gender={gender}
            activeZone={activeZone}
            selectedCounts={selectedCounts}
            onZoneClick={handleZoneClick}
            onGenderChange={handleGenderChange}
          />

          {/* Center: Service list + Cart */}
          <div className="flex flex-col gap-5">
            {/* Empty state — только десктоп */}
            {!activeZone && !hasAnySelected && (
              <div className="hidden lg:block card p-8">
                <div className="mb-5">
                  <h3 className="text-lg font-bold text-gray-800 font-[family-name:var(--font-display)]">Выберите зону</h3>
                  <p className="text-sm text-gray-400">Нажмите на любую часть тела, чтобы увидеть доступные услуги</p>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-3 rounded-xl bg-gray-50">
                    <span className="text-lg font-extrabold text-cyan-600 font-[family-name:var(--font-display)] block">−50%</span>
                    <span className="text-[10px] text-gray-500 block mt-1">Скидка от 5 сеансов</span>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-gray-50">
                    <span className="text-lg font-extrabold text-amber-500 font-[family-name:var(--font-display)] block">✦</span>
                    <span className="text-[10px] text-gray-500 block mt-1">Совмещайте зоны — цена ниже</span>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-gray-50">
                    <span className="text-lg font-extrabold text-emerald-600 font-[family-name:var(--font-display)] block">от 5</span>
                    <span className="text-[10px] text-gray-500 block mt-1">+1 сеанс в подарок</span>
                    <span className="text-[10px] text-gray-400 block">при оплате онлайн</span>
                  </div>
                </div>
              </div>
            )}

            {/* Service panel */}
            {activeZone && ZONES[activeZone] && (
              <div id="service-list" />
            )}
            {activeZone && ZONES[activeZone] && (
              <ServiceList
                zone={ZONES[activeZone]}
                selectedIds={selected[activeZone]}
                priceMultiplier={priceMultiplier}
                gender={gender}
                onToggle={handleToggleService}
              />
            )}

            {/* Комплексы — на мобильном ДО корзины */}
            <div className="lg:hidden">
              <ComplexHint
                selected={selected}
                priceMultiplier={priceMultiplier}
                sessions={sessions}
                onAddItems={handleAddItems}
              />
            </div>

            {/* Cart */}
            <Cart
              selected={selected}
              sessions={sessions}
              priceMultiplier={priceMultiplier}
              onRemoveItem={handleRemoveItem}
              onClear={handleClear}
              onSessionChange={setSessions}
              onSubmit={handleOpenModal}
              onPayOnline={handlePayOnline}
            />
          </div>

          {/* Right: Quest cards — только десктоп */}
          <div className="hidden lg:block">
            <div className="lg:sticky lg:top-5">
              <ComplexHint
                selected={selected}
                priceMultiplier={priceMultiplier}
                sessions={sessions}
                onAddItems={handleAddItems}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Contact modal */}
      <ContactModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        orderLines={orderLines}
        totalPrice={totalPriceText}
        sessions={sessions}
        gender={gender}
        mode={modalMode}
        paymentAmount={paymentAmount}
      />

      {/* Payment success overlay */}
      {paymentSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-elevated w-full max-w-[400px] p-8 text-center">
            <svg width="56" height="56" fill="none" className="mx-auto mb-4">
              <circle cx="28" cy="28" r="24" stroke="#10B981" strokeWidth="2" className="animate-circle-draw" />
              <polyline points="16,28 25,37 40,22" stroke="#10B981" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="animate-draw-check" />
            </svg>
            <h3 className="text-xl font-bold text-gray-800 mb-2 font-[family-name:var(--font-display)]">Оплата прошла!</h3>
            <p className="text-sm text-gray-500 mb-5">Выберите удобное время для записи</p>

            <a
              href="https://b606463.yclients.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-base font-bold tracking-wide transition-all text-center mb-4"
            >
              Записаться онлайн
            </a>

            <p className="text-xs text-gray-400 text-center mb-3">или свяжитесь с нами</p>

            <div className="grid grid-cols-2 gap-2.5 mb-3">
              <a
                href="https://t.me/Lazurit_msk"
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
                href="https://wa.me/79999990144"
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

            <a href="tel:+79999990144" className="block text-sm text-gray-500 hover:text-gray-700 transition-colors mb-4">
              +7 999 999-01-44
            </a>

            <button
              onClick={() => setPaymentSuccess(false)}
              className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
            >
              Закрыть
            </button>
          </div>
        </div>
      )}

      {/* Payment loading overlay */}
      {paymentLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-elevated px-8 py-6 text-center">
            <div className="w-8 h-8 border-3 border-cyan-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm text-gray-600">Создаём платёж...</p>
          </div>
        </div>
      )}

      {/* Scroll to top — mobile */}
      {showScrollTop && (activeZone || hasAnySelected) && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="lg:hidden fixed bottom-5 right-5 z-40 w-11 h-11 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:text-cyan-600 hover:border-cyan-300 active:scale-95 transition-all"
          aria-label="Наверх к выбору зон"
        >
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 14V4m0 0L4 9m5-5l5 5" />
          </svg>
        </button>
      )}
    </div>
  )
}
