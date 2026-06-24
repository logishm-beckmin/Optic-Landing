'use client'

import type { OpticTokens } from '../theme/optic-tokens'

interface OpticFooterProps {
  readonly tokens: OpticTokens
}

const FOOTER_GROUPS = [
  { h: '제품', l: ['Broker', 'Shipper', 'Carrier', 'Ops', 'Billing'] },
  { h: '리소스', l: ['문서', 'API', '변경 이력', '고객 사례'] },
  { h: '회사', l: ['회사 소개', '채용', '이용약관', '개인정보처리방침'] },
] as const

export function OpticFooter({ tokens: t }: OpticFooterProps) {
  return (
    <footer style={{ background: t.bg }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '60px 56px 40px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr',
            gap: 40,
            marginBottom: 48,
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="9" stroke={t.ink} strokeWidth="2" />
                <circle cx="12" cy="12" r="3" fill={t.ink} />
              </svg>
              <span style={{ fontSize: 16, fontWeight: 700, letterSpacing: '-0.02em' }}>
                OPTIC
              </span>
            </div>
            <div
              style={{
                fontSize: 13,
                color: t.mute,
                lineHeight: 1.55,
                maxWidth: 280,
              }}
            >
              물류 주선을 위한 운영 OS.
            </div>
          </div>
          {FOOTER_GROUPS.map((g) => (
            <div key={g.h}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: t.ink,
                  marginBottom: 14,
                }}
              >
                {g.h}
              </div>
              {g.l.map((x) => (
                <div
                  key={x}
                  style={{ fontSize: 13, color: t.mute, marginBottom: 8 }}
                >
                  {x}
                </div>
              ))}
            </div>
          ))}
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

