'use client'

import { useEffect, useState, type ReactNode } from 'react'

export interface LiveDemoTheme {
  bg: string
  surface: string
  surface2: string
  ink: string
  ink2: string
  mute: string
  mute2: string
  line: string
  line2: string
  accent: string
  blue: string
  warm: string
  green: string
  greenSoft: string
  shadow: string
  warmTint: string
  warmTintStrong: string
  greenTint: string
  greenTintBg: string
}

export const LIGHT_LIVE_DEMO: LiveDemoTheme = {
  bg: '#f7f7f5',
  surface: '#ffffff',
  surface2: '#fafaf9',
  ink: '#0a0a0a',
  ink2: '#1c1917',
  mute: '#78716c',
  mute2: '#a8a29e',
  line: '#e7e5e4',
  line2: '#f5f4f2',
  accent: '#7c3aed',
  blue: '#2563eb',
  warm: '#ea580c',
  green: '#059669',
  greenSoft: '#10b981',
  shadow: '0 1px 0 rgba(0,0,0,0.02), 0 24px 60px -24px rgba(0,0,0,0.08)',
  warmTint: 'rgba(234, 88, 12, 0.08)',
  warmTintStrong: 'rgba(234, 88, 12, 0.15)',
  greenTint: 'rgba(16, 185, 129, 0.1)',
  greenTintBg: 'rgba(5, 150, 105, 0.06)',
}

export const DARK_LIVE_DEMO: LiveDemoTheme = {
  bg: '#0a0a0c',
  surface: '#0f0f10',
  surface2: '#15151a',
  ink: '#fafafa',
  ink2: '#d4d4d8',
  mute: '#a1a1aa',
  mute2: '#52525b',
  line: '#27272a',
  line2: '#1f1f23',
  accent: '#a78bfa',
  blue: '#60a5fa',
  warm: '#fb923c',
  green: '#34d399',
  greenSoft: '#34d399',
  shadow: '0 1px 0 rgba(255,255,255,0.02), 0 24px 60px -24px rgba(0,0,0,0.6)',
  warmTint: 'rgba(251, 146, 60, 0.12)',
  warmTintStrong: 'rgba(251, 146, 60, 0.22)',
  greenTint: 'rgba(52, 211, 153, 0.14)',
  greenTintBg: 'rgba(52, 211, 153, 0.08)',
}

const DEMO_ORDER = {
  raw: '서울 송파 → 부산 해운대\n11/14 14:00 상차 / 11/15 09:00 하차\n5톤 카고, 전자제품 8팔레트\n운임 850,000원',
  fields: [
    { k: '상차지', v: '서울특별시 송파구', icon: '↑' },
    { k: '하차지', v: '부산광역시 해운대구', icon: '↓' },
    { k: '상차일시', v: '2026-11-14 14:00', icon: '◷' },
    { k: '하차일시', v: '2026-11-15 09:00', icon: '◴' },
    { k: '차종', v: '카고', icon: '⛟' },
    { k: '톤수', v: '5톤', icon: '⚖' },
    { k: '품목', v: '전자제품 8팔레트', icon: '▦' },
    { k: '운임', v: '850,000원', icon: '₩' },
  ],
  id: 'OD-3041',
  shipper: '한국전자',
} as const

const CLOSED_ORDERS = [
  { id: 'OD-3041', route: '서울 송파 → 부산 해운대', fare: 850000 },
  { id: 'OD-3042', route: '인천 남동 → 대전 대덕', fare: 720000 },
  { id: 'OD-3043', route: '수원 영통 → 광주 광산', fare: 950000 },
  { id: 'OD-3045', route: '용인 처인 → 울산 남구', fare: 880000 },
] as const

function phasesFor(theme: LiveDemoTheme) {
  return [
    { num: '01', label: 'AI 오더 추출', sub: '주문서 → 필드 자동', color: theme.accent, dur: 10000 },
    { num: '02', label: '화물맨 자동 연동', sub: '배차 → 운송', color: theme.blue, dur: 5000 },
    { num: '03', label: '그룹 정산', sub: '마감 오더 → 정산 묶음', color: theme.warm, dur: 5500 },
    { num: '04', label: '세금계산서 발행', sub: '정산 → 증빙', color: theme.green, dur: 4500 },
  ] as const
}

function useTypewriter(text: string, active: boolean, speed = 14) {
  const [out, setOut] = useState('')

  useEffect(() => {
    if (!active) {
      setOut('')
      return
    }

    let i = 0
    setOut('')
    const id = window.setInterval(() => {
      i += 1
      setOut(text.slice(0, i))
      if (i >= text.length) window.clearInterval(id)
    }, speed)

    return () => window.clearInterval(id)
  }, [text, active, speed])

  return out
}

function usePhase(phases: ReturnType<typeof phasesFor>) {
  const [phase, setPhase] = useState(0)
  const [running, setRunning] = useState(true)
  const [resetKey, setResetKey] = useState(0)

  useEffect(() => {
    if (!running) return
    const id = window.setTimeout(() => setPhase((current) => (current + 1) % 4), phases[phase].dur)
    return () => window.clearTimeout(id)
  }, [phase, phases, resetKey, running])

  return {
    phase,
    setPhase,
    running,
    setRunning,
    restart: () => {
      setPhase(0)
      setResetKey((key) => key + 1)
      setRunning(true)
    },
  }
}

export function OpticLiveDemo({ theme }: { readonly theme: LiveDemoTheme }) {
  const phases = phasesFor(theme)
  const { phase, setPhase, running, setRunning, restart } = usePhase(phases)

  return (
    <div
      className="optic-live-demo"
      style={{
        width: '100%',
        maxWidth: 1240,
        minWidth: 1100,
        margin: '0 auto',
        background: theme.bg,
        borderRadius: 16,
        border: `1px solid ${theme.line}`,
        overflow: 'hidden',
        fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Pretendard', sans-serif",
        boxShadow: theme.shadow,
      }}
    >
      <div
        style={{
          padding: '16px 24px',
          background: theme.surface,
          borderBottom: `1px solid ${theme.line}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ display: 'flex', gap: 6 }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: theme.line }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: theme.line }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: theme.line }} />
          </div>
          <div style={{ fontSize: 12, color: theme.mute, fontFamily: 'ui-monospace, monospace' }}>
            optic.kr / live · {phases[phase].label.toLowerCase()}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button
            type="button"
            onClick={() => setRunning(!running)}
            style={{
              all: 'unset',
              cursor: 'pointer',
              padding: '5px 11px',
              borderRadius: 6,
              background: theme.surface2,
              border: `1px solid ${theme.line}`,
              fontSize: 11,
              color: theme.ink2,
              fontFamily: 'ui-monospace, monospace',
            }}
          >
            {running ? '⏸ 일시정지' : '▶ 재생'}
          </button>
          <button
            type="button"
            onClick={restart}
            style={{
              all: 'unset',
              cursor: 'pointer',
              padding: '5px 11px',
              borderRadius: 6,
              background: theme.surface2,
              border: `1px solid ${theme.line}`,
              fontSize: 11,
              color: theme.ink2,
              fontFamily: 'ui-monospace, monospace',
            }}
          >
            ↺ 처음부터
          </button>
        </div>
      </div>

      <div
        className="optic-live-stepper"
        style={{
          padding: '20px 32px',
          background: theme.surface,
          borderBottom: `1px solid ${theme.line}`,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr 1fr',
          gap: 0,
          position: 'relative',
        }}
      >
        {phases.map((item, index) => {
          const isCurrent = index === phase
          const isPast = index < phase

          return (
            <button
              key={item.num}
              type="button"
              onClick={() => {
                setPhase(index)
                setRunning(false)
              }}
              style={{
                all: 'unset',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
                padding: '0 18px',
                borderLeft: index === 0 ? 'none' : `1px solid ${theme.line}`,
                opacity: isCurrent ? 1 : isPast ? 0.55 : 0.4,
                transition: 'opacity 0.3s ease',
                position: 'relative',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span
                  style={{
                    fontSize: 11,
                    color: isCurrent ? item.color : theme.mute,
                    fontFamily: 'ui-monospace, monospace',
                    fontWeight: 600,
                  }}
                >
                  {item.num}
                </span>
                {isCurrent && running && (
                  <span
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: '50%',
                      background: item.color,
                      animation: 'ldt-pulse 1.4s ease-in-out infinite',
                    }}
                  />
                )}
              </div>
              <div
                style={{
                  fontSize: 13.5,
                  fontWeight: 600,
                  color: theme.ink,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {item.label}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: theme.mute,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {item.sub}
              </div>

              {isCurrent && (
                <div
                  key={`progress-${index}-${running}`}
                  style={{
                    position: 'absolute',
                    left: 18,
                    right: 18,
                    bottom: -20,
                    height: 2,
                    background: theme.line,
                    borderRadius: 1,
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      background: item.color,
                      width: 0,
                      animation: running ? `ldt-progress ${item.dur}ms linear forwards` : 'none',
                    }}
                  />
                </div>
              )}
            </button>
          )
        })}
      </div>

      <div className="optic-live-viewport" style={{ position: 'relative', height: 460, background: theme.bg }}>
        <Phase1Extract active={phase === 0} theme={theme} />
        <Phase2Carrier active={phase === 1} theme={theme} />
        <Phase3Settlement active={phase === 2} theme={theme} />
        <Phase4Invoice active={phase === 3} theme={theme} />
      </div>

      <div
        style={{
          padding: '12px 24px',
          background: theme.surface,
          borderTop: `1px solid ${theme.line}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: 11,
          color: theme.mute,
          fontFamily: 'ui-monospace, monospace',
        }}
      >
        <span>* 시연 데이터 — 실제 운영 환경의 화면 흐름을 재현</span>
        <span>00:{(phase * 5 + 8).toString().padStart(2, '0')} / 00:22</span>
      </div>
    </div>
  )
}

function Phase1Extract({ active, theme }: { readonly active: boolean; readonly theme: LiveDemoTheme }) {
  const typed = useTypewriter(DEMO_ORDER.raw, active, 14)
  const typingDone = active && typed.length === DEMO_ORDER.raw.length
  const [filledCount, setFilledCount] = useState(0)

  useEffect(() => {
    if (!typingDone) {
      setFilledCount(0)
      return
    }

    let i = 0
    setFilledCount(0)
    const id = window.setInterval(() => {
      i += 1
      setFilledCount(i)
      if (i >= DEMO_ORDER.fields.length) window.clearInterval(id)
    }, 160)

    return () => window.clearInterval(id)
  }, [typingDone])

  if (!active) return null

  const allFilled = filledCount === DEMO_ORDER.fields.length

  return (
    <div
      className="optic-live-phase optic-live-phase-grid"
      style={{
        position: 'absolute',
        inset: 0,
        padding: 28,
        display: 'grid',
        gridTemplateColumns: '0.85fr 1.15fr',
        gap: 20,
        animation: 'ldt-fadeIn 0.4s ease',
      }}
    >
      <div
        style={{
          background: theme.surface2,
          border: `1px solid ${theme.line}`,
          borderRadius: 12,
          padding: 22,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: theme.warm }} />
            <span style={{ fontSize: 12, color: theme.mute, fontFamily: 'ui-monospace, monospace' }}>
              주문서 / 메일 본문
            </span>
          </div>
          <span style={{ fontSize: 11, color: theme.mute2, fontFamily: 'ui-monospace, monospace' }}>
            {DEMO_ORDER.shipper} · 11/13 16:42
          </span>
        </div>

        <div
          style={{
            flex: 1,
            padding: 16,
            background: theme.surface,
            border: `1px solid ${theme.line}`,
            borderRadius: 10,
            fontFamily: 'ui-monospace, SF Mono, monospace',
            fontSize: 13,
            color: theme.ink2,
            lineHeight: 1.85,
            whiteSpace: 'pre-wrap',
            wordBreak: 'keep-all',
            overflowWrap: 'normal',
          }}
        >
          {typed}
          {!typingDone && (
            <span
              style={{
                display: 'inline-block',
                width: 7,
                height: 14,
                marginLeft: 1,
                background: theme.warm,
                animation: 'ldt-blink 0.9s steps(2) infinite',
                verticalAlign: '-2px',
              }}
            />
          )}
        </div>

        <div
          style={{
            marginTop: 14,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            fontSize: 11,
            color: typingDone ? theme.warm : theme.mute,
            fontFamily: 'ui-monospace, monospace',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              width: 16,
              height: 1,
              background: typingDone ? theme.warm : theme.mute2,
            }}
          />
          {typingDone ? 'AI 추출 — 10초 내외' : '수신 중...'}
        </div>
      </div>

      <div
        style={{
          background: theme.surface,
          border: `1px solid ${theme.line}`,
          borderRadius: 12,
          padding: 22,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: theme.ink, whiteSpace: 'nowrap' }}>
            오더 #{DEMO_ORDER.id}
          </div>
          <span
            style={{
              fontSize: 11,
              color: theme.warm,
              fontFamily: 'ui-monospace, monospace',
              padding: '4px 10px',
              background: theme.warmTint,
              borderRadius: 4,
              opacity: filledCount > 0 ? 1 : 0,
              transition: 'opacity 0.3s',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            ◆ {filledCount}/{DEMO_ORDER.fields.length} 자동 추출
          </span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px 16px',
            flex: 1,
            alignContent: 'start',
          }}
        >
          {DEMO_ORDER.fields.map((field, index) => {
            const filled = index < filledCount
            const justFilled = index === filledCount - 1
            return (
              <div
                key={field.k}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 5,
                  padding: '11px 13px',
                  background: filled ? theme.surface2 : 'transparent',
                  border: `1px solid ${filled ? theme.line : theme.line2}`,
                  borderRadius: 8,
                  transition: 'all 0.4s ease',
                  opacity: filled ? 1 : 0.45,
                  transform: justFilled ? 'scale(1.02)' : 'scale(1)',
                  boxShadow: justFilled ? `0 0 0 2px ${theme.warmTintStrong}` : 'none',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    fontSize: 11,
                    color: theme.mute,
                    fontFamily: 'ui-monospace, monospace',
                  }}
                >
                  <span
                    style={{
                      color: filled ? theme.warm : theme.mute2,
                      fontSize: 12,
                      lineHeight: 1,
                      width: 12,
                      display: 'inline-block',
                    }}
                  >
                    {field.icon}
                  </span>
                  {field.k}
                </div>
                <div
                  style={{
                    fontSize: 13.5,
                    fontWeight: 500,
                    color: filled ? theme.ink : theme.mute2,
                    fontFamily:
                      field.k.includes('일시') || field.k === '운임' ? 'ui-monospace, monospace' : 'inherit',
                    minHeight: 18,
                  }}
                >
                  {filled ? field.v : '—'}
                </div>
              </div>
            )
          })}
        </div>

        <div
          style={{
            marginTop: 14,
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: 12,
            opacity: allFilled ? 1 : 0,
            transform: `translateY(${allFilled ? 0 : 6}px)`,
            transition: 'all 0.4s ease',
          }}
        >
          <span style={{ fontSize: 11, color: theme.green, fontFamily: 'ui-monospace, monospace' }}>✓ 검증 완료</span>
          <button
            type="button"
            style={{
              all: 'unset',
              cursor: 'pointer',
              padding: '8px 16px',
              background: theme.ink,
              color: theme.bg,
              fontSize: 13,
              fontWeight: 600,
              borderRadius: 8,
            }}
          >
            오더 등록 →
          </button>
        </div>
      </div>
    </div>
  )
}

function Phase2Carrier({ active, theme }: { readonly active: boolean; readonly theme: LiveDemoTheme }) {
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (!active) {
      setStep(0)
      return
    }

    setStep(0)
    const timeouts = [
      window.setTimeout(() => setStep(1), 400),
      window.setTimeout(() => setStep(2), 1200),
      window.setTimeout(() => setStep(3), 3000),
      window.setTimeout(() => setStep(4), 4000),
    ]

    return () => timeouts.forEach(window.clearTimeout)
  }, [active])

  if (!active) return null

  return (
    <div
      className="optic-live-phase optic-live-carrier-grid"
      style={{
        position: 'absolute',
        inset: 0,
        padding: 28,
        animation: 'ldt-fadeIn 0.4s ease',
        display: 'grid',
        gridTemplateColumns: '1fr 120px 1fr',
        gap: 0,
        alignItems: 'stretch',
      }}
    >
      <SystemCard
        theme={theme}
        title="OPTIC Broker"
        sub="배차 확정"
        accentColor={theme.ink}
        leading={<SystemBadge theme={theme} label="O" color={theme.ink} ink={theme.bg} />}
        highlighted={step >= 1 && step < 4}
      >
        <div
          style={{
            background: theme.surface,
            border: `1px solid ${theme.line}`,
            borderRadius: 10,
            padding: 14,
            flex: 1,
            transform: step >= 1 ? 'scale(1.015)' : 'none',
            boxShadow: step >= 1 ? `0 8px 20px ${theme.warmTint}` : 'none',
            transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <CarrierOrderCard theme={theme} />
        </div>
      </SystemCard>

      <PayloadBridge theme={theme} step={step} />

      <SystemCard
        theme={theme}
        title="화물맨"
        sub={step >= 3 ? '자동 등록 완료' : '수신 대기'}
        accentColor={theme.blue}
        leading={<SystemBadge theme={theme} label="화" color={theme.blue} ink={theme.surface} />}
        highlighted={step >= 3}
      >
        <div
          style={{
            background: theme.surface,
            border: `1px solid ${step >= 3 ? theme.blue : theme.line}`,
            borderRadius: 10,
            padding: 14,
            flex: 1,
            transition: 'border-color 0.4s ease',
            opacity: step >= 2 ? 1 : 0.5,
          }}
        >
          {step < 3 && (
            <div
              style={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 12,
                color: theme.mute,
                fontFamily: 'ui-monospace, monospace',
                flexDirection: 'column',
                gap: 8,
              }}
            >
              {step === 2 ? (
                <>
                  <span
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      border: `2px solid ${theme.blue}`,
                      borderTopColor: 'transparent',
                      animation: 'ldt-spin 0.8s linear infinite',
                    }}
                  />
                  <span>payload 수신 중...</span>
                </>
              ) : (
                <span>대기 중</span>
              )}
            </div>
          )}
          {step >= 3 && (
            <div style={{ animation: 'ldt-fadeIn 0.4s ease' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <span style={{ fontSize: 11, color: theme.blue, fontFamily: 'ui-monospace, monospace' }}>
                  #{DEMO_ORDER.id}
                </span>
                <span
                  style={{
                    fontSize: 10,
                    color: theme.green,
                    padding: '2px 8px',
                    borderRadius: 999,
                    background: theme.greenTint,
                    fontFamily: 'ui-monospace, monospace',
                  }}
                >
                  ✓ 동기화
                </span>
              </div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: theme.ink,
                  marginBottom: 4,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                서울 송파 → 부산 해운대
              </div>
              <div style={{ fontSize: 12, color: theme.mute, marginBottom: 12, whiteSpace: 'nowrap' }}>
                중복 입력 0건 · 0.4초 동기화
              </div>
              <div style={{ borderTop: `1px solid ${theme.line2}`, paddingTop: 10, fontSize: 11 }}>
                <CarrierField theme={theme} k="배차상태" v="확정" color={theme.green} />
                <CarrierField theme={theme} k="기사" v="김기사" />
                <CarrierField theme={theme} k="ETA" v="11/15 09:00" mono />
                <CarrierField theme={theme} k="알림" v="발송 완료" />
              </div>
            </div>
          )}
        </div>
      </SystemCard>
    </div>
  )
}

function CarrierOrderCard({ theme }: { readonly theme: LiveDemoTheme }) {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <span style={{ fontSize: 11, color: theme.warm, fontFamily: 'ui-monospace, monospace' }}>
          #{DEMO_ORDER.id}
        </span>
        <span
          style={{
            fontSize: 10,
            color: theme.green,
            padding: '2px 8px',
            borderRadius: 999,
            background: theme.greenTint,
            fontFamily: 'ui-monospace, monospace',
          }}
        >
          ● 배차완료
        </span>
      </div>
      <div
        style={{
          fontSize: 14,
          fontWeight: 600,
          color: theme.ink,
          marginBottom: 4,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        서울 송파 → 부산 해운대
      </div>
      <div style={{ fontSize: 12, color: theme.mute, marginBottom: 12, whiteSpace: 'nowrap' }}>
        5톤 카고 · 전자제품 8팔레트
      </div>
      <div style={{ borderTop: `1px solid ${theme.line2}`, paddingTop: 10, fontSize: 11 }}>
        <CarrierField theme={theme} k="기사" v="김기사 010-****-1234" mono />
        <CarrierField theme={theme} k="차량" v="89허 1234" mono />
        <CarrierField theme={theme} k="상차" v="11/14 14:00" mono />
        <CarrierField theme={theme} k="운임" v="850,000원" mono />
      </div>
    </>
  )
}

function SystemCard({
  theme,
  title,
  sub,
  accentColor,
  leading,
  highlighted,
  children,
}: {
  readonly theme: LiveDemoTheme
  readonly title: string
  readonly sub: string
  readonly accentColor: string
  readonly leading: ReactNode
  readonly highlighted: boolean
  readonly children: ReactNode
}) {
  return (
    <div
      style={{
        background: theme.surface2,
        border: `1px solid ${highlighted ? accentColor : theme.line}`,
        borderRadius: 12,
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        transition: 'border-color 0.4s ease',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
          {leading}
          <span style={{ fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', color: theme.ink }}>{title}</span>
        </div>
        <span
          style={{
            fontSize: 11,
            color: theme.mute,
            fontFamily: 'ui-monospace, monospace',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          {sub}
        </span>
      </div>
      {children}
    </div>
  )
}

function SystemBadge({
  label,
  color,
  ink,
}: {
  readonly theme: LiveDemoTheme
  readonly label: string
  readonly color: string
  readonly ink: string
}) {
  return (
    <span
      style={{
        width: 22,
        height: 22,
        borderRadius: 5,
        background: color,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: ink,
        fontSize: 11,
        fontWeight: 700,
        flexShrink: 0,
      }}
    >
      {label}
    </span>
  )
}

function CarrierField({
  theme,
  k,
  v,
  mono,
  color,
}: {
  readonly theme: LiveDemoTheme
  readonly k: string
  readonly v: string
  readonly mono?: boolean
  readonly color?: string
}) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: 12, padding: '5px 0', fontSize: 11.5 }}>
      <span style={{ color: theme.mute, fontFamily: 'ui-monospace, monospace', whiteSpace: 'nowrap' }}>{k}</span>
      <span
        style={{
          color: color || theme.ink2,
          fontFamily: mono ? 'ui-monospace, monospace' : 'inherit',
          whiteSpace: 'nowrap',
          textAlign: 'right',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {v}
      </span>
    </div>
  )
}

function PayloadBridge({ theme, step }: { readonly theme: LiveDemoTheme; readonly step: number }) {
  const gradientId = theme.bg === '#0a0a0c' ? 'ldt-bridge-d' : 'ldt-bridge-l'

  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 8px' }}>
      <svg width="100%" height="100%" viewBox="0 0 120 400" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id={gradientId} x1="0" x2="1">
            <stop offset="0" stopColor={theme.accent} stopOpacity="0.5" />
            <stop offset="1" stopColor={theme.blue} stopOpacity="0.5" />
          </linearGradient>
        </defs>
        <line x1="0" y1="200" x2="120" y2="200" stroke={theme.line} strokeWidth="3" strokeLinecap="round" />
        <line
          x1="0"
          y1="200"
          x2="120"
          y2="200"
          stroke={`url(#${gradientId})`}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="6 6"
          style={{
            animation: step >= 2 ? 'ldt-dash 1s linear infinite' : 'none',
            opacity: step >= 2 ? 1 : 0,
            transition: 'opacity 0.3s',
          }}
        />
        <g style={{ opacity: step === 2 ? 1 : 0, transition: 'opacity 0.3s' }}>
          <rect
            x="0"
            y="184"
            width="64"
            height="32"
            rx="6"
            fill={theme.surface}
            stroke={theme.accent}
            strokeWidth="1.5"
            style={{ animation: step === 2 ? 'ldt-payload-move 1.6s ease-in-out forwards' : 'none' }}
          />
          <text
            x="32"
            y="204"
            textAnchor="middle"
            fontSize="11"
            fill={theme.accent}
            fontFamily="ui-monospace, monospace"
            style={{ animation: step === 2 ? 'ldt-payload-move 1.6s ease-in-out forwards' : 'none' }}
          >
            payload
          </text>
        </g>
        <circle cx="0" cy="200" r="5" fill={theme.accent} />
        <circle
          cx="120"
          cy="200"
          r="5"
          fill={step >= 3 ? theme.green : theme.blue}
          style={{ animation: step === 3 ? 'ldt-pulse 0.6s ease-out' : 'none' }}
        />
      </svg>
    </div>
  )
}

function Phase3Settlement({ active, theme }: { readonly active: boolean; readonly theme: LiveDemoTheme }) {
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (!active) {
      setStep(0)
      return
    }

    setStep(0)
    const timeouts = [
      window.setTimeout(() => setStep(1), 600),
      window.setTimeout(() => setStep(2), 1700),
      window.setTimeout(() => setStep(3), 3300),
    ]

    return () => timeouts.forEach(window.clearTimeout)
  }, [active])

  if (!active) return null

  const totalFare = CLOSED_ORDERS.reduce((sum, order) => sum + order.fare, 0)

  return (
    <div
      className="optic-live-phase optic-live-phase-grid"
      style={{
        position: 'absolute',
        inset: 0,
        padding: 28,
        animation: 'ldt-fadeIn 0.4s ease',
        display: 'grid',
        gridTemplateColumns: '1.1fr 0.9fr',
        gap: 24,
      }}
    >
      <div
        style={{
          background: theme.surface2,
          border: `1px solid ${theme.line}`,
          borderRadius: 12,
          padding: 22,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: theme.ink }}>마감 오더</div>
          <span style={{ fontSize: 11, color: theme.mute, fontFamily: 'ui-monospace, monospace' }}>
            {CLOSED_ORDERS.length}건 · 한국전자
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
          {CLOSED_ORDERS.map((order, index) => {
            const grouped = step >= 2
            return (
              <div
                key={order.id}
                style={{
                  padding: '11px 14px',
                  background: grouped ? theme.warmTint : theme.surface,
                  border: `1px solid ${grouped ? theme.warm : theme.line}`,
                  borderRadius: 8,
                  display: 'grid',
                  gridTemplateColumns: '60px 1fr auto',
                  alignItems: 'center',
                  gap: 14,
                  fontSize: 12,
                  transition: `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.06}s`,
                }}
              >
                <span style={{ color: theme.warm, fontFamily: 'ui-monospace, monospace', fontWeight: 600 }}>
                  {order.id}
                </span>
                <span style={{ color: theme.ink2, whiteSpace: 'nowrap' }}>{order.route}</span>
                <span style={{ color: theme.ink, fontFamily: 'ui-monospace, monospace', fontWeight: 600 }}>
                  {order.fare.toLocaleString()}원
                </span>
              </div>
            )
          })}
        </div>

        {step >= 1 && (
          <div
            style={{
              marginTop: 12,
              padding: '10px 14px',
              background: theme.warmTintStrong,
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              fontSize: 11,
              color: theme.warm,
              fontFamily: 'ui-monospace, monospace',
              animation: 'ldt-fadeIn 0.4s ease',
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: theme.warm }} />
            그룹 정산 조건 매칭: 동일 화주 + 마감일 도달
          </div>
        )}
      </div>

      <div
        style={{
          background: theme.surface,
          border: `1px solid ${theme.line}`,
          borderRadius: 12,
          padding: 22,
          display: 'flex',
          flexDirection: 'column',
          opacity: step >= 2 ? 1 : 0.4,
          transform: step >= 2 ? 'scale(1)' : 'scale(0.96)',
          transition: 'all 0.5s ease',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 11, color: theme.mute, fontFamily: 'ui-monospace, monospace', marginBottom: 4 }}>
              SETTLEMENT
            </div>
            <div style={{ fontSize: 16, fontWeight: 600, color: theme.ink, whiteSpace: 'nowrap' }}>
              한국전자 / 2026년 11월
            </div>
          </div>
          {step >= 3 && (
            <span
              style={{
                fontSize: 11,
                color: theme.green,
                fontFamily: 'ui-monospace, monospace',
                padding: '4px 10px',
                background: theme.greenTint,
                borderRadius: 4,
                animation: 'ldt-fadeIn 0.3s ease',
              }}
            >
              ✓ 그룹 생성
            </span>
          )}
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            ['오더 건수', `${CLOSED_ORDERS.length}건`],
            ['청구 합계', `${totalFare.toLocaleString()}원`],
            ['부가세 (10%)', `${(totalFare * 0.1).toLocaleString()}원`],
          ].map(([k, v], index) => (
            <div
              key={k}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 0',
                borderBottom: index < 2 ? `1px solid ${theme.line2}` : 'none',
                fontSize: 12.5,
              }}
            >
              <span style={{ color: theme.mute, fontFamily: 'ui-monospace, monospace' }}>{k}</span>
              <span style={{ color: theme.ink, fontFamily: 'ui-monospace, monospace', fontWeight: 500 }}>
                {step >= 2 ? v : '—'}
              </span>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 16,
            padding: '14px 16px',
            background: theme.ink,
            borderRadius: 8,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span style={{ fontSize: 12, color: theme.mute2, fontFamily: 'ui-monospace, monospace' }}>
            합계 (VAT 포함)
          </span>
          <span style={{ fontSize: 18, fontWeight: 700, color: theme.bg, fontFamily: 'ui-monospace, monospace' }}>
            {step >= 2 ? `${(totalFare * 1.1).toLocaleString()}원` : '—'}
          </span>
        </div>
      </div>
    </div>
  )
}

function Phase4Invoice({ active, theme }: { readonly active: boolean; readonly theme: LiveDemoTheme }) {
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (!active) {
      setStep(0)
      return
    }

    setStep(0)
    const timeouts = [
      window.setTimeout(() => setStep(1), 500),
      window.setTimeout(() => setStep(2), 1800),
      window.setTimeout(() => setStep(3), 3000),
    ]

    return () => timeouts.forEach(window.clearTimeout)
  }, [active])

  if (!active) return null

  const totalFare = CLOSED_ORDERS.reduce((sum, order) => sum + order.fare, 0)
  const vat = totalFare * 0.1

  return (
    <div
      className="optic-live-phase optic-live-phase-grid"
      style={{
        position: 'absolute',
        inset: 0,
        padding: 28,
        animation: 'ldt-fadeIn 0.4s ease',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 24,
        alignItems: 'center',
      }}
    >
      <div
        style={{
          background: theme.surface,
          border: `1px solid ${theme.line}`,
          borderRadius: 12,
          padding: 24,
          position: 'relative',
          maxHeight: '100%',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: `linear-gradient(90deg, ${theme.green}, ${theme.greenSoft})`,
          }}
        />

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: 18,
            paddingBottom: 14,
            borderBottom: `1px solid ${theme.line}`,
            gap: 12,
          }}
        >
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontSize: 11,
                color: theme.mute,
                fontFamily: 'ui-monospace, monospace',
                marginBottom: 4,
                whiteSpace: 'nowrap',
              }}
            >
              TAX INVOICE
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, color: theme.ink, whiteSpace: 'nowrap' }}>
              전자세금계산서
            </div>
          </div>
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{ fontSize: 10, color: theme.mute, marginBottom: 2, whiteSpace: 'nowrap' }}>승인번호</div>
            <div style={{ fontSize: 11, color: theme.ink, fontFamily: 'ui-monospace, monospace', whiteSpace: 'nowrap' }}>
              {step >= 3 ? '20261130-2041-3...' : '발급 대기'}
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
          <InvoiceParty theme={theme} title="공급자" name="옵틱 운송" number="123-45-67890" />
          <InvoiceParty theme={theme} title="공급받는자" name="한국전자" number="987-65-43210" />
        </div>

        <div
          style={{
            background: theme.surface2,
            borderRadius: 8,
            padding: 14,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 10,
            fontSize: 11.5,
          }}
        >
          <InvoiceMoney theme={theme} label="공급가액" value={`${totalFare.toLocaleString()}원`} />
          <InvoiceMoney theme={theme} label="세액" value={`${vat.toLocaleString()}원`} />
        </div>

        <div
          style={{
            marginTop: 12,
            padding: '12px 14px',
            background: theme.ink,
            borderRadius: 8,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span style={{ fontSize: 11, color: theme.mute2, fontFamily: 'ui-monospace, monospace' }}>합계금액</span>
          <span style={{ fontSize: 16, fontWeight: 700, color: theme.bg, fontFamily: 'ui-monospace, monospace' }}>
            {(totalFare + vat).toLocaleString()}원
          </span>
        </div>

        {step >= 3 && (
          <div
            style={{
              position: 'absolute',
              top: '55%',
              left: '65%',
              transform: 'translate(-50%, -50%) rotate(-12deg)',
              border: `2.5px solid ${theme.green}`,
              color: theme.green,
              fontFamily: 'ui-monospace, monospace',
              fontSize: 18,
              fontWeight: 700,
              padding: '8px 18px',
              borderRadius: 4,
              animation: 'ldt-stamp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
              opacity: 0.85,
              pointerEvents: 'none',
              letterSpacing: 1,
            }}
          >
            APPROVED
          </div>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Phase4Step theme={theme} active={step >= 1} num="01" label="국세청 전송" mono="hometax.go.kr" done={step >= 2} />
        <Phase4Step
          theme={theme}
          active={step >= 2}
          num="02"
          label="공급받는자 메일 발송"
          mono="account@hankook-elec.kr"
          done={step >= 3}
        />
        <Phase4Step
          theme={theme}
          active={step >= 3}
          num="03"
          label="장부 자동 기록"
          mono="OPTIC Books · 매출계정"
          done={step >= 3}
          isLast
        />

        {step >= 3 && (
          <div
            style={{
              marginTop: 8,
              padding: '16px 18px',
              background: theme.greenTintBg,
              border: `1px solid ${theme.green}`,
              borderRadius: 10,
              animation: 'ldt-fadeIn 0.4s ease',
            }}
          >
            <div
              style={{
                fontSize: 11,
                color: theme.green,
                fontFamily: 'ui-monospace, monospace',
                marginBottom: 6,
                whiteSpace: 'nowrap',
              }}
            >
              ✓ 발행 완료 — 0.8초
            </div>
            <div style={{ fontSize: 12.5, color: theme.ink2, lineHeight: 1.6 }}>
              사람이 손대는 단계 0회. 국세청 승인부터 거래처 통보, 회계 기록까지 한 번의 클릭으로 마감.
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function InvoiceParty({
  theme,
  title,
  name,
  number,
}: {
  readonly theme: LiveDemoTheme
  readonly title: string
  readonly name: string
  readonly number: string
}) {
  return (
    <div>
      <div style={{ fontSize: 10, color: theme.mute, marginBottom: 4 }}>{title}</div>
      <div style={{ fontSize: 12, color: theme.ink, fontWeight: 500 }}>{name}</div>
      <div style={{ fontSize: 11, color: theme.ink2, fontFamily: 'ui-monospace, monospace', marginTop: 2 }}>{number}</div>
    </div>
  )
}

function InvoiceMoney({
  theme,
  label,
  value,
}: {
  readonly theme: LiveDemoTheme
  readonly label: string
  readonly value: string
}) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <span style={{ color: theme.mute }}>{label}</span>
      <span style={{ color: theme.ink, fontFamily: 'ui-monospace, monospace', fontWeight: 500 }}>{value}</span>
    </div>
  )
}

function Phase4Step({
  theme,
  active,
  done,
  num,
  label,
  mono,
  isLast,
}: {
  readonly theme: LiveDemoTheme
  readonly active: boolean
  readonly done: boolean
  readonly num: string
  readonly label: string
  readonly mono: string
  readonly isLast?: boolean
}) {
  return (
    <div style={{ display: 'flex', gap: 14, opacity: active ? 1 : 0.35, transition: 'opacity 0.4s ease' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: '50%',
            background: done ? theme.green : active ? theme.surface : theme.surface2,
            border: `1.5px solid ${done ? theme.green : active ? theme.ink2 : theme.line}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 11,
            fontFamily: 'ui-monospace, monospace',
            color: done ? theme.bg : theme.ink2,
            fontWeight: 600,
            transition: 'all 0.4s ease',
            flexShrink: 0,
          }}
        >
          {done ? '✓' : num}
        </div>
        {!isLast && (
          <div
            style={{
              width: 1.5,
              height: 20,
              marginTop: 4,
              background: done ? theme.green : theme.line,
              transition: 'background 0.4s ease',
            }}
          />
        )}
      </div>
      <div style={{ flex: 1, paddingTop: 3, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 500, color: theme.ink, marginBottom: 3 }}>{label}</div>
        <div
          style={{
            fontSize: 11,
            color: theme.mute,
            fontFamily: 'ui-monospace, monospace',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {mono}
        </div>
      </div>
    </div>
  )
}
