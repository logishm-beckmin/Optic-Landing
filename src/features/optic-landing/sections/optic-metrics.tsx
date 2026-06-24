'use client'

import type { OpticTokens } from '../theme/optic-tokens'

interface OpticMetricsProps {
  readonly tokens: OpticTokens
}

const METRICS = [
  { v: '−72%', l: '오더 등록 시간' },
  { v: '−100%', l: '중복 입력' },
  { v: '−4h', l: '월 마감 단축' },
  { v: '+96.4%', l: '추출 정확도' },
] as const

export function OpticMetrics({ tokens: t }: OpticMetricsProps) {
  return (
    <section
      id="metrics"
      style={{ background: t.bg, borderBottom: `1px solid ${t.line}` }}
    >
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '100px 56px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 80,
            alignItems: 'center',
          }}
        >
          <div>
            <div
              style={{
                fontSize: 11,
                fontFamily: 'ui-monospace, monospace',
                color: t.warm,
                marginBottom: 16,
                letterSpacing: 1.5,
              }}
            >
              ◆ 현재 운영 기준
            </div>
            <h2
              style={{
                fontSize: 'clamp(34px, 4.8vw, 44px)',
                fontWeight: 600,
                lineHeight: 1.1,
                letterSpacing: '-0.025em',
                margin: 0,
                marginBottom: 24,
                color: t.ink,
              }}
            >
              숫자가 먼저 답합니다.
            </h2>
            <p style={{ fontSize: 15, color: t.mute, lineHeight: 1.65, margin: 0 }}>
              현재 운영 흐름을 기준으로 확인 중인 개선 지표입니다.
            </p>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 1,
              background: t.line,
              border: `1px solid ${t.line}`,
            }}
          >
            {METRICS.map((s) => (
              <div
                key={s.l}
                style={{ padding: '32px 28px', background: t.surface }}
              >
                <div
                  style={{
                    fontSize: 'clamp(34px, 4.8vw, 44px)',
                    fontWeight: 700,
                    letterSpacing: '-0.025em',
                    color: t.ink,
                    fontFamily: 'ui-monospace, monospace',
                  }}
                >
                  {s.v}
                </div>
                <div style={{ fontSize: 13, color: t.mute, marginTop: 8 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}


