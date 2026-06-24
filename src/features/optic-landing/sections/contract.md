# OPTIC Landing Section Contract

## Source Of Truth

- Light reference: `.references/design/landing/optic-option-c-live.html`
- Dark reference: `.references/design/landing/optic-option-d-live.html`
- Static source aid: `.references/design/landing/nextjs-export/src/components/optic`
- Live demo source aid: `.references/design/landing/live-demo-themed`

## Rules

- Do not rewrite visible Korean copy unless a parity review records the intentional difference.
- Keep C and D variants on the same component tree; only token values should differ.
- Keep live demo as a client island inside the hero.
- Use `section-registry.ts` as the first lookup point for section ownership.
- If responsive behavior differs from the fixed 1440px reference, document it as a mobile stability adaptation.

