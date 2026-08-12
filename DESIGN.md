# Oralix Design System

<!-- impeccable:design-system 1 -->

## Direction

Cream broadsheet, dark velvet chambers. Oralix uses an editorial software language inspired by the supplied Wispr Flow reference: warm paper-like cream, near-black sections, oversized regular serif display type, geometric sans-serif UI text, flat bordered surfaces, and deliberate rounded chambers.

The token sheet is a palette and material reference, not a component template. Composition, scale, interaction behavior, art direction, visual hierarchy, and motion are intentionally open to high-conviction interpretation. Marketing surfaces may become cinematic, asymmetric, image-led, kinetic, or experimental when that improves the product story. Operational surfaces should retain the same visual world while prioritizing clarity and task completion.

### Art-direction dials

- Design variance: 9/10 for the public experience; 6/10 for operational surfaces.
- Motion intensity: 8/10 for the public experience; 5/10 for operational surfaces.
- Visual density: 4/10, with deliberate breathing room and occasional concentrated moments.
- Motion must communicate hierarchy, progression, feedback, or state. Respect reduced-motion preferences.
- Use real, art-directed imagery when a surface needs atmosphere or a visual anchor. Do not use unreadable generated UI or generic decorative blobs.
- Prefer varied composition: image-as-canvas, off-grid editorial offsets, pinned-feeling narratives, asymmetric role splits, and product artifacts that are actual UI components.

This is a visual and UX direction only. Preserve all existing business logic, authentication, data contracts, booking, interviews/calls, chat, credits, payouts, and integrations.

## Platform and Layout

- Platform: web
- Maximum content width: 1200px
- Base spacing unit: 8px
- Comfortable density
- Major section gap: 64–96px
- Card padding: 32px
- Internal element gap: 8–16px
- Content is generally left-aligned; do not center body copy.
- Use full-bleed alternating cream and dark section chambers with 40–80px outer radii.
- Navigation uses a floating cream pill with a 2px ink border and breathing room from viewport edges.

## Colors

```css
:root {
  --color-lavender-whisper: #f0d7ff;
  --color-forest-ink: #034f46;
  --color-ember-glow: #ffa946;
  --color-vast-ink: #1a1a1a;
  --color-lumen-cream: #ffffeb;
  --color-lumen-stone: #e4e4d0;
  --color-fog: #8a8a80;
  --color-charcoal: #222222;
  --color-pure-white: #ffffff;

  --surface-cream-canvas: #ffffeb;
  --surface-dark-chamber: #1a1a1a;
  --surface-lavender-accent: #f0d7ff;
  --surface-forest-panel: #034f46;
}
```

- Lumen Cream is the default canvas.
- Vast Ink is primary text, borders, and dark chambers.
- Lavender Whisper is the sole primary action color.
- Forest Ink is for status, success, and secondary accent surfaces.
- Ember Glow is reserved for live/active states and occasional highlights.
- Do not introduce gradients or unrelated action colors.

## Typography

- Display/headings: EB Garamond, weight 400 only.
- UI/body: Figtree, weights 400, 500, 600, 700.
- Display headings rely on scale, not boldness.

```css
:root {
  --font-eb-garamond: 'EB Garamond', Georgia, serif;
  --font-figtree: 'Figtree', ui-sans-serif, system-ui, sans-serif;
  --text-caption: 14px;
  --text-body-sm: 16px;
  --text-body: 20px;
  --text-subheading: 24px;
  --text-heading-sm: 32px;
  --text-heading: 48px;
  --text-heading-lg: 64px;
  --text-display: 120px;
}
```

Recommended line heights: 1.3 for Figtree, 0.85–0.95 for large EB Garamond headings. Use tight negative tracking at large display sizes.

## Shapes and Elevation

- Cards: 32px radius.
- Dark chambers: 40–80px radius.
- Buttons and inputs: 12px radius.
- Badges and navigation pills: full pill radius.
- Interactive elements use 2px solid Vast Ink borders, or a readable cream border on dark surfaces.
- No box shadows, depth gradients, or generic floating elevation.
- Separation comes from flat fills, ink borders, and alternating chambers.

## Components

### Primary Action

Lavender Whisper fill, Vast Ink text, 2px Vast Ink border, 12px radius, Figtree 500 at 16px, 14–16px vertical and 16–24px horizontal padding. Use for the primary action in each context: book, join interview, become interviewer, withdraw, or continue.

### Secondary Action

Cream or transparent fill depending on surface, 2px contrasting border, 12px radius, Figtree 500 at 16px. Use for secondary actions.

### Ghost Action

No fill or border. Vast Ink text on cream, cream text on dark. Underline on hover.

### Cream Card

Lumen Cream fill, 32px radius, 32px padding, optional 2px Vast Ink border. Never place cream content on cream without a border or meaningful contrast.

### Dark Feature Chamber

Vast Ink fill, Lumen Cream text, 40–80px radius, generous 55–70px padding, no shadow. Use for interview moments, earning explanations, testimonials/evidence that actually exists, and feature demonstrations.

### Status Badge

Forest Ink fill, Lumen Cream text, full pill radius, 8px 16px padding, Figtree 500 at 14px. Use for available, confirmed, completed, and earned states.

### Active State

Ember Glow may indicate live calls, active recording, notifications, or currently selected availability. Keep it sparse and functional.

### Interview Activity Indicator

For live interview or recording states, use a cream pill with a 2px ink border and 5–7 animated vertical bars. Bars vary between 8–24px and pulse subtly. Respect reduced-motion preferences.

## Motion

- Use restrained scroll reveals, staggered content entrances, and subtle state transitions.
- Motion should clarify progression: discovery → booking → interview → reward.
- Use small hover shifts, underline drawing, active-state pulses, and waveform movement.
- Avoid decorative perpetual motion, excessive parallax, and motion that competes with interview actions.
- Provide reduced-motion fallbacks.

## Imagery and Graphics

- Prefer editorial product illustrations, interface previews, profile imagery supplied by the product, and flat device/mockup compositions.
- Do not use stock photography, abstract gradients, or gratuitous 3D renders.
- Use hand-drawn lavender underline accents sparingly for editorial emphasis.
- Product visuals should explain Oralix workflows: interviewer discovery, availability, interview room, credits, and payout conversion.
- Never invent testimonials, customers, metrics, or proof.

## Oralix Surface Adaptation

- Marketing/home: editorial hero, clear role-based entry points, and product workflow storytelling.
- Explore/interviewers: cream discovery canvas with bordered profile cards and teal availability/status badges.
- Booking: calm, highly legible slot selection; preserve date-specific availability behavior.
- Call/chat: dark chamber may frame the live interview; prioritize controls, participant identity, connection state, and accessibility.
- Dashboard: use cream/dark grouped chambers for appointments, availability, earnings, and credits without obscuring operational scanability.
- Payout: make earned credits, conversion, and withdrawal state explicit with restrained Ember active states.

## Non-Negotiables

- Preserve working logic and integrations.
- Use EB Garamond regular for display headings; never bold display headlines.
- Use Figtree for all UI and body text.
- Keep Lavender Whisper as the primary action color.
- Keep the cream/ink/teal palette disciplined.
- Use flat bordered surfaces instead of shadows and gradients.
- Maintain strong contrast, keyboard access, readable focus states, and reduced-motion behavior.
- The supplied Wispr Flow site is a style reference, not a source for copied branding, assets, wording, or claims.

## Reference

Visual reference supplied by the user: https://wisprflow.ai/
