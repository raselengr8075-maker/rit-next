# Phase 2 engineering experience

The homepage Engineering Experience upgrade adds verified statistics, a featured engineering-machine showcase, an engineering gallery, an interactive research journey, and an approved-partner logo wall. The completed hero, navigation, localization, theme, Supabase integration, local assistant, SEO and CSP remain unchanged.

## Data sources and verification

- Automatic statistics use exact counts of published Supabase rows only.
- Manual statistics come from `site_metrics` and appear only when `is_verified` and `is_visible` are both enabled. A source note is mandatory.
- Featured machines use published project records marked `featured_on_home`. Before the migration is applied, published legacy `featured` records are accepted as a compatibility fallback.
- Partner records must be published, approved and visible. The database RLS policy enforces all three conditions for public reads.
- No partner seed data is added.
- A missing Supabase configuration hides verified numbers, featured machines and partners without breaking the homepage.

## Image resolution and classification

Engineering gallery media resolves in this order:

1. Published, homepage-featured Supabase gallery records.
2. Existing files under `public/images/engineering`.
3. Branded abstract placeholders.

Every homepage visual shows one of these classifications:

- `Actual photograph`
- `Concept visualization`
- `Illustrative image`
- `Proposed facility`
- `Design representation`

Only owner-verified documentary media should use `Actual photograph`. Generated or aspirational facility visuals must use `Illustrative image` or `Proposed facility`.

## Optional local assets

The build does not require these files:

```text
public/images/engineering/
  rit-workshop-modern.png
  rit-rd-laboratory.png
  rit-cad-design-lab.png
  rit-3d-printing-lab.png
  rit-electronics-lab.png
  rit-testing-bench.png
  rit-cnc-milling-machine.png
  rit-cnc-lathe.png
  rit-plasma-cutter.png
  rit-agricultural-showroom.png
  rit-smart-agriculture-field.png
```

If supplied, they are classified as illustrative until the owner explicitly replaces that classification in a published database record.

## Database changes

Apply `supabase/migrations/20260725_phase2_engineering_experience.sql` after the existing schema and migrations.

- `projects`: `content_type`, `image_classification`, `featured_on_home`, `featured_rank`
- `gallery_items`: `image_classification`, `featured_on_home`, `display_order`, `source_type`
- `partners`: `is_approved`, `is_visible`, `relationship_type`, `display_order`
- New `site_metrics` table with verification, visibility, ordering, source and icon fields

The migration is additive and idempotent. Existing partner records default to not approved and not visible; this is intentional.

## Admin usage

- `/admin/projects`: use the existing CRUD editor, then set homepage rank, development stage, year, hero image and classification in **Homepage presentation metadata**.
- `/admin/gallery`: add the normal gallery content first, then add classification, localized caption and alt text, related project, homepage visibility and display order.
- `/admin/partners`: publish only a confirmed relationship, then separately enable **Approved for public display** and **Visible**.
- `/admin/metrics`: create manual metrics only with a defensible source note. Enable both **Verified** and **Visible publicly** to display them.

## Research journey

The seven-stage timeline is a localized working framework. It explicitly states that stages can repeat or stop and that not every project reaches deployment. The timeline remains readable without animation and becomes vertical on mobile.

## Accessibility and performance

- Counters retain their final server-rendered value without JavaScript and animate once when visible.
- Counter and timeline motion respects `prefers-reduced-motion`.
- Gallery lightbox supports keyboard navigation, Escape, focus trapping and touch swipe.
- Images use `next/image`, responsive `sizes`, stable aspect ratios and runtime fallback handling.
- Below-the-fold imagery remains lazy-loaded.
