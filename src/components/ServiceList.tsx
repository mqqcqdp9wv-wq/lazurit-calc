'use client'

import { useState, useRef, useEffect } from 'react'
import { Zone, ServiceItem, formatPrice, COMPLEX_ITEM_IDS } from '@/data/services'

type ServiceListProps = {
  zone: Zone
  selectedIds: Set<number>
  priceMultiplier: number
  gender: 'female' | 'male'
  onToggle: (zoneKey: string, itemId: number) => void
}

export default function ServiceList({ zone, selectedIds, priceMultiplier, gender, onToggle }: ServiceListProps) {
  const [activeHint, setActiveHint] = useState<number | null>(null)
  const hintTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const listRef = useRef<HTMLUListElement | null>(null)
  const [showScrollHint, setShowScrollHint] = useState(false)

  useEffect(() => () => {
    if (hintTimerRef.current) clearTimeout(hintTimerRef.current)
  }, [])

  // Проверяем, есть ли что скроллить, и обновляем флаг при скролле/смене зоны
  useEffect(() => {
    const el = listRef.current
    if (!el) return
    const check = () => {
      const canScroll = el.scrollHeight - el.clientHeight > 4
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 4
      setShowScrollHint(canScroll && !atBottom)
    }
    check()
    el.addEventListener('scroll', check, { passive: true })
    const ro = new ResizeObserver(check)
    ro.observe(el)
    return () => {
      el.removeEventListener('scroll', check)
      ro.disconnect()
    }
  }, [zone.key, gender])

  const handleToggle = (zoneKey: string, item: ServiceItem) => {
    if (COMPLEX_ITEM_IDS.has(item.id)) {
      if (hintTimerRef.current) clearTimeout(hintTimerRef.current)
      setActiveHint(item.id)
      hintTimerRef.current = setTimeout(() => setActiveHint(null), 2000)
    }
    onToggle(zoneKey, item.id)
  }

  return (
    <div className="card overflow-hidden animate-in">
      <div className="px-5 pt-4 pb-3 border-b border-gray-100">
        <h3 className="text-base font-bold text-gray-800 font-[family-name:var(--font-display)]">{zone.title}</h3>
        <p className="text-xs text-gray-400 mt-0.5">Цена за 1 сеанс</p>
      </div>

      <div className="relative">
      <ul ref={listRef} className="py-2 max-h-[380px] overflow-y-auto scrollbar-thin">
        {zone.items.filter(item => !item.genderOnly || item.genderOnly === gender).map((item: ServiceItem, idx: number, filteredItems: ServiceItem[]) => {
          const isSelected = selectedIds.has(item.id)
          const price = Math.round(item.price * priceMultiplier)
          const showGroup = item.group && (idx === 0 || filteredItems[idx - 1].group !== item.group)

          return (
            <li key={item.id} className="animate-fade-up" style={{ animationDelay: `${idx * 40}ms` }}>
              {showGroup && (
                <div className="px-5 pt-3 pb-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  {item.group}
                </div>
              )}
              <div
                onClick={() => handleToggle(zone.key, item)}
                className={`
                  flex items-center gap-2 px-4 py-3 cursor-pointer
                  transition-colors duration-300
                  ${isSelected ? 'bg-cyan-50' : 'hover:bg-cyan-50/50'}
                `}
              >
                {/* Checkbox */}
                <div className={`
                  w-[22px] h-[22px] rounded-md border-2 flex items-center justify-center flex-shrink-0
                  transition-all duration-300
                  ${isSelected ? 'bg-cyan-600 border-cyan-600' : 'border-gray-200'}
                `}>
                  <svg
                    width="12"
                    height="12"
                    fill="none"
                    stroke="white"
                    strokeWidth="2.5"
                    className={`transition-opacity duration-200 ${isSelected ? 'opacity-100 animate-check' : 'opacity-0 scale-0'}`}
                  >
                    <polyline points="2,6 5,9 10,3" />
                  </svg>
                </div>

                <span className="flex-1 min-w-0">
                  <span className="text-sm font-medium text-gray-800 block">
                    {item.title}
                    {COMPLEX_ITEM_IDS.has(item.id) && (
                      <span className="text-amber-400 text-[10px] ml-1 align-top">✦</span>
                    )}
                  </span>
                  {activeHint === item.id && COMPLEX_ITEM_IDS.has(item.id) ? (
                    <span key={`hint-${item.id}-${activeHint}`} className="text-[10px] font-semibold block leading-tight animate-hint-shine">Выгоднее в комплексе</span>
                  ) : (
                    item.hint && <span className="text-[10px] text-gray-400 block leading-tight">{item.hint}</span>
                  )}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-cyan-600 whitespace-nowrap">
                  {formatPrice(price)}
                </span>
              </div>
            </li>
          )
        })}
      </ul>

      {/* Индикатор «внизу ещё есть» */}
      <div
        className={`
          pointer-events-none absolute bottom-0 left-0 right-0 h-10
          bg-gradient-to-t from-white via-white/80 to-transparent
          flex items-end justify-center pb-1
          transition-opacity duration-300
          ${showScrollHint ? 'opacity-100' : 'opacity-0'}
        `}
        aria-hidden="true"
      >
        <svg
          width="14" height="14" viewBox="0 0 14 14" fill="none"
          className="text-gray-400 animate-scroll-hint"
        >
          <polyline points="3,5 7,9 11,5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      </div>
    </div>
  )
}
