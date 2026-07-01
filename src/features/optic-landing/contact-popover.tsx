'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import type { OpticTokens } from './theme/optic-tokens'
import {
  CONTACT_EMAIL,
  CONTACT_GUIDE_TEXT,
  buildContactMailto,
} from './contact'

/**
 * 이메일 주소를 클립보드에 복사한다.
 * navigator.clipboard가 없는(비보안 컨텍스트 등) 경우 textarea 폴백을 사용한다.
 */
async function copyEmail(): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(CONTACT_EMAIL)
      return true
    }
  } catch {
    // 폴백 경로로 진행
  }

  try {
    const textarea = document.createElement('textarea')
    textarea.value = CONTACT_EMAIL
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(textarea)
    return ok
  } catch (error) {
    console.error('이메일 주소 복사 실패:', error)
    return false
  }
}

function useCopyEmail() {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const id = window.setTimeout(() => setCopied(false), 2400)
    return () => window.clearTimeout(id)
  }, [copied])

  const handleCopy = async () => {
    const ok = await copyEmail()
    if (ok) setCopied(true)
  }

  return { copied, handleCopy }
}

interface ContactPopoverProps {
  readonly tokens: OpticTokens
  readonly label?: string
  readonly align?: 'left' | 'right'
  readonly triggerStyle?: CSSProperties
}

/**
 * "도입 문의" 버튼 + 클릭 시 열리는 안내 팝오버.
 * 헤더/CTA/히어로가 라벨·정렬·트리거 스타일만 바꿔 공용으로 사용한다.
 * 바깥 클릭 / Esc 로 닫힌다.
 */
export function ContactPopover({
  tokens: t,
  label = '도입 문의',
  align = 'right',
  triggerStyle,
}: ContactPopoverProps) {
  const [open, setOpen] = useState(false)
  const { copied, handleCopy } = useCopyEmail()
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    const onPointerDown = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const resolvedTrigger: CSSProperties = triggerStyle ?? {
    fontSize: 13,
    fontWeight: 600,
    color: t.surface,
    background: t.ink,
    padding: '8px 16px',
    borderRadius: 999,
  }

  return (
    <div ref={rootRef} style={{ position: 'relative', display: 'inline-flex' }}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="dialog"
        aria-expanded={open}
        style={{ all: 'unset', cursor: 'pointer', ...resolvedTrigger }}
      >
        {label}
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="도입 문의 안내"
          style={{
            position: 'absolute',
            top: 'calc(100% + 10px)',
            ...(align === 'right' ? { right: 0 } : { left: 0 }),
            width: 300,
            background: t.surface,
            border: `1px solid ${t.line}`,
            borderRadius: 12,
            padding: 18,
            boxShadow: '0 20px 48px -20px rgba(0,0,0,0.28)',
            zIndex: 60,
            textAlign: 'left',
          }}
        >
          <div style={{ fontSize: 14, fontWeight: 700, color: t.ink, marginBottom: 6 }}>
            도입 문의
          </div>
          <p style={{ fontSize: 13, color: t.mute, lineHeight: 1.55, margin: 0, marginBottom: 12 }}>
            아래 메일로 보내주시면 영업일 기준 1일 내 회신드립니다.
          </p>
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: t.ink2,
              fontFamily: 'ui-monospace, monospace',
              padding: '9px 12px',
              background: t.surface2,
              border: `1px solid ${t.line}`,
              borderRadius: 8,
              marginBottom: 12,
              userSelect: 'all',
              wordBreak: 'break-all',
            }}
          >
            {CONTACT_EMAIL}
          </div>
          <p style={{ fontSize: 12, color: t.mute, lineHeight: 1.5, margin: 0, marginBottom: 14 }}>
            {CONTACT_GUIDE_TEXT}
          </p>
          <div style={{ display: 'flex', gap: 8 }}>
            <a
              href={buildContactMailto()}
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: t.surface,
                background: t.ink,
                padding: '9px 14px',
                borderRadius: 8,
              }}
            >
              메일 보내기 →
            </a>
            <button
              type="button"
              onClick={handleCopy}
              style={{
                all: 'unset',
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: 500,
                color: t.ink2,
                border: `1px solid ${t.line}`,
                padding: '9px 14px',
                borderRadius: 8,
              }}
            >
              <span aria-live="polite">{copied ? '복사됨 ✓' : '주소 복사'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
