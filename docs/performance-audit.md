# Performance audit

## Major changes

The premium visual system is implemented with CSS and small inline SVG components. No animation, carousel, masonry, or search dependency was added. Server Components remain the default; client code is limited to navigation, search dialog, assistant, carousel, filters, lightbox, theme/language, and small motion state.

## Image strategy

Public content uses `next/image` with responsive `sizes`. Above-the-fold priority is reserved for a real hero image when one is explicitly available. Missing assets use lightweight RIT SVG/CSS placeholders rather than downloaded stock imagery. Gallery and carousel images remain lazy by default.

## JavaScript strategy

CSS handles layout, hover, reveal, reduced motion, and most visual effects. The command search debounces requests and caps results. The assistant remains deterministic and uses its existing 500-character boundary. No paid service or large UI library was introduced.

## Caching and data queries

Public repositories request only published rows and safely fall back when Supabase is unavailable. Search results are bounded. Large future collections should add cursor pagination and explicit column selections per view rather than returning `*`.

## Future recommendations

- Generate a typed Supabase schema and replace generic database row types.
- Add image transformations/custom loader when the production Supabase image pipeline is finalized.
- Add shared, deployment-aware rate limiting if public abuse appears.
- Add automated Lighthouse and browser accessibility checks in CI.
- Add cursor pagination before any public content collection exceeds roughly 100 records.
