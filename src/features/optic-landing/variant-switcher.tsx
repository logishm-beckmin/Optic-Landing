'use client'

import Link from 'next/link'
import type { OpticVariant } from './theme/optic-tokens'

interface VariantSwitcherProps {
  readonly current: OpticVariant
}

/**
 * 우하단 떠 있는 토글 — 두 옵션을 빠르게 비교하기 위한 임시 UI.
 * 정식 배포 시 삭제하면 된다.
 */
export function VariantSwitcher({ current }: VariantSwitcherProps) {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        padding: 4,
        background: '#0a0a0a',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 999,
        fontFamily: 'ui-monospace, SF Mono, monospace',
        fontSize: 12,
        boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
      }}
    >
      <Link
        href="/?variant=c"
        scroll={false}
        prefetch={false}
        aria-current={current === 'c' ? 'page' : undefined}
        style={{
          padding: '6px 12px',
          borderRadius: 999,
          background: current === 'c' ? '#fafafa' : 'transparent',
          color: current === 'c' ? '#0a0a0a' : '#a1a1aa',
          textDecoration: 'none',
          fontWeight: 600,
        }}
      >
        light
      </Link>
      <Link
        href="/?variant=d"
        scroll={false}
        prefetch={false}
        aria-current={current === 'd' ? 'page' : undefined}
        style={{
          padding: '6px 12px',
          borderRadius: 999,
          background: current === 'd' ? '#fafafa' : 'transparent',
          color: current === 'd' ? '#0a0a0a' : '#a1a1aa',
          textDecoration: 'none',
          fontWeight: 600,
        }}
      >
        dark
      </Link>
    </div>
  )
}

