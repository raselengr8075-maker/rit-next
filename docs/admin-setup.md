# First administrator

1. Complete `docs/supabase-setup.md`.
2. In Supabase open **Authentication → Users → Add user**.
3. Create the owner account with email/password; do not add public sign-up UI.
4. Copy the user's UUID.
5. In SQL Editor run the following with the real UUID and display name:

   ```sql
   insert into public.admin_profiles(id, display_name)
   values ('USER_UUID_HERE', 'RIT Owner')
   on conflict(id) do update set display_name=excluded.display_name;
   ```

6. Restart `npm run dev`.
7. Visit `/admin/login` and sign in.
8. Confirm a normal authenticated user without an `admin_profiles` row is denied.

Admin writes use the signed-in user's Supabase session and RLS. The service-role key is reserved for trusted server-only workflows such as accepting contact messages; it is never sent to the browser.
