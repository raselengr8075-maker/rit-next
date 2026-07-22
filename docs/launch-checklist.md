# RIT launch checklist

## Content

- [ ] Replace gallery placeholders with authorized media or leave them clearly labelled.
- [ ] Review every project/app status and remove unsupported claims.
- [ ] Review founder biography, interests, portrait rights, and Bangla copy.
- [ ] Add only verified partners, contact details, documents, and links.
- [ ] Confirm every published record has accurate bilingual fields and alt text.

## Configuration and security

- [ ] Set the final `NEXT_PUBLIC_SITE_URL`.
- [ ] Apply `schema.sql` or the Resources migration to the correct Supabase project.
- [ ] Add Vercel environment values without exposing secret values.
- [ ] Run `npm run check:supabase` and `npm run test:supabase`.
- [ ] Confirm RLS blocks draft reads and non-admin writes.
- [ ] Confirm contact messages are visible only to authorized admins.
- [ ] Test upload type, size, replace, and delete behavior.

## Quality

- [ ] Run `npm run build` with and without Supabase configuration.
- [ ] Test 1920, 1440, 1280, 1024, 768, 430, 390, and 360 px widths.
- [ ] Check keyboard navigation, focus, dialogs, forms, contrast, reduced motion, and image alt text.
- [ ] Test light/dark themes and Bangla/English on every route.
- [ ] Validate sitemap, robots, canonical metadata and structured data.
- [ ] Review privacy, terms and accessibility text with an appropriate professional; these pages do not claim legal certification.
- [ ] Verify the local assistant uses no external AI API and makes no unsupported answer.
- [ ] Establish a database/media backup and rollback procedure.
