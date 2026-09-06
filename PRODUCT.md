# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

People evaluating Q's portfolio for data, BI, automation, reporting or internal-tool work.

## Product Purpose

An evidence-led personal portfolio that lets visitors understand Q's work, inspect real project artifacts, follow implementation evidence, and contact Q without overstating outcomes.

## Positioning

Q connects messy operational inputs to legible data systems and makes the evidence, boundaries and implementation decisions inspectable.

## Operating Context

Visitors arrive from the public web, scan selected case studies, open detailed work routes, inspect screenshots and source links, and may continue to services, archive, about or contact routes.

## Capabilities and Constraints

- Next.js static-export web application with existing routes for work, project details, services, archive, about and contact.
- Preserve truthful portfolio claims, evidence boundaries, working links, project artifacts and accessible light/dark theme behavior.
- Do not invent business outcomes, client claims, metrics, imagery or production proof.
- Mobile web must remain usable without horizontal overflow; controls need touch-sized targets.

## Brand Commitments

- The identity is Q / Adul Sa-a and the portfolio voice is specific, direct and evidence-led.
- Bilingual English/Thai copy is part of the identity.
- The redesign may become more visually compelling, but must remain a personal portfolio rather than a generic corporate landing page.

## Evidence on Hand

- Four project records in `src/content/projects.ts`.
- Committed artifact images under `public/images/` for the e-commerce, Shopee and TIMELIMIT projects.
- A reconstructed system diagram for the finance ETL project, explicitly labeled as reconstructed.
- GitHub source links, evidence classifications, tests and limitation statements in the existing content model.

## Product Principles

- Start with the source.
- Make the system legible.
- State what is not proven.
- Let artifacts lead the visitor into the detailed evidence.

## Accessibility & Inclusion

- Preserve keyboard focus, skip navigation, semantic headings and reduced-motion behavior.
- Keep light and dark themes readable and provide an accessible persistent theme toggle.
- Compose deliberately for desktop and narrow mobile viewports.
