export interface OpticTokens {
  bg: string
  surface: string
  surface2: string
  ink: string
  ink2: string
  mute: string
  mute2: string
  line: string
  line2: string
  accent: string
  blue: string
  warm: string
  green: string
  dotGrid: string
  ctaBg: string
  ctaInk: string
  ctaMute: string
  pipeStops: { from: string; mid: string; to: string; alpha: number }
  liveDot: string
}

export const OPTIC_C: OpticTokens = {
  bg: '#f7f7f5',
  surface: '#ffffff',
  surface2: '#fafaf9',
  ink: '#0a0a0a',
  ink2: '#1c1917',
  mute: '#78716c',
  mute2: '#a8a29e',
  line: '#e7e5e4',
  line2: '#f5f4f2',
  accent: '#7c3aed',
  blue: '#2563eb',
  warm: '#ea580c',
  green: '#059669',
  dotGrid: '#f5f4f2',
  ctaBg: '#0a0a0a',
  ctaInk: '#ffffff',
  ctaMute: '#a8a29e',
  pipeStops: { from: '#7c3aed', mid: '#2563eb', to: '#10b981', alpha: 0.2 },
  liveDot: '#10b981',
}

export const OPTIC_D: OpticTokens = {
  bg: '#0a0a0c',
  surface: '#0f0f10',
  surface2: '#15151a',
  ink: '#fafafa',
  ink2: '#d4d4d8',
  mute: '#a1a1aa',
  mute2: '#52525b',
  line: '#1f1f23',
  line2: '#27272a',
  accent: '#a78bfa',
  blue: '#60a5fa',
  warm: '#fb923c',
  green: '#34d399',
  dotGrid: '#27272a',
  ctaBg: '#050507',
  ctaInk: '#fafafa',
  ctaMute: '#52525b',
  pipeStops: { from: '#a78bfa', mid: '#60a5fa', to: '#34d399', alpha: 0.4 },
  liveDot: '#34d399',
}

export type OpticVariant = 'c' | 'd'

export function tokensFor(variant: OpticVariant): OpticTokens {
  return variant === 'd' ? OPTIC_D : OPTIC_C
}

