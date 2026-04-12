'use client'

import Image from 'next/image'
import { FEMALE_ZONES, MALE_ZONES } from '@/data/bodyZones'

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
    <div className="card overflow-hidden">
      <div className="relative pt-4 pb-2">
        {/* Grid: image | labels */}
        <div className="relative grid grid-cols-[1fr_70px] items-start">
          {/* Image */}
          <div className="relative">
            <Image
              src={gender === 'male' ? `${BASE}/male.png` : `${BASE}/female.png`}
              alt="Зоны тела"
              width={446}
              height={800}
              className="w-full h-auto select-none"
              draggable={false}
              priority
            />

            {/* SVG overlay — clickable body zones + dots + lines */}
            <svg
              viewBox="0 0 1536 2752"
              preserveAspectRatio="xMidYMid meet"
              className="absolute inset-0 w-full h-full z-10"
            >
              {/* Clickable body zone polygons */}
              {(gender === 'female' ? FEMALE_ZONES : MALE_ZONES).map(z =>
                z.paths.map((d, i) => (
                  <path
                    key={`zone-${z.zone}-${i}`}
                    d={d}
                    fill="transparent"
                    stroke="none"
                    className="cursor-pointer"
                    style={{ pointerEvents: 'all' }}
                    onClick={() => onZoneClick(z.zone)}
                  />
                ))
              )}

              {/* Dots and lines */}
              {ZONE_CALLOUTS.map(callout => {
                const isActive = activeZone === callout.zone
                // Convert percentage to viewBox coordinates
                const dotX = parseFloat(callout.dotLeft) / 100 * 1536
                const dotY = parseFloat(callout.dotTop) / 100 * 2752

                return (
                  <g key={callout.zone}>
                    <line
                      x1={dotX}
                      y1={dotY}
                      x2={1536}
                      y2={dotY}
                      stroke={isActive ? '#D97757' : '#CBD5E1'}
                      strokeWidth={isActive ? 3 : 2}
                      strokeDasharray={isActive ? 'none' : '8 6'}
                      className="transition-all duration-300 pointer-events-none"
                    />
                    <circle
                      cx={dotX}
                      cy={dotY}
                      r={isActive ? 12 : 10}
                      fill={isActive ? '#D97757' : '#D97757'}
                      opacity={isActive ? 1 : 0.6}
                      className="transition-all duration-300 cursor-pointer"
                      onClick={() => onZoneClick(callout.zone)}
                    />
                  </g>
                )
              })}
            </svg>
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
                      ? 'bg-accent text-white shadow-md shadow-accent/20'
                      : hasSelection
                        ? 'bg-accent-light text-accent-dark hover:bg-accent/15'
                        : 'bg-gray-50 text-gray-600 hover:bg-accent-light hover:text-accent-dark'
                    }
                  `}
                  style={{ top: callout.labelTop, transform: 'translateY(-50%)' }}
                >
                  {callout.label}
                  {count > 0 && (
                    <span key={count} className={`w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center ${isActive ? 'bg-white text-accent' : 'bg-accent text-white'}`}>
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
      <div className="flex items-center justify-center gap-2 py-3 border-t border-gray-100">
        <span
          onClick={() => onGenderChange('female')}
          className={`text-xs font-medium cursor-pointer transition-colors whitespace-nowrap ${
            gender === 'female' ? 'text-accent font-bold' : 'text-gray-500'
          }`}
        >
          Женский
        </span>
        <div
          onClick={() => onGenderChange(gender === 'female' ? 'male' : 'female')}
          className="w-11 h-6 bg-accent rounded-full relative cursor-pointer flex-shrink-0"
        >
          <div
            className={`w-5 h-5 bg-white rounded-full absolute top-0.5 shadow transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
              gender === 'male' ? 'left-[22px]' : 'left-0.5'
            }`}
          />
        </div>
        <span
          onClick={() => onGenderChange('male')}
          className={`text-xs font-medium cursor-pointer transition-colors whitespace-nowrap ${
            gender === 'male' ? 'text-accent font-bold' : 'text-gray-500'
          }`}
        >
          Мужской
        </span>
      </div>
    </div>
  )
}
