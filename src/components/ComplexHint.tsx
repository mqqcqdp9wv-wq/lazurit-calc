'use client'

import { ZONES, COMPLEXES, DISCOUNT, ComplexOffer, formatPrice } from '@/data/services'

type ComplexHintProps = {
  selected: Record<string, Set<number>>
  priceMultiplier: number
  sessions: number
  onAddItems?: (items: { zone: string; id: number }[]) => void
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

function getItemZone(itemId: number): string {
  for (const [key, zone] of Object.entries(ZONES)) {
    if (zone.items.some(i => i.id === itemId)) return key
  }
  return ''
}

type QuestCard = {
  complex: ComplexOffer
  progress: number // 0..1
  completed: number
  total: number
  missingIds: number[]
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
      missingIds: missing,
      missingTitles: missing.map(id => getItemTitle(id)),
      saving,
      isComplete: missing.length === 0,
    })
  }

  // Sort: complete first, then by saving desc, then by progress desc
  quests.sort((a, b) => {
    if (a.isComplete !== b.isComplete) return a.isComplete ? -1 : 1
    return b.saving - a.saving
  })

  // Among completed complexes, apply greedy algorithm:
  // keep only non-overlapping ones (same logic as Cart)
  const usedIds = new Set<number>()
  const filtered: QuestCard[] = []

  for (const q of quests) {
    if (q.isComplete) {
      // Check if any of this complex's items are already used by a better complex
      const overlaps = q.complex.requiredItemIds.some(id => usedIds.has(id))
      if (overlaps) continue
      q.complex.requiredItemIds.forEach(id => usedIds.add(id))
    }
    filtered.push(q)
  }

  // For incomplete quests, skip if all their required items are already
  // covered by applied complete complexes (no point suggesting them)
  const result = filtered.filter(q => {
    if (q.isComplete) return true
    const uncovered = q.complex.requiredItemIds.some(id => !usedIds.has(id))
    return uncovered
  })

  return result.slice(0, 4)
}

export default function ComplexHint({ selected, priceMultiplier, sessions, onAddItems }: ComplexHintProps) {
  const selectedIds = getAllSelectedIds(selected)
  if (selectedIds.size === 0) return null

  const quests = buildQuests(selectedIds, priceMultiplier, sessions)
  if (quests.length === 0) return null

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider font-[family-name:var(--font-display)]">Комплексы</h3>

      {quests.map((quest, index) => {
        const progressPercent = Math.round(quest.progress * 100)

        return (
          <div
            key={quest.complex.id}
            className={`
              animate-fade-up rounded-xl border-2 p-4 transition-all duration-500
              ${quest.isComplete
                ? 'border-emerald-400 bg-emerald-50'
                : 'border-gray-200 bg-white'
              }
            `}
            style={{ animationDelay: `${index * 80}ms` }}
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

            {quest.complex.id === 'vse-telo' && (
              <p className="text-[10px] text-gray-400 italic mb-1">
                Линия живота или любая зона на выбор: губа, подбородок, межбровка, бакенбарды
              </p>
            )}

            {/* Saving */}
            <div className={`
              text-xs font-semibold
              ${quest.isComplete ? 'text-emerald-600' : 'text-gray-400'}
            `}>
              Выгода: {formatPrice(quest.saving)}
              {sessions > 1 ? ` за ${sessions} сеансов` : ''}
            </div>

            {sessions >= DISCOUNT.minSessions && (
              <div className="text-[10px] text-emerald-500 mt-0.5">
                + скидка {DISCOUNT.percent}% уже включена в расчёт
              </div>
            )}

            {/* Add missing items button */}
            {!quest.isComplete && onAddItems && (
              <button
                onClick={() => {
                  const items = quest.missingIds.map(id => ({ zone: getItemZone(id), id }))
                  onAddItems(items)
                }}
                className="w-full mt-2 py-2 px-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                Добавить: {quest.missingTitles.join(', ')}
              </button>
            )}
          </div>
        )
      })}
    </div>
  )
}
