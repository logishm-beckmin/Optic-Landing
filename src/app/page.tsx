import { OpticLandingPage } from '@/features/optic-landing/optic-landing-page'
import type { OpticVariant } from '@/features/optic-landing/theme/optic-tokens'

interface PageProps {
  readonly searchParams: Promise<{ variant?: string }>
}

function resolveVariant(raw: string | undefined): OpticVariant {
  return raw === 'd' ? 'd' : 'c'
}

export default async function Home({ searchParams }: PageProps) {
  const { variant } = await searchParams
  return <OpticLandingPage variant={resolveVariant(variant)} />
}

