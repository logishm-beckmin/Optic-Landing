'use client'

import type { OpticTokens } from '../theme/optic-tokens'

interface OpticNavProps {
  readonly tokens: OpticTokens
}

const NAV_LINKS = [
  { label: '기능', anchor: 'features' },
  { label: '제품', anchor: 'products' },
  { label: '운영 흐름', anchor: 'flow' },
  { label: '도입 성과', anchor: 'metrics' },
] as const

export function OpticNav({ tokens: t }: OpticNavProps) {
  const navBg =
    t.bg === '#f7f7f5'
      ? 'rgba(247,247,245,0.85)'
      : 'rgba(10,10,12,0.7)'

  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: navBg,
        backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${t.line}`,
      }}
    >
      <div
        className="optic-nav-inner"
        style={{
          maxWidth: 1320,
          margin: '0 auto',
          padding: '0 56px',
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="9" stroke={t.ink} strokeWidth="2" />
            <circle cx="12" cy="12" r="3" fill={t.ink} />
          </svg>
          <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: '-0.02em' }}>
            OPTIC
          </span>
        </div>
        <nav style={{ display: 'flex', gap: 32 }}>
          {NAV_LINKS.map(({ label, anchor }) => (
            <a
              key={anchor}
              href={`#${anchor}`}
              style={{ fontSize: 13, color: t.ink2, fontWeight: 500 }}
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="optic-nav-actions" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <a href="#login" style={{ fontSize: 13, color: t.mute, fontWeight: 500 }}>
            로그인
          </a>
          <a
            href="#contact"
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: t.surface,
              background: t.ink,
              padding: '8px 16px',
              borderRadius: 999,
            }}
          >
            도입 문의
          </a>
        </div>
      </div>
    </div>
  )
}

