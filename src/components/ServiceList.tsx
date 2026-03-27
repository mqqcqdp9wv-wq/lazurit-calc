'use client'

import { Zone, ServiceItem, formatPrice } from '@/data/services'

type ServiceListProps = {
  zone: Zone
  selectedIds: Set<number>
  priceMultiplier: number
  onToggle: (zoneKey: string, itemId: number) => void
}

export default function ServiceList({ zone, selectedIds, priceMultiplier, onToggle }: ServiceListProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden animate-in">
      <div className="px-5 pt-4 pb-3 border-b border-gray-100">
        <h3 className="text-base font-bold text-gray-800">{zone.title}</h3>
        <p className="text-xs text-gray-400 mt-0.5">Выберите нужные услуги</p>
      </div>

      <ul className="py-2 max-h-[380px] overflow-y-auto scrollbar-thin">
        {zone.items.map((item: ServiceItem) => {
          const isSelected = selectedIds.has(item.id)
          const price = Math.round(item.price * priceMultiplier)

          return (
            <li
              key={item.id}
              onClick={() => onToggle(zone.key, item.id)}
              className={`
                flex items-center gap-3 px-5 py-3 cursor-pointer
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
                  className={`transition-all duration-300 ${isSelected ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
                >
                  <polyline points="2,6 5,9 10,3" />
                </svg>
              </div>

              <span className="flex-1 text-sm font-medium text-gray-800">{item.title}</span>
              <span className="text-sm font-semibold text-cyan-600 whitespace-nowrap">
                {formatPrice(price)}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
