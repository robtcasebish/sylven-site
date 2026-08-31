# Sylven Repository Instructions

These instructions apply to the entire repository. They define durable product boundaries for all subsequent Codex and contributor work.

## Product identity

Sylven is a Canadian directory and discovery platform for private healthcare services. It helps people find nearby clinics, review sourced factual listing information, and contact clinics they choose.

Sylven is not a clinic, healthcare provider, pharmacy, telehealth operator, medical assessment service, care coordinator, insurer, or emergency service. The clinic—not Sylven—determines whether it can help, forms any provider-patient relationship, gives medical advice, assesses eligibility, and delivers care.

When a request conflicts with these boundaries, stop and call out the conflict before changing code or copy. Do not "temporarily" recreate the legacy telehealth product.

## Forbidden product scope

Do not add or imply:

- patient accounts, patient portals, medical records, symptom tracking, or clinical messaging;
- medical intake, eligibility quizzes, diagnosis, triage, treatment recommendations, or clinical decision logic;
- physician assignment, physician review by Sylven, provider-patient relationship management, or care-team services;
- prescription, renewal, pharmacy, medication dispensing, shipping, or fulfillment workflows;
- patient memberships, patient checkout, card fields, patient payments, treatment refunds, insurance billing, or medication pricing;
- detailed medical histories, medication lists, health card numbers, dates of birth, diagnoses, symptoms, attachments, or other unnecessary health information;
- ratings or rankings that claim clinical quality, safety, outcomes, or "best" providers; or
- provider, clinic, pharmacy, security, privacy-compliance, availability, wait-time, price, outcome, testimonial, regulatory, or geographic-coverage claims without current supporting evidence and approval.

Never describe sponsored or verified listings as endorsed, recommended, clinically superior, or guaranteed. Verification is a factual freshness process and must not be purchasable.

## Allowed first-release scope

Keep the first release deliberately small:

- Metro Vancouver, British Columbia;
- private-pay diagnostic imaging, initially MRI and ultrasound;
- service/location discovery, clinic results, clinic/location detail pages, and direct clinic contact information;
- a minimal inquiry containing contact and logistical information only;
- explicit recipient-specific consent naming every clinic that receives an inquiry;
- clinic correction and listing-verification requests;
- internal operations through protected Supabase tools; and
- standard and clearly labelled enhanced/sponsored listings.

Do not expand geography, taxonomy, lead fields, accounts, dashboards, scheduling, maps, reviews, or monetization mechanics without an approved product change documented in `PRODUCT.md`, `ARCHITECTURE.md`, and `DATA_MODEL.md` as applicable.

## Public clinic data and claims

Every public clinic-derived fact must record:

- its source type;
- a source URL or protected evidence reference;
- the date the source was checked;
- the last verification date; and
- its verification status.

This applies to names, descriptions, locations, contact details, hours, accessibility, services, referral requirements, booking methods, published prices, and commercial status. Do not publish a record that lacks required provenance or is disputed, rejected, or beyond its approved freshness window.

Clinic-submitted information is a source, not independent validation. Price information must be described as clinic-published information, not a quote or guarantee. Do not infer service availability, referral rules, accessibility, regulatory status, or clinical appropriateness from incomplete sources.

No unsupported medical or clinic claim may ship. Medical educational copy is out of scope unless explicitly approved, necessary to explain a service taxonomy, sourced to authoritative Canadian guidance, reviewed for neutrality, and clearly not advice.

## Inquiry and consent rules

Collect the minimum necessary information: name, email, optional phone, preferred contact method, selected service, optional postal forward-sortation area, selected recipient clinic or clinics, and an optional short logistical message.

The interface must tell users not to submit symptoms, diagnoses, medications, health card information, or medical history. Do not add open-ended prompts that invite clinical detail.

Before submission, show every recipient clinic by name. Record a separate immutable consent row for each recipient, including consent version, text snapshot, and timestamp. Consent to one clinic never permits disclosure to another clinic, parent company, advertiser, or partner. Never substitute or add a recipient after submission.

Lead and consent data is server-only, non-public, excluded from analytics and logs, protected by RLS, and subject to documented retention/deletion. Do not expose Supabase service credentials or grant anonymous direct table access.

## Engineering standards

- Use Next.js App Router and TypeScript with strict type checking. Do not introduce new JavaScript application files when TypeScript is appropriate.
- Prefer Server Components and server-side data access. Use Client Components only where browser interactivity is required.
- Use semantic, accessible HTML with correct landmarks, headings, labels, instructions, error summaries, focus management, keyboard behaviour, and visible focus states.
- Meet WCAG 2.2 AA as the working target. Respect reduced motion and do not rely on colour, placeholder text, hover, or JavaScript alone to convey meaning.
- Build responsive layouts mobile-first and test supported small, medium, and large viewports.
- Centralize shared tokens and components. Do not duplicate page-sized inline `<style>` or `<script>` blocks and avoid `style` attributes except for truly data-driven values.
- Validate all untrusted input on the server with allow lists and length limits. Escape output and avoid raw HTML rendering.
- Keep secrets server-side, use least privilege, enable RLS, and avoid logging personal or inquiry content.
- Keep migrations additive, versioned, reviewable, and covered by constraint/RLS tests. Do not make destructive production schema changes without a backup and rollback plan.
- Use stable URL query parameters for filters and preserve accessible progressive enhancement.
- Do not add major infrastructure, dependencies, analytics, trackers, external fonts, maps, or processors without documenting purpose, privacy impact, and operational ownership.

## Required tests and checks

Every material change must add or update proportionate automated tests. The maintained suite must cover:

- unit tests for validation, normalization, filtering, ranking, and content policy;
- database tests for constraints, publication rules, provenance, lead/consent atomicity, and RLS isolation;
- integration tests for server-side inquiry and correction flows, including failure and duplicate submission;
- end-to-end tests for core discovery and inquiry journeys;
- automated accessibility tests and manual keyboard checks for changed interactive flows;
- responsive checks for changed layouts;
- broken-link, metadata, canonical, robots, and sitemap checks; and
- regression checks that forbidden telehealth, medical-assessment, prescription, pharmacy, patient-payment, and unsupported-claim language does not return.

Before handing off work, run the relevant type check, lint, tests, production build, and link/accessibility checks. Report any check that could not run and why; do not imply unrun checks passed.

## Content, design, and review

Preserve the calm editorial character of the legacy palette and typography where accessible and privacy-conscious, but do not preserve medical-program semantics, assessment progress UI, patient testimonials, treatment pricing, medication imagery, pharmacy/physician trust badges, or fake payment fields.

Use Canadian English. Write factual, plain-language copy. Clearly label sponsored placement. Link to the listing methodology and correction process. Keep a visible statement that Sylven is a directory and not a healthcare provider, and provide an emergency notice without attempting triage.

Changes to public clinic facts require source/freshness review. Changes to inquiry fields, consent, retention, privacy copy, terms, sponsorship, ranking, or product boundaries require explicit product and privacy/legal review before production deployment.

## Deployment safety

Use Netlify Deploy Previews and environment-isolated Supabase projects. Never send real clinic inquiries from previews. Do not change production Netlify settings, domains, redirects, environment variables, or deployment configuration unless the task explicitly authorizes it and includes a rollback plan.

For a production replacement, promote an already-reviewed deploy atomically and retain the previous deploy ID for immediate rollback. Never use a rollback to re-enable the legacy medical questionnaires or placeholder card fields as a steady state.
