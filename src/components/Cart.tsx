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
}

export default function Cart({
  selected,
  sessions,
  priceMultiplier,
  onRemoveItem,
  onClear,
  onSessionChange,
  onSubmit,
}: CartProps) {
  const activeZones = Object.entries(selected).filter(([, ids]) => ids.size > 0)
  if (activeZones.length === 0) return null

  // Collect all selected item IDs
  const allSelectedIds = new Set<number>()
  activeZones.forEach(([, ids]) => ids.forEach(id => allSelectedIds.add(id)))

  // Find best matching complexes (greedy: pick most valuable first)
  const usedInComplex = new Set<number>()
  const appliedComplexes: { title: string; price: number; itemIds: number[] }[] = []

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
      appliedComplexes.push({
        title: complex.title,
        price: complex.price,
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
    <div className="glass rounded-2xl shadow-lg overflow-hidden animate-in">
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
          {appliedComplexes.map((c, idx) => (
            <div key={idx} className="py-1.5">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-800">{c.title}</span>
                <span className="text-sm font-semibold text-emerald-600">
                  {formatPrice(Math.round(c.price * priceMultiplier))}
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
          ))}
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

      {/* Discount quest block */}
      <div className={`
        mx-4 mt-4 rounded-xl border-2 p-4 transition-all duration-500
        ${canDiscount
          ? 'border-emerald-400 bg-emerald-50'
          : 'border-cyan-200 bg-cyan-50/30'
        }
      `}>
        <div className="mb-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-gray-800">
              {canDiscount ? '🎉 Скидка 50% активна!' : 'Купите курс — сэкономьте 50%'}
            </span>
            {!canDiscount && (
              <span className="text-xs text-gray-500">
                ещё {needSessions} {needSessions === 1 ? 'сеанс' : needSessions < 5 ? 'сеанса' : 'сеансов'}
              </span>
            )}
          </div>
          <p className="text-xs text-gray-400 mt-0.5">
            {canDiscount
              ? 'Курс из 5 сеансов — для стойкого результата'
              : 'Лазерная эпиляция работает курсами. Выберите от 5 визитов — цена за каждый снижается вдвое'
            }
          </p>
        </div>

        {/* Progress bar to discount */}
        <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden mb-3">
          <div
            className={`
              absolute inset-y-0 left-0 rounded-full transition-all duration-700 ease-out
              ${canDiscount ? 'bg-emerald-500' : 'bg-cyan-500'}
            `}
            style={{ width: `${progressPercent}%` }}
          />
          {/* Markers */}
          {[1, 2, 3, 4, 5].map(n => (
            <div
              key={n}
              className={`
                absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full border-2 border-white
                transition-all duration-300
                ${sessions >= n
                  ? canDiscount ? 'bg-emerald-500' : 'bg-cyan-500'
                  : 'bg-gray-300'
                }
              `}
              style={{ left: `${(n / 5) * 100 - 2}%` }}
            />
          ))}
        </div>

        {/* Bonus teaser */}
        {!canDiscount && (
          <p className="text-xs text-gray-400 mb-3 text-center">
            🎁 При 5 сеансах — бонусный сеанс в подарок
          </p>
        )}

        {/* Session counter */}
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-gray-700">Сеансов</label>
          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
            <button
              onClick={() => onSessionChange(Math.max(1, sessions - 1))}
              className="w-9 h-9 flex items-center justify-center text-cyan-600 font-semibold text-lg hover:bg-cyan-50 transition-colors"
            >
              −
            </button>
            <input
              type="number"
              value={sessions}
              onChange={(e) => {
                const v = Math.max(1, Math.min(99, parseInt(e.target.value) || 1))
                onSessionChange(v)
              }}
              className="w-10 text-center text-base font-bold border-x border-gray-200 py-1.5 bg-transparent appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <button
              onClick={() => onSessionChange(Math.min(99, sessions + 1))}
              className="w-9 h-9 flex items-center justify-center text-cyan-600 font-semibold text-lg hover:bg-cyan-50 transition-colors"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Online bonus banner */}
      {canDiscount && (
        <div className="mx-4 mt-3 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 p-3 text-white text-center">
          <span className="text-sm font-bold">🎁 +1 сеанс в подарок!</span>
        </div>
      )}

      {/* Pricing section */}
      <div className="px-5 py-4 mt-2">
        {/* Price breakdown */}
        <div className="flex justify-between items-center py-1">
          <span className="text-sm text-gray-500">
            {sessions > 1 ? `${formatPrice(basePerSession)} × ${sessions} сеансов` : 'Стоимость'}
          </span>
          <span className={`text-sm font-bold ${canDiscount ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
            {formatPrice(baseTotal)}
          </span>
        </div>

        {/* Always show discounted line */}
        <div className="flex justify-between items-center py-1">
          <span className={`text-sm ${canDiscount ? 'text-emerald-600 font-semibold' : 'text-gray-400'}`}>
            Со скидкой 50%
          </span>
          <span className={`text-sm font-bold ${canDiscount ? 'text-emerald-600' : 'text-gray-400'}`}>
            {formatPrice(Math.round(baseTotal * 0.5))}
          </span>
        </div>

        <div className="flex justify-between items-center pt-3 mt-2 border-t-2 border-gray-200">
          <span className="text-base font-bold text-gray-800">Итого</span>
          <span className="flex items-center gap-2">
            <span className="text-sm text-gray-400 line-through">{formatPrice(baseTotal)}</span>
            <span className={`text-xl font-bold ${canDiscount ? 'text-emerald-600' : 'text-cyan-600'}`}>
              {canDiscount ? formatPrice(total) : formatPrice(baseTotal)}
            </span>
          </span>
        </div>

        {!canDiscount && (
          <p className="text-xs text-center text-gray-400 mt-1">
            Добавьте сеансов — и цена снизится до {formatPrice(Math.round(baseTotal * 0.5))}
          </p>
        )}

        {/* CTA */}
        <button
          onClick={onSubmit}
          className="w-full mt-4 py-3.5 rounded-lg bg-gradient-to-r from-cyan-600 to-cyan-500 text-white font-bold tracking-wide hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cyan-500/30 active:translate-y-0 transition-all"
        >
          Записаться
        </button>
      </div>
    </div>
  )
}
