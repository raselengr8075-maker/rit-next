# Deployment checklist

- Run `supabase/schema.sql`, then `supabase/seed.sql`, in the existing Supabase project.
- Add Project URL, anon key, and service-role key to `.env.local` and Vercel environment variables.
- Run `npm run check:supabase`, `npm run test:supabase`, and `npm run build`.
- Create the first Auth user and insert its UUID into `admin_profiles`.
- Restart the app and test `/admin/login`, logout, unauthorized-user denial, CRUD, publish toggles, and delete confirmations.
- Upload JPEG, PNG and WebP test images; verify 5 MB and unsupported files are rejected.
- Confirm anonymous queries cannot read drafts and cannot write content or media.
- Verify public fallback content still works with all Supabase variables removed.
- Configure Resend separately, replace image placeholders, and review legal starter text.
- Never commit `.env.local`, expose the service-role key, or add admin links to public navigation.
