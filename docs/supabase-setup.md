# Supabase setup for `rit-website`

1. Open the existing `rit-website` project in Supabase.
2. Open **SQL Editor**, create a query, copy all of `supabase/schema.sql`, and run it.
3. Create a second query, copy all of `supabase/seed.sql`, and run it.
4. Open **Project Settings → API**.
5. Copy the Project URL, anon/public key, and service-role key. Keep the service-role key private.
6. Copy `.env.example` to the untracked `.env.local` file and set:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

7. Run `npm run check:supabase` and `npm run test:supabase`.
8. Restart `npm run dev` after changing environment variables.

The schema enables RLS, limits public queries to `published = true`, authorizes content writes through `admin_profiles`, and configures the public-read/admin-write `rit-media` bucket with a 5 MB limit and JPEG/PNG/WebP MIME allowlist. Re-running the schema drops/recreates named policies and triggers safely. Never place the service-role key in a `NEXT_PUBLIC_` variable or client code.
