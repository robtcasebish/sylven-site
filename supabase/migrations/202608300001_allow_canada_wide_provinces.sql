-- Widen the locations.province_code allow list from BC-only to every
-- Canadian province and territory, so the schema can hold a location
-- anywhere in Canada. This does not add, publish, or imply any real
-- location outside the existing sourced pilot; it only removes a
-- technical constraint that blocked it. Adding a region to the public
-- product remains a separate, reviewed content decision.

alter table public.locations
  alter column province_code drop default;

alter table public.locations
  drop constraint locations_province_code_check;

alter table public.locations
  add constraint locations_province_code_check
  check (province_code in (
    'AB', 'BC', 'MB', 'NB', 'NL', 'NS', 'NT', 'NU', 'ON', 'PE', 'QC', 'SK', 'YT'
  ));
