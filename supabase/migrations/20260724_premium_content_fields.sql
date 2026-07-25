-- Premium content fields for the RIT public site and admin.
-- Idempotent and safe to apply after supabase/schema.sql.

alter table public.projects
  add column if not exists hero_image_url text,
  add column if not exists gallery_images text[] not null default '{}',
  add column if not exists development_stage text,
  add column if not exists problem_statement_en text,
  add column if not exists problem_statement_bn text,
  add column if not exists proposed_solution_en text,
  add column if not exists proposed_solution_bn text,
  add column if not exists technical_summary_en text,
  add column if not exists technical_summary_bn text,
  add column if not exists video_url text,
  add column if not exists external_url text,
  add column if not exists completion_percentage smallint,
  add column if not exists display_metrics jsonb,
  add column if not exists document_urls text[] not null default '{}';

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'projects_completion_percentage_range'
      and conrelid = 'public.projects'::regclass
  ) then
    alter table public.projects
      add constraint projects_completion_percentage_range
      check (completion_percentage is null or completion_percentage between 0 and 100);
  end if;
end $$;

alter table public.apps
  add column if not exists app_icon_url text,
  add column if not exists screenshots text[] not null default '{}',
  add column if not exists app_store_url text,
  add column if not exists support_url text,
  add column if not exists privacy_url text,
  add column if not exists current_version text,
  add column if not exists release_date date;

alter table public.founder_profiles
  add column if not exists career_overview_en text,
  add column if not exists career_overview_bn text,
  add column if not exists research_interests text[] not null default '{}',
  add column if not exists skills text[] not null default '{}',
  add column if not exists education text[] not null default '{}',
  add column if not exists experience text[] not null default '{}',
  add column if not exists awards text[] not null default '{}',
  add column if not exists professional_links text[] not null default '{}',
  add column if not exists cv_url text;

alter table public.gallery_items
  add column if not exists media_date date,
  add column if not exists related_project_slug text,
  add column if not exists download_url text,
  add column if not exists video_url text;

alter table public.achievements
  add column if not exists source_url text,
  add column if not exists event_date date;

alter table public.timeline_events
  add column if not exists source_url text;

create table if not exists public.media_assets (
  id uuid primary key default gen_random_uuid(),
  file_name text not null,
  storage_path text unique not null,
  public_url text not null,
  alt_en text default '',
  alt_bn text default '',
  caption_en text default '',
  caption_bn text default '',
  mime_type text not null check (mime_type in ('image/jpeg','image/png','image/webp')),
  size_bytes integer not null check (size_bytes > 0 and size_bytes <= 5242880),
  related_table text,
  related_id uuid,
  placeholder boolean not null default false,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.media_assets enable row level security;
drop policy if exists "admin read media assets" on public.media_assets;
create policy "admin read media assets" on public.media_assets
  for select to authenticated using (public.is_rit_admin());
drop policy if exists "admin insert media assets" on public.media_assets;
create policy "admin insert media assets" on public.media_assets
  for insert to authenticated with check (public.is_rit_admin());
drop policy if exists "admin update media assets" on public.media_assets;
create policy "admin update media assets" on public.media_assets
  for update to authenticated using (public.is_rit_admin()) with check (public.is_rit_admin());
drop policy if exists "admin delete media assets" on public.media_assets;
create policy "admin delete media assets" on public.media_assets
  for delete to authenticated using (public.is_rit_admin());
drop trigger if exists set_updated_at on public.media_assets;
create trigger set_updated_at before update on public.media_assets
  for each row execute function public.set_updated_at();

