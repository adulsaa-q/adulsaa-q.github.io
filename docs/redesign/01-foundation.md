# PHASE 1: DESIGN FOUNDATION (SUBSTRATE)

**Date:** September 2026  
**Status:** `COMPLETED & VERIFIED`  
**Target:** Design Tokens, Typography Scales, Spacing, Radius, Motion, Tabular Numbers  

---

## 1. OKLCH COLOR TOKEN ARCHITECTURE

All colors are strictly defined in `src/app/globals.css` using the `oklch()` color space. No hex, RGB, or HSL literals exist.

### Light Mode (Pure White Default Substrate)
* `--surface-primary`: `oklch(1 0 0)` (Pure `#ffffff` canvas)
* `--surface-secondary`: `oklch(0.975 0.003 250)` (Calm blueprint surface)
* `--surface-raised`: `oklch(1 0 0)` (Elevated modal/dialog surface)
* `--surface-inverse`: `oklch(0.16 0.02 250)` (High-contrast slate accent)
* `--text-primary`: `oklch(0.16 0.02 250)` (19.40:1 contrast ratio — WCAG AAA)
* `--text-secondary`: `oklch(0.46 0.02 250)` (7.11:1 contrast ratio — WCAG AAA)
* `--line-soft`: `oklch(0.94 0.004 250)` (Subtle interior divider)
* `--line-primary`: `oklch(0.89 0.008 250)` (Standard hairline blueprint grid)
* `--line-strong`: `oklch(0.72 0.015 250)` (Active focus and emphasized boundary)
* `--signal-primary`: `oklch(0.55 0.16 32)` (Terracotta action signal — 5.24:1 contrast)
* `--signal-information`: `oklch(0.48 0.16 255)` (Blueprint blue node signal — 6.63:1 contrast)

---

## 2. 4PX BASE HARMONIC SPACING SCALE

Standardized base tokens established:
* `--space-2xs`: `0.25rem` (4px)
* `--space-xs`: `0.50rem` (8px)
* `--space-sm`: `0.75rem` (12px)
* `--space-md`: `1.00rem` (16px)
* `--space-lg`: `1.50rem` (24px)
* `--space-xl`: `2.00rem` (32px)
* `--space-2xl`: `3.00rem` (48px)
* `--space-3xl`: `4.00rem` (64px)
* `--space-4xl`: `6.00rem` (96px)
* `--space-5xl`: `8.00rem` (128px)

---

## 3. ARCHITECTURAL RADIUS DISCIPLINE

To avoid generic AI blob containers, border-radii are constrained to clean architectural geometry:
* `--radius-sm`: `3px` (Badges, pills, code tags)
* `--radius-md`: `6px` (Buttons, inputs, tabs)
* `--radius-lg`: `8px` (macOS artifact windows, modal dialogs)
* **Maximum ceiling:** `8px`. Blob containers (`rounded-2xl`, `rounded-3xl`) are strictly prohibited.

---

## 4. TABULAR NUMERIC ALIGNMENT & MEASURE

* Added global `font-variant-numeric: tabular-nums lining-nums;` across all numbers, tables, time stamps, slide counters, and metric values.
* Enforced `--measure-normal: 68ch;` and `--measure-narrow: 45ch;` to ensure optimal reading measure.

---

## 5. RESTRAINED MOTION TOKENS

* `--motion-instant`: `80ms` (Micro button presses)
* `--motion-fast`: `140ms` (Tab switching, hover states)
* `--motion-base`: `220ms` (Modal dialogs, drawer expansion)
* `--motion-ease`: `cubic-bezier(0.16, 1, 0.3, 1)` (Immediate response, calm deceleration)
* Strict `prefers-reduced-motion` compliance preserved.
