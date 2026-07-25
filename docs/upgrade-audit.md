# Premium upgrade baseline audit

Audit date: 24 July 2026.

## Existing working architecture

- Next.js App Router and TypeScript with Server Components used for public data routes.
- Supabase public repositories fall back to curated local content when credentials or connectivity are unavailable.
- Supabase Auth, `admin_profiles` authorization, RLS, server-only service-role access, protected image uploads, and an admin CMS.
- Published projects, applications, news, founder, gallery, achievements, timeline, partners, and resources.
- English/Bangla preference, persistent light/dark theme, local deterministic assistant, contact validation, optional Resend delivery, sitemap, robots, metadata, structured data, and error/loading states.
- One CSP generated in `next.config.ts`; development conditionally permits `unsafe-eval`, production does not.

## Styling baseline

Tailwind CSS is not installed or configured. The application uses `globals.css`, `phase3.css`, `assistant-local.css`, `admin-supabase.css`, and `corporate.css`. The premium upgrade extends this established CSS architecture so there is one predictable styling system and no new runtime dependency.

## Upgrade gaps identified

- Header lacked scroll compaction, full-height drawer behavior, body locking, Escape handling, focus trapping, and an integrated command search.
- Hero used a generic panel instead of an original engineering/research visual.
- Division, service, project, app, news, process, milestone, founder, and placeholder treatments needed stronger visual specificity.
- Optional project/app/founder/gallery/timeline fields were not represented in typed public content or the admin editor.
- Assistant needed stronger focus management, reset/copy controls, clearer branding, and full-screen mobile behavior.
- Search needed grouped live results, broader published sources, keyboard shortcut support, and browser-only recent searches.
- Design-system and performance audit documentation were missing.

## Preservation constraints

The upgrade does not replace authentication, repositories, RLS, storage policies, API routes, metadata utilities, CSP ownership, or fallback behavior. New database columns are nullable and added through an idempotent migration.
