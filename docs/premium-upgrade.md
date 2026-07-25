# RIT premium upgrade

## What changed

The public experience now uses a documented token system, a compact responsive
navigation, live public-content search, an original engineering blueprint hero,
verified content metrics, editorial project and news layouts, an interactive
research journey, a filterable milestone timeline, honest media placeholders,
and an upgraded local RIT Smart Assistant.

The implementation deliberately keeps the existing CSS architecture. Tailwind
was not installed in the repository, so adding it would have introduced an
unnecessary second styling system.

## Database activation

Existing Supabase projects should run
`supabase/migrations/20260724_premium_content_fields.sql` in the SQL Editor once.
Fresh projects can run `supabase/schema.sql`, which includes the same idempotent
field additions. The migration does not remove or rename existing columns.

New fields are optional. Public components only display a field when it contains
real published data. Existing rows and fallback content therefore continue to
work without database changes.

## Media policy

Use the existing `rit-media` bucket. Images remain restricted to JPEG, PNG and
WebP with a 5 MB server-validated maximum. The new `media_assets` table is an
admin-only metadata catalog; public pages use media URLs from published content.
Abstract technical placeholders are visibly generic and must not be described as
photographs of a real RIT product or person.

## Environment and privacy

No new secret or public environment variable is required. Google Analytics only
loads when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is explicitly configured. Supabase,
email and the local assistant retain their existing safe fallback behavior.

## Validation

Run:

```text
npm run typecheck
npm run build
npm run check:supabase
```

`npm run test:supabase` requires configured Supabase credentials. There is no
lint or automated test runner dependency in this project; do not report those
checks as passing unless one is added later.
