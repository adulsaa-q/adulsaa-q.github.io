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

| Token | Value | Use |
|---|---|---|
| `--surface-primary` | `#fdfdfd` | page background |
| `--surface-secondary` | `#f7f7f5` | insets, visuals |
| `--surface-raised` | `#ffffff` | cards, chips |
| `--surface-inverse` | `#111111` | mobile menu, hints |
| `--text-primary` | `#0e0e0e` | body |
| `--text-secondary` | `#555555` | supporting copy |
| `--line-soft` / `--line-primary` / `--line-strong` | `#efeee9` / `#e9e8e4` / `#c9c8c2` | hairline rules by weight |
| `--signal-primary` | `#c75543` | one accent — indices, arrows, scope labels |
| `--signal-information` | `#2155d6` | links, focus ring, evidence-class labels |
| `--signal-positive` | `#26705b` | reserved (rare) |

One accent (`--signal-primary`) does most of the work. Do not introduce a fourth hue.

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

- Only: link-arrow nudge, card hover translate, dialog open, smooth scroll.
- `--motion-fast: 160ms`, `--motion-ease: cubic-bezier(0.16, 1, 0.3, 1)`.
- Everything is disabled under `prefers-reduced-motion: reduce`.

## Voice

- Precise, calm, technical, evidence-first. Short sentences.
- State the boundary as part of the offer ("Narrow by design.").
- Never: "cutting-edge", "revolutionary", "AI-powered", "world-class", invented
  metrics, client names, or outcome claims the source cannot prove.
- Thai should read as Thai, not translated English.
