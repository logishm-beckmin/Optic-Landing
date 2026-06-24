export const REFERENCE_FILES = {
  light: '.references/design/landing/optic-option-c-live.html',
  dark: '.references/design/landing/optic-option-d-live.html',
} as const

export const LIVE_DEMO_PHASES = [
  { num: '01', label: 'AI 오더 추출', sub: '주문서 → 필드 자동', durationMs: 10000 },
  { num: '02', label: '화물맨 자동 연동', sub: '배차 → 운송', durationMs: 5000 },
  { num: '03', label: '그룹 정산', sub: '마감 오더 → 정산 묶음', durationMs: 5500 },
  { num: '04', label: '세금계산서 발행', sub: '정산 → 증빙', durationMs: 4500 },
] as const

export const REFERENCE_VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 1200, priority: 'strict visual parity' },
  { name: 'laptop', width: 1024, height: 1000, priority: 'section flow' },
  { name: 'tablet', width: 768, height: 1000, priority: 'overflow and collision check' },
  { name: 'mobile', width: 390, height: 900, priority: 'readability and no overlap' },
] as const
