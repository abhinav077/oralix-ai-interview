# Oralix Design System

Status: owner-input baseline. This document is the visual source of truth for the Oralix redesign. Fonts and the initial component/effect choices are now recorded; final component documentation, texture location, and any exceptional asset requirements remain open.

## Product direction

Oralix is a modern, minimal interview-practice platform serving both interviewees and interviewers. The redesign may replace the existing visual hierarchy and composition completely, but it must preserve product truth: authentication, roles, discovery, booking, credits, billing, appointments, availability, earnings, payouts, Stream calls, chat, and AI interview support.

Visual direction: calm, editorial, precise, human, and interactive. The interface should feel authored and premium without becoming decorative, noisy, or generic SaaS.

The GPT taste skill owns the layout invention, UX hierarchy, page composition, responsive art direction, and visual refinement. Motion AI is the required local guidance/workflow for animation decisions, and the installed Motion package owns the implementation. Supplied components are structural references or implementation bases only: their default theme, fonts, colors, spacing, and visual identity must not leak into Oralix.

## Typography

Three type roles are confirmed:

| Role | Font | Usage |
| --- | --- | --- |
| Eyebrow | Didoska | Small section labels, context markers, metadata accents, and compact editorial cues. |
| Heading | The Seasons | Hero headlines, page titles, feature statements, and high-value emphasis. |
| Subheading/body | Satoshi | Paragraphs, controls, navigation, forms, data, helper text, and accessible UI copy. |

### Font installation

Add the supplied font folders here:

```text
app/
  fonts/
    didoska/
      Didoska-Regular.woff2
    the-seasons/
      TheSeasons-Regular.woff2
    satoshi/
      Satoshi-Regular.woff2
      Satoshi-Medium.woff2
      Satoshi-Bold.woff2
```

The supplied `.ttf` and `.otf` files are acceptable. Keep font files local and do not load them from Google Fonts or a remote stylesheet. Preserve the exact filenames; the implementation will register the selected files with `next/font/local` and map them to design tokens. Prefer converting or selecting a stable webfont file only if build size or browser compatibility requires it.

Required weights to provide if available:

- Didoska: regular.
- The Seasons: regular plus italic or display variant if supplied.
- Satoshi: regular, medium, and bold.

Do not add font files to `public/` unless a later implementation constraint requires CSS `@font-face`. The preferred path is `app/fonts/` so the fonts can be bundled through `next/font/local`.

## Color system

### Confirmed brand colors

| Token | Name | Value | Primary use |
| --- | --- | --- | --- |
| `--color-sidecar` | Sidecar Yellow | `#f3e8bc` | Main page background and warm canvas. |
| `--color-authentic-teal` | Authentic Teal | `#035352` | Primary text on light surfaces, primary actions, navigation emphasis, and dark panels. |
| `--color-wicker-green` | Wicker Green | `#9ed14b` | Positive emphasis, availability, selected states, and occasional energetic highlights. |
| `--color-morrow-white` | Morrow White | `#fbfbcc` | Elevated light surfaces, cards, form fields, and contrast against teal. |
| `--color-orient-blue` | Orient Blue | `#006887` | Secondary information, links, focus support, and selected product moments. |

### Proposed supporting colors

These are initial candidates, not final commitments. They should be checked against the supplied components and actual rendered contrast before implementation.

| Token | Name | Value | Intended role |
| --- | --- | --- | --- |
| `--color-deep-teal` | Deep Teal | `#023c3b` | Strongest dark surface and high-contrast text. |
| `--color-soft-teal` | Soft Teal | `#dcefee` | Teal-tinted field, hover, and informational background. |
| `--color-ink` | Warm Ink | `#142d2c` | Long-form text and neutral dark UI content. |
| `--color-yellow-wash` | Yellow Wash | `#fff6d6` | Light hover state and subtle highlighted region. |
| `--color-blue-wash` | Blue Wash | `#e4f2f5` | Orient Blue background tint for information states. |
| `--color-green-deep` | Deep Wicker | `#52751f` | Dark Wicker text and success-state contrast. |
| `--color-alert` | Burnt Coral | `#b95f45` | Destructive/error messaging only; never decorative. |
| `--color-warning` | Ochre | `#9a6a27` | Warning and attention states where yellow alone lacks contrast. |

Color rules:

- Sidecar Yellow is the default page canvas unless a task-specific surface needs a dark teal environment.
- Authentic Teal is the main product color and should carry most navigation, primary actions, headings on light backgrounds, and major dark regions.
- Wicker Green, Morrow White, and Orient Blue are supporting roles, not a rainbow palette.
- Every semantic color needs default, hover, active, focus, disabled, success, warning, and error behavior where applicable.
- All text and controls must meet WCAG AA contrast targets. Verify the actual rendered combinations before shipping.
- Do not use gradients, glows, or translucent effects as substitutes for hierarchy.

## Approved component and effect inventory

These are approved sources and intended roles. They are not a license to preserve their default appearance.

| Source | Component/effect | Intended role | Status |
| --- | --- | --- | --- |
| UI Layouts | `@ui-layouts/footer-hero` | Footer structure and closing brand moment. | Approved structure; Oralix theme required. |
| UI Layouts | `image-reveal` | Features/process storytelling with owner-provided or generated imagery. | Approved; section composition to be selected by GPT taste. |
| UI Layouts | `text-marquee` | A restrained transition or proof band, not a permanent distraction. | Approved; use at most where it supports the story. |
| UI Layouts | stacking cards | How-it-works/process or feature progression. | Approved; adapt copy, data, colors, and card geometry. |
| UI Layouts | shimmer-loader | Loading states across data-driven surfaces. | Approved; must use Oralix tokens and remain accessible. |
| React Bits | `PillNav-TS-TW` | Global navigation structure. | Approved structure; not a literal visual theme. |
| React Bits | `Ferrofluid-TS-TW` | Footer background atmosphere. | Approved effect; recolor and restrain for the light palette. |
| React Bits | `Grainient-TS-TW` | Hero background atmosphere. | Approved effect; light Sidecar/Teal treatment only. |
| OriginKit | `particlesphere` | One optional interactive feature/brand moment. | Approved; placement and reduced-motion fallback are open. |
| Lenis | `ReactLenis` | Site-wide smooth-scroll foundation. | Approved with accessibility and touch fallback review. |

Installation notes for implementation:

- `lenis` is the npm package; import `ReactLenis` from `lenis/react`. Do not use `npm install lenis/react` as a package name.
- Before installing registry components, inspect the generated files and adapt their imports to this repository's JavaScript/Tailwind v4 conventions.
- UI Layouts and React Bits components must be normalized into shared Oralix primitives so buttons, cards, text, focus states, and surfaces remain coherent.
- Do not add every available effect. Each effect needs a clear job in the page narrative and a reduced-motion/static fallback.

## Homepage information architecture

The homepage should expand to seven intentional chapters, including the footer:

1. Hero — explain the two-sided interview exchange immediately, with a clear primary action and light Grainient atmosphere.
2. The exchange — show what the interviewee receives and what the interviewer earns, using product-specific evidence rather than generic feature claims.
3. Features/process — use image reveal and/or adapted stacking cards to make the Oralix workflow tangible.
4. How it works — a clear three-step path from finding a perspective to booking a room to carrying the signal forward; use stacking motion only if it improves comprehension.
5. Pricing — preserve live Clerk plan data and checkout actions while redesigning the presentation completely.
6. Closing action — a concise invitation to enter Oralix, optionally supported by restrained marquee or particlesphere treatment.
7. Footer — use the footer-hero structure with Ferrofluid-inspired atmosphere recolored to the Oralix palette.

The exact section order, composition, and art direction remain GPT taste decisions within this content contract. The page must not become seven interchangeable cards or seven centered marketing blocks.

## Asset policy

- Generate the Oralix wordmark as Didoska text, then generate a matching favicon derived from the wordmark's simplest recognizable mark.
- Generate supporting images and illustrations when no owner asset is supplied. Generated assets must support the product story and must not invent customer, performance, or commercial claims.
- No video is currently available; do not make video a required dependency. Use still imagery, motion, and progressive enhancement instead.
- The owner says a texture has been added, but no texture file was found in the current repository scan. Record its exact path when supplied.

## Shape, spacing, and material

These values remain provisional until the supplied components are reviewed:

- Use one coherent radius language: soft medium corners for cards and controls, with pills reserved for compact status or filter controls.
- Use generous vertical pacing for marketing surfaces and tighter, scan-friendly rhythm for authenticated workspaces.
- Prefer borders, spacing, and grouping over excessive elevation.
- Use shadows sparingly and tint them toward Authentic Teal or the current surface color.
- Use a wide desktop container and intentional asymmetry where it improves hierarchy; preserve clear reading order on mobile.
- Do not create empty bento cells, accidental overflow, or narrow multi-line display headlines.

## Interaction and motion

Motion is mandatory and must use the installed `motion` package through `motion/react` unless a later approved component explicitly requires another compatible implementation. Before non-trivial animation work, consult the downloaded `.motion-ai/skills/motion/` guidance and available Motion AI documentation/resources.

Motion principles:

- Marketing surfaces may use expressive spring motion, scroll reveals, image movement, and choreographed section transitions.
- Product surfaces should prioritize state communication: selection, filtering, booking, tabs, dialogs, loading, feedback, and success.
- Live-call controls must remain stable and immediately usable; no animation may obscure mute, camera, leave, chat, or support actions.
- Use transform and opacity where possible; avoid layout thrashing and unbounded continuous effects.
- Respect `prefers-reduced-motion` by removing parallax, scrubbing, looping decoration, and nonessential choreography.
- Interactive elements require hover, focus-visible, active, disabled, loading, error, and success states where relevant.

## Accessibility and responsive rules

- Preserve semantic landmarks, keyboard navigation, visible focus, accessible names, and logical tab order.
- Do not rely on color alone for status, availability, rating, or booking state.
- Keep buttons and controls comfortably tappable on mobile.
- Desktop acceptance target: 1440px.
- Mobile acceptance target: narrow handheld viewport with no horizontal scrolling.
- Collapse navigation and dense workspace regions structurally, not by simply shrinking typography.
- Verify forms, dialogs, tabs, filters, slot selection, call controls, and empty/error states at both sizes.

## Pending owner inputs

The following must be supplied before finalizing the design contract or coding UI:

- Documentation or screenshots for any selected component whose behavior is ambiguous during implementation.
- Exact path/name of the supplied texture asset; current scan found no texture file.
- Any copy, imagery, or claims that must not be changed. Otherwise, preserve factual product data and allow GPT taste to refine presentation copy without inventing claims.
- Any specific illustration subject that should be generated. Otherwise, generated imagery is allowed where it materially improves the composition.
- Confirmation that the proposed supporting colors remain acceptable after contrast checks; the five named brand colors are confirmed, while supporting colors remain candidates.

## Implementation authority

When owner-provided inputs arrive, update this document first. The implementation must then follow the finalized tokens and component mapping. The GPT taste skill determines composition and UI/UX treatment within those constraints, and Motion determines the animation system. No application code should be considered final until this document and the build plan have their pending inputs resolved.
