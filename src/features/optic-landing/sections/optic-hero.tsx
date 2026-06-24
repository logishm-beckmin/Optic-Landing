'use client'

import {
  DARK_LIVE_DEMO,
  LIGHT_LIVE_DEMO,
  OpticLiveDemo,
} from '../live-demo/optic-live-demo'
import type { OpticTokens, OpticVariant } from '../theme/optic-tokens'

interface OpticHeroProps {
  readonly tokens: OpticTokens
  readonly variant: OpticVariant
}

export function OpticHero({ tokens: t, variant }: OpticHeroProps) {
  const liveTheme = variant === 'd' ? DARK_LIVE_DEMO : LIGHT_LIVE_DEMO

  return (
    <section
      id="demo"
      style={{
        borderBottom: `1px solid ${t.line}`,
        position: 'relative',
        overflow: 'hidden',
        background: t.bg,
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(${t.dotGrid} 1.5px, transparent 1.5px)`,
          backgroundSize: '24px 24px',
          maskImage: 'radial-gradient(ellipse at 50% 30%, rgba(0,0,0,0.5), transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 30%, rgba(0,0,0,0.5), transparent 70%)',
        }}
      />

      <div className="optic-hero-inner" style={{ maxWidth: 1320, margin: '0 auto', padding: '120px 56px 100px', position: 'relative' }}>
        <div
          className="optic-hero-copy"
          style={{
            maxWidth: 940,
            margin: '0 auto',
            textAlign: 'center',
            marginBottom: 56,
          }}
        >
          <div
            style={{
              display: 'inline-block',
              marginBottom: 32,
              fontSize: 12,
              fontFamily: 'ui-monospace, SF Mono, monospace',
              color: t.ink2,
              padding: '6px 14px',
              borderRadius: 999,
              background: t.surface,
              border: `1px solid ${t.line}`,
            }}
          >
            <span style={{ color: t.warm, marginRight: 8 }}>◆</span>
            물류 주선을 위한 운영 OS
          </div>

          <h1
            style={{
              fontSize: 'clamp(38px, 7vw, 96px)',
              fontWeight: 600,
              lineHeight: 1,
              letterSpacing: '-0.04em',
              margin: 0,
              marginBottom: 28,
              textWrap: 'balance',
              color: t.ink,
            }}
          >
            <span>오더에서</span>
            <span className="optic-desktop-space"> </span>
            <br className="optic-mobile-only" />
            <span>정산까지,</span>
            <br />
            <span
              style={{
                fontFamily: "'Inter', serif",
                fontStyle: 'italic',
                fontWeight: 400,
                color: t.ink2,
              }}
            >
              한 번의 흐름으로.
            </span>
          </h1>

          <p
            style={{
              fontSize: 19,
              lineHeight: 1.55,
              color: t.mute,
              margin: 0,
              marginBottom: 36,
              maxWidth: 580,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            화주의 요청서가 운송 오더로, 배차가 화물맨으로, 정산이 세금계산서로 — 끊김 없이 이어집니다.
          </p>

          <div style={{ display: 'inline-flex', gap: 12, alignItems: 'center' }}>
            <a
              href="#contact"
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: variant === 'd' ? t.bg : t.surface,
                background: t.ink,
                padding: '12px 22px',
                borderRadius: 999,
              }}
            >
              도입 문의하기
            </a>
            <a
              href="https://mm-broker-test.vercel.app/login"
              target="_blank"
              rel="noreferrer"
              style={{
                fontSize: 14,
                fontWeight: 500,
                color: t.ink,
                padding: '12px 18px',
              }}
            >
              서비스 로그인하기 ↗
            </a>
          </div>
        </div>

        <div style={{ position: 'relative' }}>
          <div
            className="optic-hero-annotation"
            style={{
              position: 'absolute',
              top: -22,
              left: 0,
              fontSize: 11,
              color: t.mute,
              fontFamily: 'ui-monospace, monospace',
              letterSpacing: 0.5,
            }}
          >
            <span style={{ color: t.warm, marginRight: 6 }}>↓</span>
            실제 운영 흐름 — 25초 시연
          </div>
          <div
            className="optic-hero-annotation"
            style={{
              position: 'absolute',
              top: -22,
              right: 0,
              fontSize: 11,
              color: t.mute,
              fontFamily: 'ui-monospace, monospace',
              letterSpacing: 0.5,
            }}
          >
            4단계 자동 재생
            <span style={{ color: t.warm, marginLeft: 6 }}>↓</span>
          </div>

          <div
            style={{
              overflowX: 'auto',
              overflowY: 'hidden',
              paddingBottom: 8,
              marginLeft: -8,
              marginRight: -8,
              paddingLeft: 8,
              paddingRight: 8,
            }}
          >
            <OpticLiveDemo theme={liveTheme} />
          </div>

          <div
            className="optic-live-badge"
            style={{
              position: 'absolute',
              bottom: -16,
              left: '50%',
              transform: 'translateX(-50%)',
              background: t.surface,
              border: `1px solid ${t.line}`,
              borderRadius: 999,
              padding: '8px 16px',
              fontSize: 12,
              color: t.ink2,
              fontFamily: 'ui-monospace, monospace',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: t.liveDot }} />
            라이브 — 오더 → 배차 → 정산 → 증빙
          </div>
        </div>
      </div>
    </section>
  )
}


