# Oralix Visual Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign every Oralix route with a coherent premium Obsidian / saffron editorial system while preserving all existing product logic and protected integrations.

**Architecture:** Establish tokens and reusable presentation primitives first, then apply them to the shared shell, homepage, discovery/booking routes, account/product routes, and finally the live interview room. Keep server components, server actions, route paths, Clerk behavior, Prisma data, checkout behavior, and Stream lifecycle boundaries intact; only presentation composition, styling, and client-side motion may change.

**Tech Stack:** Next.js 16 App Router, React 19, Tailwind CSS v4, `next/font`, Clerk, Prisma actions, Stream Video/Chat, existing `motion` package, GSAP only for homepage choreography, Lucide icons.

## Global Constraints

- Preserve all authentication, authorization, navigation, database, credit, payout, scheduling, interview, Stream video/chat, AI-question, and API behavior.
- Do not change existing route paths or server action/API contracts.
- Use the Obsidian / saffron editorial visual language: near-black canvas, mineral surfaces, precise saffron actions, architectural rules, and restrained radius.
- Use Geist display/body typography and Geist Mono for utility metadata where useful; do not introduce Inter.
- Homepage motion intensity is approximately 50–60%; general product screens 15–25%; the live interview room 5–15%.
- Support `prefers-reduced-motion`, keyboard navigation, visible focus states, semantic controls, usable dialogs/forms, and readable contrast.
- The homepage grid must use `grid-flow-dense` and mathematically pack planned 12-column rows as `7+5`, `4+4+4`, and `6+6`.
- Keep the live interview room stable and immediate; no scroll choreography or ambient motion during a call.
- Preserve unrelated dirty worktree changes; never use `git add -A`, `git commit -a`, reset, checkout, or destructive cleanup.
- Each task ends with focused verification. Run `npm run lint`, `git diff --check`, and the relevant route/build check before moving on.

---

## File Map

- `app/globals.css`: global tokens, type scale, focus treatment, reduced-motion rules, surface utilities.
- `lib/fonts.js`: Geist and Geist Mono font variables.
- `components/reusables.jsx`: shared page-header, section, metric, status, and reveal presentation primitives.
- `components/ui/button.jsx`: high-contrast button variants and interaction states.
- `components/ui/{badge,card,input,tabs,dialog}.jsx`: shared product surface/control refinements where current styles leak into routes.
- `components/Header.jsx`: role-aware shared navigation composition only; preserve existing Clerk and redirect logic.
- `components/FirstVisitIntro.jsx`: new session-scoped client intro.
- `app/layout.jsx`: mount shared intro and retain providers/toaster.
- `components/HomeMotion.jsx`: new homepage-only GSAP client choreography and reduced-motion handling.
- `app/page.jsx`: marketing homepage composition and data-preserving content.
- `app/(auth)/**`, `app/(main)/onboarding/page.jsx`: auth/onboarding presentation.
- `app/(main)/explore/**`, `app/(main)/interviewers/[id]/**`: discovery and booking presentation.
- `app/(main)/appointments/page.jsx`, `components/AppointmentCard.jsx`: appointment presentation.
- `app/(main)/dashboard/**`: dashboard presentation with existing data/action props.
- `app/(main)/payout/[id]/**`: payout presentation with existing review behavior.
- `app/(main)/call/[callId]/_components/{CallUI,CallRoom,AIQuestions}.jsx`: calm live-room presentation only.

## Task 1: Establish the visual foundation

**Files:**
- Modify: `lib/fonts.js`
- Modify: `app/globals.css`
- Modify: `components/reusables.jsx`
- Modify: `components/ui/button.jsx`
- Modify: `components/ui/badge.jsx`
- Modify: `components/ui/card.jsx`
- Modify: `components/ui/input.jsx`
- Modify: `components/ui/tabs.jsx`
- Modify: `components/ui/dialog.jsx`
- Test: existing lint/build commands; add no business-logic tests

**Interfaces:**
- Consumes: existing `cn`, CVA, Radix Slot, Radix dialog, and current component props.
- Produces: stable visual primitives consumed by every route without changing public event or data props.

- [ ] **Step 1: Capture the current baseline.** Run `git status --short`, `npm run lint`, and `git diff --check`; record any pre-existing failures without modifying unrelated files.
- [ ] **Step 2: Replace font declarations.** Export `headingFont`, `bodyFont`, and `monoFont` from `lib/fonts.js` using Geist-compatible variables while retaining the existing import names used by `app/layout.jsx`.
- [ ] **Step 3: Add the token layer.** Define dark-first background/surface/text/action/status variables in `app/globals.css`, add a responsive type scale, add `:focus-visible` rules, and add a `@media (prefers-reduced-motion: reduce)` block that disables smooth scrolling and custom transitions.
- [ ] **Step 4: Refine shared primitives.** Keep existing component signatures and update class composition for deliberate radius, border, surface, focus, selected, disabled, error, and loading states. Ensure `Button` variants retain every currently referenced variant name.
- [ ] **Step 5: Run focused verification.** Run `npm run lint` and `git diff --check`; resolve only errors introduced by this task.

## Task 2: Rebuild the shared shell and first-visit intro

**Files:**
- Create: `components/FirstVisitIntro.jsx`
- Modify: `components/Header.jsx`
- Modify: `app/layout.jsx`
- Modify: `app/(main)/layout.jsx`
- Test: manual session/navigation verification plus lint/build

**Interfaces:**
- Consumes: existing `checkUser`, `RoleRedirect`, Clerk `Show`, `SignInButton`, `SignUpButton`, `UserButton`, `CreditButton`, and current role-based links.
- Produces: a shared header that keeps the same rendered destinations and a client intro that uses the browser tab’s `sessionStorage` only.

- [ ] **Step 1: Create the intro state machine.** Implement `FirstVisitIntro` as a client component with `hasSeenIntro` initialized from `sessionStorage`, guarded for SSR, and a completion handler that writes a versioned key before unmounting.
- [ ] **Step 2: Add reduced-motion and readiness behavior.** Use a short opacity/clip reveal for normal motion, static content for reduced motion, and render no blocking overlay once the intro has completed or cannot safely access storage.
- [ ] **Step 3: Recompose the header.** Preserve all existing role branches and props, but create a compact split nav with a clear mark, responsive link grouping, stable credit balance, and keyboard-visible actions. Do not alter `checkUser` calls, redirects, Clerk modes, or destination paths.
- [ ] **Step 4: Mount the intro without route replay.** Add it inside the provider shell in `app/layout.jsx`; preserve `ClerkProvider`, `ThemeProvider`, `Toaster`, and children order. Keep main content available behind the overlay and preserve the main layout’s top spacing.
- [ ] **Step 5: Verify behavior.** Run `npm run lint`, `git diff --check`, then start the dev server and manually confirm: first tab shows intro, internal navigation does not, refresh after completion does not replay, a new tab has independent state, and reduced motion skips choreography.

## Task 3: Redesign the homepage and marketing motion

**Files:**
- Create: `components/HomeMotion.jsx`
- Modify: `app/page.jsx`
- Modify: `components/PricingSection.jsx`
- Modify: `components/Silk.jsx` only if required to reduce expensive rendering or improve cleanup
- Test: homepage render/link checks, lint, build, and responsive browser checks

**Interfaces:**
- Consumes: `AI_TAGS`, `AVATARS`, `LOGOS`, `ROLES`, `SLOTS`, `PricingSection` checkout props, existing `CodeDemo`, `Silk`, and all current homepage links.
- Produces: AIDA homepage with no changed navigation targets or checkout behavior; `HomeMotion` exposes presentation-only refs/animation and never owns product state.

- [ ] **Step 1: Preserve content and destinations.** Inventory every existing homepage link, data map, pricing prop, and CTA before restructuring; retain `/onboarding`, `/explore`, pricing checkout, logos, avatars, roles, tags, and slots.
- [ ] **Step 2: Implement the artistic-asymmetry hero.** Use a `max-w-6xl` headline container, intentional 2–3-line composition, one live product preview, two high-contrast CTAs, and no stamp icon or generic tag row.
- [ ] **Step 3: Implement the dense interest grid.** Use a 12-column `grid-flow-dense` layout with exact `7+5`, `4+4+4`, and `6+6` row packing; make each card useful and distinct rather than nesting cards inside cards.
- [ ] **Step 4: Add desire and action sections.** Add one pinned editorial proof/story area, a limited product preview stack, pricing, a final CTA, and a polished footer treatment with strong static hierarchy.
- [ ] **Step 5: Implement GSAP only in `HomeMotion`.** Use `gsap.context` and `ScrollTrigger` for hero reveal, one scrubbed text sequence, and one stacking sequence; use `matchMedia` or a reduced-motion check to disable the timelines and clean all triggers on unmount.
- [ ] **Step 6: Verify homepage behavior.** Run `npm run lint`, `git diff --check`, `npm run build`; exercise all CTA links and pricing checkout opening, then check phone/tablet/1440px desktop layouts for overflow, headline line count, and static reduced-motion presentation.

## Task 4: Apply the system to auth and onboarding

**Files:**
- Modify: `app/(auth)/layout.js`
- Modify: `app/(auth)/sign-in/[[...sign-in]]/page.jsx`
- Modify: `app/(auth)/sign-up/[[...sign-up]]/page.jsx`
- Modify: `app/(main)/onboarding/page.jsx`
- Test: Clerk-rendered route checks, lint, build

**Interfaces:**
- Consumes: existing Clerk components/providers and onboarding role submission/router logic.
- Produces: premium auth/onboarding surfaces with identical Clerk and onboarding behavior.

- [ ] **Step 1: Inspect current Clerk and onboarding props.** Confirm the exact appearance props, role values, form controls, server calls, and router destinations before edits.
- [ ] **Step 2: Recompose auth shells.** Add editorial brand context, responsive panel layout, surface hierarchy, and focus-safe spacing without replacing Clerk’s functional components.
- [ ] **Step 3: Recompose onboarding presentation.** Improve role choice, copy hierarchy, selected/pressed states, loading feedback, and mobile layout while leaving submission and router behavior unchanged.
- [ ] **Step 4: Verify.** Run `npm run lint`, `git diff --check`, `npm run build`, and manually confirm signed-out auth rendering plus both onboarding role destinations.

## Task 5: Redesign discovery and booking routes

**Files:**
- Modify: `app/(main)/explore/page.jsx`
- Modify: `app/(main)/explore/_components/ExploreGrid.jsx`
- Modify: `app/(main)/explore/_components/InterviewerCard.jsx`
- Modify: `app/(main)/interviewers/[id]/page.jsx`
- Modify: `app/(main)/interviewers/[id]/_components/SlotPicker.jsx`
- Test: route/link/booking checks, lint, build, responsive browser checks

**Interfaces:**
- Consumes: existing interviewer data, filters, profile links, slot state, booking action, and router pushes.
- Produces: consistent discovery-to-booking UI without changing the selected slot, confirmation, or destination contracts.

- [ ] **Step 1: Inventory interactive boundaries.** Mark every filter, interviewer link, slot click, booking submit, loading state, and router push so the redesign changes only wrappers and classes.
- [ ] **Step 2: Rebuild explore hierarchy.** Create an editorial header, clearer discovery rhythm, intentional list/grid density, and responsive controls; preserve all data-driven cards and links.
- [ ] **Step 3: Rebuild interviewer cards.** Add stronger identity, availability, expertise, price/credit clarity, and accessible hover/focus states without hiding essential data on hover.
- [ ] **Step 4: Rebuild the profile/slot flow.** Use a calm split profile layout and a focused slot picker with clear selected, unavailable, submitting, and success states; preserve the current router and booking action.
- [ ] **Step 5: Verify.** Run lint, diff check, build, then manually navigate Explore → profile → slot selection → booking confirmation and confirm mobile layout does not hide the primary action.

## Task 6: Redesign appointments, dashboard, and payout

**Files:**
- Modify: `app/(main)/appointments/page.jsx`
- Modify: `components/AppointmentCard.jsx`
- Modify: `app/(main)/dashboard/page.jsx`
- Modify: `app/(main)/dashboard/components/AppointmentsSection.jsx`
- Modify: `app/(main)/dashboard/components/AvailabilitySection.jsx`
- Modify: `app/(main)/dashboard/components/EarningsSection.jsx`
- Modify: `app/(main)/payout/[id]/page.jsx`
- Modify: `app/(main)/payout/[id]/_components/PayoutReviewClient.jsx`
- Test: focused action-preserving checks, lint, build, responsive browser checks

**Interfaces:**
- Consumes: existing server-loaded props, dashboard actions, tab values, appointment links, payout review actions, and toast/error behavior.
- Produces: polished operational screens with explicit loading/empty/error/success states and unchanged action boundaries.

- [ ] **Step 1: Capture data/action contracts.** Record each component prop, form action, tab value, link destination, and toast path before changing markup.
- [ ] **Step 2: Redesign appointments.** Replace generic card repetition with aligned schedule rows, status surfaces, responsive appointment details, and preserved call/recording links.
- [ ] **Step 3: Redesign dashboard.** Improve page header, balance metric, tabs, earnings, availability, appointments, and withdrawal history using shared primitives; keep `getAvailability`, `getInterviewerAppointments`, `getInterviewerStats`, and `getWithdrawalHistory` calls untouched.
- [ ] **Step 4: Redesign payout.** Make review details, amount, status, confirmation, and failure feedback visually trustworthy while retaining the existing payout action and navigation.
- [ ] **Step 5: Verify.** Run lint, diff check, build, and manually test the dashboard tab switch, availability save, appointment call link, earnings history, and payout confirmation with the current configured environment.

## Task 7: Polish the live interview room in calm mode

**Files:**
- Modify: `app/(main)/call/[callId]/_components/CallUI.jsx`
- Modify: `app/(main)/call/[callId]/_components/CallRoom.jsx`
- Modify: `app/(main)/call/[callId]/_components/AIQuestions.jsx`
- Test: Stream call render/lifecycle checks, lint, build, reduced-motion and responsive browser checks

**Interfaces:**
- Consumes: current Stream Video/Chat imports, `CallUI` props, `CallRoom` leave routing, `AIQuestionsPanel` props, chat channel setup, and recording behavior.
- Produces: calm responsive room presentation with the same Stream lifecycle and chat/AI interactions.

- [ ] **Step 1: Freeze protected behavior.** Compare the current call components against the dirty worktree diff and record `handleLeave`, recording stop, channel membership, active tabs, AI visibility, and router destinations.
- [ ] **Step 2: Improve room hierarchy.** Rework top bar, participant context, panel tabs, loading surface, and responsive panel collapse using presentation wrappers only.
- [ ] **Step 3: Improve panel states.** Add clear selected/focus/disabled/loading states to chat and AI tabs without changing `useCreateChatClient`, `channel.watch`, `stopWatching`, or panel conditional behavior.
- [ ] **Step 4: Keep motion restrained.** Use short CSS transitions for tab and panel changes, respect reduced motion, and avoid GSAP, scroll listeners, or animated controls inside the call.
- [ ] **Step 5: Verify.** Run lint, diff check, build, then load a configured call and confirm video layout, chat, AI questions, recording stop, leave routing, and narrow viewport usability.

## Task 8: Cross-route quality pass and release evidence

**Files:**
- Modify: only files identified by the verification pass; no unrelated logic changes
- Test: full lint/build plus manual/browser route matrix

**Interfaces:**
- Consumes: all completed visual primitives and route implementations.
- Produces: evidence-backed handoff with limitations clearly separated from verified results.

- [ ] **Step 1: Run static checks.** Run `npm run lint`, `npm run build`, and `git diff --check` from the final dirty tree; capture complete exit status and output.
- [ ] **Step 2: Run route matrix.** Check `/`, `/onboarding`, `/explore`, `/interviewers/[id]`, `/appointments`, `/dashboard`, `/payout/[id]`, and `/call/[callId]` at phone, tablet, and 1440px desktop widths where data/configuration permits.
- [ ] **Step 3: Run interaction matrix.** Verify auth entry points, role redirects, homepage CTAs, pricing checkout, explore/profile/booking, appointment call links, dashboard tabs/actions, payout review, call chat/AI/leave, and first-visit intro replay rules.
- [ ] **Step 4: Run accessibility/motion checks.** Keyboard-tab through shared controls, inspect visible focus, toggle reduced motion, confirm no critical information depends on hover, and check for horizontal overflow.
- [ ] **Step 5: Review the diff.** Confirm server actions, Prisma, API routes, auth, credits, payout, scheduling, and Stream lifecycle changes are absent except for presentational imports/classes; preserve unrelated user changes.
- [ ] **Step 6: Prepare handoff.** Report exact commands, route coverage, visual checks, remaining provider/browser limitations, and the inability to commit if `.git` remains read-only. Do not claim completion without fresh command evidence.

## Plan self-review

- Spec coverage: shared tokens, primitives, shell, first-visit loader, AIDA homepage, controlled GSAP, all route groups, calm live room, responsive behavior, accessibility, performance cleanup, and verification are covered by Tasks 1–8.
- Completeness scan: the plan contains concrete files, interfaces, commands, and acceptance checks for every task.
- Interface consistency: `FirstVisitIntro` is the only new shell state; `HomeMotion` owns homepage-only animation; route components retain existing data/action props; no task introduces a new server contract.
- Scope safety: all modifications are presentation-focused, with a specific freeze-and-diff step for the existing dirty call/dashboard/payout work.
