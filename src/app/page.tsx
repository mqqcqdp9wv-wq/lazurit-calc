'use client'

import { useState, useCallback, useEffect } from 'react'
import { ZONES, COMPLEXES, DISCOUNT, MALE_MULTIPLIER, formatPrice, resolveZone, PARENT_CHILD_MAP, CHILD_PARENT_MAP } from '@/data/services'
import BodyMap from '@/components/BodyMap'
import ServiceList from '@/components/ServiceList'
import Cart from '@/components/Cart'
import ComplexHint from '@/components/ComplexHint'
import ContactModal from '@/components/ContactModal'

type Gender = 'female' | 'male'

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
  const [orderLines, setOrderLines] = useState<{ title: string; price: string }[]>([])
  const [totalPriceText, setTotalPriceText] = useState('')

  const priceMultiplier = gender === 'male' ? MALE_MULTIPLIER : 1

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
    setModalOpen(true)
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

  const hasAnySelected = Object.values(selected).some((s) => s.size > 0)

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
    <div className="min-h-screen bg-[#f8fafb] relative overflow-hidden">
      <div className="fixed inset-0 -z-10 pointer-events-none" aria-hidden="true">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-cyan-100/40 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-100/30 blur-[100px]" />
      </div>
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 py-8 pb-14">
        {/* Header */}
        <header className="mb-8 sm:mb-10">
          <div className="card-premium relative overflow-hidden px-6 sm:px-8 py-5 sm:py-6">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 via-emerald-400 to-cyan-500 shadow-[0_1px_8px_rgba(6,182,212,0.3)]" />

            <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_auto] items-center gap-0 sm:gap-0">
              {/* Заголовок */}
              <div className="mb-3 sm:mb-0 sm:pr-5">
                <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight font-[family-name:var(--font-display)] bg-[length:200%_auto] bg-gradient-to-r from-cyan-700 via-cyan-500 to-emerald-500 bg-clip-text text-transparent animate-gradient-x">
                  Калькулятор лазерной эпиляции
                </h1>
                <p className="text-gray-400 text-xs mt-0.5">
                  Выберите зоны · рассчитайте стоимость · запишитесь
                </p>
              </div>

              {/* Курс */}
              <div className="hidden sm:flex items-center gap-3 border-l border-gray-200/60 px-5 py-1">
                <div>
                  <span className="text-sm font-semibold text-gray-700 block whitespace-nowrap">от 5 сеансов — <span className="text-cyan-600">−50%</span></span>
                  <span className="text-xs text-gray-400 whitespace-nowrap">+ бонусный сеанс в подарок</span>
                </div>
              </div>

              {/* Комплекс */}
              <div className="hidden sm:flex items-center gap-3 border-l border-gray-200/60 px-5 py-1">
                <div className="w-9 h-9 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0">
                  <span className="text-base text-amber-500">✦</span>
                </div>
                <div>
                  <span className="text-sm font-semibold text-gray-700 block whitespace-nowrap">Комплекс</span>
                  <span className="text-xs text-amber-600 whitespace-nowrap">Зоны вместе дешевле</span>
                </div>
              </div>

              {/* Мобильная версия — компактные бейджи */}
              <div className="flex gap-2 sm:hidden">
                <div className="flex items-center gap-1.5 rounded-full bg-cyan-50/80 border border-cyan-200/40 px-3 py-1">
                  <span className="text-[11px] font-bold text-cyan-600">−50%</span>
                  <span className="text-[11px] font-semibold text-cyan-700">от 5 сеансов</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-amber-50/80 border border-amber-200/40 px-3 py-1">
                  <span className="text-[11px] text-amber-500">✦</span>
                  <span className="text-[11px] font-semibold text-amber-700">Комплекс</span>
                </div>
              </div>
            </div>
          </div>
        </header>

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
            {/* Empty state */}
            {!activeZone && !hasAnySelected && (
              <div className="card-premium p-12 text-center">
                <div className="w-14 h-14 bg-cyan-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" className="text-cyan-600">
                    <path d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122M5.828 12.172l-2.122 2.122" />
                  </svg>
                </div>
                <h3 className="text-base font-semibold mb-1.5">Выберите зону</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Нажмите на любую часть тела,<br />чтобы увидеть доступные услуги
                </p>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs text-cyan-600 font-medium">
                    Выбирайте несколько зон — покажем выгодные комплексы со скидкой
                  </p>
                </div>
              </div>
            )}

            {/* Service panel */}
            {activeZone && ZONES[activeZone] && (
              <ServiceList
                zone={ZONES[activeZone]}
                selectedIds={selected[activeZone]}
                priceMultiplier={priceMultiplier}
                gender={gender}
                onToggle={handleToggleService}
              />
            )}

            {/* Cart */}
            <Cart
              selected={selected}
              sessions={sessions}
              priceMultiplier={priceMultiplier}
              onRemoveItem={handleRemoveItem}
              onClear={handleClear}
              onSessionChange={setSessions}
              onSubmit={handleOpenModal}
            />
          </div>

          {/* Right: Quest cards */}
          <div>
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
      />
    </div>
  )
}
