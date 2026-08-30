# Sylven Product Definition

## Product statement

Sylven is a Canadian directory and discovery platform for private healthcare services. It helps a person understand which nearby clinics offer a service, compare practical listing information, and contact one or more clinics directly.

Sylven is an information and referral channel. The clinic—not Sylven—answers the inquiry, determines whether it can help, explains clinical requirements, forms any provider-patient relationship, and delivers care.

## Target users

### People looking for care

The initial user is a Canadian adult, or a caregiver searching on an adult's behalf, who:

- knows the type of private service they want or can choose from a short, plain-language taxonomy;
- wants options within a practical travel area;
- needs comparable facts such as location, contact methods, services offered, referral requirements, accessibility, and published price information; and
- wants to contact an appropriate clinic without creating an account or completing a medical assessment.

### Clinics

The initial clinic user is an owner, manager, or intake coordinator at an eligible private clinic who wants accurate discovery traffic and qualified, consented inquiries. Clinic participation must not imply endorsement, clinical quality, or a commercial relationship unless that relationship is clearly disclosed.

### Internal operators

Sylven staff curate listings, record sources, verify facts, handle corrections, moderate claims, and monitor inquiry delivery. The first release may use Supabase's administrative tools and a documented internal process; it does not require a custom clinic or staff dashboard.

## What Sylven does

Sylven:

- publishes sourced, dated clinic and service listings;
- lets people browse and filter clinics by service and location;
- presents factual, comparable clinic information without ranking clinical quality;
- provides direct clinic contact details and booking links when verified;
- optionally forwards a minimal inquiry to only the clinic or clinics the person selects;
- records the person's explicit consent for every recipient clinic;
- lets clinics request corrections and listing verification; and
- labels paid placement clearly and keeps organic relevance separate from payment.

## What Sylven does not do

Sylven is not a clinic, healthcare provider, pharmacy, telehealth operator, medical assessment service, care coordinator, insurer, or emergency service. It does not:

- diagnose, triage, recommend treatment, assess eligibility, or provide medical advice;
- employ or assign physicians, pharmacists, or other clinicians to users;
- establish or manage provider-patient relationships;
- issue, transmit, renew, dispense, sell, ship, or coordinate prescriptions or medication;
- promise availability, acceptance, wait times, outcomes, prices, insurance coverage, or clinical quality;
- collect detailed symptoms, medical histories, medication lists, health card numbers, dates of birth, or payment card data;
- offer patient accounts, patient portals, clinical messaging, health tracking, or medical records;
- charge patients, sell memberships, process clinic fees in the inquiry flow, or issue patient refunds; or
- imply that a listing, verification, sponsorship, or ranking is a medical endorsement.

If a user may need urgent or emergency care, the product provides a general notice to use 911 or the appropriate provincial service; it does not attempt to triage the situation.

## Initial wedge

### Geography

Launch in **Metro Vancouver, British Columbia**, using a documented municipality set rather than an ambiguous distance claim. The first set should include Vancouver, Burnaby, Richmond, North Vancouver, West Vancouver, New Westminster, Coquitlam, Port Coquitlam, Port Moody, Surrey, Delta, White Rock, and Langley.

### Service category

Start with **private-pay diagnostic imaging**, initially MRI and ultrasound. This is a narrow, high-intent category where users commonly need to compare location, modality, referral requirements, booking method, accessibility, hours, and any clinic-published price or price range.

Only list a modality where a current clinic-controlled source or direct clinic verification supports it. Do not claim that a service is medically appropriate, legally available to every user, faster than public care, or available without a referral unless the clinic's current published information supports that exact fact.

### Expansion rule

Do not add a new province or service category until the initial inventory is materially complete, stale-data review is operating, inquiries are reaching the intended clinics, and correction requests can be handled reliably. Expansion should follow a short written decision covering taxonomy, regulatory language, data sources, and lead fields.

### Expansion decision: 2026-08-30, Canada-wide geography

The product owner decided to move the geographic scope to Canada-wide ahead of the Metro Vancouver inventory being materially complete, to unblock work on the technical foundation while sourcing continues in parallel. This decision is scoped narrowly:

- **Taxonomy**: unchanged. The service category stays private-pay MRI and ultrasound; no new category is in scope yet.
- **Regulatory language**: not yet reviewed. Quebec's language-of-commerce requirements (public-facing content in French) and any other provincial rules for advertising private health services have not been assessed. Do not publish a region in Quebec, or any other province with an unreviewed regulatory requirement, before that review happens.
- **Data sources**: unchanged. New regions use the same clinic-controlled source, dated check, and verification-before-publish rules as the Metro Vancouver pilot. No region is added to `regions` in `src/lib/directory.ts` without sourced, dated records behind it.
- **Lead fields**: unchanged. The `leads` and `lead_consents` schema and its privacy boundaries apply nationally as written; a wider footprint does not relax them.

What changed as a direct result of this decision: the `locations.province_code` database constraint and the corresponding TypeScript types were widened from a BC-only allow list to all thirteen Canadian provinces and territories, and the locations route now resolves any published region instead of a single hardcoded one. This is a technical capability change only. It does not add, publish, or imply any real clinic data outside the existing sourced Metro Vancouver pilot, and it does not change the review gates in the rollout sequence below.

## Clinic monetization

Use a simple two-tier model:

1. **Standard listing — free.** Eligible clinics receive a factual listing assembled from public sources or clinic submissions. Standard listings can be verified and corrected; verification is never for sale.
2. **Enhanced listing — CAD $199 per location per month.** After an initial no-charge pilot, a clinic may add richer factual content, a prominent booking link, inquiry-delivery analytics supplied manually, and eligibility for clearly labelled sponsored positions. Billing is handled outside the public product in the first release.

Commercial rules:

- organic ordering is based on documented relevance factors, not payment;
- sponsored positions are visibly labelled and never described as "best," "recommended," or clinically superior;
- Sylven takes no percentage of treatment revenue and charges no patient fee;
- do not launch pay-per-lead pricing in the first release;
- paying clinics are subject to the same sourcing, verification, moderation, and freshness rules as free listings; and
- a paid plan cannot purchase a verification state, favourable review, unsupported claim, or exclusion of competitors.

## Minimum viable release

The minimum viable release contains:

- a plain-language homepage explaining the directory and its boundaries;
- a Metro Vancouver MRI and ultrasound results page with service and municipality filters;
- indexable clinic detail pages with sourced service, location, contact, accessibility, hours, referral, booking, and published-price facts where available;
- a direct website/phone contact option and a minimal Sylven inquiry flow;
- recipient-specific consent naming every clinic that will receive an inquiry;
- a clinic correction/verification request channel;
- About, Privacy, Terms, Contact, and listing-methodology pages;
- internal listing and inquiry operations using Supabase administration rather than a custom dashboard;
- basic analytics, error monitoring, abuse protection, automated tests, and an accessibility review; and
- a repeatable stale-listing review report.

The first release specifically excludes patient accounts, clinic accounts, a clinic dashboard, reviews and ratings, clinical matching, medical questionnaires, appointment scheduling, live availability, maps requiring a third-party geocoding platform, patient payments, subscription checkout, and prescription or medication workflows.

## Success measures

Measure whether the directory works before expanding it:

- percentage of eligible wedge clinics with complete, sourced records;
- percentage of public records verified within the defined freshness window;
- search-to-clinic-detail and clinic-detail-to-contact conversion;
- inquiry delivery success and clinic acknowledgement rate;
- correction rate and median time to resolve a correction;
- consent, spam, privacy, and misdelivery incidents; and
- enhanced-listing conversion after the pilot.

Do not use treatment starts, prescriptions, health outcomes, or medication sales as Sylven product success metrics.
