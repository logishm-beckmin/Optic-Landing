'use client'

import { Fragment, type ReactNode } from 'react'
import type { OpticTokens } from '../theme/optic-tokens'

interface OpticFeaturesProps {
  readonly tokens: OpticTokens
}

export function OpticFeatures({ tokens: t }: OpticFeaturesProps) {
  return (
    <section
      id="features"
      style={{ borderBottom: `1px solid ${t.line}`, background: t.bg }}
    >
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '120px 56px' }}>
        <div style={{ marginBottom: 80, maxWidth: 720 }}>
          <div
            style={{
              fontSize: 11,
              fontFamily: 'ui-monospace, monospace',
              color: t.warm,
              marginBottom: 16,
              letterSpacing: 1.5,
            }}
          >
            ◆ 핵심 기능
          </div>
          <h2
            style={{
              fontSize: 'clamp(38px, 5.6vw, 56px)',
              fontWeight: 600,
              lineHeight: 1.02,
              letterSpacing: '-0.03em',
              margin: 0,
              color: t.ink,
            }}
          >
            반복 작업을
            <br />
            제거하는 자동화.
          </h2>
        </div>

        <Pair
          tokens={t}
          num="01"
          title="AI 오더 등록"
          body="주문서를 붙여넣으면 출발지·도착지·차종·운임·일정 5개 필드가 자동으로 채워집니다. 회사마다 다른 양식과 표기까지 학습합니다."
          stats={[
            { v: '10초 내외', l: '추출 시간' },
            { v: '96.4%', l: '정확도' },
            { v: '32+', l: '학습 양식' },
          ]}
          illustration={<IllustrationAI tokens={t} />}
        />

        <div style={{ height: 1, background: t.line, margin: '80px 0' }} />

        <Pair
          tokens={t}
          reverse
          num="02"
          title="화물맨 자동 연동"
          body="배차가 확정되면 운송 정보가 화물맨에 자동으로 전송됩니다. 같은 정보를 두 번 입력하지 않습니다."
          stats={[
            { v: '0건', l: '중복 입력' },
            { v: '실시간', l: '동기화' },
          ]}
          illustration={<IllustrationFlow tokens={t} />}
        />

        <div style={{ height: 1, background: t.line, margin: '80px 0' }} />

        <Pair
          tokens={t}
          num="03"
          title="정산·세금계산서"
          body="화주별 청구 기준과 주선사별 매출·매입 기준이 운송 흐름 안에서 정리됩니다. 정산 이후 증빙 발행 상태까지 같은 화면에서."
          stats={[
            { v: '−4시간', l: '월 마감' },
            { v: '1화면', l: '통합 관리' },
          ]}
          illustration={<IllustrationLedger tokens={t} />}
        />
      </div>
    </section>
  )
}

interface PairProps {
  readonly tokens: OpticTokens
  readonly num: string
  readonly title: string
  readonly body: string
  readonly stats: ReadonlyArray<{ v: string; l: string }>
  readonly illustration: ReactNode
  readonly reverse?: boolean
}

function Pair({ tokens: t, num, title, body, stats, illustration, reverse }: PairProps) {
  // 라이트(C)는 ink 라인, 다크(D)는 line2
  const statRule = t.bg === '#f7f7f5' ? t.ink : t.line2

  return (
    <div
      className="optic-feature-pair"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1.1fr',
        gap: 80,
        alignItems: 'center',
        direction: reverse ? 'rtl' : 'ltr',
      }}
    >
      <div style={{ direction: 'ltr' }}>
        <div
          style={{
            fontSize: 11,
            fontFamily: 'ui-monospace, monospace',
            color: t.warm,
            marginBottom: 12,
            letterSpacing: 1,
          }}
        >
          {num} / 03
        </div>
        <h3
          style={{
            fontSize: 'clamp(32px, 4.2vw, 40px)',
            fontWeight: 600,
            letterSpacing: '-0.025em',
            lineHeight: 1.1,
            margin: 0,
            marginBottom: 20,
            color: t.ink,
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontSize: 16,
            lineHeight: 1.65,
            color: t.ink2,
            margin: 0,
            marginBottom: 32,
          }}
        >
          {body}
        </p>
        <div className="optic-feature-stats" style={{ display: 'flex', gap: 40 }}>
          {stats.map((s) => (
            <div key={s.l} style={{ borderTop: `2px solid ${statRule}`, paddingTop: 12 }}>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  letterSpacing: '-0.025em',
                  color: t.ink,
                  fontFamily: 'ui-monospace, monospace',
                }}
              >
                {s.v}
              </div>
              <div style={{ fontSize: 12, color: t.mute, marginTop: 4 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ direction: 'ltr' }}>{illustration}</div>
    </div>
  )
}

function IllustrationAI({ tokens: t }: { tokens: OpticTokens }) {
  const fields: ReadonlyArray<readonly [string, string]> = [
    ['상차지', '서울특별시 송파구'],
    ['하차지', '부산광역시 해운대구'],
    ['차종', '5톤 윙바디'],
    ['운임', '850,000원'],
    ['상차일시', '2026-11-14 14:00'],
  ]
  return (
    <div
      style={{
        background: t.surface,
        border: `1px solid ${t.line}`,
        borderRadius: 16,
        padding: 32,
        fontFamily: 'ui-monospace, SF Mono, monospace',
      }}
    >
      <div style={{ fontSize: 11, color: t.mute, marginBottom: 8 }}>// 입력 텍스트</div>
      <div
        style={{
          fontSize: 13,
          color: t.ink2,
          padding: 14,
          background: t.bg,
          borderRadius: 8,
          marginBottom: 20,
          lineHeight: 1.7,
        }}
      >
        서울 송파→부산 해운대 11/14 14:00 5톤윙 850,000
      </div>
      <div
        style={{
          fontSize: 11,
          color: t.warm,
          marginBottom: 12,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}
      >
        <span style={{ display: 'inline-block', width: 12, height: 1, background: t.warm }} />
        AI 추출
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '100px 1fr',
          gap: '8px 16px',
          fontSize: 13,
        }}
      >
        {fields.map(([k, v]) => (
          <Fragment key={k}>
            <span style={{ color: t.mute }}>{k}</span>
            <span style={{ color: t.ink }}>{v}</span>
          </Fragment>
        ))}
      </div>
    </div>
  )
}

function IllustrationFlow({ tokens: t }: { tokens: OpticTokens }) {
  const data = [
    { x: 36, y: 200, k: 'departure', v: '서울 송파' },
    { x: 36, y: 220, k: 'destination', v: '부산 해운대' },
    { x: 36, y: 240, k: 'schedule', v: '11/14 14:00' },
    { x: 240, y: 200, k: 'vehicle', v: '5톤 윙바디' },
    { x: 240, y: 220, k: 'fare', v: '850,000원' },
    { x: 240, y: 240, k: 'driver', v: '김기사 (010-...)' },
  ]
  return (
    <div
      style={{
        background: t.surface,
        border: `1px solid ${t.line}`,
        borderRadius: 16,
        padding: 36,
        height: 360,
        position: 'relative',
      }}
    >
      <svg width="100%" height="100%" viewBox="0 0 480 280" aria-hidden="true">
        <defs>
          <marker id="optic-flow-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill={t.blue} />
          </marker>
        </defs>

        <rect x="20" y="30" width="160" height="80" rx="10" fill={t.surface} stroke={t.line} strokeWidth="1.5" />
        <text x="100" y="60" textAnchor="middle" fontSize="13" fontWeight="600" fill={t.ink} fontFamily="'Pretendard Variable', sans-serif">
          OPTIC Broker
        </text>
        <text x="100" y="80" textAnchor="middle" fontSize="11" fill={t.mute} fontFamily="ui-monospace, monospace">
          배차 확정
        </text>
        <text x="100" y="98" textAnchor="middle" fontSize="11" fill={t.mute} fontFamily="ui-monospace, monospace">
          #OD-3041
        </text>

        <rect x="300" y="30" width="160" height="80" rx="10" fill={t.surface} stroke={t.blue} strokeWidth="1.5" />
        <text x="380" y="60" textAnchor="middle" fontSize="13" fontWeight="600" fill={t.ink} fontFamily="'Pretendard Variable', sans-serif">
          화물맨
        </text>
        <text x="380" y="80" textAnchor="middle" fontSize="11" fill={t.mute} fontFamily="ui-monospace, monospace">
          자동 등록
        </text>
        <text x="380" y="98" textAnchor="middle" fontSize="11" fill={t.green} fontFamily="ui-monospace, monospace">
          ✓ 동기화
        </text>

        <line
          x1="180"
          y1="70"
          x2="295"
          y2="70"
          stroke={t.blue}
          strokeWidth="1.5"
          strokeDasharray="4 3"
          markerEnd="url(#optic-flow-arrow)"
        />
        <text x="237" y="58" textAnchor="middle" fontSize="11" fill={t.blue} fontFamily="ui-monospace, monospace">
          payload
        </text>

        <rect x="20" y="150" width="440" height="110" rx="10" fill={t.bg} stroke={t.line} strokeWidth="1" />
        <text x="36" y="174" fontSize="11" fill={t.mute} fontFamily="ui-monospace, monospace">
          // 전송 데이터
        </text>
        {data.map((f) => (
          <g key={f.k}>
            <text x={f.x} y={f.y} fontSize="11" fill={t.mute} fontFamily="ui-monospace, monospace">
              {f.k}:
            </text>
            <text x={f.x + 90} y={f.y} fontSize="11" fill={t.ink} fontFamily="ui-monospace, monospace">
              {f.v}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}

function IllustrationLedger({ tokens: t }: { tokens: OpticTokens }) {
  // 라이트(C)는 진한 ink 합계 라인, 다크(D)는 line2
  const totalRule = t.bg === '#f7f7f5' ? t.ink : t.line2
  const rows = [
    { id: 'OD-3041', route: '서울→부산', fare: '850,000', inv: '발행', c: t.green },
    { id: 'OD-3042', route: '인천→대전', fare: '720,000', inv: '발행', c: t.green },
    { id: 'OD-3043', route: '수원→광주', fare: '950,000', inv: '발행', c: t.green },
    { id: 'OD-3044', route: '안산→대구', fare: '680,000', inv: '대기', c: t.warm },
    { id: 'OD-3045', route: '용인→울산', fare: '880,000', inv: '발행', c: t.green },
  ]

  return (
    <div
      style={{
        background: t.surface,
        border: `1px solid ${t.line}`,
        borderRadius: 16,
        padding: 28,
        height: 360,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 20,
          paddingBottom: 14,
          borderBottom: `1px solid ${t.line}`,
        }}
      >
        <div style={{ fontSize: 13, fontWeight: 600, color: t.ink }}>2026년 11월 정산</div>
        <div style={{ fontSize: 11, color: t.mute, fontFamily: 'ui-monospace, monospace' }}>
          한국전자 · 12건
        </div>
      </div>
      <div style={{ fontFamily: 'ui-monospace, SF Mono, monospace', fontSize: 12 }}>
        {rows.map((r, i) => (
          <div
            key={r.id}
            style={{
              display: 'grid',
              gridTemplateColumns: '100px 1fr 100px 70px',
              padding: '10px 0',
              borderBottom: i < rows.length - 1 ? `1px solid ${t.line2}` : 'none',
              alignItems: 'center',
            }}
          >
            <span style={{ color: t.mute }}>{r.id}</span>
            <span
              style={{
                color: t.ink,
                fontFamily: "'Pretendard Variable', sans-serif",
                fontSize: 13,
              }}
            >
              {r.route}
            </span>
            <span style={{ color: t.ink, textAlign: 'right' }}>{r.fare}</span>
            <span style={{ color: r.c, textAlign: 'right', fontSize: 11 }}>{r.inv}</span>
          </div>
        ))}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingTop: 14,
            marginTop: 6,
            borderTop: `2px solid ${totalRule}`,
          }}
        >
          <span style={{ color: t.ink, fontWeight: 700 }}>합계</span>
          <span style={{ color: t.ink, fontWeight: 700 }}>4,080,000원</span>
        </div>
      </div>
    </div>
  )
}


