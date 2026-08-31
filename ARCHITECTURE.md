# Production Architecture

## Principles

The first production version should be a small, server-rendered directory, not a healthcare delivery platform. Prefer framework conventions and managed services over custom infrastructure. Keep personal inquiry data server-side, keep public listing reads fast, and make provenance visible in both the data model and operating workflow.

Explicit exclusions are patient accounts, medical assessments, prescription or medication workflows, patient payments, live appointment scheduling, reviews, clinical recommendations, and a full clinic dashboard.

## Technology choices

- **Application:** Next.js App Router with strict TypeScript.
- **UI:** React Server Components by default; Client Components only for interactive filters, consent controls, and progressive form enhancement.
- **Database:** Supabase-hosted Postgres with migrations committed to the repository.
- **Deployment:** Netlify's supported Next.js runtime, Deploy Previews, atomic production deploys, environment-scoped secrets, and function logs.
- **Data access:** a typed Supabase server client. Public data should be read through deliberately limited views or server queries; the browser never receives a service-role key.
- **Inquiry notification:** one transactional email provider called from the server after the lead and consent rows commit. Email contains only the minimum inquiry data and a recipient identifier. Provider choice can remain an adapter.
- **Monitoring:** Netlify application logs plus a small error-monitoring service with personal data scrubbing. Analytics must be privacy-conscious and must not include inquiry contents.

Do not add a separate API server, queue, search cluster, CMS, geocoding platform, or custom admin application until measured requirements justify it.

## Deployment shape

Netlify runs the Next.js application and its server-side route handlers. Supabase supplies Postgres and internal administrative access. Public requests flow through the Next.js server; only published directory facts are cacheable. Inquiry writes execute server-side with validation, abuse controls, a database transaction, and notification delivery.

Use separate Netlify contexts and separate Supabase projects for local development, deploy previews/staging, and production. Never point a deploy preview at the production lead table or send real clinic notifications from a preview.

## Routes

| Route | Purpose | Rendering |
| --- | --- | --- |
| `/` | Product explanation, service/location entry points, boundaries, and featured wedge content | Static or revalidated server render |
| `/clinics` | Search results filtered by service and municipality | Server-rendered, URL query parameters are canonical state |
| `/clinics/[clinicSlug]` | Clinic overview and all published locations | Server-rendered with revalidation |
| `/clinics/[clinicSlug]/[locationSlug]` | Location-specific services, contact facts, source freshness, and inquiry entry | Server-rendered with revalidation |
| `/services/[serviceSlug]` | MRI or ultrasound landing/results page | Static or revalidated server render |
| `/locations/[municipalitySlug]` | Municipality landing/results page | Static or revalidated server render |
| `/inquire` | Review selected clinic recipients and submit the minimal inquiry | Dynamic server render; never index |
| `/inquire/sent` | Non-sensitive confirmation with reference number | Dynamic; never expose inquiry data in URL |
| `/for-clinics` | Listing policy, correction/verification process, and commercial overview | Static |
| `/listing-methodology` | Sources, verification, freshness, ranking, and sponsorship policy | Static |
| `/about` | Company and directory boundaries | Static |
| `/contact` | General and correction contact options; no medical intake | Static or server-handled minimal form |
| `/privacy` | Directory and inquiry privacy policy | Static, reviewed content |
| `/terms` | Directory terms | Static, reviewed content |
| `/api/leads` | Validates and records inquiries and consent, then triggers delivery | Server-only `POST` route handler |
| `/api/corrections` | Records a listing correction/verification request | Server-only `POST` route handler |

Use permanent redirects only where the old and new intent genuinely match. Medical assessments and treatment-consent URLs should return a reviewed `410 Gone`, not funnel users into an inquiry.

## Major components

### Shared shell

- `SiteHeader` and accessible mobile navigation
- `MedicalBoundaryNotice` explaining that Sylven is a directory and not for emergencies
- `SiteFooter` with methodology, correction, privacy, and terms links
- shared typography, colour, spacing, focus, and motion tokens derived from the existing visual system

### Discovery

- `DirectorySearch` with service and municipality controls
- `ActiveFilters` with clear/reset behaviour
- `ClinicResults` and `ClinicCard`
- `Pagination` using crawlable URLs; avoid infinite scroll in the first release
- `EmptyResults` that offers broader filters and direct clinic research guidance without making medical recommendations

### Listings

- `ClinicHeader` and factual verification/freshness status
- `LocationFacts` for address, phone, hours, accessibility, and service area
- `ServiceFacts` for modality, referral requirements, published price facts, and booking method
- `SourceDisclosure` and `ReportCorrection`
- `SponsoredDisclosure` where applicable
- `ContactActions` for clinic website, phone, and the Sylven inquiry entry

### Inquiry

- `RecipientSummary` naming each clinic that will receive information
- `MinimalInquiryForm`
- `LeadConsent` with a separate, explicit consent row per recipient clinic
- accessible field errors, error summary, pending state, and idempotent success handling

The inquiry form asks only for name, email, optional phone, preferred contact method, selected service, optional postal forward-sortation area, and a short logistical note. The note prompt explicitly says not to include symptoms, diagnoses, medications, health card information, or medical history.

## Server-side responsibilities

### Public listing reads

- query only `published` clinics, active locations, and active clinic services;
- apply allow-listed filters and stable relevance ordering;
- attach source and last-verification data to every public fact group;
- exclude internal notes, verification evidence, lead data, and commercial billing details;
- generate metadata, canonical URLs, sitemap entries, and structured data from the same published records; and
- revalidate affected listing and result pages after an internal data change.

### Inquiry writes

- accept only `POST` requests with same-origin and content-type checks;
- validate a small schema, trim and normalize values, enforce strict length limits, and reject unexpected fields;
- verify that every recipient clinic is currently published and offers the selected service at an active location;
- display and store recipient-specific consent before any disclosure;
- commit the lead and all consent rows in one database transaction;
- enforce idempotency so retries do not create duplicate inquiries;
- apply rate limiting, a honeypot, and a privacy-reviewed bot control if abuse requires it;
- notify only the clinics named in consent rows;
- record delivery outcome without placing medical or inquiry content in logs; and
- return a neutral reference number without revealing database identifiers or clinic-private information.

If notification delivery fails, retain the committed consented inquiry, flag it for internal retry, and do not silently add or substitute a recipient.

### Listing operations

Use Supabase's protected administrative interface for the first release. Internal operators can create and update records, review clinic-submitted corrections, record source evidence, publish/unpublish listings, and mark verification outcomes. A clinic dashboard and direct clinic database access are out of scope.

## Caching and search

Use Postgres filtering and indexes for the initial inventory. Server-render results from normalized service and municipality query parameters. Revalidate published pages on a modest interval and after an approved listing change. Inquiry and correction routes are always dynamic and non-cacheable.

Do not add Elasticsearch, Algolia, embeddings, or clinical semantic matching in version one. If text search becomes necessary, use a bounded Postgres full-text or trigram index over public clinic names and service labels.

## Security and privacy

- Keep Supabase service credentials in Netlify server-side environment variables only.
- Enable row-level security on every exposed table and deny anonymous access to leads, consents, verification evidence, and internal notes.
- Use a restricted database role or security-definer function for the exact inquiry transaction; do not expose general insert privileges to the browser.
- Encrypt in transit, use managed encryption at rest, rotate secrets, and restrict production administrative access.
- Never log inquiry message bodies, email addresses, phone numbers, raw IP addresses, or consent text containing personal information.
- Store only a keyed hash of IP or user-agent data if a privacy review determines it is necessary for abuse evidence.
- Define and automate short lead retention, deletion, and correction procedures before launch.
- Add security headers, a content-security policy, dependency scanning, and secret scanning.

## Quality gates

At minimum, require:

- unit tests for filtering, normalization, ranking, validation, and recipient authorization;
- database tests for constraints, RLS, publication rules, and the atomic lead/consent transaction;
- integration tests for lead creation, duplicate submission, delivery failure, and correction submission;
- end-to-end tests for search, clinic details, inquiry consent, keyboard navigation, and legacy route responses;
- automated accessibility checks plus manual keyboard and screen-reader review of discovery and inquiry flows;
- automated broken-link, metadata, sitemap, and noindex checks; and
- a content-policy test or review checklist that catches forbidden telehealth, prescription, medical-assessment, unsupported provider, pharmacy, and outcome claims.

## Deferred decisions

Defer accounts, saved clinics, reviews, live availability, appointment booking, maps, clinic self-service, billing automation, additional provinces, additional service categories, and a lead marketplace until the initial wedge demonstrates reliable sourced data and clinic response.
