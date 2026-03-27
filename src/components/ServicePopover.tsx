'use client'

import { Zone, ServiceItem, formatPrice } from '@/data/services'

type ServicePopoverProps = {
  zone: Zone
  selectedIds: Set<number>
  priceMultiplier: number
  onToggle: (zoneKey: string, itemId: number) => void
  onClose: () => void
}

export default function ServicePopover({ zone, selectedIds, priceMultiplier, onToggle, onClose }: ServicePopoverProps) {
  return (
    <div className="bg-white rounded-xl shadow-2xl border border-gray-100 w-[300px] overflow-hidden animate-in">
      {/* Header */}
      <div className="px-4 pt-3 pb-2 border-b border-gray-100 flex justify-between items-center">
        <h3 className="text-sm font-bold text-gray-800">{zone.title}</h3>
        <button
          onClick={onClose}
          className="w-6 h-6 flex items-center justify-center text-gray-400 rounded-full hover:bg-gray-100 hover:text-gray-600 transition-colors"
        >
          <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="2" y1="2" x2="10" y2="10" />
            <line x1="10" y1="2" x2="2" y2="10" />
          </svg>
        </button>
      </div>

      {/* Services list */}
      <ul className="py-1 max-h-[300px] overflow-y-auto scrollbar-thin">
        {zone.items.map((item: ServiceItem) => {
          const isSelected = selectedIds.has(item.id)
          const price = Math.round(item.price * priceMultiplier)

          return (
            <li
              key={item.id}
              onClick={() => onToggle(zone.key, item.id)}
              className={`
                flex items-center gap-2.5 px-4 py-2 cursor-pointer
                transition-colors duration-200
                ${isSelected ? 'bg-cyan-50' : 'hover:bg-gray-50'}
              `}
            >
              {/* Checkbox */}
              <div className={`
                w-[18px] h-[18px] rounded flex items-center justify-center flex-shrink-0
                border-2 transition-all duration-200
                ${isSelected ? 'bg-cyan-600 border-cyan-600' : 'border-gray-300'}
              `}>
                <svg
                  width="10"
                  height="10"
                  fill="none"
                  stroke="white"
                  strokeWidth="2.5"
                  className={`transition-all duration-200 ${isSelected ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
                >
                  <polyline points="1.5,5 4,7.5 8.5,2.5" />
                </svg>
              </div>

              <span className="flex-1 text-[13px] font-medium text-gray-700">{item.title}</span>
              <span className="text-[13px] font-semibold text-cyan-600 whitespace-nowrap">
                {formatPrice(price)}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
