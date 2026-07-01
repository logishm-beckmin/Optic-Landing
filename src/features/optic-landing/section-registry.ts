export const OPTIC_SECTION_REGISTRY = [
  { id: 'nav', label: 'Navigation', source: 'sections/optic-nav.tsx' },
  { id: 'demo', label: 'Hero with live demo', source: 'sections/optic-hero.tsx' },
  { id: 'problems', label: '현장의 문제', source: 'sections/optic-problems.tsx' },
  { id: 'flow', label: '운영 흐름', source: 'sections/optic-flow.tsx' },
  { id: 'features', label: '핵심 기능', source: 'sections/optic-features.tsx' },
  { id: 'products', label: '제품군', source: 'sections/optic-products.tsx' },
  { id: 'metrics', label: '측정된 결과', source: 'sections/optic-metrics.tsx' },
  { id: 'contact', label: '시작하기', source: 'sections/optic-cta.tsx' },
  { id: 'footer', label: 'Footer', source: 'sections/optic-footer.tsx' },
] as const

export type OpticSectionId = (typeof OPTIC_SECTION_REGISTRY)[number]['id']

