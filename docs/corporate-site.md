# RIT corporate site

The public site is a bilingual corporate presentation for verified RIT work. Its primary routes are `/about`, `/divisions`, `/services`, `/research`, `/projects`, `/apps`, `/news`, `/gallery`, `/resources`, `/founder`, `/achievements`, `/partners`, `/search`, and `/contact`.

The global shell lives in `components/site`. `CorporateHeader` provides desktop dropdowns, mobile accordions, active-route styling, persistent Bangla/English selection, and persistent light/dark theme. `CorporateFooter` contains only real routes and no unverified social or contact links.

Published Supabase records are used when Supabase is configured. Curated fallback projects, apps, news, founder content, achievements, timeline items, and gallery placeholders keep the public site usable without credentials. Resources and partners intentionally show an honest empty state when no verified records exist.

## Content workflow

1. Sign in at `/admin/login` with an authorized Supabase Auth account.
2. Create or edit a record in its module.
3. Complete both language fields where reliable translations exist.
4. Set an accurate status, add media and SEO copy, then preview.
5. Publish only after factual and image-rights review.

Never publish draft results, private messages, credentials, internal contact data, or unsupported claims.
