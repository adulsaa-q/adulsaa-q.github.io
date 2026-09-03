# Orbit Q — brand system

One page. The goal is consistency with personality, not a design-system project.

## Mark

- The Orbit Q mark is an open arc (a stroked circle with a gap, `stroke-dasharray`)
  plus a short diagonal tail in `--signal-primary`. It reads as an orbit and a
  "Q" at once.
- Implemented as inline SVG in `src/components/layout/site-header.tsx` and as a
  static file in `src/app/icon.svg` (and `public/og/q-portfolio.svg`).
- Minimum size: 24px. Below that, drop the tail.
- Never fill the arc, never add a container box, never recolour the arc away
  from `currentColor`.

## Wordmark

- Lockup: mark + `Orbit Q / Data, BI & Automation Systems`, mono, uppercase,
  `letter-spacing: 0.08em`, `font-size: 0.72rem`, weight 700.
- Below 440px the descriptor half is hidden; the mark + "Orbit Q" stays.

## Colour tokens (`:root` in `globals.css`)

Values are `oklch()`, not hex — perceptual lightness keeps the light and dark
ladders balanced when a hue changes, and dark mode is a deliberate second
ladder (lower chroma, shifted lightness), not an inversion of the light one.
Both are defined explicitly in `globals.css`; the table below is light-mode.

| Token | Value (light) | Use |
|---|---|---|
| `--surface-primary` | `oklch(0.985 0.008 90)` | page background |
| `--surface-secondary` | `oklch(0.955 0.012 88)` | insets, visuals |
| `--surface-raised` | `oklch(0.998 0.004 90)` | cards, chips |
| `--surface-inverse` | `oklch(0.19 0.018 250)` | mobile menu, hints, the pipeline diagram |
| `--text-primary` | `oklch(0.19 0.018 250)` | body |
| `--text-secondary` | `oklch(0.43 0.018 250)` | supporting copy |
| `--line-soft` / `--line-primary` / `--line-strong` | `oklch(0.92 0.012 88)` / `oklch(0.86 0.016 88)` / `oklch(0.67 0.022 84)` | hairline rules by weight |
| `--signal-primary` | `oklch(0.55 0.16 32)` | one accent — indices, arrows, scope labels |
| `--signal-information` | `oklch(0.48 0.16 255)` | links, focus ring, evidence-class labels, caret/selection/scrollbar |
| `--signal-positive` | `oklch(0.48 0.105 155)` | reserved (rare) |

One accent (`--signal-primary`) does most of the work. Do not introduce a fourth hue.

The theme is a three-state contract, threaded through `:root`,
`:root[data-theme="dark"]`, and `@media (prefers-color-scheme: dark)`: an
explicit toggle click sets `data-theme` and wins outright; with no explicit
choice, the OS preference decides. `caret-color`, `accent-color`, and
`scrollbar-color` are themed from these same tokens rather than left to
browser defaults.

## Type

- Latin: **IBM Plex Sans**. Thai: **IBM Plex Sans Thai** (loaded first in the
  stack, so Thai glyphs use it and Latin falls through to Plex Sans). Mono:
  **IBM Plex Mono** for every micro-label.
- Weights in use: 400 / 600 / 700 only. Do not add 300 or 500.
- Scale steps (approximate, all `clamp()`): display `3–6rem` · section `2.2–5.5rem`
  · sub `1.7–3rem` · lead `1.3–2rem` · body `1rem` · micro-label `0.7rem` mono.
- Micro-labels: mono, uppercase, `letter-spacing: 0.1em`, weight 700, usually
  `--signal-primary` or `--text-secondary`.
- Thai gets `line-height: 1.7` (`:lang(th)` rule) so tone marks are not cramped.
  Mark Thai fragments with `lang="th"` (`textLang()` helper).

## Spacing

- Rhythm tokens: `--space-1 … --space-8` (0.5rem → clamp(4rem, 8vw, 7rem)).
- Section gaps use `--section-space`; page inset uses `--gutter`.
- Prefer a token over a new magic value when editing `globals.css`.

## Rules & surfaces

- Borders are `1px` hairlines. Radius is small (`--radius-small: 0.35rem`) or none.
- **No** gradients, `backdrop-filter`, `filter: blur`, glows, or glass. Enforced
  by `tests/design-system.test.ts`.
- Cards are a hairline border on `--surface-raised` or `--surface-secondary`.

## Iconography

- Text arrows only: `→` (flow), `↗` (external / detail), `←` (back). No icon set.

## Diagrams

- `system-flow` / `system-node`: boxed nodes, `1px` border, mono small labels,
  `--signal-primary` arrows. Use for reconstructed data flows where no committed
  screenshot exists; label them `RECONSTRUCTED FROM IMPLEMENTATION`.

## Motion

- Only: link-arrow nudge, card hover translate, dialog open, smooth scroll,
  and one native View Transition on the theme toggle (`::view-transition-old/
  new(root)`, feature-detected in `theme-toggle.tsx`).
- `--motion-fast: 160ms`, `--motion-ease: cubic-bezier(0.16, 1, 0.3, 1)`.
- Everything is disabled under `prefers-reduced-motion: reduce`.

## Voice

- Precise, calm, technical, evidence-first. Short sentences.
- State the boundary as part of the offer ("Narrow by design.").
- Never: "cutting-edge", "revolutionary", "AI-powered", "world-class", invented
  metrics, client names, or outcome claims the source cannot prove.
- Thai should read as Thai, not translated English.
