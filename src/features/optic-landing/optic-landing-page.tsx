import { OpticCta } from './sections/optic-cta'
import { OpticFeatures } from './sections/optic-features'
import { OpticFlow } from './sections/optic-flow'
import { OpticFooter } from './sections/optic-footer'
import { OpticHero } from './sections/optic-hero'
import { OpticMetrics } from './sections/optic-metrics'
import { OpticNav } from './sections/optic-nav'
import { OpticProblems } from './sections/optic-problems'
import { OpticProducts } from './sections/optic-products'
import { tokensFor, type OpticVariant } from './theme/optic-tokens'
import { VariantSwitcher } from './variant-switcher'

interface OpticLandingPageProps {
  readonly variant: OpticVariant
}

export function OpticLandingPage({ variant }: OpticLandingPageProps) {
  const tokens = tokensFor(variant)

  return (
    <div
      data-optic-variant={variant}
      style={{
        minHeight: '100svh',
        background: tokens.bg,
        color: tokens.ink,
        fontFamily:
          "'Pretendard Variable', 'Pretendard', Inter, 'Apple SD Gothic Neo', system-ui, sans-serif",
        letterSpacing: '-0.011em',
      }}
    >
      <OpticNav tokens={tokens} />
      <main>
        <OpticHero tokens={tokens} variant={variant} />
        <OpticProblems tokens={tokens} />
        <OpticFlow tokens={tokens} />
        <OpticFeatures tokens={tokens} />
        <OpticProducts tokens={tokens} />
        <OpticMetrics tokens={tokens} />
        <OpticCta tokens={tokens} />
      </main>
      <OpticFooter tokens={tokens} />
      <VariantSwitcher current={variant} />
    </div>
  )
}
