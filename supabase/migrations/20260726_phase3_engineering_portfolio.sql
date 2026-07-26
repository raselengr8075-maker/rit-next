-- Phase 3 engineering portfolio fields.
-- Additive, idempotent and safe to run after the existing RIT schema.

alter table public.projects
  add column if not exists hero_image text,
  add column if not exists videos jsonb not null default '[]'::jsonb,
  add column if not exists documents jsonb not null default '[]'::jsonb,
  add column if not exists technical_specs jsonb not null default '[]'::jsonb,
  add column if not exists problem text,
  add column if not exists objective text,
  add column if not exists solution text,
  add column if not exists features jsonb not null default '[]'::jsonb,
  add column if not exists key_innovations jsonb not null default '[]'::jsonb,
  add column if not exists engineering_features jsonb not null default '[]'::jsonb,
  add column if not exists benefits jsonb not null default '[]'::jsonb,
  add column if not exists applications jsonb not null default '[]'::jsonb,
  add column if not exists application_areas jsonb not null default '[]'::jsonb,
  add column if not exists development_timeline jsonb not null default '[]'::jsonb,
  add column if not exists downloads jsonb not null default '[]'::jsonb,
  add column if not exists research_status text,
  add column if not exists prototype_status text,
  add column if not exists field_test_status text,
  add column if not exists related_projects text[] not null default '{}',
  add column if not exists keywords text[] not null default '{}',
  add column if not exists last_updated timestamptz,
  add column if not exists research_method_en text,
  add column if not exists research_method_bn text,
  add column if not exists project_gallery jsonb not null default '[]'::jsonb,
  add column if not exists research_area text,
  add column if not exists machine_type text;

alter table public.gallery_items
  add column if not exists image_credit text,
  add column if not exists blur_data_url text;

-- Keep storage uploads safe while allowing verified project documents.
update storage.buckets
set file_size_limit = 20971520,
    allowed_mime_types = array[
      'image/jpeg','image/png','image/webp',
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    ]
where id = 'rit-media';

create index if not exists projects_related_lookup_idx
  on public.projects(category, research_area, machine_type)
  where published = true;

comment on column public.projects.technical_specs is 'Ordered JSON array of verified specification objects.';
comment on column public.projects.documents is 'Ordered JSON array of public project document metadata.';
comment on column public.projects.development_timeline is 'Ordered JSON array of verified project development stages.';
