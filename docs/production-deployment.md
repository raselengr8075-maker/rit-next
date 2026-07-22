# Production deployment

## Supabase

1. Create/use the existing RIT Supabase project.
2. Run `supabase/schema.sql` in SQL Editor for a fresh setup.
3. For an existing Phase 3 database, run `supabase/migrations/20260720_resources.sql` once.
4. Optionally run `supabase/seed.sql`; it contains honest starter records and explicitly labelled gallery placeholders, and no partners.
5. Create the first Auth user, then insert that user's UUID into `public.admin_profiles`.
6. Confirm RLS and storage policies before adding real content.

## Vercel environment

Required for Supabase mode: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and server-only `SUPABASE_SERVICE_ROLE_KEY`. Set `NEXT_PUBLIC_SITE_URL` to the production HTTPS origin. Optional email variables are `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL`. Contact submissions still save when Resend is absent.

Do not expose the service-role or Resend key through `NEXT_PUBLIC_*`. Do not paste values into source files, issues, screenshots, or build logs.

## Deploy and verify

Run `npm install`, `npm run check:supabase`, `npm run test:supabase` when credentials are present, and `npm run build`. Deploy from the repository root. Test `/`, key detail pages, `/search`, `/resources`, `/contact`, assistant behavior, language/theme persistence, `robots.txt`, `sitemap.xml`, and `/admin/login`. Verify an unauthorized Auth user is denied and drafts are not publicly queryable.

Use Supabase backups/export appropriate to the plan before major schema or bulk-content changes. Keep the SQL schema and migrations in source control, but never `.env.local`.
