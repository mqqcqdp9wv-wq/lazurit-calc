'use client'

import { ZONES, COMPLEXES, DISCOUNT, formatPrice } from '@/data/services'

type CartProps = {
  selected: Record<string, Set<number>>
  sessions: number
  priceMultiplier: number
  onRemoveItem: (zone: string, id: number) => void
  onClear: () => void
  onSessionChange: (n: number) => void
  onSubmit: () => void
  onPayOnline: (amount: number, services: string, sessions: number) => void
}

export default function Cart({
  selected,
  sessions,
  priceMultiplier,
  onRemoveItem,
  onClear,
  onSessionChange,
  onSubmit,
  onPayOnline,
}: CartProps) {
  const activeZones = Object.entries(selected).filter(([, ids]) => ids.size > 0)
  if (activeZones.length === 0) return null

  // Collect all selected item IDs
  const allSelectedIds = new Set<number>()
  activeZones.forEach(([, ids]) => ids.forEach(id => allSelectedIds.add(id)))

  // Find best matching complexes (greedy: pick most valuable first)
  const usedInComplex = new Set<number>()
  const appliedComplexes: { title: string; price: number; separatePrice: number; itemIds: number[] }[] = []

  // Sort complexes by saving (biggest saving first)
  const sortedComplexes = [...COMPLEXES]
    .map(c => {
      const separatePrice = c.requiredItemIds.reduce((sum, id) => {
        for (const zone of Object.values(ZONES)) {
          const item = zone.items.find(i => i.id === id)
          if (item) return sum + item.price
        }
        return sum
      }, 0)
      return { ...c, saving: separatePrice - c.price }
    })
    .sort((a, b) => b.saving - a.saving)

  for (const complex of sortedComplexes) {
    const allPresent = complex.requiredItemIds.every(id => allSelectedIds.has(id))
    const noneUsed = complex.requiredItemIds.every(id => !usedInComplex.has(id))
    if (allPresent && noneUsed) {
      complex.requiredItemIds.forEach(id => usedInComplex.add(id))
      const separatePrice = complex.requiredItemIds.reduce((sum, id) => {
        for (const zone of Object.values(ZONES)) {
          const item = zone.items.find(i => i.id === id)
          if (item) return sum + item.price
        }
        return sum
      }, 0)
      appliedComplexes.push({
        title: complex.title,
        price: complex.price,
        separatePrice,
        itemIds: complex.requiredItemIds,
      })
    }
  }

  // Calculate price: complex prices + individual prices for non-complex items
  let basePerSession = 0
  appliedComplexes.forEach(c => {
    basePerSession += Math.round(c.price * priceMultiplier)
  })
  activeZones.forEach(([zone, ids]) => {
    ZONES[zone].items
      .filter((i) => ids.has(i.id) && !usedInComplex.has(i.id))
      .forEach((item) => {
        basePerSession += Math.round(item.price * priceMultiplier)
      })
  })

  const baseTotal = basePerSession * sessions
  const canDiscount = sessions >= DISCOUNT.minSessions
  const discountAmount = canDiscount ? Math.round(baseTotal * DISCOUNT.percent / 100) : 0
  const total = baseTotal - discountAmount

  // Progress to discount
  const progressToDiscount = Math.min(sessions / DISCOUNT.minSessions, 1)
  const progressPercent = Math.round(progressToDiscount * 100)
  const needSessions = Math.max(0, DISCOUNT.minSessions - sessions)

  return (
    <div className="card overflow-hidden animate-in">
      {/* Header */}
      <div className="px-5 pt-4 pb-3 border-b border-gray-100 flex justify-between items-center">
        <h3 className="text-base font-bold text-gray-800">Ваш выбор</h3>
        <button
          onClick={onClear}
          className="text-xs text-red-500 font-medium px-2 py-1 rounded-md hover:bg-red-50 transition-colors"
        >
          Сбросить
        </button>
      </div>

      {/* Applied complexes */}
      {appliedComplexes.length > 0 && (
        <div className="px-5 py-3 border-b border-gray-100">
          <div className="text-[0.72rem] font-bold uppercase tracking-wider text-emerald-500 mb-2">
            Комплексы
          </div>
          {appliedComplexes.map((c, idx) => {
            const complexPrice = Math.round(c.price * priceMultiplier)
            const oldPrice = Math.round(c.separatePrice * priceMultiplier)
            const saving = oldPrice - complexPrice
            return (
              <div key={idx} className="py-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-800">{c.title}</span>
                  <span className="flex items-center gap-2">
                    <span className="text-xs text-gray-400 line-through">{formatPrice(oldPrice)}</span>
                    <span className="text-sm font-semibold text-emerald-600">
                      {formatPrice(complexPrice)}
                    </span>
                  </span>
                </div>
                <div className="text-[11px] text-gray-400 mt-0.5">
                  {c.itemIds.map(id => {
                    for (const zone of Object.values(ZONES)) {
                      const item = zone.items.find(i => i.id === id)
                      if (item) return item.title
                    }
                    return ''
                  }).join(' + ')}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Individual items (not in complexes) */}
      {activeZones.map(([zone, ids]) => {
        const individualItems = ZONES[zone].items.filter(
          (i) => ids.has(i.id) && !usedInComplex.has(i.id)
        )
        if (individualItems.length === 0) return null
        return (
          <div key={zone} className="px-5 py-3 border-b border-gray-100 last:border-b-0">
            <div className="text-[0.72rem] font-bold uppercase tracking-wider text-gray-400 mb-2">
              {ZONES[zone].title}
            </div>
            {individualItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-1.5">
                  <span className="text-sm font-medium text-gray-800">{item.title}</span>
                  <span className="flex items-center gap-2.5">
                    <span className="text-sm font-semibold text-gray-800">
                      {formatPrice(Math.round(item.price * priceMultiplier))}
                    </span>
                    <button
                      onClick={() => onRemoveItem(zone, item.id)}
                      className="w-[22px] h-[22px] flex items-center justify-center text-gray-400 rounded hover:text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="3" y1="3" x2="11" y2="11" />
                        <line x1="11" y1="3" x2="3" y2="11" />
                      </svg>
                    </button>
                  </span>
                </div>
              ))}
          </div>
        )
      })}

      {/* Pricing section — immediately after items */}
      <div className="px-5 py-4">
        {/* Price line */}
        <div className="flex justify-between items-center pt-2 pb-3 border-t border-gray-100">
          <span className="text-base font-bold text-gray-800 font-[family-name:var(--font-display)]">Итого</span>
          <span key={total} className={`text-2xl font-bold animate-price-pop font-[family-name:var(--font-display)] ${canDiscount ? 'text-emerald-600' : 'text-cyan-600'}`}>
            {canDiscount ? formatPrice(total) : formatPrice(baseTotal)}
          </span>
        </div>

        {sessions > 1 && (
          <div className="flex justify-between items-center text-xs text-gray-400 -mt-2 mb-2">
            <span>{formatPrice(basePerSession)} × {sessions} сеансов</span>
            {canDiscount && <span className="line-through">{formatPrice(baseTotal)}</span>}
          </div>
        )}
      </div>

      {/* Course upsell — между итогом и кнопками */}
      <div className={`
        animate-fade-up mx-4 mb-4 rounded-xl p-4 transition-all duration-500
        ${canDiscount
          ? 'bg-emerald-50/60 border border-emerald-200/50'
          : 'bg-gray-50/80 border border-gray-200/50'
        }
      `}>
        {canDiscount ? (
          <>
            {/* Celebration header */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold text-gray-800 font-[family-name:var(--font-display)]">Скидка 50% + 1 сеанс при оплате онлайн</span>
              <button
                onClick={() => onSessionChange(1)}
                className="text-xs text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                Отменить
              </button>
            </div>

            {/* Session counter */}
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs text-gray-500">{sessions} из 15 сеансов</span>
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
                <button
                  onClick={() => onSessionChange(Math.max(1, sessions - 1))}
                  className="w-9 h-9 flex items-center justify-center text-gray-600 font-semibold hover:bg-gray-50 transition-colors"
                >
                  −
                </button>
                <input
                  type="number"
                  value={sessions}
                  onChange={(e) => {
                    const v = Math.max(1, Math.min(15, parseInt(e.target.value) || 1))
                    onSessionChange(v)
                  }}
                  className="w-10 text-center text-sm font-bold border-x border-gray-200 py-1 bg-transparent appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <button
                  onClick={() => onSessionChange(Math.min(15, sessions + 1))}
                  className="w-9 h-9 flex items-center justify-center text-gray-600 font-semibold hover:bg-gray-50 transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Курсом дешевле</span>
              <span className="text-sm font-semibold text-cyan-600">{formatPrice(Math.round(baseTotal * 0.5))}</span>
            </div>
            <p className="text-[11px] text-gray-400 mb-3">
              От 5 сеансов — скидка 50%
            </p>

            {/* Compact session counter */}
            <div className="flex items-center justify-between">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(n => (
                  <div
                    key={n}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      sessions >= n ? 'bg-cyan-500' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
                <button
                  onClick={() => onSessionChange(Math.max(1, sessions - 1))}
                  className="w-9 h-9 flex items-center justify-center text-cyan-600 font-semibold hover:bg-cyan-50 transition-colors"
                >
                  −
                </button>
                <input
                  type="number"
                  value={sessions}
                  onChange={(e) => {
                    const v = Math.max(1, Math.min(15, parseInt(e.target.value) || 1))
                    onSessionChange(v)
                  }}
                  className="w-10 text-center text-sm font-bold border-x border-gray-200 py-1 bg-transparent appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <button
                  onClick={() => onSessionChange(Math.min(15, sessions + 1))}
                  className="w-9 h-9 flex items-center justify-center text-cyan-600 font-semibold hover:bg-cyan-50 transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* CTA buttons — после upsell-блока */}
      <div className="px-5 pb-4">
        {/* Оплатить онлайн — главная кнопка */}
        <button
          onClick={() => {
            const finalAmount = canDiscount ? total : baseTotal
            const serviceNames = [
              ...appliedComplexes.map(c => c.title),
              ...activeZones.flatMap(([zone, ids]) =>
                ZONES[zone].items
                  .filter(i => ids.has(i.id) && !usedInComplex.has(i.id))
                  .map(i => i.title)
              )
            ].join(', ')
            onPayOnline(finalAmount, serviceNames, sessions)
          }}
          className="w-full py-3.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white hover:-translate-y-0.5 hover:shadow-xl hover:shadow-cyan-500/30 active:translate-y-0 transition-all"
        >
          <span className="text-lg font-bold tracking-wide block">Оплатить онлайн</span>
          {canDiscount && <span className="text-xs font-medium text-white/70 block mt-0.5">+1 сеанс в подарок</span>}
        </button>

        {/* Записаться — вторичная */}
        <button
          onClick={onSubmit}
          className="w-full mt-2 py-3 rounded-xl border border-gray-200 bg-white text-gray-600 text-sm font-medium hover:bg-gray-50 transition-all"
        >
          Оставить заявку
        </button>
      </div>
    </div>
  )
}
