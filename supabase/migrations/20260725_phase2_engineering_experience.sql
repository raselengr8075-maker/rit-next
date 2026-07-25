-- Phase 2 engineering experience fields. Additive, idempotent and safe for existing data.

alter table public.projects
  add column if not exists content_type text,
  add column if not exists image_classification text,
  add column if not exists featured_on_home boolean not null default false,
  add column if not exists featured_rank integer;

alter table public.gallery_items
  add column if not exists image_classification text,
  add column if not exists featured_on_home boolean not null default false,
  add column if not exists display_order integer not null default 0,
  add column if not exists source_type text;

alter table public.partners
  add column if not exists is_approved boolean not null default false,
  add column if not exists is_visible boolean not null default false,
  add column if not exists relationship_type text,
  add column if not exists display_order integer not null default 0;

create table if not exists public.site_metrics (
  id uuid primary key default gen_random_uuid(),
  label_en text not null,
  label_bn text default '',
  numeric_value numeric not null check (numeric_value >= 0),
  suffix text default '',
  source_note text not null,
  is_verified boolean not null default false,
  is_visible boolean not null default false,
  display_order integer not null default 0,
  icon_key text default 'verified',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.site_metrics enable row level security;
drop policy if exists "public read verified metrics" on public.site_metrics;
create policy "public read verified metrics" on public.site_metrics
  for select to anon, authenticated
  using ((is_verified = true and is_visible = true) or public.is_rit_admin());
drop policy if exists "admin insert metrics" on public.site_metrics;
create policy "admin insert metrics" on public.site_metrics
  for insert to authenticated with check (public.is_rit_admin());
drop policy if exists "admin update metrics" on public.site_metrics;
create policy "admin update metrics" on public.site_metrics
  for update to authenticated using (public.is_rit_admin()) with check (public.is_rit_admin());
drop policy if exists "admin delete metrics" on public.site_metrics;
create policy "admin delete metrics" on public.site_metrics
  for delete to authenticated using (public.is_rit_admin());
drop trigger if exists set_updated_at on public.site_metrics;
create trigger set_updated_at before update on public.site_metrics
  for each row execute function public.set_updated_at();

-- A partner must be published, explicitly approved, and visible before public access.
drop policy if exists "public read published" on public.partners;
create policy "public read published" on public.partners
  for select to anon, authenticated
  using ((published = true and is_approved = true and is_visible = true) or public.is_rit_admin());

create index if not exists projects_home_feature_idx
  on public.projects (featured_on_home, featured_rank) where published = true;
create index if not exists gallery_home_feature_idx
  on public.gallery_items (featured_on_home, display_order) where published = true;
create index if not exists partners_public_display_idx
  on public.partners (is_approved, is_visible, display_order) where published = true;
create index if not exists site_metrics_public_display_idx
  on public.site_metrics (is_verified, is_visible, display_order);
