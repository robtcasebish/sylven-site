create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table public.services (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(btrim(name)) between 2 and 80),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  category text not null default 'diagnostic-imaging',
  plain_language_description text not null check (char_length(plain_language_description) <= 500),
  status text not null default 'active' check (status in ('active', 'archived')),
  sort_order integer not null default 0 check (sort_order >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (category, name)
);

create table public.clinics (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(btrim(name)) between 2 and 160),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  legal_name text check (char_length(legal_name) <= 200),
  website_url text not null check (website_url ~ '^https://'),
  public_email text check (char_length(public_email) <= 254),
  public_phone text check (char_length(public_phone) between 7 and 30),
  description text check (char_length(description) <= 800 and description !~ '<[^>]+>'),
  listing_status text not null default 'draft' check (listing_status in ('draft', 'published', 'suspended', 'archived')),
  sponsorship_status text not null default 'none' check (sponsorship_status in ('none', 'enhanced')),
  sponsorship_starts_at timestamptz,
  sponsorship_ends_at timestamptz,
  source_type text not null check (source_type in ('clinic_website', 'regulator', 'clinic_submission', 'direct_confirmation', 'other_public_source')),
  source_url text check (source_url is null or source_url ~ '^https://'),
  source_label text not null check (char_length(source_label) between 2 and 160),
  source_checked_at date not null,
  last_verified_at date not null,
  verification_status text not null default 'unverified' check (verification_status in ('unverified', 'verified', 'stale', 'disputed', 'rejected')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  archived_at timestamptz,
  check (sponsorship_ends_at is null or sponsorship_starts_at is not null),
  check (sponsorship_ends_at is null or sponsorship_ends_at > sponsorship_starts_at),
  check (listing_status <> 'published' or (verification_status = 'verified' and last_verified_at is not null))
);

create table public.locations (
  id uuid primary key default gen_random_uuid(),
  clinic_id uuid not null references public.clinics(id) on delete restrict,
  name text not null check (char_length(btrim(name)) between 2 and 160),
  slug text not null check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  address_line_1 text not null check (char_length(address_line_1) <= 160),
  address_line_2 text check (char_length(address_line_2) <= 160),
  municipality text not null check (char_length(municipality) <= 100),
  province_code text not null default 'BC' check (province_code = 'BC'),
  postal_code text not null check (postal_code ~ '^[A-Z][0-9][A-Z] [0-9][A-Z][0-9]$'),
  public_phone text check (char_length(public_phone) between 7 and 30),
  public_email text check (char_length(public_email) <= 254),
  booking_url text check (booking_url is null or booking_url ~ '^https://'),
  hours jsonb,
  accessibility_notes text check (char_length(accessibility_notes) <= 500 and accessibility_notes !~ '<[^>]+>'),
  status text not null default 'active' check (status in ('active', 'temporarily_closed', 'archived')),
  source_type text not null check (source_type in ('clinic_website', 'regulator', 'clinic_submission', 'direct_confirmation', 'other_public_source')),
  source_url text check (source_url is null or source_url ~ '^https://'),
  source_label text not null check (char_length(source_label) between 2 and 160),
  source_checked_at date not null,
  last_verified_at date not null,
  verification_status text not null default 'unverified' check (verification_status in ('unverified', 'verified', 'stale', 'disputed', 'rejected')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (clinic_id, slug),
  unique (id, clinic_id)
);

create table public.clinic_services (
  id uuid primary key default gen_random_uuid(),
  clinic_id uuid not null references public.clinics(id) on delete restrict,
  location_id uuid not null,
  service_id uuid not null references public.services(id) on delete restrict,
  status text not null default 'active' check (status in ('active', 'paused', 'archived')),
  referral_requirement text not null default 'unknown' check (referral_requirement in ('required', 'not_required', 'varies', 'unknown')),
  referral_notes text check (char_length(referral_notes) <= 500 and referral_notes !~ '<[^>]+>'),
  published_price_min_cad numeric(10,2) check (published_price_min_cad >= 0),
  published_price_max_cad numeric(10,2) check (published_price_max_cad >= 0),
  price_notes text check (char_length(price_notes) <= 500 and price_notes !~ '<[^>]+>'),
  booking_notes text check (char_length(booking_notes) <= 500 and booking_notes !~ '<[^>]+>'),
  source_type text not null check (source_type in ('clinic_website', 'regulator', 'clinic_submission', 'direct_confirmation', 'other_public_source')),
  source_url text check (source_url is null or source_url ~ '^https://'),
  source_label text not null check (char_length(source_label) between 2 and 160),
  source_checked_at date not null,
  last_verified_at date not null,
  verification_status text not null default 'unverified' check (verification_status in ('unverified', 'verified', 'stale', 'disputed', 'rejected')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  foreign key (location_id, clinic_id) references public.locations(id, clinic_id) on delete restrict,
  unique (location_id, service_id),
  unique (id, clinic_id),
  check (published_price_max_cad is null or published_price_min_cad is null or published_price_min_cad <= published_price_max_cad)
);

create table public.listing_verifications (
  id uuid primary key default gen_random_uuid(),
  clinic_id uuid not null references public.clinics(id) on delete restrict,
  location_id uuid,
  clinic_service_id uuid,
  verification_type text not null check (verification_type in ('initial_research', 'periodic_review', 'clinic_confirmation', 'correction', 'dispute')),
  outcome text not null check (outcome in ('verified', 'partially_verified', 'stale', 'disputed', 'rejected')),
  verified_fields text[] not null default '{}',
  source_type text not null check (source_type in ('clinic_website', 'regulator', 'clinic_submission', 'direct_confirmation', 'other_public_source')),
  source_url text check (source_url is null or source_url ~ '^https://'),
  source_label text not null check (char_length(source_label) between 2 and 160),
  source_checked_at date not null,
  evidence_reference text,
  notes text check (char_length(notes) <= 2000),
  performed_by uuid not null,
  performed_at timestamptz not null default now(),
  next_review_at timestamptz,
  foreign key (location_id, clinic_id) references public.locations(id, clinic_id) on delete restrict,
  foreign key (clinic_service_id, clinic_id) references public.clinic_services(id, clinic_id) on delete restrict,
  check (location_id is not null or clinic_service_id is not null or clinic_id is not null),
  check (next_review_at is null or next_review_at >= performed_at)
);

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  public_reference text not null unique check (public_reference ~ '^[A-Z0-9]{10,24}$'),
  service_id uuid not null references public.services(id) on delete restrict,
  location_preference_fsa text check (location_preference_fsa is null or location_preference_fsa ~ '^[A-Z][0-9][A-Z]$'),
  name text not null check (char_length(btrim(name)) between 1 and 120),
  email text not null check (char_length(email) <= 254 and email = lower(email)),
  phone text check (phone is null or phone ~ '^\+[1-9][0-9]{7,14}$'),
  preferred_contact text not null check (preferred_contact in ('email', 'phone')),
  logistical_message text check (char_length(logistical_message) <= 500 and logistical_message !~ '<[^>]+>'),
  status text not null default 'received' check (status in ('received', 'partially_delivered', 'delivered', 'failed', 'suppressed', 'deleted')),
  idempotency_key_hash text not null unique check (char_length(idempotency_key_hash) = 64),
  retention_expires_at timestamptz not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz,
  check (preferred_contact <> 'phone' or phone is not null),
  check (retention_expires_at > created_at)
);

create table public.lead_consents (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads(id) on delete restrict,
  clinic_id uuid not null references public.clinics(id) on delete restrict,
  location_id uuid,
  clinic_service_id uuid,
  consent_version text not null check (char_length(consent_version) between 1 and 40),
  consent_text_snapshot text not null check (char_length(consent_text_snapshot) between 20 and 1000),
  disclosure_purpose text not null default 'clinic_inquiry' check (disclosure_purpose = 'clinic_inquiry'),
  consented_at timestamptz not null,
  delivery_status text not null default 'pending' check (delivery_status in ('pending', 'sent', 'failed', 'suppressed', 'revoked_before_delivery')),
  delivery_attempted_at timestamptz,
  delivered_at timestamptz,
  delivery_provider_reference text check (char_length(delivery_provider_reference) <= 200),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  foreign key (location_id, clinic_id) references public.locations(id, clinic_id) on delete restrict,
  foreign key (clinic_service_id, clinic_id) references public.clinic_services(id, clinic_id) on delete restrict,
  unique (lead_id, clinic_id),
  check (delivery_status <> 'sent' or delivery_attempted_at is not null),
  check (delivered_at is null or delivery_status = 'sent')
);

create or replace function public.validate_lead_consent_scope()
returns trigger
language plpgsql
set search_path = ''
as $$
declare
  selected_service_id uuid;
begin
  select service_id into selected_service_id
  from public.leads
  where id = new.lead_id;

  if selected_service_id is null then
    raise exception 'Lead does not exist';
  end if;

  if not exists (
    select 1 from public.clinics
    where id = new.clinic_id and listing_status = 'published'
  ) then
    raise exception 'Consent recipient must be a published clinic';
  end if;

  if new.clinic_service_id is not null and not exists (
    select 1 from public.clinic_services
    where id = new.clinic_service_id
      and clinic_id = new.clinic_id
      and service_id = selected_service_id
      and status = 'active'
  ) then
    raise exception 'Consent service must match the lead service and recipient clinic';
  end if;

  return new;
end;
$$;

create or replace function public.protect_lead_consent_evidence()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.lead_id is distinct from old.lead_id
    or new.clinic_id is distinct from old.clinic_id
    or new.location_id is distinct from old.location_id
    or new.clinic_service_id is distinct from old.clinic_service_id
    or new.consent_version is distinct from old.consent_version
    or new.consent_text_snapshot is distinct from old.consent_text_snapshot
    or new.disclosure_purpose is distinct from old.disclosure_purpose
    or new.consented_at is distinct from old.consented_at then
    raise exception 'Consent evidence is immutable';
  end if;
  return new;
end;
$$;

create or replace function public.require_consent_before_delivery()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.status in ('partially_delivered', 'delivered') and not exists (
    select 1 from public.lead_consents where lead_id = new.id
  ) then
    raise exception 'A lead cannot be delivered without recipient consent';
  end if;
  return new;
end;
$$;

create trigger services_set_updated_at before update on public.services for each row execute function public.set_updated_at();
create trigger clinics_set_updated_at before update on public.clinics for each row execute function public.set_updated_at();
create trigger locations_set_updated_at before update on public.locations for each row execute function public.set_updated_at();
create trigger clinic_services_set_updated_at before update on public.clinic_services for each row execute function public.set_updated_at();
create trigger leads_set_updated_at before update on public.leads for each row execute function public.set_updated_at();
create trigger lead_consents_set_updated_at before update on public.lead_consents for each row execute function public.set_updated_at();
create trigger lead_consents_validate_scope before insert or update on public.lead_consents for each row execute function public.validate_lead_consent_scope();
create trigger lead_consents_protect_evidence before update on public.lead_consents for each row execute function public.protect_lead_consent_evidence();
create trigger leads_require_consent before update of status on public.leads for each row execute function public.require_consent_before_delivery();

create index clinics_publication_idx on public.clinics (listing_status, verification_status, last_verified_at);
create index locations_discovery_idx on public.locations (province_code, municipality, status);
create index clinic_services_discovery_idx on public.clinic_services (service_id, status, location_id);
create index listing_verifications_history_idx on public.listing_verifications (clinic_id, performed_at desc);
create index listing_verifications_review_idx on public.listing_verifications (next_review_at);
create index leads_operations_idx on public.leads (status, created_at);
create index leads_retention_idx on public.leads (retention_expires_at);
create index lead_consents_delivery_idx on public.lead_consents (clinic_id, delivery_status, created_at);

alter table public.services enable row level security;
alter table public.clinics enable row level security;
alter table public.locations enable row level security;
alter table public.clinic_services enable row level security;
alter table public.listing_verifications enable row level security;
alter table public.leads enable row level security;
alter table public.lead_consents enable row level security;

create view public.public_clinic_directory
with (security_barrier = true)
as
select
  c.slug as clinic_slug,
  c.name as clinic_name,
  c.website_url,
  coalesce(l.public_phone, c.public_phone) as clinic_phone,
  l.address_line_1,
  l.municipality,
  l.province_code,
  l.postal_code,
  s.slug as service_slug,
  s.name as service_name,
  cs.referral_requirement,
  coalesce(cs.referral_notes, 'Confirm referral requirements directly with the clinic.') as referral_notes,
  c.source_type as clinic_source_type,
  c.source_url as clinic_source_url,
  c.source_label as clinic_source_label,
  c.source_checked_at as clinic_source_checked_at,
  l.source_type as location_source_type,
  l.source_url as location_source_url,
  l.source_label as location_source_label,
  l.source_checked_at as location_source_checked_at,
  cs.source_type as service_source_type,
  cs.source_url as service_source_url,
  cs.source_label as service_source_label,
  cs.source_checked_at as service_source_checked_at,
  least(c.last_verified_at, l.last_verified_at, cs.last_verified_at) as last_verified_at,
  'verified'::text as verification_status
from public.clinics c
join public.locations l on l.clinic_id = c.id
join public.clinic_services cs on cs.clinic_id = c.id and cs.location_id = l.id
join public.services s on s.id = cs.service_id
where c.listing_status = 'published'
  and c.verification_status = 'verified'
  and l.status = 'active'
  and l.verification_status = 'verified'
  and cs.status = 'active'
  and cs.verification_status = 'verified'
  and s.status = 'active'
  and c.last_verified_at >= current_date - 180
  and l.last_verified_at >= current_date - 180
  and cs.last_verified_at >= current_date - 180
  and c.source_url is not null
  and l.source_url is not null
  and cs.source_url is not null;

revoke all on table public.services, public.clinics, public.locations, public.clinic_services,
  public.listing_verifications, public.leads, public.lead_consents from anon, authenticated;
revoke all on public.public_clinic_directory from public;
grant select on public.public_clinic_directory to anon, authenticated;

comment on view public.public_clinic_directory is
  'Sanitized, freshness-gated directory facts. Verification indicates source freshness, not clinical quality.';
