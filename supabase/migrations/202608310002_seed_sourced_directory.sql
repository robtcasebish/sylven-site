-- Seed the sourced clinic directory (17 clinics, 9 regions) into the
-- real schema, mirroring src/lib/clinic-directory.ts exactly. This is
-- additive data only; it does not change any table shape. Each clinic
-- is inserted with listing_status = 'published' and
-- verification_status = 'verified', matching the TypeScript fixture's
-- verificationStatus for every one of these 17 records. Re-running this
-- migration a second time will fail on the unique clinic slugs, by
-- design: it is meant to be applied exactly once.

insert into public.services (name, slug, plain_language_description, sort_order)
values
  ('MRI', 'mri', 'Find private MRI clinic listings with sourced location and contact details.', 0),
  ('Ultrasound', 'ultrasound', 'Explore private ultrasound clinic listings with sourced location and contact details.', 1);

-- Canada Diagnostic Centres, Vancouver (Vancouver, BC)
with clinic_canada_diagnostic_centres_vancouver as (
  insert into public.clinics (
    name, slug, website_url, public_email, public_phone, listing_status,
    source_type, source_url, source_label, source_checked_at, last_verified_at, verification_status
  ) values (
    'Canada Diagnostic Centres, Vancouver', 'canada-diagnostic-centres-vancouver', 'https://www.canadadiagnostic.com/',
    null, '604-709-8522', 'published',
    'clinic_website', 'https://www.canadadiagnostic.com/', 'Canada Diagnostic Centres service and contact information', date '2026-07-19', date '2026-07-19', 'verified'
  )
  returning id
),
location_canada_diagnostic_centres_vancouver as (
  insert into public.locations (
    clinic_id, name, slug, address_line_1, municipality, province_code, postal_code, public_phone,
    source_type, source_url, source_label, source_checked_at, last_verified_at, verification_status
  )
  select
    id, 'Canada Diagnostic Centres, Vancouver', 'main', 'Suite 136, 555 West 12th Avenue',
    'Vancouver', 'BC', 'V5Z 3X7', '604-709-8522',
    'clinic_website', 'https://www.canadadiagnostic.com/', 'Canada Diagnostic Centres service and contact information', date '2026-07-19', date '2026-07-19', 'verified'
  from clinic_canada_diagnostic_centres_vancouver
  returning id, clinic_id
)
insert into public.clinic_services (
  clinic_id, location_id, service_id, referral_requirement, referral_notes,
  source_type, source_url, source_label, source_checked_at, last_verified_at, verification_status
)
select
  location_canada_diagnostic_centres_vancouver.clinic_id, location_canada_diagnostic_centres_vancouver.id, service_row.id, 'required', 'The clinic website says a physician referral is required.',
  'clinic_website', 'https://www.canadadiagnostic.com/', 'Canada Diagnostic Centres service and contact information', date '2026-07-19', date '2026-07-19', 'verified'
from location_canada_diagnostic_centres_vancouver, (select id from public.services where slug = 'mri') as service_row
union all
select
  location_canada_diagnostic_centres_vancouver.clinic_id, location_canada_diagnostic_centres_vancouver.id, service_row.id, 'required', 'The clinic website says a physician referral is required.',
  'clinic_website', 'https://www.canadadiagnostic.com/', 'Canada Diagnostic Centres service and contact information', date '2026-07-19', date '2026-07-19', 'verified'
from location_canada_diagnostic_centres_vancouver, (select id from public.services where slug = 'ultrasound') as service_row;

-- AIM Medical Imaging (Vancouver, BC)
with clinic_aim_medical_imaging as (
  insert into public.clinics (
    name, slug, website_url, public_email, public_phone, listing_status,
    source_type, source_url, source_label, source_checked_at, last_verified_at, verification_status
  ) values (
    'AIM Medical Imaging', 'aim-medical-imaging', 'https://aimmedicalimaging.com/',
    null, '604-733-4007', 'published',
    'clinic_website', 'https://aimmedicalimaging.com/appointments/contact-us/', 'AIM Medical Imaging contact information', date '2026-07-19', date '2026-07-19', 'verified'
  )
  returning id
),
location_aim_medical_imaging as (
  insert into public.locations (
    clinic_id, name, slug, address_line_1, municipality, province_code, postal_code, public_phone,
    source_type, source_url, source_label, source_checked_at, last_verified_at, verification_status
  )
  select
    id, 'AIM Medical Imaging', 'main', '1371 West Broadway',
    'Vancouver', 'BC', 'V6H 1G9', '604-733-4007',
    'clinic_website', 'https://aimmedicalimaging.com/appointments/contact-us/', 'AIM Medical Imaging contact information', date '2026-07-19', date '2026-07-19', 'verified'
  from clinic_aim_medical_imaging
  returning id, clinic_id
)
insert into public.clinic_services (
  clinic_id, location_id, service_id, referral_requirement, referral_notes,
  source_type, source_url, source_label, source_checked_at, last_verified_at, verification_status
)
select
  location_aim_medical_imaging.clinic_id, location_aim_medical_imaging.id, service_row.id, 'required', 'The clinic FAQ says MRI examinations require a physician referral.',
  'clinic_website', 'https://aimmedicalimaging.com/mri-services/faq/', 'AIM Medical Imaging MRI FAQ', date '2026-07-19', date '2026-07-19', 'verified'
from location_aim_medical_imaging, (select id from public.services where slug = 'mri') as service_row;

-- Access MRI (Surrey, BC)
with clinic_access_mri_surrey as (
  insert into public.clinics (
    name, slug, website_url, public_email, public_phone, listing_status,
    source_type, source_url, source_label, source_checked_at, last_verified_at, verification_status
  ) values (
    'Access MRI', 'access-mri-surrey', 'https://www.accessmri.com/',
    null, '604-575-5566', 'published',
    'clinic_website', 'https://www.accessmri.com/contact-us/', 'Access MRI contact and referral information', date '2026-07-19', date '2026-07-19', 'verified'
  )
  returning id
),
location_access_mri_surrey as (
  insert into public.locations (
    clinic_id, name, slug, address_line_1, municipality, province_code, postal_code, public_phone,
    source_type, source_url, source_label, source_checked_at, last_verified_at, verification_status
  )
  select
    id, 'Access MRI', 'main', '15137 56 Avenue',
    'Surrey', 'BC', 'V3S 9A5', '604-575-5566',
    'clinic_website', 'https://www.accessmri.com/contact-us/', 'Access MRI contact and referral information', date '2026-07-19', date '2026-07-19', 'verified'
  from clinic_access_mri_surrey
  returning id, clinic_id
)
insert into public.clinic_services (
  clinic_id, location_id, service_id, referral_requirement, referral_notes,
  source_type, source_url, source_label, source_checked_at, last_verified_at, verification_status
)
select
  location_access_mri_surrey.clinic_id, location_access_mri_surrey.id, service_row.id, 'required', 'The clinic contact page says all services require a doctor''s referral.',
  'clinic_website', 'https://www.accessmri.com/contact-us/', 'Access MRI contact and referral information', date '2026-07-19', date '2026-07-19', 'verified'
from location_access_mri_surrey, (select id from public.services where slug = 'mri') as service_row
union all
select
  location_access_mri_surrey.clinic_id, location_access_mri_surrey.id, service_row.id, 'required', 'The clinic contact page says all services require a doctor''s referral.',
  'clinic_website', 'https://www.accessmri.com/contact-us/', 'Access MRI contact and referral information', date '2026-07-19', date '2026-07-19', 'verified'
from location_access_mri_surrey, (select id from public.services where slug = 'ultrasound') as service_row;

-- Vancouver Ultrasound (Vancouver, BC)
with clinic_vancouver_ultrasound as (
  insert into public.clinics (
    name, slug, website_url, public_email, public_phone, listing_status,
    source_type, source_url, source_label, source_checked_at, last_verified_at, verification_status
  ) values (
    'Vancouver Ultrasound', 'vancouver-ultrasound', 'https://vanultrasound.com/',
    null, '604-569-0616', 'published',
    'clinic_website', 'https://vanultrasound.com/contact-us/', 'Vancouver Ultrasound contact and referral information', date '2026-07-19', date '2026-07-19', 'verified'
  )
  returning id
),
location_vancouver_ultrasound as (
  insert into public.locations (
    clinic_id, name, slug, address_line_1, municipality, province_code, postal_code, public_phone,
    source_type, source_url, source_label, source_checked_at, last_verified_at, verification_status
  )
  select
    id, 'Vancouver Ultrasound', 'main', '#303, 550 West Broadway',
    'Vancouver', 'BC', 'V5Z 0E9', '604-569-0616',
    'clinic_website', 'https://vanultrasound.com/contact-us/', 'Vancouver Ultrasound contact and referral information', date '2026-07-19', date '2026-07-19', 'verified'
  from clinic_vancouver_ultrasound
  returning id, clinic_id
)
insert into public.clinic_services (
  clinic_id, location_id, service_id, referral_requirement, referral_notes,
  source_type, source_url, source_label, source_checked_at, last_verified_at, verification_status
)
select
  location_vancouver_ultrasound.clinic_id, location_vancouver_ultrasound.id, service_row.id, 'varies', 'The clinic says most diagnostic ultrasound exams require a requisition; confirm directly for the exam you need.',
  'clinic_website', 'https://vanultrasound.com/contact-us/', 'Vancouver Ultrasound contact and referral information', date '2026-07-19', date '2026-07-19', 'verified'
from location_vancouver_ultrasound, (select id from public.services where slug = 'ultrasound') as service_row;

-- Simply MRI (Toronto, ON)
with clinic_simply_mri_toronto as (
  insert into public.clinics (
    name, slug, website_url, public_email, public_phone, listing_status,
    source_type, source_url, source_label, source_checked_at, last_verified_at, verification_status
  ) values (
    'Simply MRI', 'simply-mri-toronto', 'https://simplymri.com/',
    'info@simplymri.com', null, 'published',
    'clinic_website', 'https://simplymri.com/', 'Simply MRI service and pricing information', date '2026-08-30', date '2026-08-30', 'verified'
  )
  returning id
),
location_simply_mri_toronto as (
  insert into public.locations (
    clinic_id, name, slug, address_line_1, municipality, province_code, postal_code, public_phone,
    source_type, source_url, source_label, source_checked_at, last_verified_at, verification_status
  )
  select
    id, 'Simply MRI', 'main', '2888 Bathurst St.',
    'Toronto', 'ON', 'M6B 4H6', null,
    'clinic_website', 'https://simplymri.com/', 'Simply MRI service and pricing information', date '2026-08-30', date '2026-08-30', 'verified'
  from clinic_simply_mri_toronto
  returning id, clinic_id
)
insert into public.clinic_services (
  clinic_id, location_id, service_id, referral_requirement, referral_notes,
  source_type, source_url, source_label, source_checked_at, last_verified_at, verification_status
)
select
  location_simply_mri_toronto.clinic_id, location_simply_mri_toronto.id, service_row.id, 'not_required', 'The clinic''s FAQ says it is a private screening service and you can book directly without a physician referral.',
  'clinic_website', 'https://simplymri.com/faq', 'Simply MRI referral FAQ', date '2026-08-30', date '2026-08-30', 'verified'
from location_simply_mri_toronto, (select id from public.services where slug = 'mri') as service_row;

-- Toronto Ultrasound Imaging (Toronto, ON)
with clinic_toronto_ultrasound_imaging as (
  insert into public.clinics (
    name, slug, website_url, public_email, public_phone, listing_status,
    source_type, source_url, source_label, source_checked_at, last_verified_at, verification_status
  ) values (
    'Toronto Ultrasound Imaging', 'toronto-ultrasound-imaging', 'https://torontoultrasound.ca/',
    null, '416-921-1333', 'published',
    'clinic_website', 'https://torontoultrasound.ca/', 'Toronto Ultrasound Imaging booking and requisition information', date '2026-08-30', date '2026-08-30', 'verified'
  )
  returning id
),
location_toronto_ultrasound_imaging as (
  insert into public.locations (
    clinic_id, name, slug, address_line_1, municipality, province_code, postal_code, public_phone,
    source_type, source_url, source_label, source_checked_at, last_verified_at, verification_status
  )
  select
    id, 'Toronto Ultrasound Imaging', 'main', '180 Bloor Street West, Suite 204',
    'Toronto', 'ON', null, '416-921-1333',
    'clinic_website', 'https://torontoultrasound.ca/', 'Toronto Ultrasound Imaging booking and requisition information', date '2026-08-30', date '2026-08-30', 'verified'
  from clinic_toronto_ultrasound_imaging
  returning id, clinic_id
)
insert into public.clinic_services (
  clinic_id, location_id, service_id, referral_requirement, referral_notes,
  source_type, source_url, source_label, source_checked_at, last_verified_at, verification_status
)
select
  location_toronto_ultrasound_imaging.clinic_id, location_toronto_ultrasound_imaging.id, service_row.id, 'required', 'The clinic says appointments are scheduled with a valid medical requisition, and patients should bring the original requisition form.',
  'clinic_website', 'https://torontoultrasound.ca/', 'Toronto Ultrasound Imaging booking and requisition information', date '2026-08-30', date '2026-08-30', 'verified'
from location_toronto_ultrasound_imaging, (select id from public.services where slug = 'ultrasound') as service_row;

-- Radiant Medical Imaging (Scarborough, ON)
with clinic_radiant_medical_imaging_scarborough as (
  insert into public.clinics (
    name, slug, website_url, public_email, public_phone, listing_status,
    source_type, source_url, source_label, source_checked_at, last_verified_at, verification_status
  ) values (
    'Radiant Medical Imaging', 'radiant-medical-imaging-scarborough', 'https://radiantmedicalimaging.com/',
    null, '416-321-9243', 'published',
    'clinic_website', 'https://radiantmedicalimaging.com/', 'Radiant Medical Imaging services and location information', date '2026-08-30', date '2026-08-30', 'verified'
  )
  returning id
),
location_radiant_medical_imaging_scarborough as (
  insert into public.locations (
    clinic_id, name, slug, address_line_1, municipality, province_code, postal_code, public_phone,
    source_type, source_url, source_label, source_checked_at, last_verified_at, verification_status
  )
  select
    id, 'Radiant Medical Imaging', 'main', '385 Silver Star Blvd, Suite 212',
    'Scarborough', 'ON', 'M1V 0E3', '416-321-9243',
    'clinic_website', 'https://radiantmedicalimaging.com/', 'Radiant Medical Imaging services and location information', date '2026-08-30', date '2026-08-30', 'verified'
  from clinic_radiant_medical_imaging_scarborough
  returning id, clinic_id
)
insert into public.clinic_services (
  clinic_id, location_id, service_id, referral_requirement, referral_notes,
  source_type, source_url, source_label, source_checked_at, last_verified_at, verification_status
)
select
  location_radiant_medical_imaging_scarborough.clinic_id, location_radiant_medical_imaging_scarborough.id, service_row.id, 'unknown', 'The clinic''s website says it accepts requisition forms but does not state whether one is required to book a general ultrasound; confirm directly.',
  'clinic_website', 'https://radiantmedicalimaging.com/', 'Radiant Medical Imaging services and location information', date '2026-08-30', date '2026-08-30', 'verified'
from location_radiant_medical_imaging_scarborough, (select id from public.services where slug = 'ultrasound') as service_row;

-- Mayfair Diagnostics, Mayfair Place (Calgary, AB)
with clinic_mayfair_diagnostics_calgary as (
  insert into public.clinics (
    name, slug, website_url, public_email, public_phone, listing_status,
    source_type, source_url, source_label, source_checked_at, last_verified_at, verification_status
  ) values (
    'Mayfair Diagnostics, Mayfair Place', 'mayfair-diagnostics-calgary', 'https://www.radiology.ca/',
    null, '403-777-4674', 'published',
    'clinic_website', 'https://www.radiology.ca/services/magnetic-resonance-imaging-mri/', 'Mayfair Diagnostics MRI service information', date '2026-08-30', date '2026-08-30', 'verified'
  )
  returning id
),
location_mayfair_diagnostics_calgary as (
  insert into public.locations (
    clinic_id, name, slug, address_line_1, municipality, province_code, postal_code, public_phone,
    source_type, source_url, source_label, source_checked_at, last_verified_at, verification_status
  )
  select
    id, 'Mayfair Diagnostics, Mayfair Place', 'main', '132, 6707 Elbow Dr SW',
    'Calgary', 'AB', null, '403-777-4674',
    'clinic_website', 'https://www.radiology.ca/services/magnetic-resonance-imaging-mri/', 'Mayfair Diagnostics MRI service information', date '2026-08-30', date '2026-08-30', 'verified'
  from clinic_mayfair_diagnostics_calgary
  returning id, clinic_id
)
insert into public.clinic_services (
  clinic_id, location_id, service_id, referral_requirement, referral_notes,
  source_type, source_url, source_label, source_checked_at, last_verified_at, verification_status
)
select
  location_mayfair_diagnostics_calgary.clinic_id, location_mayfair_diagnostics_calgary.id, service_row.id, 'required', 'The clinic''s MRI page says an MRI must be requested by a health care practitioner.',
  'clinic_website', 'https://www.radiology.ca/services/magnetic-resonance-imaging-mri/', 'Mayfair Diagnostics MRI service information', date '2026-08-30', date '2026-08-30', 'verified'
from location_mayfair_diagnostics_calgary, (select id from public.services where slug = 'mri') as service_row;

-- MIC Medical Imaging, Century Park (Edmonton, AB)
with clinic_mic_medical_imaging_century_park as (
  insert into public.clinics (
    name, slug, website_url, public_email, public_phone, listing_status,
    source_type, source_url, source_label, source_checked_at, last_verified_at, verification_status
  ) values (
    'MIC Medical Imaging, Century Park', 'mic-medical-imaging-century-park', 'https://www.mic.ca/',
    null, '780-450-1500', 'published',
    'clinic_website', 'https://www.mic.ca/for-patients/procedure-information/mri-magnetic-resonance-imaging/private-mri-edmonton/', 'MIC Medical Imaging private MRI locations', date '2026-08-30', date '2026-08-30', 'verified'
  )
  returning id
),
location_mic_medical_imaging_century_park as (
  insert into public.locations (
    clinic_id, name, slug, address_line_1, municipality, province_code, postal_code, public_phone,
    source_type, source_url, source_label, source_checked_at, last_verified_at, verification_status
  )
  select
    id, 'MIC Medical Imaging, Century Park', 'main', '#201, 2377 - 111 Street NW',
    'Edmonton', 'AB', null, '780-450-1500',
    'clinic_website', 'https://www.mic.ca/for-patients/procedure-information/mri-magnetic-resonance-imaging/private-mri-edmonton/', 'MIC Medical Imaging private MRI locations', date '2026-08-30', date '2026-08-30', 'verified'
  from clinic_mic_medical_imaging_century_park
  returning id, clinic_id
)
insert into public.clinic_services (
  clinic_id, location_id, service_id, referral_requirement, referral_notes,
  source_type, source_url, source_label, source_checked_at, last_verified_at, verification_status
)
select
  location_mic_medical_imaging_century_park.clinic_id, location_mic_medical_imaging_century_park.id, service_row.id, 'required', 'Alberta now allows self-referred, self-paid diagnostic imaging, but MIC''s own site says it is ''not offering preventative health testing without a requisition at this time'', so a requisition is still required here.',
  'clinic_website', 'https://www.mic.ca/self-referral-for-pht-services/', 'MIC Medical Imaging self-referral policy', date '2026-08-30', date '2026-08-30', 'verified'
from location_mic_medical_imaging_century_park, (select id from public.services where slug = 'mri') as service_row;

-- Wosler Diagnostics (Calgary, AB)
with clinic_wosler_diagnostics_calgary as (
  insert into public.clinics (
    name, slug, website_url, public_email, public_phone, listing_status,
    source_type, source_url, source_label, source_checked_at, last_verified_at, verification_status
  ) values (
    'Wosler Diagnostics', 'wosler-diagnostics-calgary', 'https://wosler.ca/',
    null, '1-844-967-5352', 'published',
    'clinic_website', 'https://wosler.ca/contact/', 'Wosler Diagnostics contact and address information', date '2026-08-30', date '2026-08-30', 'verified'
  )
  returning id
),
location_wosler_diagnostics_calgary as (
  insert into public.locations (
    clinic_id, name, slug, address_line_1, municipality, province_code, postal_code, public_phone,
    source_type, source_url, source_label, source_checked_at, last_verified_at, verification_status
  )
  select
    id, 'Wosler Diagnostics', 'main', 'Suite 260, 8500 Blackfoot Trail SE',
    'Calgary', 'AB', 'T2J 7E1', '1-844-967-5352',
    'clinic_website', 'https://wosler.ca/contact/', 'Wosler Diagnostics contact and address information', date '2026-08-30', date '2026-08-30', 'verified'
  from clinic_wosler_diagnostics_calgary
  returning id, clinic_id
)
insert into public.clinic_services (
  clinic_id, location_id, service_id, referral_requirement, referral_notes,
  source_type, source_url, source_label, source_checked_at, last_verified_at, verification_status
)
select
  location_wosler_diagnostics_calgary.clinic_id, location_wosler_diagnostics_calgary.id, service_row.id, 'required', 'The clinic''s FAQ says a valid requisition from a physician, nurse practitioner, or other authorized healthcare provider is required for all diagnostic imaging exams.',
  'clinic_website', 'https://wosler.ca/faq/', 'Wosler Diagnostics FAQ', date '2026-08-30', date '2026-08-30', 'verified'
from location_wosler_diagnostics_calgary, (select id from public.services where slug = 'ultrasound') as service_row;

-- Open Skies MRI Diagnostics (Regina, SK)
with clinic_open_skies_mri_regina as (
  insert into public.clinics (
    name, slug, website_url, public_email, public_phone, listing_status,
    source_type, source_url, source_label, source_checked_at, last_verified_at, verification_status
  ) values (
    'Open Skies MRI Diagnostics', 'open-skies-mri-regina', 'https://openskies.ca/',
    null, '306-352-6736', 'published',
    'clinic_website', 'https://openskies.ca/', 'Open Skies MRI Diagnostics service and contact information', date '2026-08-31', date '2026-08-31', 'verified'
  )
  returning id
),
location_open_skies_mri_regina as (
  insert into public.locations (
    clinic_id, name, slug, address_line_1, municipality, province_code, postal_code, public_phone,
    source_type, source_url, source_label, source_checked_at, last_verified_at, verification_status
  )
  select
    id, 'Open Skies MRI Diagnostics', 'main', '1-2727 Parliament Avenue',
    'Regina', 'SK', 'S4S 6X5', '306-352-6736',
    'clinic_website', 'https://openskies.ca/', 'Open Skies MRI Diagnostics service and contact information', date '2026-08-31', date '2026-08-31', 'verified'
  from clinic_open_skies_mri_regina
  returning id, clinic_id
)
insert into public.clinic_services (
  clinic_id, location_id, service_id, referral_requirement, referral_notes,
  source_type, source_url, source_label, source_checked_at, last_verified_at, verification_status
)
select
  location_open_skies_mri_regina.clinic_id, location_open_skies_mri_regina.id, service_row.id, 'required', 'The clinic''s FAQ says a requisition must be sent to their office before an appointment can be scheduled.',
  'clinic_website', 'https://openskies.ca/faq', 'Open Skies MRI Diagnostics FAQ', date '2026-08-31', date '2026-08-31', 'verified'
from location_open_skies_mri_regina, (select id from public.services where slug = 'mri') as service_row;

-- Saskatoon Medical Imaging, Centre Mall (Saskatoon, SK)
with clinic_saskatoon_medical_imaging_centre_mall as (
  insert into public.clinics (
    name, slug, website_url, public_email, public_phone, listing_status,
    source_type, source_url, source_label, source_checked_at, last_verified_at, verification_status
  ) values (
    'Saskatoon Medical Imaging, Centre Mall', 'saskatoon-medical-imaging-centre-mall', 'https://www.saskatoonmedicalimaging.ca/',
    null, '306-477-1000', 'published',
    'clinic_website', 'https://www.saskatoonmedicalimaging.ca/', 'Saskatoon Medical Imaging locations and services', date '2026-08-31', date '2026-08-31', 'verified'
  )
  returning id
),
location_saskatoon_medical_imaging_centre_mall as (
  insert into public.locations (
    clinic_id, name, slug, address_line_1, municipality, province_code, postal_code, public_phone,
    source_type, source_url, source_label, source_checked_at, last_verified_at, verification_status
  )
  select
    id, 'Saskatoon Medical Imaging, Centre Mall', 'main', 'C1 3510 8th Street East',
    'Saskatoon', 'SK', 'S7H 0W6', '306-477-1000',
    'clinic_website', 'https://www.saskatoonmedicalimaging.ca/', 'Saskatoon Medical Imaging locations and services', date '2026-08-31', date '2026-08-31', 'verified'
  from clinic_saskatoon_medical_imaging_centre_mall
  returning id, clinic_id
)
insert into public.clinic_services (
  clinic_id, location_id, service_id, referral_requirement, referral_notes,
  source_type, source_url, source_label, source_checked_at, last_verified_at, verification_status
)
select
  location_saskatoon_medical_imaging_centre_mall.clinic_id, location_saskatoon_medical_imaging_centre_mall.id, service_row.id, 'required', 'The clinic''s booking process page says your doctor fills out a requisition form that serves as your referral to the clinic.',
  'clinic_website', 'https://www.saskatoonmedicalimaging.ca/our-process', 'Saskatoon Medical Imaging booking process', date '2026-08-31', date '2026-08-31', 'verified'
from location_saskatoon_medical_imaging_centre_mall, (select id from public.services where slug = 'mri') as service_row
union all
select
  location_saskatoon_medical_imaging_centre_mall.clinic_id, location_saskatoon_medical_imaging_centre_mall.id, service_row.id, 'required', 'The clinic''s booking process page says your doctor fills out a requisition form that serves as your referral to the clinic.',
  'clinic_website', 'https://www.saskatoonmedicalimaging.ca/our-process', 'Saskatoon Medical Imaging booking process', date '2026-08-31', date '2026-08-31', 'verified'
from location_saskatoon_medical_imaging_centre_mall, (select id from public.services where slug = 'ultrasound') as service_row;

-- HealthView Medical Imaging (Halifax, NS)
with clinic_healthview_medical_imaging_halifax as (
  insert into public.clinics (
    name, slug, website_url, public_email, public_phone, listing_status,
    source_type, source_url, source_label, source_checked_at, last_verified_at, verification_status
  ) values (
    'HealthView Medical Imaging', 'healthview-medical-imaging-halifax', 'https://healthviewimaging.ca/',
    null, '902-443-9922', 'published',
    'clinic_website', 'https://healthviewimaging.ca/', 'Healthview Medical Imaging service information', date '2026-08-31', date '2026-08-31', 'verified'
  )
  returning id
),
location_healthview_medical_imaging_halifax as (
  insert into public.locations (
    clinic_id, name, slug, address_line_1, municipality, province_code, postal_code, public_phone,
    source_type, source_url, source_label, source_checked_at, last_verified_at, verification_status
  )
  select
    id, 'HealthView Medical Imaging', 'main', '255 Lacewood Drive, Suite 100A',
    'Halifax', 'NS', 'B3M 4G2', '902-443-9922',
    'clinic_website', 'https://healthviewimaging.ca/', 'Healthview Medical Imaging service information', date '2026-08-31', date '2026-08-31', 'verified'
  from clinic_healthview_medical_imaging_halifax
  returning id, clinic_id
)
insert into public.clinic_services (
  clinic_id, location_id, service_id, referral_requirement, referral_notes,
  source_type, source_url, source_label, source_checked_at, last_verified_at, verification_status
)
select
  location_healthview_medical_imaging_halifax.clinic_id, location_healthview_medical_imaging_halifax.id, service_row.id, 'required', 'The clinic''s MRI FAQ says all Healthview scans require a referral from your healthcare provider.',
  'clinic_website', 'https://healthviewimaging.ca/index.php/mri/faq/', 'Healthview Medical Imaging MRI FAQ', date '2026-08-31', date '2026-08-31', 'verified'
from location_healthview_medical_imaging_halifax, (select id from public.services where slug = 'mri') as service_row
union all
select
  location_healthview_medical_imaging_halifax.clinic_id, location_healthview_medical_imaging_halifax.id, service_row.id, 'required', 'The clinic''s MRI FAQ says all Healthview scans require a referral from your healthcare provider.',
  'clinic_website', 'https://healthviewimaging.ca/index.php/mri/faq/', 'Healthview Medical Imaging MRI FAQ', date '2026-08-31', date '2026-08-31', 'verified'
from location_healthview_medical_imaging_halifax, (select id from public.services where slug = 'ultrasound') as service_row;

-- Why Wait Imaging (Halifax, NS)
with clinic_why_wait_imaging_halifax as (
  insert into public.clinics (
    name, slug, website_url, public_email, public_phone, listing_status,
    source_type, source_url, source_label, source_checked_at, last_verified_at, verification_status
  ) values (
    'Why Wait Imaging', 'why-wait-imaging-halifax', 'https://whywaitimaging.ca/',
    null, '902-800-8727', 'published',
    'clinic_website', 'https://whywaitimaging.ca/services/', 'Why Wait Imaging services and contact information', date '2026-08-31', date '2026-08-31', 'verified'
  )
  returning id
),
location_why_wait_imaging_halifax as (
  insert into public.locations (
    clinic_id, name, slug, address_line_1, municipality, province_code, postal_code, public_phone,
    source_type, source_url, source_label, source_checked_at, last_verified_at, verification_status
  )
  select
    id, 'Why Wait Imaging', 'main', 'Suite 50, 6140 Young Street',
    'Halifax', 'NS', 'B3K 0G2', '902-800-8727',
    'clinic_website', 'https://whywaitimaging.ca/services/', 'Why Wait Imaging services and contact information', date '2026-08-31', date '2026-08-31', 'verified'
  from clinic_why_wait_imaging_halifax
  returning id, clinic_id
)
insert into public.clinic_services (
  clinic_id, location_id, service_id, referral_requirement, referral_notes,
  source_type, source_url, source_label, source_checked_at, last_verified_at, verification_status
)
select
  location_why_wait_imaging_halifax.clinic_id, location_why_wait_imaging_halifax.id, service_row.id, 'unknown', 'The clinic''s site advertises same-day private-pay MRI but does not state whether a physician referral is required to book; confirm directly.',
  'clinic_website', 'https://whywaitimaging.ca/services/', 'Why Wait Imaging services and contact information', date '2026-08-31', date '2026-08-31', 'verified'
from location_why_wait_imaging_halifax, (select id from public.services where slug = 'mri') as service_row
union all
select
  location_why_wait_imaging_halifax.clinic_id, location_why_wait_imaging_halifax.id, service_row.id, 'unknown', 'The clinic''s site advertises same-day private-pay ultrasound but does not state whether a physician referral is required to book; confirm directly.',
  'clinic_website', 'https://whywaitimaging.ca/services/', 'Why Wait Imaging services and contact information', date '2026-08-31', date '2026-08-31', 'verified'
from location_why_wait_imaging_halifax, (select id from public.services where slug = 'ultrasound') as service_row;

-- Wosler Diagnostics (Sackville, NS)
with clinic_wosler_diagnostics_sackville as (
  insert into public.clinics (
    name, slug, website_url, public_email, public_phone, listing_status,
    source_type, source_url, source_label, source_checked_at, last_verified_at, verification_status
  ) values (
    'Wosler Diagnostics', 'wosler-diagnostics-sackville', 'https://wosler.ca/',
    null, '902-593-4456', 'published',
    'clinic_website', 'https://radiology.wosler.ca/halifax', 'Wosler Diagnostics Halifax-area location and services', date '2026-08-31', date '2026-08-31', 'verified'
  )
  returning id
),
location_wosler_diagnostics_sackville as (
  insert into public.locations (
    clinic_id, name, slug, address_line_1, municipality, province_code, postal_code, public_phone,
    source_type, source_url, source_label, source_checked_at, last_verified_at, verification_status
  )
  select
    id, 'Wosler Diagnostics', 'main', '159 Cobequid Road, Suite 203 Lower',
    'Sackville', 'NS', 'B4C 2N1', '902-593-4456',
    'clinic_website', 'https://radiology.wosler.ca/halifax', 'Wosler Diagnostics Halifax-area location and services', date '2026-08-31', date '2026-08-31', 'verified'
  from clinic_wosler_diagnostics_sackville
  returning id, clinic_id
)
insert into public.clinic_services (
  clinic_id, location_id, service_id, referral_requirement, referral_notes,
  source_type, source_url, source_label, source_checked_at, last_verified_at, verification_status
)
select
  location_wosler_diagnostics_sackville.clinic_id, location_wosler_diagnostics_sackville.id, service_row.id, 'required', 'The clinic''s FAQ says a valid requisition from a physician, nurse practitioner, or other authorized healthcare provider is required for all diagnostic imaging exams, and that this applies across the provinces it serves, including Nova Scotia.',
  'clinic_website', 'https://radiology.wosler.ca/halifax', 'Wosler Diagnostics Halifax-area location and services', date '2026-08-31', date '2026-08-31', 'verified'
from location_wosler_diagnostics_sackville, (select id from public.services where slug = 'ultrasound') as service_row;

-- IRM Moncton MRI (Moncton, NB)
with clinic_irm_moncton_mri as (
  insert into public.clinics (
    name, slug, website_url, public_email, public_phone, listing_status,
    source_type, source_url, source_label, source_checked_at, last_verified_at, verification_status
  ) values (
    'IRM Moncton MRI', 'irm-moncton-mri', 'https://monctonmri.com/',
    null, '506-204-7040', 'published',
    'clinic_website', 'https://monctonmri.com/', 'IRM Moncton MRI service and contact information', date '2026-08-31', date '2026-08-31', 'verified'
  )
  returning id
),
location_irm_moncton_mri as (
  insert into public.locations (
    clinic_id, name, slug, address_line_1, municipality, province_code, postal_code, public_phone,
    source_type, source_url, source_label, source_checked_at, last_verified_at, verification_status
  )
  select
    id, 'IRM Moncton MRI', 'main', '585 Mapleton Road, Suite 101',
    'Moncton', 'NB', 'E1G 2K5', '506-204-7040',
    'clinic_website', 'https://monctonmri.com/', 'IRM Moncton MRI service and contact information', date '2026-08-31', date '2026-08-31', 'verified'
  from clinic_irm_moncton_mri
  returning id, clinic_id
)
insert into public.clinic_services (
  clinic_id, location_id, service_id, referral_requirement, referral_notes,
  source_type, source_url, source_label, source_checked_at, last_verified_at, verification_status
)
select
  location_irm_moncton_mri.clinic_id, location_irm_moncton_mri.id, service_row.id, 'required', 'The clinic''s MRI FAQ says all MRI scans require a referral from your healthcare provider.',
  'clinic_website', 'https://monctonmri.com/index.php/magnetic-resonance-imaging/faq/', 'IRM Moncton MRI FAQ', date '2026-08-31', date '2026-08-31', 'verified'
from location_irm_moncton_mri, (select id from public.services where slug = 'mri') as service_row
union all
select
  location_irm_moncton_mri.clinic_id, location_irm_moncton_mri.id, service_row.id, 'required', 'The clinic''s ultrasound FAQ says to bring your requisition, and that the sonographer can only scan the area indicated on the requisition from your doctor.',
  'clinic_website', 'https://monctonmri.com/index.php/ultrasound/faq/', 'IRM Moncton MRI ultrasound FAQ', date '2026-08-31', date '2026-08-31', 'verified'
from location_irm_moncton_mri, (select id from public.services where slug = 'ultrasound') as service_row;

-- Summerside Diagnostic Imaging Centre (Summerside, PE)
with clinic_summerside_diagnostic_imaging_centre as (
  insert into public.clinics (
    name, slug, website_url, public_email, public_phone, listing_status,
    source_type, source_url, source_label, source_checked_at, last_verified_at, verification_status
  ) values (
    'Summerside Diagnostic Imaging Centre', 'summerside-diagnostic-imaging-centre', 'https://www.summersideimaging.com/',
    'info@summersideimaging.com', '902-436-1119', 'published',
    'clinic_website', 'https://www.summersideimaging.com/', 'Summerside Diagnostic Imaging Centre service and contact information', date '2026-08-31', date '2026-08-31', 'verified'
  )
  returning id
),
location_summerside_diagnostic_imaging_centre as (
  insert into public.locations (
    clinic_id, name, slug, address_line_1, municipality, province_code, postal_code, public_phone,
    source_type, source_url, source_label, source_checked_at, last_verified_at, verification_status
  )
  select
    id, 'Summerside Diagnostic Imaging Centre', 'main', '107 Walker Ave',
    'Summerside', 'PE', null, '902-436-1119',
    'clinic_website', 'https://www.summersideimaging.com/', 'Summerside Diagnostic Imaging Centre service and contact information', date '2026-08-31', date '2026-08-31', 'verified'
  from clinic_summerside_diagnostic_imaging_centre
  returning id, clinic_id
)
insert into public.clinic_services (
  clinic_id, location_id, service_id, referral_requirement, referral_notes,
  source_type, source_url, source_label, source_checked_at, last_verified_at, verification_status
)
select
  location_summerside_diagnostic_imaging_centre.clinic_id, location_summerside_diagnostic_imaging_centre.id, service_row.id, 'unknown', 'The clinic''s patient information page says it accepts referrals from a broad range of provider types and lists card payment as an accepted payment method, but does not state whether a referral is strictly required to book; confirm directly.',
  'clinic_website', 'https://www.summersideimaging.com/patient-information/', 'Summerside Diagnostic Imaging Centre patient information', date '2026-08-31', date '2026-08-31', 'verified'
from location_summerside_diagnostic_imaging_centre, (select id from public.services where slug = 'mri') as service_row;

