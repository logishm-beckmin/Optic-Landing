'use client'

import type { OpticTokens } from '../theme/optic-tokens'

interface OpticFooterProps {
  readonly tokens: OpticTokens
}

export function OpticFooter({ tokens: t }: OpticFooterProps) {
  return (
    <footer style={{ background: t.bg }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '60px 56px 40px' }}>
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="9" stroke={t.ink} strokeWidth="2" />
              <circle cx="12" cy="12" r="3" fill={t.ink} />
            </svg>
            <span style={{ fontSize: 16, fontWeight: 700, letterSpacing: '-0.02em' }}>
              OPTIC
            </span>
          </div>
          <div style={{ fontSize: 13, color: t.mute, lineHeight: 1.55, maxWidth: 280 }}>
            물류 주선을 위한 운영 OS.
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 24,
            borderTop: `1px solid ${t.line}`,
            fontSize: 12,
            color: t.mute,
          }}
        >
          <span>Powered by OPTICS</span>
          <span>© 2026 OPTIC. All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}
