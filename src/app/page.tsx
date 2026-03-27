'use client'

import { useState, useCallback } from 'react'
import { ZONES, MALE_MULTIPLIER, resolveZone } from '@/data/services'
import BodyMap from '@/components/BodyMap'
import ServiceList from '@/components/ServiceList'
import Cart from '@/components/Cart'
import ComplexHint from '@/components/ComplexHint'
import ContactModal from '@/components/ContactModal'

type Gender = 'female' | 'male'

export default function Calculator() {
  const [gender, setGender] = useState<Gender>('female')
  const [activeZone, setActiveZone] = useState<string | null>(null)
  const [selected, setSelected] = useState<Record<string, Set<number>>>({
    head: new Set(),
    hands: new Set(),
    body: new Set(),
    legs: new Set(),
  })
  const [sessions, setSessions] = useState(1)
  const [modalOpen, setModalOpen] = useState(false)

  const priceMultiplier = gender === 'male' ? MALE_MULTIPLIER : 1

  const selectedCounts: Record<string, number> = {}
  Object.entries(selected).forEach(([zone, ids]) => {
    selectedCounts[zone] = ids.size
  })

  const handleZoneClick = useCallback((rawZone: string) => {
    const zone = resolveZone(rawZone)
    setActiveZone(zone)
  }, [])

  const handleToggleService = useCallback((zoneKey: string, itemId: number) => {
    setSelected((prev) => {
      const next = { ...prev }
      const set = new Set(prev[zoneKey])
      if (set.has(itemId)) {
        set.delete(itemId)
      } else {
        set.add(itemId)
      }
      next[zoneKey] = set
      return next
    })
  }, [])

  const handleRemoveItem = useCallback((zone: string, id: number) => {
    setSelected((prev) => {
      const next = { ...prev }
      const set = new Set(prev[zone])
      set.delete(id)
      next[zone] = set
      return next
    })
  }, [])

  const handleClear = useCallback(() => {
    setSelected({
      head: new Set(),
      hands: new Set(),
      body: new Set(),
      legs: new Set(),
    })
    setActiveZone(null)
    setSessions(1)
  }, [])

  const hasAnySelected = Object.values(selected).some((s) => s.size > 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-5 py-6 pb-10">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-br from-gray-800 to-cyan-600 bg-clip-text text-transparent">
            Калькулятор лазерной эпиляции
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Выберите зону на теле и рассчитайте стоимость
          </p>
        </header>

        {/* Main grid — 3 columns on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr_280px] gap-5 items-start">
          {/* Left: Body diagram */}
          <BodyMap
            gender={gender}
            activeZone={activeZone}
            selectedCounts={selectedCounts}
            onZoneClick={handleZoneClick}
            onGenderChange={setGender}
          />

          {/* Center: Service list + Cart */}
          <div className="flex flex-col gap-5">
            {/* Empty state */}
            {!activeZone && !hasAnySelected && (
              <div className="bg-white rounded-2xl shadow-md p-12 text-center">
                <div className="w-14 h-14 bg-cyan-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" className="text-cyan-600">
                    <path d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122M5.828 12.172l-2.122 2.122" />
                  </svg>
                </div>
                <h3 className="text-base font-semibold mb-1.5">Выберите зону</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Нажмите на точку на теле,<br />чтобы увидеть доступные услуги
                </p>
              </div>
            )}

            {/* Service panel */}
            {activeZone && ZONES[activeZone] && (
              <ServiceList
                zone={ZONES[activeZone]}
                selectedIds={selected[activeZone]}
                priceMultiplier={priceMultiplier}
                onToggle={handleToggleService}
              />
            )}

            {/* Cart */}
            <Cart
              selected={selected}
              sessions={sessions}
              priceMultiplier={priceMultiplier}
              onRemoveItem={handleRemoveItem}
              onClear={handleClear}
              onSessionChange={setSessions}
              onSubmit={() => setModalOpen(true)}
            />
          </div>

          {/* Right: Quest cards (sticky) */}
          <div className="lg:sticky lg:top-5">
            <ComplexHint
              selected={selected}
              priceMultiplier={priceMultiplier}
              sessions={sessions}
            />
          </div>
        </div>
      </div>

      {/* Contact modal */}
      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  )
}
