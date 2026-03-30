export type ServiceItem = {
  id: number
  title: string
  price: number
  group?: string
  hint?: string
  /** 'male' = показывать только мужчинам, 'female' = только женщинам, undefined = всем */
  genderOnly?: 'male' | 'female'
}

export type Zone = {
  key: string
  title: string
  items: ServiceItem[]
}

export type ComplexOffer = {
  id: string
  title: string
  /** ID зон, которые должны быть выбраны */
  requiredItemIds: number[]
  /** Цена комплекса (1 сеанс) */
  price: number
  /** Цена абонемента (5 сеансов) */
  price5: number
}

export const ZONES: Record<string, Zone> = {
  head: {
    key: 'head',
    title: 'Лицо',
    items: [
      { id: 1, title: 'Верхняя губа', price: 1265 },
      { id: 2, title: 'Подбородок', price: 1265 },
      { id: 3, title: 'Бакенбарды', price: 1265 },
      { id: 26, title: 'Межбровное пространство', price: 1265 },
      { id: 4, title: 'Лицо полностью', price: 3200, hint: 'Выгодно от 3 зон' },
    ],
  },
  body: {
    key: 'body',
    title: 'Тело',
    items: [
      { id: 5, title: 'Подмышки', price: 1495, group: 'Торс' },
      { id: 6, title: 'Ареолы', price: 1265, group: 'Торс' },
      { id: 7, title: 'Межгрудное пространство', price: 1495, group: 'Торс', genderOnly: 'male' },
      { id: 8, title: 'Грудная клетка полностью', price: 2250, group: 'Торс', genderOnly: 'male' },
      { id: 9, title: 'Линия живота', price: 1265, group: 'Торс' },
      { id: 10, title: 'Живот полностью', price: 2250, group: 'Торс' },
      { id: 11, title: 'Поясница', price: 2550, group: 'Спина' },
      { id: 12, title: 'Лопатки', price: 2550, group: 'Спина' },
      { id: 13, title: 'Спина полностью', price: 3800, group: 'Спина' },
      { id: 14, title: 'Классическое бикини', price: 2550, group: 'Интимные зоны', hint: 'По линии белья' },
      { id: 15, title: 'Тотальное бикини', price: 4350, group: 'Интимные зоны', hint: 'Включая межъягодичную зону' },
      { id: 16, title: 'Межъягодичная зона', price: 1495, group: 'Интимные зоны' },
      { id: 17, title: 'Ягодицы', price: 3795, group: 'Интимные зоны' },
    ],
  },
  hands: {
    key: 'hands',
    title: 'Руки',
    items: [
      { id: 18, title: 'Пальцы рук', price: 1265 },
      { id: 19, title: 'Предплечье', price: 3250 },
      { id: 20, title: 'Плечо', price: 3200 },
      { id: 21, title: 'Руки полностью', price: 4300, hint: 'Предплечье + плечо' },
    ],
  },
  legs: {
    key: 'legs',
    title: 'Ноги',
    items: [
      { id: 22, title: 'Голени', price: 3795 },
      { id: 23, title: 'Бёдра', price: 4025 },
      { id: 24, title: 'Ноги полностью', price: 6325, hint: 'Голени + бёдра' },
      { id: 25, title: 'Пальцы ног', price: 1265 },
    ],
  },
}

// Комплексы — система предлагает, если выбраны нужные зоны
export const COMPLEXES: ComplexOffer[] = [
  {
    id: 'goleni-podmyshki',
    title: 'Голени + подмышки',
    requiredItemIds: [22, 5], // Голени + Подмышки
    price: 4700,
    price5: 11750,
  },
  {
    id: 'totalnoe-podmyshki',
    title: 'Тотальное бикини + подмышки',
    requiredItemIds: [15, 5], // Тотальное бикини + Подмышки
    price: 5390,
    price5: 13475,
  },
  {
    id: 'goleni-bikini-podmyshki',
    title: 'Голени + глубокое бикини + подмышки',
    requiredItemIds: [22, 15, 5], // Голени + Тотальное бикини + Подмышки
    price: 8850,
    price5: 22125,
  },
  {
    id: 'ruki-podmyshki',
    title: 'Руки полностью + подмышки',
    requiredItemIds: [21, 5], // Руки полностью + Подмышки
    price: 13475,
    price5: 13475,
  },
  {
    id: 'totalnoe-nogi',
    title: 'Тотальное бикини + ноги полностью',
    requiredItemIds: [15, 24], // Тотальное бикини + Ноги полностью
    price: 9990,
    price5: 24975,
  },
  {
    id: 'nogi-bikini-podmyshki',
    title: 'Ноги + тотальное бикини + подмышки',
    requiredItemIds: [24, 15, 5], // Ноги полностью + Тотальное бикини + Подмышки
    price: 11490,
    price5: 28725,
  },
  {
    id: 'vse-telo',
    title: 'Всё тело',
    requiredItemIds: [21, 5, 9, 15, 24], // Руки + Подмышки + Линия живота + Тотальное бикини + Ноги
    price: 14950,
    price5: 37375,
  },
]

// ID позиций, входящих хотя бы в один комплекс
export const COMPLEX_ITEM_IDS: Set<number> = new Set(
  COMPLEXES.flatMap(c => c.requiredItemIds)
)

// Маппинг "полная зона" → подзоны, которые в неё входят
export const PARENT_CHILD_MAP: Record<number, number[]> = {
  4: [1, 2, 3, 26],    // Лицо полностью → Верхняя губа, Подбородок, Бакенбарды, Межбровное
  10: [9],              // Живот полностью → Линия живота
  13: [11, 12],         // Спина полностью → Поясница, Лопатки
  15: [14, 16],         // Тотальное бикини → Классическое бикини, Межъягодичная зона
  21: [19, 20],         // Руки полностью → Предплечье, Плечо
  24: [22, 23],         // Ноги полностью → Голени, Бёдра
}

// Обратный маппинг: подзона → родительские "полные" зоны
export const CHILD_PARENT_MAP: Record<number, number[]> = {}
for (const [parentId, childIds] of Object.entries(PARENT_CHILD_MAP)) {
  for (const childId of childIds) {
    if (!CHILD_PARENT_MAP[childId]) CHILD_PARENT_MAP[childId] = []
    CHILD_PARENT_MAP[childId].push(Number(parentId))
  }
}

// Маппинг зон на теле (правые точки — алиасы)
export const ZONE_ALIAS: Record<string, string> = {
  'hands-r': 'hands',
  'legs-r': 'legs',
}

export function resolveZone(zone: string): string {
  return ZONE_ALIAS[zone] ?? zone
}

// Скидочная механика
export const DISCOUNT = {
  percent: 50,
  minSessions: 5,
  bonusText: 'При покупке онлайн от 5 сеансов — +1 сеанс в подарок',
}

// Мужской коэффициент (прайс +30%)
export const MALE_MULTIPLIER = 1.3

// Форматирование цены
export function formatPrice(n: number): string {
  return Math.round(n).toLocaleString('ru-RU') + ' ₽'
}
