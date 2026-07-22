-- Optional Resources module for RIT. Safe to run more than once.
create table if not exists public.resources (
 id uuid primary key default gen_random_uuid(), slug text unique not null, title_en text not null, title_bn text default '', description_en text default '', description_bn text default '', summary_en text default '', summary_bn text default '', content_en text default '', content_bn text default '', category text, file_url text, external_url text, thumbnail_url text, image_url text, status text not null default 'draft', published boolean not null default false, featured boolean not null default false, sort_order integer not null default 0, seo_title text, seo_description text, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
alter table public.resources enable row level security;
drop policy if exists "public read published" on public.resources;
create policy "public read published" on public.resources for select to anon, authenticated using (published=true or public.is_rit_admin());
drop policy if exists "admin insert" on public.resources;
create policy "admin insert" on public.resources for insert to authenticated with check (public.is_rit_admin());
drop policy if exists "admin update" on public.resources;
create policy "admin update" on public.resources for update to authenticated using (public.is_rit_admin()) with check (public.is_rit_admin());
drop policy if exists "admin delete" on public.resources;
create policy "admin delete" on public.resources for delete to authenticated using (public.is_rit_admin());
drop trigger if exists set_updated_at on public.resources;
create trigger set_updated_at before update on public.resources for each row execute function public.set_updated_at();
