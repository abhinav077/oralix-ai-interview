# Oralix Visual Redesign Design

## Goal

Elevate every existing Oralix route into one premium, coherent product experience while preserving all authentication, authorization, navigation, database, credit, payout, scheduling, interview, Stream video/chat, AI-question, and API behavior.

## Design direction

The visual language is **Obsidian / saffron editorial**:

- Near-black canvas with subtle mineral tonal shifts instead of flat black.
- Saffron used as a precise action and progress signal, not as a blanket gradient.
- Warm stone and graphite surfaces with fine borders, controlled shadows, and limited radius.
- Geist display and utility typography with a clear contrast between expressive headings and compact operational UI.
- Editorial spacing, architectural rules, asymmetrical composition, and deliberate empty space.
- No numeric section labels, arbitrary badges, decorative noise, excessive glassmorphism, or gratuitous glow.

## Protected behavior

The redesign must not change:

- Clerk provider configuration, sign-in/sign-up behavior, role redirects, or route protection.
- Server actions, Prisma queries, API contracts, validation, credits, balances, transactions, withdrawals, or pricing checkout behavior.
- Interviewer/interviewee permissions, onboarding decisions, booking/slot confirmation, appointment data, or payout flow.
- Stream call lifecycle, recording stop behavior, video controls, chat channel membership, AI-question generation, or leave routing.
- Existing route paths and links.

UI components may receive new class names, wrappers, motion, and presentational composition only when event handlers, props, server data, and action boundaries remain equivalent.

## Shared system

### Tokens and type

Update `app/globals.css` and `lib/fonts.js` to provide:

- Geist display/body variables plus Geist Mono for utility metadata where useful.
- Background, surface, elevated surface, border, primary text, muted text, saffron action, success, warning, and destructive tokens.
- Tight display tracking, readable body measure, and responsive type scales.
- Shared focus-visible treatment with sufficient contrast.
- Reduced-motion overrides for all custom animation.

### Shared primitives

Refine `components/reusables.jsx`, `components/ui/button.jsx`, and the relevant UI primitives to establish:

- Page headers with editorial hierarchy and responsive actions.
- Solid, outline, quiet, destructive, and icon button variants with clear contrast.
- Surface, inset, table, status, input, select, tab, dialog, loading, error, and empty-state treatments.
- Consistent hover, press, focus, disabled, and selected states.
- Reusable `Reveal`, `SectionFrame`, `Metric`, `StatusBadge`, and `LogoMark` presentation primitives where they reduce duplication.

### Navigation and loader

Rebuild `components/Header.jsx` as a compact split navigation that retains the existing role-aware links, `CreditButton`, `UserButton`, Clerk controls, and `RoleRedirect`.

Add a client-only first-visit intro component mounted from `app/layout.jsx`:

- Uses `sessionStorage` to show once per browser tab/session.
- Does not replay during internal navigation or ordinary refreshes after completion.
- Is short and can yield immediately when application readiness requires it.
- Supports `prefers-reduced-motion` with a static mark reveal.
- Does not block protected pages or replace route loading states.

## Route design

### Marketing homepage

Refactor `app/page.jsx` into an AIDA sequence:

- **Attention:** artistic asymmetrical hero, wide 2–3-line headline, live product preview, two clear CTAs, and a restrained proof line.
- **Interest:** gapless dense capability grid using 12-column desktop packing (`7+5`, `4+4+4`, `6+6`) and responsive single-column flow.
- **Desire:** pinned proof/story composition with one scrubbed text reveal and one controlled stacking/product preview moment.
- **Action:** pricing section and high-contrast conversion block with a polished footer treatment.

Preserve the existing destination links, pricing checkout props, data-driven logo/avatar/tag/role/slot content, and all meaningful homepage copy. Static design must remain strong when motion is disabled.

### Auth and onboarding

Polish `app/(auth)/layout.js`, sign-in/sign-up pages, and `app/(main)/onboarding/page.jsx` with shared surfaces, typography, form states, focus states, and responsive layout. Keep Clerk components and onboarding role submission/navigation unchanged.

### Explore and interviewer profile

Redesign `app/(main)/explore/page.jsx`, `ExploreGrid.jsx`, `InterviewerCard.jsx`, `app/(main)/interviewers/[id]/page.jsx`, and `SlotPicker.jsx` as a discovery-to-booking flow:

- Editorial filter/header hierarchy.
- Intentional interviewer cards with clear availability and CTA states.
- Profile layout with stronger trust signals and calm slot selection.
- Keep all links, booking actions, selected-slot state, and router transitions unchanged.

### Appointments, dashboard, and payout

Redesign `appointments/page.jsx`, `AppointmentCard.jsx`, dashboard sections, `dashboard/page.jsx`, payout page, and `PayoutReviewClient.jsx` using the shared product system:

- Dashboard metrics, tabs, availability, appointments, earnings, and withdrawal history retain their existing data and action props.
- Empty, loading, success, and error states become first-class visual states.
- Tables/lists use strong alignment and density instead of nested rounded cards.
- Payout UI improves trust and transaction clarity without touching payout behavior.

### Live interview room

Polish `CallUI.jsx`, `CallRoom.jsx`, and `AIQuestions.jsx` in a dedicated calm mode:

- Preserve Stream `StreamTheme`, `SpeakerLayout`, `CallControls`, chat client/channel setup, recording stop, AI panel visibility, and leave behavior.
- Improve top-bar hierarchy, participant context, panel tabs, loading state, and responsive collapse behavior.
- Use only short opacity/transform transitions and clear state feedback; no scroll choreography or distracting ambient motion.
- Respect reduced motion and keep controls immediately usable by keyboard and pointer.

## Motion system

Use GSAP only for the homepage’s coordinated sequences:

- Hero reveal and one product-preview choreography.
- Scrubbed editorial copy reveal.
- One card/product stacking transition.

Use CSS or the existing motion package for small component transitions. Every GSAP context, listener, and ScrollTrigger must be cleaned up. Disable or simplify custom motion under `prefers-reduced-motion`. Functional pages use short transitions for tabs, dialogs, dropdowns, feedback, and status changes only.

## Responsive and accessibility requirements

- Validate phone, large phone, tablet, laptop, desktop, and large desktop layouts.
- Marketing motion simplifies at smaller breakpoints; product screens prioritize native-feeling interaction.
- Avoid horizontal overflow from animated or asymmetrical sections.
- Preserve semantic controls, keyboard navigation, visible focus, readable contrast, and accessible dialogs/forms.
- Do not depend on hover to expose critical information.

## Verification

After each route group:

- Run `npm run lint` and `git diff --check`.
- Run `npm run build` after shared-system and final route integration changes.
- Exercise route links and protected flows with the existing app data/configuration where available.
- Verify the live room renders without changing Stream lifecycle behavior.
- Check reduced-motion CSS and first-visit loader behavior in a clean browser session.
- Report any provider, credential, build, or browser limitation separately from code-level verification.
