'use client'

import Image from 'next/image'

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || ''

type ZoneCallout = {
  zone: string
  label: string
  // Точка на теле (% от изображения)
  dotTop: string
  dotLeft: string
  // Позиция подписи справа (% от верха)
  labelTop: string
}

const ZONE_CALLOUTS: ZoneCallout[] = [
  { zone: 'head',  label: 'Лицо', dotTop: '10.3%', dotLeft: '53.5%', labelTop: '10.3%' },
  { zone: 'body',  label: 'Тело', dotTop: '33.1%', dotLeft: '51.2%', labelTop: '33.1%' },
  { zone: 'hands', label: 'Руки', dotTop: '46.9%', dotLeft: '71.6%', labelTop: '46.9%' },
  { zone: 'legs',  label: 'Ноги', dotTop: '66.5%', dotLeft: '57.9%', labelTop: '66.5%' },
]

type Gender = 'female' | 'male'

type BodyMapProps = {
  gender: Gender
  activeZone: string | null
  selectedCounts: Record<string, number>
  onZoneClick: (zone: string) => void
  onGenderChange: (gender: Gender) => void
}

export default function BodyMap({ gender, activeZone, selectedCounts, onZoneClick, onGenderChange }: BodyMapProps) {

  return (
    <div className="bg-white rounded-2xl shadow-md relative overflow-hidden">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-cyan-600 to-cyan-500 z-20" />

      <div className="relative pt-4 pb-2">
        {/* Grid: image | labels */}
        <div className="relative grid grid-cols-[1fr_70px] items-start">
          {/* Image */}
          <div className="relative">
            <Image
              src={gender === 'male' ? `${BASE}/male.png` : `${BASE}/female.png`}
              alt="Зоны тела"
              width={1536}
              height={2752}
              className="w-full h-auto select-none"
              draggable={false}
              priority
            />

            {/* SVG overlay for dots and lines */}
            {(
            <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none">
              {ZONE_CALLOUTS.map(callout => {
                const isActive = activeZone === callout.zone
                const dotX = parseFloat(callout.dotLeft)
                const dotY = parseFloat(callout.dotTop)

                return (
                  <g key={callout.zone}>
                    {/* Line from dot to right edge */}
                    <line
                      x1={`${dotX}%`}
                      y1={`${dotY}%`}
                      x2="100%"
                      y2={`${dotY}%`}
                      stroke={isActive ? '#0891B2' : '#CBD5E1'}
                      strokeWidth={isActive ? 1.5 : 1}
                      strokeDasharray={isActive ? 'none' : '4 3'}
                      className="transition-all duration-300"
                    />
                    {/* Dot on body */}
                    <circle
                      cx={`${dotX}%`}
                      cy={`${dotY}%`}
                      r="3.5"
                      fill={isActive ? '#0891B2' : '#06B6D4'}
                      opacity={isActive ? 1 : 0.5}
                      className="transition-all duration-300"
                    />
                  </g>
                )
              })}
            </svg>
            )}
          </div>

          {/* Right labels column — all in one vertical line */}
          <div className="relative h-full">
            {ZONE_CALLOUTS.map(callout => {
              const isActive = activeZone === callout.zone
              const count = selectedCounts[callout.zone] ?? 0
              const hasSelection = count > 0

              return (
                <button
                  key={callout.zone}
                  onClick={() => onZoneClick(callout.zone)}
                  className={`
                    absolute left-0 flex items-center gap-1
                    px-2.5 py-1.5 rounded-lg
                    text-[12px] font-semibold whitespace-nowrap
                    transition-all duration-300 cursor-pointer
                    ${isActive
                      ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/20'
                      : hasSelection
                        ? 'bg-cyan-50 text-cyan-700 hover:bg-cyan-100'
                        : 'bg-gray-50 text-gray-600 hover:bg-cyan-50 hover:text-cyan-700'
                    }
                  `}
                  style={{ top: callout.labelTop, transform: 'translateY(-50%)' }}
                >
                  {callout.label}
                  {count > 0 && (
                    <span className={`w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center ${isActive ? 'bg-white text-cyan-600' : 'bg-cyan-600 text-white'}`}>
                      {count}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Gender toggle */}
      <div className="flex items-center justify-center gap-3 py-3 border-t border-gray-100">
        <span
          onClick={() => onGenderChange('female')}
          className={`text-xs font-medium cursor-pointer transition-colors ${
            gender === 'female' ? 'text-cyan-600 font-bold' : 'text-gray-500'
          }`}
        >
          Женский
        </span>
        <div
          onClick={() => onGenderChange(gender === 'female' ? 'male' : 'female')}
          className="w-11 h-6 bg-cyan-600 rounded-full relative cursor-pointer flex-shrink-0"
        >
          <div
            className={`w-5 h-5 bg-white rounded-full absolute top-0.5 shadow transition-all duration-300 ${
              gender === 'male' ? 'left-[22px]' : 'left-0.5'
            }`}
          />
        </div>
        <span
          onClick={() => onGenderChange('male')}
          className={`text-xs font-medium cursor-pointer transition-colors ${
            gender === 'male' ? 'text-cyan-600 font-bold' : 'text-gray-500'
          }`}
        >
          Мужской
        </span>
      </div>
    </div>
  )
}
