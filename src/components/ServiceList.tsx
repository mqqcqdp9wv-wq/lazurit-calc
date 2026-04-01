'use client'

import { Zone, ServiceItem, formatPrice, COMPLEX_ITEM_IDS } from '@/data/services'

type ServiceListProps = {
  zone: Zone
  selectedIds: Set<number>
  priceMultiplier: number
  gender: 'female' | 'male'
  onToggle: (zoneKey: string, itemId: number) => void
}

export default function ServiceList({ zone, selectedIds, priceMultiplier, gender, onToggle }: ServiceListProps) {
  return (
    <div className="card overflow-hidden animate-in">
      <div className="px-5 pt-4 pb-3 border-b border-gray-100">
        <h3 className="text-base font-bold text-gray-800 font-[family-name:var(--font-display)]">{zone.title}</h3>
        <p className="text-xs text-gray-400 mt-0.5">Цена за 1 сеанс</p>
      </div>

      <ul className="py-2 max-h-[380px] overflow-y-auto scrollbar-thin">
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
                onClick={() => onToggle(zone.key, item.id)}
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
                      <span className="relative group/tip inline-block ml-1 align-top cursor-help">
                        <span className="text-amber-400 text-[10px]">✦</span>
                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 rounded bg-gray-800 text-white text-[10px] whitespace-nowrap opacity-0 group-hover/tip:opacity-100 transition-opacity pointer-events-none z-30">
                          Выгоднее в комплексе
                        </span>
                      </span>
                    )}
                  </span>
                  {item.hint && <span className="text-[10px] text-gray-400 block leading-tight">{item.hint}</span>}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-cyan-600 whitespace-nowrap">
                  {formatPrice(price)}
                </span>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
