# Q portfolio — production audit and implemented direction

Audit date: 9 September 2026. Live baseline: https://adulsaa-q.pages.dev/. Implementation: this repository, local production export. **These changes have not been deployed.**

## Executive Verdict

The current live site is a technically credible work record with a weaker personal introduction. Its source links, simulation disclosures, bilingual content, static architecture, and accessible fundamentals are stronger than its brand hierarchy. It looks like a carefully styled systems register. It does not yet consistently feel like the front door of an individual whom a business can hire.

The largest transformation is **from explaining the evidence system to showing useful work, introducing Q, and making the next action obvious**. Evidence should remain close to claims, with deeper implementation details available in case studies. It should not consume every layer of the story.

The implementation makes that transformation without replacing the framework, inventing credentials, or changing project results. It is a substantial product improvement, not a certification of “world-class” quality. Real audience testing, current Safari/Firefox coverage, and deployed performance verification remain release gates.

## Scope and evidence quality

Inspected all 13 content routes discovered in navigation, sitemap, and repository: eight general pages and five case studies. The initial 12-route capture returned HTTP 200 throughout; final sitemap-driven scanning covers all 13 routes. Captured full-page baselines; inspected desktop/mobile opening frames and final dark-mode composition. Read the actual content, shell, interaction components, metadata, theme initialization, headers, test suite, and build configuration. Read the installed Next.js static-export and CSS guides before implementation.

Automated baseline: Chrome/Chromium through Playwright, initially 12 routes × 12 widths; the fifth case study was added during sitemap reconciliation and the final scanner covers all 13 routes; axe WCAG A/AA tags; runtime/network capture; Lighthouse mobile lab runs on live and local export; production build and 90 existing tests; 23 distinct external links in the initial inventory; dependency audit. The baseline had zero recorded runtime errors, zero scanned axe violations on the initial 12 routes, and no document overflow at the tested widths. This is a sound starting point, not evidence of complete WCAG conformance.

Confidence vocabulary: **Confirmed** = observed in code, response, screenshot, or reproducible check; **Strong evidence** = expert interpretation supported by those observations; **Hypothesis** = needs real visitors or field data. Scores below are expert assessments, not analytics or accessibility certification. They rate the **live baseline**, not the unpublished revision.

## Scorecard — live baseline

| Dimension | /100 | Basis |
|---|---:|---|
| Brand Identity | 48 | Orbit Q, Q // Systems, and capability wording compete with the person |
| First Impression | 58 | Useful opening sentence; person and actual artifact are secondary |
| UX | 69 | Working routes and controls; excessive explanatory stages |
| UI / Visual Design | 62 | Restrained colors, but repetitive instrumentation and tiny labels |
| Information Architecture | 52 | Method/Services/About overlap; Lab/Archive repeat records |
| Typography | 74 | Good local bilingual family, inconsistent density and metadata scale |
| Storytelling | 49 | Proof taxonomy leads more often than practical problem-solving |
| Portfolio / Case Studies | 76 | Real artifacts and decisions; missing verified operational outcomes |
| Trust | 72 | Honest disclosures undermined by stale QA claims and one broken source |
| Conversion | 56 | Services secondary; contact begins with inspection instructions |
| Mobile | 78 | Reflows across requested widths; long path to work and contact |
| Accessibility | 80 | Clean baseline axe scan; system theme and modal completeness need work |
| Performance | 68 | Live lab 76; high TBT in that run; oversized source images |
| SEO | 84 | Metadata, sitemap, canonical, social tags; identity/schema refinements needed |
| Engineering | 74 | Static typed architecture and tests; 5,161-line CSS cascade |
| Security | 78 | Strong deployed headers; inline CSP allowance and dev-tool advisories |
| QA / Production Readiness | 68 | Tests pass; hard-coded QA claims and browser coverage gaps |
| Distinctiveness | 52 | Technical personality exists, but repeated dashboard styling dilutes it |

## First-impression comprehension simulation

These are expert walkthrough predictions, **not timed user-research results**.

| Time | Likely understanding of live site | Main unresolved question |
|---|---|---|
| 3 seconds | Q works with data, BI, and automation; sober technical aesthetic | Is Orbit Q a person, studio, or product? |
| 5 seconds | Messy operational data becomes usable systems | What exactly could I hire Q to deliver? |
| 10 seconds | Detailed models and source evidence matter | Which visible demonstration is actual work, and where should I start? |
| 30 seconds | There are serious reporting case studies and declared limits | Why is the homepage explaining its verification machinery so often? |

The revised opening supplies Adul Sa-a / Q, the capability category, a plain-language promise, a committed dashboard, demonstration disclosure, Work CTA, contact CTA, and Bangkok timezone. Test this with five unfamiliar visitors: ask who the site belongs to, what Q builds, what is simulated, and where they would go for a project or role. Do not ask whether they “like the design.”

## Major findings and decisions

| Page/component | Problem and evidence | Why it matters / root cause | Priority, effort, confidence | Change and expected impact |
|---|---|---|---|---|
| Global identity | Header says Orbit Q; footer Q // Systems; full name mostly footer | Brand naming expresses a concept before identifying the professional | P1 · S · Confirmed inconsistency; confusion is a hypothesis | Implemented Adul Sa-a / Q in shell and introduction; retained Q mark. Easier recognition and attribution |
| Home hierarchy | Eight major stages plus repeated technical registers; work follows simulated HUD | Content organized by proof mechanism rather than visitor decision | P1 · L · Strong evidence | Implemented identity → selected work → services → person → contact. Reduces interpretive and scrolling burden |
| Home claims | Hard-coded 15/15 suites, 83 tests, 19 routes; actual baseline 17 suites/90 tests | Quality badges have no live data source and confuse framework build counts with content routes | P1 · S · Confirmed | Removed public QA scoreboard; dated results live in audit evidence |
| Artifact viewer | Invented PBIX file paths displayed despite explicit no-public-PBIX constraint | Presentation implies an available artifact that is not supplied | P1 · S · Confirmed | Replaced with descriptive project-artifact titles |
| Lab/Archive source | KBank repository returns 404 on GitHub and API | A proof link cannot establish trust when unavailable | P1 · S · Confirmed | Preserved record and limitation, replaced link with “Public source unavailable” |
| Theme | Inline script sets light unless stored dark; never follows initial OS theme | Theme initialization contradicts CSS fallback; preference layers incomplete | P1 · M · Confirmed | Honor explicit choice, otherwise system theme; follow OS changes until overridden |
| Contact | SSR email unlinked; homepage already exposes same email; intro mentions unapproved addresses | Obfuscation creates friction without consistent privacy benefit; implementation language leaks into UX | P1 · S · Confirmed | Native mailto everywhere, human enquiry copy, timezone stated as timezone |
| About/Method/Services | Repeated capabilities and engagement models; About expressly avoids biography | Pages lack distinct responsibilities | P1 · M · Confirmed | About introduces person/philosophy; Method process; Services offer and boundaries |
| Hero imagery | Original lead screenshot contains “This visual does not support exporting” | Known export limitation is a poor first visual | P2 · S · Confirmed | Curated alternate committed screenshot for hero; original remains available as evidence |
| Image delivery | 821 KB hero PNG in first revision; local lab LCP 4.8 s | Full evidence resolution used for routine display | P1 · M · Confirmed | Generated responsive WebP derivatives with intrinsic dimensions; originals retained for dialogs |
| Mobile menu | Custom modal traps keys but background not inert, body still scrollable | Modal behavior incomplete beyond keyboard loop | P2 · M · Confirmed | Added inert background and scroll lock with cleanup; tested restoration |
| Image dialog | Generic zoom dialog has no accessible name | Visual purpose not programmatically explicit | P2 · S · Confirmed | Named dialog; carousel single-artifact region no longer references nonexistent tab |
| Case-study entry | Large title and image precede practical summary | Technical evidence not introduced by the problem it addresses | P2 · M · Strong evidence | Added problem, implementation scope, and constraint before lead visual |
| Global effects | Reveal observer and pointer spotlight run across routes | Decorative interaction adds execution and can hide content in captures | P2 · S · Confirmed | Removed global effect mounting; content always visible |
| Dependencies | Three moderate Vitest-family advisories from npm audit | Development tooling needs maintenance even when site is static | P2 · S · Confirmed | Patched Vitest/coverage to 4.1.11-compatible versions; audit clean |
| Structured data | CreativeWork uses codeRepository; identity only Q | Schema property/type alignment and identity attribution incomplete | P2 · S · Confirmed | CreativeWork isBasedOn points to source; Person full name plus alternateName |
| CSS architecture | 5,161 lines with several generations of hero rules | Accumulated overrides make changes unpredictable | P2 · L · Confirmed | Seven unreferenced components removed; new homepage isolated in CSS Module using existing tokens; broader legacy CSS consolidation remains |
| Evidence language | Repeated auditable/inspectable/bounded phrasing | Safety labels and internal taxonomy dominate visitor narrative | P2 · M · Strong evidence | Plain homepage/problem language; detailed boundaries remain in case studies |
| Schema-map viewer | Final sitemap scan found unfocusable scrollable code and dimmed-node contrast failures | Interaction styling reduced readability and excluded keyboard scrolling | P1 · S · Confirmed | Made named preview focusable; unrelated nodes use dashed borders rather than reduced opacity; final scan verifies |
| Font loading | Subset-only Fontsource CSS lacked unicode ranges; trace fetched Thai, then Latin-ext, then Latin | Browser discovers missing glyphs by downloading successive fallbacks | P2 · M · Confirmed | Added local font faces with upstream unicode ranges; font requests reduced from 10 to 7, compressed transfer 482 → 442 KiB, CLS 0 in follow-up lab |
| Schema copy and semantics | Clipboard write was not awaited; headings skipped a level; mode selector exposed incomplete tabs | UI could report a failed operation as successful and misstate interaction semantics | P2 · M · Confirmed | Await clipboard with error/manual-copy state, use pressed mode buttons, fix headings, disclose illustrative data; regression test added |
| Tiny technical UI | Several schema labels below 12 px; hover-oriented inspection hints | Compactness prioritized over legibility | P2 · M · Confirmed sizes; usability effect needs testing | Preserve zoom and keyboard tools; technical-viewer typography warrants further task testing |
| Browser coverage | Current Playwright cannot install Firefox/WebKit on macOS 13 | Host platform limits cross-engine verification | P1 release gate · M · Confirmed | Run current Safari, Firefox, and physical iOS checks on supported host before declaring release-ready |

No P0 outage, exposed credential, or broken primary route was found in the inspected scope. That does not prove an exhaustive security review.

## Page-by-page audit

| Route | Assessment and action |
|---|---|
| `/` | Most important redesign. Replaced rotating specialisms, proof token, faux telemetry, repeated architecture section, stats, and lab cards with curated editorial narrative. Actual work is now in the opening desktop frame. Two detailed previews retain case-study and source routes. |
| `/work/` | Correct place for all five projects. Preserved catalog, scope labels, technology/service information, and detail paths. Five projects do not justify adding more filtering. |
| `/work/ecommerce-sales-pipeline/` | Best reporting entry. Preserve equal elapsed-day reasoning and synthetic/anonymized disclosure. Introduce problem and implementation before screenshots. Public PBIX/API/refresh claims remain explicitly absent. Original export warning should be fixed in the source project when a genuine new export exists, never painted over. |
| `/work/shopee-thailand-analytics/` | Good complementary SQL/modeling case. Preserve simulation labels, SQL and DAX source paths, and schema exploration. Keep revenue/order counts inside their simulated context. Needs future evidence of reproducible analytical outputs, not invented customer impact. |
| `/work/finance-etl-pipeline/` | Useful automation breadth. Reconstructed flow remains labelled. Contribution and input constraints now precede deeper technical sections. Reliability statements must stay tied to actual implementation and tests. |
| `/work/timelimit/` | Demonstrates focused product engineering beyond BI. Retain as a secondary Work entry. Fixed one-image viewer semantics. Avoid promoting it above the data work in the primary positioning. |
| `/work/schema-map/` | Fifth case study discovered in final sitemap reconciliation. PostgreSQL metadata/Obsidian graph demonstration; retain experimental boundaries and diagram inspection. Final QA now discovers routes from the sitemap to prevent this coverage gap. |
| `/services/` | The canonical engagement page. Elevated to primary navigation. Preserve input requirements, deliverables, relevant case studies, and boundaries; avoid price or availability claims unsupported by owner information. |
| `/method/` | Now owns approach and delivery lifecycle. Removed duplicated service catalog and linked to Services. Preserved traceability principles and handover emphasis. |
| `/about/` | Replaced defensive “About the work” introduction and repeated catalog with Q’s name, Bangkok context, working philosophy, and collaboration expectations grounded in existing content. No employers, tenure, awards, or credentials invented. |
| `/contact/` | Replaced implementation-facing intro, enabled server-rendered mailto. Existing first-message guidance is useful and retained. Email, GitHub, Fastwork remain available. |
| `/lab/` | Retains experiment descriptions; no longer implies progression into client systems. Unavailable source visibly labelled. Description explains relationship to Archive. |
| `/archive/` | Retained as compact reference view of the same four records. This is not proof the projects are all historical or inactive. Kept out of primary navigation; future consolidation with Lab remains optional, with redirects if pursued. |
| 404 | Existing recovery links to Home and Work retained. Export file checked; actual Cloudflare missing-route response needs final deployed verification. |

## Information architecture

Primary navigation: **Work · Services · About · Contact**. Q mark/name returns home. Footer adds **Method · Lab · Archive** and direct contact profiles. No URL removal, framework migration, or new taxonomy.

Recruiters: opening identity → Work → About → email. Data leaders: selected case → decisions/model → source. Clients: problem/capability → Services → enquiry. Technical peers: case study → artifact/schema → repository. These share the same content rather than splitting into audience-specific landing pages.

Orbit Q survives as the existing Q symbol, not a competing verbal identity. There is no evidence that the name itself adds recognition for unfamiliar visitors. Keeping the mark preserves continuity without requiring the visitor to decode a studio-like name.

## Design direction and system

**Direction: a personal editorial portfolio of useful systems.** The signature is restrained technical annotation beside readable human explanation and unembellished artifacts. White/ink surfaces, rust accent rules, blue links, IBM Plex, numbered chapters, and deliberate whitespace connect the person to the work.

| System | Implemented rule / continued policy |
|---|---|
| Brand primitives | Q mark retained; Adul Sa-a / Q names the person; data/BI/automation names capabilities |
| Color | Existing semantic OKLCH tokens retained; rust for emphasis, blue for actions, positive color only for meaningful state |
| Surfaces | Page, secondary, raised, inverse; imagery keeps its source colors in either theme |
| Type | Local IBM Plex Sans and Thai; Mono reserved for short annotations. Body 16 px with comfortable leading; homepage metadata 12–15 px |
| Display | Fluid 44–75 px hero, 30–48 px section headings; short line lengths, left-aligned composition |
| Copy width | Body around 45–68 characters; technical detail uses existing readable container |
| Spacing | Existing token scale; homepage section spacing 56–112 px fluid; no full-screen empty hero |
| Grid | Two-column identity/artifact; two-column case previews; three service columns; asymmetric personal section |
| Container | Existing 82-rem cap, fluid gutters; homepage CSS Module isolates composition |
| Borders/radius | Hairlines separate chapters; rust rule anchors featured proof; modest radii for controls; no nested card system |
| Icons | Retain Q mark, existing theme icon, simple functional arrows; no new icon dependency |
| Images | Preserve originals; responsive 640/1280 WebP display variants; manifest records actual dimensions; enlarge to original |
| Code/diagrams | Existing viewers remain in relevant case studies; no fake live status or fabricated dashboard |
| Focus | Existing visible focus treatment; touch actions generally 44 px; forced-color focus explicit |
| Theme | System default, explicit persisted override; all semantic tokens adapt |
| Motion | 140 ms feedback / 220 ms transition vocabulary; reduced motion honored; no global reveal or spotlight |

A portrait could increase recognition and warmth, but no verified portrait was supplied. Do not invent or generate Q’s likeness. The implemented name, first-person explanation, location, and working style add humanity now. A real, voluntary portrait is a future editorial choice, not a release dependency.

## Responsive and motion strategy

Tested widths: 320, 360, 375, 390, 430, 768, 834, 1024, 1280, 1440, 1728, 1920. Homepage switches its major two-column layouts at 960 px; service/personal columns become single-column at 640 px. These are content-pressure transitions, not per-device patches. The header name remains visible on small screens. Short/landscape viewport and 640 px reflow were checked separately.

Screenshots are intentionally readable as overviews and enlarge for detail. Do not shrink whole schema tools until every field is illegible; preserve their inspection controls. Avoid sticky mobile contact bars that consume short viewports. Footer and menu account for safe areas. Native link navigation remains the main interaction model.

No autoplay carousel. No rotating hero claim. No scroll-dependent content visibility. Theme switching can crossfade when supported and motion is allowed. Modals use Escape, labelled purpose, focus containment, and focus restoration. Reduced-motion behavior delivers the same information and actions.

## Content and visual proof strategy

Primary story: what problem the work addresses and what the system enables. Secondary proof: committed image, implementation summary, source link, simulation label. Deep proof: constraints, decisions, architecture, validation, and limitations.

Use “What the system enables” for demonstrated capability; do not translate it into measured client results. Remove unsupported response-time, escrow, zero-attack-surface, and crawler-certification marketing from the homepage. Retain the existing project limitations verbatim where possible. No invented employment history, logos, testimonials, business results, or production use.

A static, captioned dashboard is stronger here than a simulated status panel. Two selected cases establish reporting and modeling breadth; the Work index carries the remaining projects. Curate source artifacts, including their flaws, instead of recoloring screenshots to match the site. Real project refreshes should replace outdated artifacts at source.

## Reference principle map

Current pages were researched on the audit date. These are design interpretations, not evidence of conversion performance. Browser captures for animation-heavy references were incomplete; the principle map uses readable page content where full visual rendering was unavailable.

| Reference | What works / why | Applies to Q? / reinterpretation |
|---|---|---|
| [Stripe](https://stripe.com/) | Outcome-first category framing, customer stories linked to concrete products | Yes: introduce practical reporting problems before tooling. No enterprise-logo or invented metric borrowing |
| [Linear](https://linear.app/) | Product workflow is concrete; progressive feature explanation | Yes: make artifact and decision paths inspectable. Do not copy dark visual identity or animated staging |
| [MotherDuck](https://motherduck.com/) | Technical category and action are explicit; warmth coexists with engineering | Yes: plain category, approachable copy, decisive primary action. No mascot/chat simulation |
| [Instrument](https://www.instrument.com/) | Short positioning leads into named work and project stories | Yes: curate work over exhaustive homepage catalog; no fabricated studio scale |
| [Ben Holmes](https://bholmes.dev/) | Person is immediately named and has a recognizable professional personality | Yes: say “I’m Q” and explain working habits. No borrowed illustrative style or purple treatment |
| [Simon Willison](https://simonwillison.net/) | Named authorship and linked technical writing build inspectable expertise | Yes: source links and specific decisions; avoid making Q’s storefront a chronological technical feed |

## Technical, accessibility, performance, SEO, and security plans

**Engineering:** Keep Next static export, TypeScript content model, local assets, existing case-study components, and tests. New homepage uses a CSS Module rather than another hero override stack. Removed obsolete global effect mounting and seven unreferenced homepage/decoration components. Explicitly declare sharp as build tooling for reproducible image variants, using the version already present through Next; no browser dependency added. Run `npm run images:optimize` after source image changes. A broader CSS/component dead-code pass remains valuable and should use route visual coverage rather than blind selector deletion.

**Accessibility:** Native email, named image dialog, valid single-artifact region, modal background isolation, system-theme behavior, visible focus, and server-rendered main content implemented. Automated light/dark scans and keyboard tests supplement visual review. Still required: VoiceOver reading-order tasks, real browser zoom to 200%, current Safari/Firefox, physical iOS, and detailed schema-viewer task testing. Zero axe violations does not establish [WCAG 2.2 AA conformance](https://www.w3.org/WAI/standards-guidelines/wcag/).

**Performance:** Remove repeated client demonstrations and global pointer/reveal effects. Use local font subsets with explicit unicode ranges, image dimensions, eager hero only, lazy lower images, responsive WebP display files, original evidence in inspection dialogs. Budget targets: display derivative ≤150 KB at 1280 px, initial compressed transfer ≤600 KB, homepage JS ≤150 KB compressed, CLS ≤0.1, mobile lab TBT ≤200 ms. Validate actual route cost, not just build size. Field targets remain [LCP ≤2.5 s, INP ≤200 ms, CLS ≤0.1 at p75](https://web.dev/articles/vitals). No field dataset or real-user INP was available; do not substitute Lighthouse TBT for INP.

**SEO:** Retain unique route metadata, canonical Cloudflare origin, sitemap, robots, Open Graph and X image. Name Q fully in page title/authorship and Person schema. CreativeWork now uses [isBasedOn](https://schema.org/CreativeWork) for repository provenance rather than a property belonging to a software-source type. No speculative SoftwareApplication, ratings, reviews, or rich-result claims. JSON-LD parsed and tested locally; Google indexing and rich-result eligibility are separate, unverified matters. ProfilePage is optional, not necessary for this remediation.

**Security/privacy:** Deployed HTTPS HTTP/2 response had CSP, frame denial, nosniff, referrer policy, permissions policy, and COOP. Added HSTS to the host header configuration, pending deployment verification. Static hashed assets retain immutable caching. CSP still allows inline scripts/styles required by current export; do not claim strict CSP. A hash-based script policy needs build-generated hashes and deployed route testing before tightening. No third-party tracker introduced; baseline page requests had no failed network requests. “No trackers” describes application scripts, not absence of Cloudflare edge logs/NEL. No tracked environment/private-key filenames or exported source maps were found in the scoped checks; this is not a secret-history audit. The [Vitest advisory](https://github.com/advisories/GHSA-82fw-gwwq-j7x9) affected development tooling; patched, with clean npm audit. Do not imply it was an exploitable static-site backend.

## Recorded performance snapshots

| Environment / stage | Performance | LCP | TBT | CLS | Transfer |
|---|---:|---:|---:|---:|---:|
| Live Cloudflare baseline | 76 | 1.6 s | 1,140 ms | 0.049 | 384 KiB |
| Local baseline, Python static host | 66 | 7.4 s | 100 ms | 0.053 | 1,457 KiB |
| First revision, original PNG hero | 79 | 4.8 s | 150 ms | 0.005 | 2,422 KiB |
| Responsive images, concurrent local checks | 60 | 6.8 s | 410 ms | 0.005 | 987 KiB |
| Isolated compressed local snapshot | 85 | 3.8 s | 100 ms | 0.005 | 482 KiB |
| Isolated compressed snapshot with priority hint | 85 | 3.8 s | 130 ms | 0.005 | 482 KiB |
| Corrected font unicode ranges | 85 | 3.7 s | 170 ms | 0 | 442 KiB |

All seven snapshots scored 100 for Lighthouse accessibility, best practices, and SEO. These categories are limited automated audits. The consistent image-byte reduction and lower CLS are useful findings; timing varies with host, compression, and competing work. **The final font-optimized compressed snapshot still misses the 2.5 s LCP target.** The release needs an isolated deployed run and remaining render-delay investigation; no passing Core Web Vitals claim is made. The hero display derivative is approximately 52 KB at 1280 px versus the 821 KB original, with the original preserved for inspection. A fetch-priority hint was added after the diagnostic identified its absence.

## QA matrix and release limits

| Check | Baseline / implementation result |
|---|---|
| Production build | Passed before and after; static export retained |
| Unit/component contracts | 90 baseline; 88 after replacing obsolete homepage content assertions and adding clipboard-failure coverage; all pass |
| Lint / TypeScript | Passed after changes |
| Internal links/assets | 16 exported HTML files checked; no unresolved references |
| Live route availability | All 13 content routes HTTP 200 |
| External references | 23 initial unique links checked; 22 returned 200, one KBank 404 labelled unavailable; four schema-map-route external URLs also returned 200 |
| Width sweep | Initial baseline 12 routes; final revision 13 routes × 12 widths in two themes, without document overflow |
| axe light/dark | Initial 12-route scans passed. Full inventory exposed schema preview focus and dimmed-node contrast failures; both fixed and rescanned |
| Desktop Chrome | Automated navigation, screenshots, runtime capture |
| Android-equivalent | Chromium touch/mobile viewport exercised; not physical Android |
| iOS-equivalent | Geometry covered; WebKit engine and physical iOS not tested |
| Safari current / Firefox current | Not completed: installed host macOS 13 unsupported by current Playwright browser packages; local Safari is 18.6, not a current-browser substitute |
| Keyboard | Menu loop/Escape/return, carousel arrow selection, modal return focus exercised |
| Theme | System initial/change, explicit choice, refresh persistence exercised |
| Reduced motion | Interaction run requested reduced motion; content remained accessible |
| Forced colors | Screenshot inspected; not a complete Windows high-contrast certification |
| Zoom/reflow | 640 px reflow checked; native 200% browser zoom remains unverified |
| No JavaScript | Identity, primary content, email usable; enhanced menu/viewers require JS |
| Back/forward, refresh, deep links | Exercised locally |
| Console/network | No pageerror or failed resource responses in recorded route scans |
| Slow connection | Lighthouse simulated mobile throttling; no field INP measurement |
| 404/header deployment | Export/config inspected; final live verification pending deployment |

See `evidence/verification.json` for final numerical results and tool versions. Local Python hosting does not apply Cloudflare compression or `_headers`; local and live Lighthouse runs must not be treated as interchangeable. Runs are lab snapshots, not statistically stable benchmarks.

## Prioritized backlog

| Priority | Work | Effort | Confidence | Status |
|---|---|---|---|---|
| P1 | Identity, homepage narrative, primary navigation | L | Strong evidence | Implemented |
| P1 | Remove stale QA and fake artifact filename implications | S | Confirmed | Implemented |
| P1 | Broken public proof link | S | Confirmed | Implemented unavailable state |
| P1 | Email path and theme preference | M | Confirmed | Implemented |
| P1 | Image delivery and first-view performance | M | Confirmed | Implemented derivatives; production measurement required |
| P1 | Supported-browser and physical-device release check | M | Confirmed coverage gap | Requires supported host |
| P2 | Distinct About/Method/Services responsibilities | M | Confirmed | Implemented |
| P2 | Accessibility interaction completeness | M | Confirmed | Implemented targeted fixes; assistive-tech pass remains |
| P2 | Dev-tool advisories and schema correction | S | Confirmed | Implemented |
| P2 | Consolidate legacy CSS and unused component families | L | Confirmed | Partial: homepage isolated; broader cleanup deferred |
| P2 | Improve source dashboard exports and source validation evidence | L | Strong evidence | Requires genuine project artifacts, not fabricated replacements |
| P2 | User comprehension/contact-path testing | M | Hypothesis | Not performed with real visitors |
| P3 | Optional real portrait and short verified experience story | M | Hypothesis | Owner material required; no placeholder invented |
| P3 | Strict CSP hash pipeline / external link scheduled checks | M | Strong evidence | Follow-up after deployment baseline |

## Deliberately unchanged

The Q symbol; factual project content and source provenance; simulation/reconstruction boundaries; five project routes; technical model viewers; bilingual content and local fonts; static Next architecture; semantic color primitives; no trackers; repository history; low-pressure contact; existing case-study evidence and limitations. There is no invented client outcome or claim that prototype work is production deployment.

## Things we should NOT add

- Fake client logos, testimonials, awards, tenure, or business metrics.
- A generated portrait pretending to be Q.
- Rotating hero claims, fake live telemetry, autoplay marquees, floating ornaments.
- A chat agent, contact backend, tracking script, or cookie banner without an actual need.
- More navigation categories or four separate audience homepages.
- Generic bento grids, glowing gradients, glass panels, or decorative technology pills.
- A CMS, framework rewrite, animation library, or new browser dependency for this scope.
- Schema ratings or unsupported “production-ready” badges.
- Recolored or retouched screenshots that conceal flaws in the source work.
- A public test-count scoreboard that silently goes stale.

## BEFORE → AFTER

Ambiguous systems brand → named professional with the same Q mark.

Simulated telemetry before work → actual dashboard artifact beside the introduction.

Eight-stage proof-heavy homepage → five-part path through identity, work, services, person, contact.

Repeated capability catalogs → distinct page responsibilities.

Hydration-dependent email → native mailto in server HTML.

Forced initial light theme → OS preference plus persistent choice.

Invented PBIX titles and broken source link → accurate artifact labels and visible availability state.

Full-size PNG display → responsive derivatives, original inspection retained.

Global reveal/spotlight effects → content visible immediately.

Undated QA badges → dated, reproducible audit evidence.

## Top 10 highest-leverage changes

1. Put Adul Sa-a / Q and practical capabilities in the first frame.
2. Lead with a committed artifact, not a simulated status panel.
3. Make Work, Services, About, Contact the primary paths.
4. Remove stale quality claims and invented artifact filenames.
5. Make email work immediately, including without JavaScript.
6. Give About a human role and Method a process role.
7. Explain each case’s problem and contribution before deep evidence.
8. Deliver appropriately sized images while preserving source originals.
9. Complete theme and modal behavior, not just their appearance.
10. Make supported-browser and deployed performance checks explicit release gates.

Final sitemap-driven scan: **26 route/theme combinations, 312 width checks, zero axe violations, zero document overflow, zero page errors, zero failed resource responses** after the schema-map fixes. Browser: Chrome 152.0.7977.84. This supersedes the initial incomplete 12-route scan and the intermediate schema-map failures. Method’s unstyled lifecycle was also moved onto the existing ordered process component rather than introducing another layout pattern.
