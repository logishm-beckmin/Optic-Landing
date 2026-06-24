'use client'

import type { OpticTokens } from '../theme/optic-tokens'

interface OpticFlowProps {
  readonly tokens: OpticTokens
}

const FLOW_STAGES = [
  { x: 100, label: '오더 접수', sub: '주문서·이메일', colorKey: 'accent' as const },
  { x: 340, label: 'AI 추출', sub: '5개 필드', colorKey: 'accent' as const },
  { x: 580, label: '배차', sub: '차주 매칭', colorKey: 'blue' as const },
  { x: 820, label: '운송', sub: '화물맨 연동', colorKey: 'blue' as const },
  { x: 1100, label: '정산·증빙', sub: '세금계산서', colorKey: 'green' as const },
] as const

const FLOW_DETAILS = [
  { h: '오더 접수', b: '주문서 텍스트, 엑셀, 이메일을 그대로.' },
  { h: 'AI 추출', b: '회사별 양식 학습. 5개 필드 자동 정리.' },
  { h: '배차', b: '차주 매칭과 운송사 정보 통합.' },
  { h: '운송', b: '화물맨에 정보 자동 전송. 중복 입력 0.' },
  { h: '정산·증빙', b: '세금계산서 발행 상태까지 한 흐름.' },
] as const

export function OpticFlow({ tokens: t }: OpticFlowProps) {
  return (
    <section
      id="flow"
      style={{ background: t.surface, borderBottom: `1px solid ${t.line}` }}
    >
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '120px 56px' }}>
        <div
          style={{
            textAlign: 'center',
            marginBottom: 80,
            maxWidth: 720,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontFamily: 'ui-monospace, monospace',
              color: t.warm,
              marginBottom: 16,
              letterSpacing: 1.5,
            }}
          >
            ◆ 운영 흐름
          </div>
          <h2
            style={{
              fontSize: 'clamp(38px, 5.6vw, 56px)',
              fontWeight: 600,
              lineHeight: 1.04,
              letterSpacing: '-0.03em',
              margin: 0,
              color: t.ink,
            }}
          >
            데이터가 끊기지 않습니다.
          </h2>
          <p style={{ fontSize: 17, color: t.mute, marginTop: 20, lineHeight: 1.6 }}>
            오더 한 번 등록하면, 배차·정산·증빙까지 같은 데이터로 이어집니다.
          </p>
        </div>

        <div style={{ position: 'relative', padding: '0 0 60px 0' }}>
          <svg
            width="100%"
            height="280"
            viewBox="0 0 1208 280"
            style={{ overflow: 'visible' }}
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="optic-pipe" x1="0" x2="1">
                <stop offset="0" stopColor={t.pipeStops.from} stopOpacity={t.pipeStops.alpha * 0.75} />
                <stop offset="0.5" stopColor={t.pipeStops.mid} stopOpacity={t.pipeStops.alpha} />
                <stop offset="1" stopColor={t.pipeStops.to} stopOpacity={t.pipeStops.alpha} />
              </linearGradient>
            </defs>
            <rect
              x="40"
              y="120"
              width="1128"
              height="40"
              rx="20"
              fill="url(#optic-pipe)"
              stroke={t.line}
              strokeWidth="1"
            />

            {FLOW_STAGES.map((n, i) => {
              const color = t[n.colorKey]
              return (
                <g key={n.label}>
                  <circle cx={n.x} cy="140" r="16" fill={t.surface} stroke={color} strokeWidth="2" />
                  <circle cx={n.x} cy="140" r="6" fill={color} />
                  <text
                    x={n.x}
                    y="80"
                    textAnchor="middle"
                    fontSize="14"
                    fontWeight="600"
                    fill={t.ink}
                    fontFamily="'Pretendard Variable', sans-serif"
                  >
                    {n.label}
                  </text>
                  <text
                    x={n.x}
                    y="100"
                    textAnchor="middle"
                    fontSize="11"
                    fill={t.mute}
                    fontFamily="ui-monospace, monospace"
                  >
                    {n.sub}
                  </text>
                  <text
                    x={n.x}
                    y="200"
                    textAnchor="middle"
                    fontSize="11"
                    fill={t.mute2}
                    fontFamily="ui-monospace, monospace"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </text>
                </g>
              )
            })}

            <g>
              <line x1="220" y1="220" x2="220" y2="240" stroke={t.mute2} strokeWidth="1" strokeDasharray="2 2" />
              <text x="220" y="260" textAnchor="middle" fontSize="11" fill={t.warm} fontFamily="ui-monospace, monospace">
                10초 내외
              </text>
            </g>
            <g>
              <line x1="700" y1="220" x2="700" y2="240" stroke={t.mute2} strokeWidth="1" strokeDasharray="2 2" />
              <text x="700" y="260" textAnchor="middle" fontSize="11" fill={t.warm} fontFamily="ui-monospace, monospace">
                자동 전송
              </text>
            </g>
          </svg>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: 0,
            borderTop: `1px solid ${t.line}`,
          }}
        >
          {FLOW_DETAILS.map((s, i) => (
            <div
              key={s.h}
              style={{
                padding: '32px 20px 0',
                borderRight: i < 4 ? `1px solid ${t.line}` : 'none',
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 600, color: t.ink, marginBottom: 6 }}>
                {s.h}
              </div>
              <div style={{ fontSize: 12, color: t.mute, lineHeight: 1.55 }}>{s.b}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


