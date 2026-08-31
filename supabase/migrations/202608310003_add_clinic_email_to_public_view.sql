-- The public directory view never surfaced a clinic's e-mail address,
-- only phone. That was invisible while every published clinic also had a
-- phone number, but Simply MRI (src/lib/clinic-directory.ts) is sourced
-- with e-mail only and no phone, so it would silently lose its only
-- contact method once served from this view instead of the TypeScript
-- fixtures. Add the missing column; this only appends a column, so the
-- existing view contract for every other column is unchanged.

create or replace view public.public_clinic_directory
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
  'verified'::text as verification_status,
  c.public_email as clinic_email
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

grant select on public.public_clinic_directory to anon, authenticated;
