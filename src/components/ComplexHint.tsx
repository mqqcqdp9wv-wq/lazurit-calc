'use client'

import { ZONES, COMPLEXES, ComplexOffer, formatPrice } from '@/data/services'

type ComplexHintProps = {
  selected: Record<string, Set<number>>
  priceMultiplier: number
  sessions: number
}

function getAllSelectedIds(selected: Record<string, Set<number>>): Set<number> {
  const all = new Set<number>()
  Object.values(selected).forEach(ids => ids.forEach(id => all.add(id)))
  return all
}

function getItemPrice(itemId: number): number {
  for (const zone of Object.values(ZONES)) {
    const item = zone.items.find(i => i.id === itemId)
    if (item) return item.price
  }
  return 0
}

function getItemTitle(itemId: number): string {
  for (const zone of Object.values(ZONES)) {
    const item = zone.items.find(i => i.id === itemId)
    if (item) return item.title
  }
  return ''
}

type QuestCard = {
  complex: ComplexOffer
  progress: number // 0..1
  completed: number
  total: number
  missingTitles: string[]
  saving: number
  isComplete: boolean
}

function buildQuests(selectedIds: Set<number>, priceMultiplier: number, sessions: number): QuestCard[] {
  const quests: QuestCard[] = []

  for (const complex of COMPLEXES) {
    const required = complex.requiredItemIds
    const has = required.filter(id => selectedIds.has(id))
    const missing = required.filter(id => !selectedIds.has(id))

    // Show quest if user has at least 1 zone selected from this complex
    if (has.length === 0) continue

    const separatePrice = required.reduce((sum, id) => sum + Math.round(getItemPrice(id) * priceMultiplier), 0)
    const complexPrice = Math.round(complex.price * priceMultiplier)
    const saving = (separatePrice - complexPrice) * sessions

    if (saving <= 0) continue

    quests.push({
      complex,
      progress: has.length / required.length,
      completed: has.length,
      total: required.length,
      missingTitles: missing.map(id => getItemTitle(id)),
      saving,
      isComplete: missing.length === 0,
    })
  }

  // Sort: complete first, then by progress desc, then by saving desc
  quests.sort((a, b) => {
    if (a.isComplete !== b.isComplete) return a.isComplete ? -1 : 1
    if (a.progress !== b.progress) return b.progress - a.progress
    return b.saving - a.saving
  })

  return quests.slice(0, 4)
}

export default function ComplexHint({ selected, priceMultiplier, sessions }: ComplexHintProps) {
  const selectedIds = getAllSelectedIds(selected)
  if (selectedIds.size === 0) return null

  const quests = buildQuests(selectedIds, priceMultiplier, sessions)
  if (quests.length === 0) return null

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Комплексы</h3>

      {quests.map(quest => {
        const progressPercent = Math.round(quest.progress * 100)

        return (
          <div
            key={quest.complex.id}
            className={`
              rounded-xl border-2 p-4 transition-all duration-500
              ${quest.isComplete
                ? 'border-emerald-400 bg-emerald-50 shadow-md shadow-emerald-100'
                : 'border-gray-200 bg-white'
              }
            `}
          >
            {/* Title + badge */}
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm font-bold ${quest.isComplete ? 'text-emerald-700' : 'text-gray-800'}`}>
                {quest.complex.title}
              </span>
              {quest.isComplete && (
                <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
                  Собран!
                </span>
              )}
            </div>

            {/* Progress bar */}
            <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
              <div
                className={`
                  absolute inset-y-0 left-0 rounded-full transition-all duration-700 ease-out
                  ${quest.isComplete
                    ? 'bg-emerald-500'
                    : 'bg-gray-300'
                  }
                `}
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Zone checklist */}
            <div className="space-y-1 mb-2">
              {quest.complex.requiredItemIds.map(id => {
                const has = selectedIds.has(id)
                return (
                  <div key={id} className="flex items-center gap-2">
                    <div className={`
                      w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300
                      ${has ? 'bg-emerald-500' : 'bg-gray-300'}
                    `}>
                      {has && (
                        <svg width="10" height="10" fill="none" stroke="white" strokeWidth="2.5">
                          <polyline points="1.5,5 4,7.5 8.5,2.5" />
                        </svg>
                      )}
                    </div>
                    <span className={`text-xs ${has ? 'text-gray-700' : 'text-gray-400'}`}>
                      {getItemTitle(id)}
                    </span>
                  </div>
                )
              })}
            </div>

            {/* Saving */}
            <div className={`
              text-xs font-semibold
              ${quest.isComplete ? 'text-emerald-600' : 'text-gray-400'}
            `}>
              Выгода: {formatPrice(quest.saving)}
              {sessions > 1 ? ` за ${sessions} сеансов` : ''}
            </div>

            {/* Missing hint */}
            {!quest.isComplete && quest.missingTitles.length <= 2 && (
              <p className="text-xs mt-1.5 text-gray-400">
                Добавьте: {quest.missingTitles.join(', ')}
              </p>
            )}
          </div>
        )
      })}
    </div>
  )
}
