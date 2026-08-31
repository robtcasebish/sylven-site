-- A small number of sourced clinics do not publish a postal code anywhere
-- on their own website (see the "No postal code" comments in
-- src/lib/clinic-directory.ts for Toronto Ultrasound Imaging, Mayfair
-- Diagnostics, MIC Medical Imaging, and Summerside Diagnostic Imaging
-- Centre). Per DATA_MODEL.md's provenance rule, an unpublished fact is
-- recorded as absent rather than filled in from a third-party source, so
-- the schema needs to allow that honestly instead of forcing a placeholder
-- value into a required column.
--
-- The postal code format check is left in place: it still rejects a
-- malformed value, it just no longer requires a value to be present.

alter table public.locations
  alter column postal_code drop not null;
