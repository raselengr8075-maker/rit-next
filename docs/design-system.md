# RIT design system

## Color

- `--rit-navy-950` / `--rit-navy-900`: structural dark surfaces and high-trust backgrounds.
- `--rit-blue-600` / `--rit-blue-500`: primary actions, links, and research emphasis.
- `--rit-teal-600` / `--rit-teal-400`: engineering signals, active states, and small highlights.
- `--rit-cyan-100`: restrained technical glow and blueprint accents.
- Warm white, cool gray, slate, and blue-gray tokens provide surfaces, borders, and readable secondary text.

Gradients are limited to the hero, research journey, selected accents, assistant, and final CTA. General content surfaces remain solid.

## Typography

English uses a system-first sans stack with Manrope/DM Sans fallbacks already present. Bangla uses `Noto Sans Bengali`, `Hind Siliguri`, and platform Bengali fallbacks when locally available. Headings use fluid `clamp()` sizes, compact tracking, and balanced maximum widths. Body copy targets 60–75 characters per line and a minimum 1.65 line height.

## Spacing and layout

The base spacing unit is 4px. Common steps are 8, 12, 16, 24, 32, 48, 64, 80, and 112px. Public containers use a 1200px reading frame with 20px mobile gutters. Sections use `clamp(4.5rem, 8vw, 7.5rem)` vertical spacing.

Breakpoints:

- Compact phone: 320–479px
- Phone/tablet: 480–767px
- Tablet/small desktop: 768–1023px
- Desktop: 1024–1279px
- Wide desktop: 1280px+

## Components

Buttons have primary, secondary, quiet, and light variants with at least 44px touch height. Cards use solid surfaces, 1px directional borders, modest radius, and restrained elevation. Status badges reflect stored content state only. Technical placeholders are labelled abstract visuals, never documentary imagery.

## Motion

Motion communicates hierarchy: short reveal, line drawing, hover lift, arrow translation, and slow visual drift. Continuous decorative animation is limited to the hero and disabled by `prefers-reduced-motion`. No interaction waits for animation.

## Accessibility

Focus is always visible, icon-only controls have names, dialogs trap focus and close with Escape, mobile targets are at least 44px, color is not the sole state signal, decorative SVG is hidden, and Bengali spans carry `lang="bn"`. Layout and reading order remain logical without CSS.
