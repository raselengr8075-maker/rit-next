-- RIT production schema. Safe to re-run in the Supabase SQL editor.
create extension if not exists pgcrypto;

create table if not exists public.admin_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now()
);
alter table public.admin_profiles enable row level security;

create or replace function public.is_rit_admin()
returns boolean language sql stable security definer set search_path=public
as $$ select exists(select 1 from public.admin_profiles where id=auth.uid()) $$;
revoke all on function public.is_rit_admin() from public;
grant execute on function public.is_rit_admin() to authenticated;

drop policy if exists "admin profile read own" on public.admin_profiles;
create policy "admin profile read own" on public.admin_profiles for select to authenticated using(id=auth.uid());

create or replace function public.set_updated_at()
returns trigger language plpgsql set search_path=public
as $$ begin new.updated_at=now(); return new; end $$;

create table if not exists public.projects (
 id uuid primary key default gen_random_uuid(), slug text unique not null, title_en text not null, title_bn text default '', summary_en text default '', summary_bn text default '', content_en text default '', content_bn text default '', image_url text, status text not null default 'draft', published boolean not null default false, featured boolean not null default false, sort_order integer not null default 0, category text, year integer, technologies text[] default '{}', objectives_en text, objectives_bn text, results_en text, results_bn text, gallery text[] default '{}', seo_title text, seo_description text, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.apps (
 id uuid primary key default gen_random_uuid(), slug text unique not null, title_en text not null, title_bn text default '', summary_en text default '', summary_bn text default '', content_en text default '', content_bn text default '', image_url text, status text not null default 'draft', published boolean not null default false, featured boolean not null default false, sort_order integer not null default 0, category text, year integer, platform text, play_store_url text, website_url text, version text, technologies text[] default '{}', gallery text[] default '{}', seo_title text, seo_description text, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.gallery_items (
 id uuid primary key default gen_random_uuid(), slug text unique not null, title_en text not null, title_bn text default '', summary_en text default '', summary_bn text default '', content_en text default '', content_bn text default '', image_url text, alt_en text, alt_bn text, caption_en text, caption_bn text, category text, status text not null default 'active', published boolean not null default false, featured boolean not null default false, sort_order integer not null default 0, year integer, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.news_articles (
 id uuid primary key default gen_random_uuid(), slug text unique not null, title_en text not null, title_bn text default '', summary_en text default '', summary_bn text default '', content_en text default '', content_bn text default '', image_url text, author text, published_at timestamptz, category text, status text not null default 'draft', published boolean not null default false, featured boolean not null default false, sort_order integer not null default 0, year integer, seo_title text, seo_description text, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.founder_profiles (
 id uuid primary key default gen_random_uuid(), slug text unique not null, title_en text not null, title_bn text default '', summary_en text default '', summary_bn text default '', content_en text default '', content_bn text default '', image_url text, role_en text, role_bn text, philosophy_en text, philosophy_bn text, expertise text[] default '{}', status text not null default 'active', published boolean not null default false, featured boolean not null default true, sort_order integer not null default 0, category text, year integer, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.achievements (
 id uuid primary key default gen_random_uuid(), slug text unique not null, title_en text not null, title_bn text default '', summary_en text default '', summary_bn text default '', content_en text default '', content_bn text default '', image_url text, icon text, year integer, category text, status text not null default 'active', published boolean not null default false, featured boolean not null default false, sort_order integer not null default 0, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.timeline_events (
 id uuid primary key default gen_random_uuid(), slug text unique not null, title_en text not null, title_bn text default '', summary_en text default '', summary_bn text default '', content_en text default '', content_bn text default '', event_date date, year integer, category text, status text not null default 'active', published boolean not null default false, featured boolean not null default false, sort_order integer not null default 0, image_url text, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.partners (
 id uuid primary key default gen_random_uuid(), slug text unique not null, name text not null, title_en text not null, title_bn text default '', summary_en text default '', summary_bn text default '', content_en text default '', content_bn text default '', logo_url text, image_url text, website_url text, partner_type text, status text not null default 'active', published boolean not null default false, featured boolean not null default false, sort_order integer not null default 0, category text, year integer, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.contact_messages (
 id uuid primary key default gen_random_uuid(), name text not null, email text not null, phone text, subject text not null, message text not null, status text not null default 'new', created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.site_settings (
 id uuid primary key default gen_random_uuid(), key text unique not null, value jsonb, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.resources (
 id uuid primary key default gen_random_uuid(), slug text unique not null, title_en text not null, title_bn text default '', description_en text default '', description_bn text default '', summary_en text default '', summary_bn text default '', content_en text default '', content_bn text default '', category text, file_url text, external_url text, thumbnail_url text, image_url text, status text not null default 'draft', published boolean not null default false, featured boolean not null default false, sort_order integer not null default 0, seo_title text, seo_description text, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

do $$ declare t text; begin
 foreach t in array array['projects','apps','gallery_items','news_articles','founder_profiles','achievements','timeline_events','partners','resources'] loop
  execute format('alter table public.%I enable row level security',t);
  execute format('drop policy if exists "public read published" on public.%I',t);
  execute format('create policy "public read published" on public.%I for select to anon, authenticated using (published=true or public.is_rit_admin())',t);
  execute format('drop policy if exists "admin insert" on public.%I',t);
  execute format('create policy "admin insert" on public.%I for insert to authenticated with check (public.is_rit_admin())',t);
  execute format('drop policy if exists "admin update" on public.%I',t);
  execute format('create policy "admin update" on public.%I for update to authenticated using (public.is_rit_admin()) with check (public.is_rit_admin())',t);
  execute format('drop policy if exists "admin delete" on public.%I',t);
  execute format('create policy "admin delete" on public.%I for delete to authenticated using (public.is_rit_admin())',t);
  execute format('drop trigger if exists set_updated_at on public.%I',t);
  execute format('create trigger set_updated_at before update on public.%I for each row execute function public.set_updated_at()',t);
 end loop;
end $$;

alter table public.contact_messages enable row level security;
drop policy if exists "admin manage messages" on public.contact_messages;
create policy "admin manage messages" on public.contact_messages for all to authenticated using(public.is_rit_admin()) with check(public.is_rit_admin());
drop trigger if exists set_updated_at on public.contact_messages;
create trigger set_updated_at before update on public.contact_messages for each row execute function public.set_updated_at();
alter table public.site_settings enable row level security;
drop policy if exists "admin manage settings" on public.site_settings;
create policy "admin manage settings" on public.site_settings for all to authenticated using(public.is_rit_admin()) with check(public.is_rit_admin());
drop trigger if exists set_updated_at on public.site_settings;
create trigger set_updated_at before update on public.site_settings for each row execute function public.set_updated_at();

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values('rit-media','rit-media',true,5242880,array['image/jpeg','image/png','image/webp'])
on conflict(id) do update set public=true,file_size_limit=excluded.file_size_limit,allowed_mime_types=excluded.allowed_mime_types;
drop policy if exists "rit media public read" on storage.objects;
create policy "rit media public read" on storage.objects for select to public using(bucket_id='rit-media');
drop policy if exists "rit media admin insert" on storage.objects;
create policy "rit media admin insert" on storage.objects for insert to authenticated with check(bucket_id='rit-media' and public.is_rit_admin());
drop policy if exists "rit media admin update" on storage.objects;
create policy "rit media admin update" on storage.objects for update to authenticated using(bucket_id='rit-media' and public.is_rit_admin()) with check(bucket_id='rit-media' and public.is_rit_admin());
drop policy if exists "rit media admin delete" on storage.objects;
create policy "rit media admin delete" on storage.objects for delete to authenticated using(bucket_id='rit-media' and public.is_rit_admin());

-- Optional premium presentation fields. These ALTER statements keep this file
-- safe for both fresh projects and projects created with an earlier RIT schema.
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

do $$ begin
 if not exists(select 1 from pg_constraint where conname='projects_completion_percentage_range' and conrelid='public.projects'::regclass) then
  alter table public.projects add constraint projects_completion_percentage_range
   check(completion_percentage is null or completion_percentage between 0 and 100);
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
alter table public.timeline_events add column if not exists source_url text;

create table if not exists public.media_assets(
 id uuid primary key default gen_random_uuid(),
 file_name text not null,
 storage_path text unique not null,
 public_url text not null,
 alt_en text default '',
 alt_bn text default '',
 caption_en text default '',
 caption_bn text default '',
 mime_type text not null check(mime_type in('image/jpeg','image/png','image/webp')),
 size_bytes integer not null check(size_bytes>0 and size_bytes<=5242880),
 related_table text,
 related_id uuid,
 placeholder boolean not null default false,
 created_by uuid references auth.users(id) on delete set null,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);
alter table public.media_assets enable row level security;
drop policy if exists "admin read media assets" on public.media_assets;
create policy "admin read media assets" on public.media_assets for select to authenticated using(public.is_rit_admin());
drop policy if exists "admin insert media assets" on public.media_assets;
create policy "admin insert media assets" on public.media_assets for insert to authenticated with check(public.is_rit_admin());
drop policy if exists "admin update media assets" on public.media_assets;
create policy "admin update media assets" on public.media_assets for update to authenticated using(public.is_rit_admin()) with check(public.is_rit_admin());
drop policy if exists "admin delete media assets" on public.media_assets;
create policy "admin delete media assets" on public.media_assets for delete to authenticated using(public.is_rit_admin());
drop trigger if exists set_updated_at on public.media_assets;
create trigger set_updated_at before update on public.media_assets for each row execute function public.set_updated_at();
