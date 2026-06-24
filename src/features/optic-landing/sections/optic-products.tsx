'use client'

import { Fragment } from 'react'
import type { OpticTokens } from '../theme/optic-tokens'

interface OpticProductsProps {
  readonly tokens: OpticTokens
}

const PRODUCTS = [
  { tag: '01', name: 'Broker', target: '주선사' },
  { tag: '02', name: 'Shipper', target: '화주' },
  { tag: '03', name: 'Carrier', target: '운송사 / 차주' },
  { tag: '04', name: 'Ops', target: '운영 / 관제팀' },
] as const

const MATRIX_ROWS = [
  { row: '오더 접수', v: ['✓', '✓', '—', '—'] },
  { row: '배차', v: ['✓', '—', '수락', '관리'] },
  { row: '화물맨 연동', v: ['✓', '—', '—', '—'] },
  { row: '정산', v: ['✓', '—', '—', '관리'] },
  { row: '현황 조회', v: ['✓', '✓', '—', '✓'] },
] as const

export function OpticProducts({ tokens: t }: OpticProductsProps) {
  // 라이트(C)는 진한 ink, 다크(D)는 line2
  const tableRule = t.bg === '#f7f7f5' ? t.ink : t.line2

  return (
    <section
      id="products"
      style={{ background: t.surface, borderBottom: `1px solid ${t.line}` }}
    >
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '120px 56px' }}>
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
              ◆ 제품군
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
              역할별 도구,
              <br />
              같은 데이터.
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
            화주, 주선사, 운송사 — 각자 보는 화면은 다르지만,
            <br />그 아래의 운영 데이터는 하나입니다.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '240px 1fr 1fr 1fr 1fr',
            borderTop: `1px solid ${tableRule}`,
            borderBottom: `1px solid ${tableRule}`,
          }}
        >
          <div
            style={{
              padding: '24px 0',
              fontSize: 12,
              color: t.mute,
              fontFamily: 'ui-monospace, monospace',
              borderBottom: `1px solid ${t.line}`,
            }}
          >
            제품
          </div>
          {PRODUCTS.map((p) => (
            <div
              key={p.tag}
              style={{
                padding: '24px 16px',
                fontSize: 14,
                fontWeight: 600,
                color: t.ink,
                borderLeft: `1px solid ${t.line}`,
                borderBottom: `1px solid ${t.line}`,
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
              }}
            >
              OPTIC {p.name}
              <span style={{ fontSize: 11, color: t.mute, fontWeight: 400 }}>
                {p.target}
              </span>
            </div>
          ))}

          {MATRIX_ROWS.map((r, i) => {
            const isLast = i === MATRIX_ROWS.length - 1
            return (
              <Fragment key={r.row}>
                <div
                  style={{
                    padding: '20px 0',
                    fontSize: 14,
                    color: t.ink2,
                    borderBottom: !isLast ? `1px solid ${t.line}` : 'none',
                  }}
                >
                  {r.row}
                </div>
                {r.v.map((v, j) => (
                  <div
                    key={j}
                    style={{
                      padding: '20px 16px',
                      fontSize: 14,
                      color: v === '✓' ? t.green : v === '—' ? t.mute2 : t.ink,
                      fontFamily:
                        v === '✓' || v === '—'
                          ? 'ui-monospace, monospace'
                          : 'inherit',
                      borderLeft: `1px solid ${t.line}`,
                      borderBottom: !isLast ? `1px solid ${t.line}` : 'none',
                    }}
                  >
                    {v}
                  </div>
                ))}
              </Fragment>
            )
          })}
        </div>

        <div
          style={{
            marginTop: 32,
            fontSize: 12,
            color: t.mute,
            fontFamily: 'ui-monospace, monospace',
          }}
        >
          * Ops, Billing은 2026 Q3 출시 예정.
        </div>
      </div>
    </section>
  )
}


