'use client'

import type { OpticTokens } from '../theme/optic-tokens'

interface OpticProblemsProps {
  readonly tokens: OpticTokens
}

const PROBLEM_ROWS = [
  { before: '회사마다 다른 주문 양식 반복 입력', after: 'AI 오더 등록 — 10초 내외 자동 추출', tag: '오더' },
  { before: '배차 정보 중복 등록과 전송 누락', after: '화물맨 자동 연동 — 중복 입력 0', tag: '배차' },
  { before: '정산·세금계산서 수작업', after: '정산 자동화 — 흐름 안에서 정리', tag: '정산' },
  { before: '화주·주선사별 운영 기준 분산', after: '요청 양식·정산 기준 일원화', tag: '운영' },
  { before: '주소·경로 분산 검색', after: '주소·거리 계산 내장', tag: '주소' },
  { before: '정산 이후 증빙 상태 추적 누락', after: '세금계산서 상태까지 한 화면', tag: '증빙' },
] as const

export function OpticProblems({ tokens: t }: OpticProblemsProps) {
  // 라이트(C)는 진한 ink 라인, 다크(D)는 ink2 라인
  const tableRule = t.bg === '#f7f7f5' ? t.ink : t.ink2

  return (
    <section
      id="problems"
      style={{ background: t.bg, borderBottom: `1px solid ${t.line}` }}
    >
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '120px 56px 100px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 80,
            marginBottom: 64,
            alignItems: 'end',
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
              ◆ 현장의 문제
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
              오더 1건에
              <br />
              <span
                style={{
                  fontFamily: "'Inter', serif",
                  fontStyle: 'italic',
                  fontWeight: 400,
                  color: t.mute,
                }}
              >
                5번의 시스템 전환.
              </span>
            </h2>
          </div>
          <p
            style={{
              fontSize: 16,
              color: t.mute,
              lineHeight: 1.65,
              margin: 0,
              paddingBottom: 8,
            }}
          >
            평균 47건/일, 12개의 다른 양식, 3개의 외부 도구.
            <br />
            손으로 옮겨 적는 작업이 전체 시간의 60%를 차지합니다.
          </p>
        </div>

        {/* Editorial table */}
        <div
          style={{
            borderTop: `1px solid ${tableRule}`,
            borderBottom: `1px solid ${tableRule}`,
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '60px 80px 1fr 1fr',
              padding: '14px 0',
              borderBottom: `1px solid ${t.line}`,
              fontSize: 11,
              color: t.mute,
              fontFamily: 'ui-monospace, monospace',
              textTransform: 'uppercase',
              letterSpacing: 1,
            }}
          >
            <span>No.</span>
            <span>영역</span>
            <span>지금까지의 방식</span>
            <span style={{ color: t.ink2 }}>OPTIC 이후</span>
          </div>
          {PROBLEM_ROWS.map((r, i, arr) => (
            <div
              key={r.tag}
              style={{
                display: 'grid',
                gridTemplateColumns: '60px 80px 1fr 1fr',
                padding: '22px 0',
                alignItems: 'start',
                borderBottom: i < arr.length - 1 ? `1px solid ${t.line}` : 'none',
              }}
            >
              <span
                style={{
                  fontSize: 12,
                  color: t.mute2,
                  fontFamily: 'ui-monospace, monospace',
                  paddingTop: 3,
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span
                style={{
                  fontSize: 11,
                  color: t.warm,
                  fontFamily: 'ui-monospace, monospace',
                  paddingTop: 3,
                  letterSpacing: 0.5,
                }}
              >
                {r.tag}
              </span>
              <span
                style={{
                  fontSize: 15,
                  color: t.mute,
                  lineHeight: 1.5,
                  paddingRight: 24,
                  textDecoration: 'line-through',
                  textDecorationColor: t.mute2,
                }}
              >
                {r.before}
              </span>
              <span
                style={{
                  fontSize: 15,
                  color: t.ink,
                  lineHeight: 1.5,
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 10,
                }}
              >
                <span
                  style={{
                    color: t.warm,
                    fontFamily: 'ui-monospace, monospace',
                    fontSize: 11,
                    flexShrink: 0,
                  }}
                >
                  →
                </span>
                <span>{r.after}</span>
              </span>
            </div>
          ))}
        </div>

        {/* Bridge line */}
        <div
          style={{
            marginTop: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 16,
            fontSize: 12,
            color: t.mute,
            fontFamily: 'ui-monospace, monospace',
          }}
        >
          <span style={{ width: 80, height: 1, background: t.line }} />
          <span>OPTIC은 이 6가지를 하나의 흐름으로 다시 짭니다</span>
          <span style={{ width: 80, height: 1, background: t.line }} />
          <span style={{ color: t.warm }}>↓</span>
        </div>
      </div>
    </section>
  )
}


