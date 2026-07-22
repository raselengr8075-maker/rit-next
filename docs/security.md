# Security assumptions and controls

Supabase Row Level Security is the primary data boundary. Anonymous users can select only records where `published = true`. Authenticated content writes require `public.is_rit_admin()`, which checks `admin_profiles`. Contact messages and settings have no public policy. Storage uploads/changes require the same admin check; public access applies only to media in `rit-media`.

The service-role key is server-only and must never use a `NEXT_PUBLIC_` name. Browser code receives only the project URL and anon key. The admin verifies the current Auth user and their `admin_profiles` row on the server. Proxy middleware refreshes admin Auth cookies but does not replace authorization checks.

Contact and assistant endpoints use Zod limits, honeypot/consent checks where applicable, and in-process rate limits. Vercel multi-instance rate limiting is best-effort; move limits to a shared free-compatible store only if abuse requires it. User text is escaped before email HTML. Uploads verify size, MIME type, file signature, unique server-generated path, and admin authorization.

Global headers disable framing, MIME sniffing, sensitive browser capabilities, and broad referrer leakage. The CSP allows the application, configured Supabase connections, optional Resend requests, local data/blob media, and Next.js inline bootstrapping. Review it when adding a third-party origin.

Operational responsibilities: enable MFA where available, protect Supabase/Vercel accounts, rotate exposed keys, review admins, back up database/content, keep dependencies patched, review logs without storing unnecessary personal data, and test RLS after schema changes.
