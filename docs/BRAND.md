# Adul Sa-a / Q — brand system

The portfolio introduces a person through useful systems and real work. The homepage
is editorial: identity, selected work, ways to collaborate, working philosophy, contact.
Source boundaries support the story and stay beside the artifacts they qualify.

## Identity and mark

Use **Adul Sa-a / Q** as the wordmark and **Data, BI & Automation** as the category.
Orbit Q describes the retained Q symbol, not a second public-facing organization.
The open arc and warm diagonal tail remain in the header, favicon and social card.
Keep the arc in currentColor, the tail in the primary signal, and the mark legible at 24px.
No invented studio scale, credentials, client logos, testimonials or production outcomes.

## Colors and surfaces

`src/app/globals.css` is authoritative. Both theme palettes use semantic oklch tokens.
Primary is white in light mode and deep blue-charcoal in dark mode. Secondary and raised
surfaces separate artifacts from text. Warm rust is the primary signal; blue identifies
links/information and focus. Keep all authored component colors on those tokens.
Use 1px rules, a 2px accent rule for the selected artifact, and small 3/6/8px radii.
Do not make every section a card. No hero glow or pointer-tracked spotlight.
The sticky header retains a restrained blur to separate content beneath it.
Explicit theme choice wins; otherwise follow the OS, including subsequent changes.

## Typography and grid

Local IBM Plex Sans, Sans Thai and Mono; 400/600/700 weights. `fonts.css` preserves
upstream unicode ranges and serves WOFF2. No third-party font requests.
Thai runs use lang="th" and comfortable line height; use textLang for mixed content.
Homepage display type is fluid 2.75–4.7rem, section type 1.875–3rem, body 1rem.
Technical labels are secondary, never a substitute for readable explanations.
Body measures stay around 45–68ch. Use `--content-max: 82rem`, `--gutter`, and the
shared spacing tokens. Homepage composition lives in `home.module.css`.
Two-column introduction and selected projects become single-column at 60rem;
services and personal introduction stack at 40rem. Content order remains meaningful.

## Artifacts and diagrams

Show real committed screenshots. Generate display WebP variants using
`npm run images:optimize`; preserve source PNGs for enlargement. Reserve dimensions
and provide srcset/sizes. The hero image loads eagerly; lower artifacts load lazily.
Do not retouch source evidence or invent artifact filenames. Simulated data and
reconstructed schema diagrams must remain visibly identified. Code and lineage
follow the problem, contribution and constraints, with deeper inspection available.
Use native dialogs with names, Escape dismissal and restored focus.

## Interaction and motion

Native links, buttons and dialogs first. Focus rings use the information signal;
primary touch controls are at least 44px. Menu background becomes inert while open.
Carousels support keyboard selection. Copy actions report actual success or failure.
Motion tokens: 80/140/220ms with cubic-bezier(0.16, 1, 0.3, 1). Restrict movement to
small interaction feedback and supported theme transitions. Content never depends
on a reveal animation. Respect reduced motion and preserve nonanimated feedback.

## Voice and navigation

Name the practical problem, then explain the system and its limits. Calm, precise,
human language; first-person introduction; no repeated evidence vocabulary as filler.
Primary navigation: Work, Services, About, Contact. Method, Lab and Archive are
supporting footer paths. Contact is a direct email link, with existing public profiles.
Do not invent availability promises, response times, business impact or experience.

## Validation

Unit/content tests, lint, types, static build and internal links precede browser QA.
The deployment workflow gates publication on Chromium, Firefox and WebKit route,
contrast, responsive, keyboard, touch, theme and dialog checks. Automated axe results
are evidence, not a claim of full WCAG conformance. See the dated audit for measured
performance and coverage limits; never place stale test counts in the product UI.
