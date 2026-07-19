# Data Model

## Model goals

The model supports a small public clinic directory, source/freshness tracking, listing verification, and minimal consented inquiries. It is not a clinical record, patient record, scheduling system, payment ledger, or prescription system.

Use Postgres UUID primary keys, timezone-aware timestamps, lower-case slugs, and migrations reviewed in source control. Store Canadian postal geography only to the granularity required for search; an inquiry may use an optional forward-sortation area (the first three postal-code characters), not a full home address.

## Provenance rule

Every table that contributes clinic-specific public facts—`clinics`, `locations`, and `clinic_services`—must include:

- `source_type`: controlled value such as `clinic_website`, `regulator`, `clinic_submission`, `direct_confirmation`, or `other_public_source`;
- `source_url`: required for web sources and otherwise replaced by a non-public evidence reference;
- `source_label`: short human-readable attribution;
- `source_checked_at`: when the source was last checked;
- `last_verified_at`: when an operator last accepted the facts as current;
- `verification_status`: `unverified`, `verified`, `stale`, `disputed`, or `rejected`; and
- `updated_at` plus the internal actor responsible for the change.

Where one record contains facts from different sources, either split the facts into separate records or add field-level evidence in `listing_verifications`; never publish a composite record with ambiguous provenance. A clinic's own submission is a source, not proof of clinical quality.

## Tables

### `clinics`

One organization-level clinic record.

Suggested fields:

- `id` UUID primary key
- `name` text
- `slug` text
- `legal_name` text, optional and not necessarily public
- `website_url` text
- `public_email` text, optional
- `public_phone` text, optional
- `description` text, factual and moderated
- `listing_status`: `draft`, `published`, `suspended`, or `archived`
- `sponsorship_status`: `none` or `enhanced`; commercial status must not determine verification
- `sponsorship_starts_at` and `sponsorship_ends_at`, optional
- provenance and audit fields defined above
- `created_at`, `updated_at`, and `archived_at`

Constraints:

- unique normalized `slug`;
- non-empty trimmed `name`;
- URLs limited to HTTPS in production, except explicitly approved local development values;
- `published` requires a non-empty website or direct public contact method, accepted source, `last_verified_at`, and at least one active location/service;
- sponsorship dates must be coherent and must not set verification status; and
- descriptions have a strict length limit and cannot contain HTML.

### `services`

Sylven's controlled service taxonomy, not medical advice.

Suggested fields:

- `id` UUID primary key
- `name` text, initially `MRI` and `Ultrasound`
- `slug` text
- `category` text, initially `diagnostic-imaging`
- `plain_language_description` text
- `status`: `active` or `archived`
- `sort_order` integer
- optional taxonomy source/reference and review date
- `created_at`, `updated_at`

Constraints:

- unique `slug` and unique case-insensitive `name` within a category;
- non-negative `sort_order`;
- no treatment recommendation, eligibility rule, or outcome claim in taxonomy copy; and
- archived services remain referentially intact but disappear from public filters.

### `locations`

One physical clinic location. Virtual-only clinical service is not part of the initial wedge.

Suggested fields:

- `id` UUID primary key
- `clinic_id` foreign key to `clinics`
- `name` text, such as a branch label
- `slug` text unique within the clinic
- `address_line_1`, optional `address_line_2`
- `municipality`, `province_code`, and `postal_code`
- optional `latitude` and `longitude` only when sourced and required later
- `public_phone`, `public_email`, and `booking_url`, optional
- structured `hours` JSON with a versioned application schema, optional
- factual `accessibility_notes`, optional
- `status`: `active`, `temporarily_closed`, or `archived`
- provenance and audit fields defined above
- `created_at`, `updated_at`

Constraints:

- foreign key to a non-archived clinic for new records;
- unique (`clinic_id`, `slug`) and an additional unique (`id`, `clinic_id`) pair to support composite integrity from clinic services;
- `province_code` uses an allow list and is `BC` for the initial wedge;
- uppercase Canadian postal-code validation; public display may include the full clinic postal code because it is a business address;
- coordinates, when present, must be valid Canadian latitude/longitude ranges; and
- no home, practitioner-residential, or unverified address may be published.

### `clinic_services`

One service offered at one clinic location. Location specificity avoids implying that every branch offers every modality.

Suggested fields:

- `id` UUID primary key
- `clinic_id` foreign key to `clinics`
- `location_id` foreign key to `locations`
- `service_id` foreign key to `services`
- `status`: `active`, `paused`, or `archived`
- `referral_requirement`: `required`, `not_required`, `varies`, or `unknown`
- `referral_notes` short factual text, optional
- `published_price_min_cad` and `published_price_max_cad`, optional
- `price_notes` and `booking_notes`, optional
- provenance and audit fields defined above
- `created_at`, `updated_at`

Constraints:

- unique (`location_id`, `service_id`);
- composite foreign key (`location_id`, `clinic_id`) ensures the location belongs to the same clinic;
- prices are non-negative, use fixed-precision numeric values, and minimum cannot exceed maximum;
- price fields may be populated only from a dated clinic-controlled source or direct confirmation and must be labelled as published information, not a quote;
- `active` requires the related clinic to be publishable, the location active, the service active, and provenance present; and
- notes are length-limited plain text and cannot promise eligibility, speed, outcome, or appropriateness.

### `listing_verifications`

An append-only history of sourcing, review, correction, and dispute decisions.

Suggested fields:

- `id` UUID primary key
- `clinic_id` required foreign key
- optional `location_id` and `clinic_service_id` foreign keys identifying the reviewed scope
- `verification_type`: `initial_research`, `periodic_review`, `clinic_confirmation`, `correction`, or `dispute`
- `outcome`: `verified`, `partially_verified`, `stale`, `disputed`, or `rejected`
- `verified_fields` text array or structured JSON using an allow-listed schema
- `source_type`, `source_url`, `source_label`, and `source_checked_at`
- `evidence_reference` pointing to protected evidence, optional
- `notes` internal plain text
- `performed_by` internal actor ID
- `performed_at`
- `next_review_at`

Constraints:

- at least one scoped entity must be identified and all scoped children must belong to `clinic_id`;
- a web source requires an HTTPS URL;
- `next_review_at` cannot precede `performed_at`;
- evidence and internal notes are never public; and
- records are append-only except for narrowly controlled redaction of accidentally entered personal information.

### `leads`

One minimal inquiry from a person. A lead is not a patient, health record, appointment, or clinical assessment.

Suggested fields:

- `id` UUID primary key, never placed directly in a public URL
- `public_reference` random, non-sequential reference
- `service_id` foreign key
- optional `location_preference_fsa` containing only the first three postal-code characters
- `name` text
- `email` text
- `phone` text, optional
- `preferred_contact`: `email` or `phone`
- `logistical_message` text, optional and short
- `status`: `received`, `partially_delivered`, `delivered`, `failed`, `suppressed`, or `deleted`
- `idempotency_key_hash`
- optional `abuse_signal_hash`, only if privacy review approves it
- `retention_expires_at`
- `created_at`, `updated_at`, `deleted_at`

Do not add date of birth, full home address, health card number, symptoms, diagnosis, medication, medical history, insurance information, physician name, images, attachments, free-form clinical reason, or payment data. The interface must ask users not to place those details in `logistical_message`; server-side moderation should flag likely medical detail for internal safe handling rather than attempt a clinical interpretation.

Constraints:

- normalized email and optional E.164 phone validation;
- phone is required only when `preferred_contact` is `phone`;
- strict maximum lengths, including a short message limit;
- valid service must be active;
- unique idempotency-key hash within a defined time window;
- retention expiry is required at creation; and
- at least one committed `lead_consents` row is required before the lead can become deliverable, enforced through the server transaction and tested database function.

### `lead_consents`

One disclosure authorization for one recipient clinic. A multi-clinic inquiry creates one row per clinic, after the user sees and selects each clinic by name.

Suggested fields:

- `id` UUID primary key
- `lead_id` foreign key to `leads`
- `clinic_id` foreign key to `clinics`
- optional `location_id` and `clinic_service_id` identifying the intended branch/service
- `consent_version` identifier
- `consent_text_snapshot` exact short disclosure presented to the user
- `disclosure_purpose`, fixed initially to `clinic_inquiry`
- `consented_at`
- `delivery_status`: `pending`, `sent`, `failed`, `suppressed`, or `revoked_before_delivery`
- `delivery_attempted_at`, `delivered_at`, and a non-sensitive `delivery_provider_reference`, optional
- optional keyed hashes supporting abuse/audit evidence if privacy review approves them
- `created_at`, `updated_at`

Constraints:

- unique (`lead_id`, `clinic_id`);
- scoped location and clinic service must belong to the same recipient clinic and selected service;
- consent version and text snapshot are required and immutable after consent;
- only a currently published recipient clinic may be newly consented;
- delivery cannot be marked `sent` without `delivery_attempted_at`; and
- consent for one clinic never authorizes disclosure to another clinic, parent company, or marketing partner.

## Suggested indexes

Public discovery:

- unique B-tree on `clinics.slug`;
- partial B-tree on `clinics(listing_status, sponsorship_status)` for published records;
- unique B-tree on `locations(clinic_id, slug)`;
- B-tree on `locations(province_code, municipality, status)`;
- optional GiST geography index only if coordinates and radius search are later introduced;
- unique B-tree on `services.slug` and B-tree on `services(status, sort_order)`;
- unique B-tree on `clinic_services(location_id, service_id)`;
- B-tree on `clinic_services(service_id, status, location_id)`; and
- B-tree on `last_verified_at`/`verification_status` for stale-record operations.

Verification and operations:

- B-tree on `listing_verifications(clinic_id, performed_at desc)`;
- B-tree on `listing_verifications(next_review_at)` for due reviews;
- B-tree on `leads(status, created_at)` and `leads(retention_expires_at)`;
- unique B-tree on `leads.public_reference`;
- partial unique index on the active idempotency hash strategy;
- unique B-tree on `lead_consents(lead_id, clinic_id)`; and
- B-tree on `lead_consents(clinic_id, delivery_status, created_at)` for delivery operations.

Do not add general full-text indexes over lead names, messages, emails, or phone numbers.

## Row-level security expectations

Enable RLS on every Supabase table.

### Anonymous and public web users

- may read only sanitized public views containing published clinics, active locations, active services, active clinic services, and a safe summary of source/freshness information;
- may not read internal verification evidence, actor IDs, commercial dates, lead data, or consent data;
- may not insert directly into base lead or consent tables; and
- may submit through one restricted server-side transaction after validation and rate limiting.

### Clinics

There are no clinic accounts or direct clinic database sessions in version one. A clinic receives only the inquiries for which it has a consent row, via the controlled delivery channel. Future clinic access requires a separate threat model and RLS design; do not pre-authorize broad clinic reads now.

### Internal operators

- authenticate using a protected internal role with least privilege;
- listing editors may manage directory and verification records but cannot browse lead contents unless their operational role requires it;
- lead-delivery operators may access only the minimal fields and recipient consents needed to resolve delivery;
- destructive actions, exports, and role changes require elevated authorization and audit logging; and
- the Supabase service role is server-only and used narrowly, never in browser code or analytics.

### Database functions and views

- expose a public directory view that omits internal evidence and enforces publication/freshness rules;
- perform lead plus consent creation in one reviewed transaction with explicit recipient validation;
- perform delivery selection through a function or query that returns a lead only alongside that clinic's consent row;
- use security-definer functions only when necessary, with fixed search paths and explicit grants; and
- test that one recipient can never retrieve another recipient's consent or lead.

## Retention and deletion

Set the initial lead retention period to 90 days after final delivery or suppression unless legal/privacy review requires a shorter period. Consent evidence may need a different documented retention period, but should be separated from contact/message content where practical. Automate expiry, produce deletion audit events without retaining deleted personal content, and document how a person requests access, correction, or deletion.

Analytics must use aggregate events and listing identifiers only. Do not copy lead personal information or message contents into analytics, error monitoring, logs, spreadsheets, or customer-relationship tools without a separately reviewed purpose and consent basis.
