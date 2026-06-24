'use client'

import type { OpticTokens } from '../theme/optic-tokens'

interface OpticCtaProps {
  readonly tokens: OpticTokens
}

export function OpticCta({ tokens: t }: OpticCtaProps) {
  return (
    <section
      id="contact"
      style={{
        background: t.ctaBg,
        color: t.ctaInk,
        position: 'relative',
        overflow: 'hidden',
        borderTop: t.bg === '#f7f7f5' ? 'none' : `1px solid ${t.line}`,
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />
      <div
        style={{
          maxWidth: 1320,
          margin: '0 auto',
          padding: '140px 56px',
          position: 'relative',
        }}
      >
        <div style={{ maxWidth: 800 }}>
          <div
            style={{
              fontSize: 11,
              fontFamily: 'ui-monospace, monospace',
              color: t.warm,
              marginBottom: 20,
              letterSpacing: 1.5,
            }}
          >
            ◆ 시작하기
          </div>
          <h2
            style={{
              fontSize: 'clamp(48px, 7vw, 88px)',
              fontWeight: 600,
              lineHeight: 0.98,
              letterSpacing: '-0.04em',
              margin: 0,
              marginBottom: 28,
              color: t.ctaInk,
            }}
          >
            한 흐름을
            <br />
            <span
              style={{
                fontFamily: "'Inter', serif",
                fontStyle: 'italic',
                fontWeight: 400,
                color: t.ctaMute,
              }}
            >
              오늘 시작합니다.
            </span>
          </h2>
          <p
            style={{
              fontSize: 17,
              color: t.ctaMute,
              lineHeight: 1.55,
              margin: 0,
              marginBottom: 40,
              maxWidth: 540,
            }}
          >
            데모 → 데이터 마이그레이션 → 사용 시작까지 함께 안내합니다.
          </p>
          <div style={{ display: 'inline-flex', gap: 12 }}>
            <a
              href="#contact-form"
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: t.ctaBg,
                background: t.ctaInk,
                padding: '13px 22px',
                borderRadius: 999,
              }}
            >
              도입 문의하기 →
            </a>
            <a
              href="#demo"
              style={{
                fontSize: 15,
                fontWeight: 500,
                color: t.ctaInk,
                border: `1px solid rgba(255,255,255,0.2)`,
                padding: '13px 22px',
                borderRadius: 999,
              }}
            >
              데모 둘러보기 ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

