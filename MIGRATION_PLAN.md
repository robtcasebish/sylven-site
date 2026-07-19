# Migration Plan

## Audit scope and current state

The repository at the audited `main` branch contains twelve standalone HTML files and no other application source:

- `index.html`
- `faq.html`
- `weight-loss.html`
- `mens-health.html`
- `womens-health.html`
- `quiz.html`
- `mens-quiz.html`
- `womens-quiz.html`
- `medical-consent.html`
- `privacy.html`
- `terms.html`
- `refund.html`

There is no package manifest, framework, shared stylesheet, backend, database schema, API, authentication, automated test suite, CI workflow, asset directory, `netlify.toml`, redirects file, or other checked-in deployment configuration. Netlify build, domain, environment, and deploy settings therefore need to be inventoried from Netlify before replacement work begins.

This document recommends future changes; this audit does not remove or alter any existing HTML page or deployment setting.

## Conflicts with the revised product

### Product identity and navigation

Every public page is framed as a patient-facing health coordination or telehealth product. Navigation is organized around Weight Loss, Men's Health, Women's Health, "How It Works," and "Begin Assessment." The repository description itself calls this the "Sylven patient-facing site." None of the current pages supports clinic discovery, local search, comparable listings, clinic detail pages, or a directory methodology.

### Clinical and medication programs

`index.html`, `weight-loss.html`, `mens-health.html`, `womens-health.html`, and `faq.html` market physician-guided programs and make claims about:

- independent Canadian physician assessments;
- prescription approval and renewal;
- Health Canada-registered pharmacy partners;
- nationwide medication dispensing and delivery;
- semaglutide, GLP-1 therapy, erectile-dysfunction medication, hair-loss medication, and HRT;
- ongoing physician check-ins, registered-dietitian consultations, patient portals, health tracking, prescription coordination, and 24/7 care-team messaging;
- response and shipping times, including physician response within 24 hours and delivery within three to five business days; and
- nationwide service across all provinces and territories.

Those are outside the revised product. The repository contains no evidence or functioning infrastructure for the claimed physician network, pharmacy relationship, patient portal, messaging, dietitian service, prescription coordination, fulfillment, or nationwide operations.

### Medical eligibility assessments and sensitive data

`quiz.html`, `mens-quiz.html`, and `womens-quiz.html` present multi-step clinical assessments. They ask for combinations of age, sex, height, weight, BMI, symptoms, diagnoses, contraindications, reproductive status, cancer history, cardiovascular events, vaginal bleeding, current medication and supplement lists, and open-ended medical history, followed by name, email, and phone.

The pages display clinical-sounding outcomes such as "strong candidate," "meet the clinical criteria," "qualify for HRT assessment," or a contraindication pathway. This is medical assessment and triage behaviour, even though it is implemented only in browser JavaScript.

There are no HTML `<form>` submissions, server calls, secure storage, consent receipts, retention controls, or privacy-preserving transmission path. The combination of realistic health fields and non-functional submission creates a serious privacy and user-trust risk. These pages must never be repurposed as the directory inquiry form.

### Patient payments, memberships, and refunds

The three quiz pages show raw placeholder card-number, expiry, and CVC fields and claim Stripe security, while their payment handlers only display "Stripe integration coming" alerts. No Stripe library or backend integration exists.

Current pages advertise monthly memberships of $89, $49, and $69, recurring billing, medication costs, cancellation, automatic non-approval refunds, and payment timelines. `refund.html` and `terms.html` describe operational billing and refund processes, a payment method on file, and patient-portal cancellation that the repository cannot perform. The revised directory accepts no patient payments.

### Unsupported clinic, provider, pharmacy, security, and outcome claims

The site asserts operational relationships and service levels without supporting data in the repository. Examples include licensed physicians waiting to review files, a Health Canada-registered pharmacy partner, medication at cost with no markup, PIPEDA compliance, secure patient portals, 256-bit Stripe encryption, province-specific availability, and defined response/refund timelines.

It also publishes patient testimonials and outcome or fulfillment claims attributed to named initials and Canadian cities, including weight-loss outcomes, prescription delivery, physician response time, and HRT results. No testimonial consent, substantiation, moderation record, or source is present. These claims must not migrate.

### Legal documents describe the wrong service

- `medical-consent.html` describes asynchronous physician assessment, treatment consent, prescribing, medical risks, patient-portal communication, and withdrawal of treatment consent.
- `privacy.html` describes collection and sharing of detailed health information, Stripe processing, independent physician review, pharmacy fulfillment, patient portals, and clinical records.
- `terms.html` contracts for clinical intake, physician access, prescriptions, program memberships, medication fulfillment, and recurring billing.
- `refund.html` governs patient membership and medication refunds.

Disclaimers stating that Sylven is not a clinic do not cure the broader product conflict because the surrounding flows still arrange and market care as a telehealth operator.

### Broken links and inconsistent identity

The site links to files that do not exist:

- `about.html` from `index.html`, `faq.html`, and all three program landing pages;
- `physicians.html` from the same pages; and
- `pharmacies.html` from `index.html` and all three program landing pages.

Contacts use `@corbincare.com` rather than a Sylven domain, and the footer names Corbin Care Health Inc. The ownership relationship may be legitimate, but it is unexplained to a user and should be resolved during legal and brand review.

### Front-end and maintainability risks

- Each page embeds its own full CSS block. Approximately 155 KB of CSS is repeated across the twelve files, including the same tokens, resets, banners, headers, footers, buttons, and responsive rules.
- The pages also contain numerous `style` attributes, especially the program and quiz pages, and repeated inline JavaScript for menus, banners, accordions, observers, validation, assessment state, and payment placeholders.
- There are no shared components, type checks, linting, formatting policy, tests, link checker, accessibility tests, or build-time validation.
- The assessments use scripted selection cards and alerts instead of a robust form and error-summary pattern. Several controls depend on JavaScript-only state.
- All pages fetch Google Fonts from a third party, but there is no visible content-security policy or documented privacy decision.
- There is no source/freshness model for public facts and no separation between editorial, sponsored, verified, and unsupported content.

## Visual elements worth preserving

Preserve the visual character, not the healthcare-program semantics:

- the restrained parchment, cream, mist, ink, dust, and brass palette;
- the Newsreader display type paired with Jost body type, subject to performance and privacy review or self-hosting;
- generous whitespace, calm editorial typography, thin rules, rounded cards, and quiet motion;
- the simple Sylven wordmark/leaf treatment if rights and legibility are confirmed;
- the compact announcement-bar, header, mobile-menu, card, accordion, and footer patterns as design references; and
- the existing responsive intent and Canadian English tone.

Do not preserve medical imagery, medication diagrams, outcome statistics, eligibility language, testimonial content, assessment progress indicators, patient-program pricing cards, pharmacy delivery steps, or trust badges claiming providers, pharmacy registration, PIPEDA compliance, or Stripe security.

In the replacement application, turn the retained design tokens and patterns into shared accessible components rather than copying embedded CSS or script.

## File disposition recommendations

| Current file | Recommendation | Future disposition |
| --- | --- | --- |
| `index.html` | Replace | New directory homepage with location/service search, product boundaries, methodology, and clinic-facing call to action. |
| `faq.html` | Rewrite | Directory FAQ covering listings, sourcing, verification, sponsored content, inquiries, privacy, corrections, and emergencies. |
| `weight-loss.html` | Archive, then remove from public deployment | Do not preserve program or medication content. Return `410 Gone` unless a reviewed, genuinely equivalent directory category exists; do not use a misleading redirect. |
| `mens-health.html` | Archive, then remove from public deployment | Same rule; no clinical program copy or testimonials migrate. |
| `womens-health.html` | Archive, then remove from public deployment | Same rule; no HRT program copy or testimonials migrate. |
| `quiz.html` | Archive, then remove immediately at cutover | Contains a privacy-sensitive medical assessment and fake checkout. Return `410 Gone`; do not redirect users into the minimal inquiry form. |
| `mens-quiz.html` | Archive, then remove immediately at cutover | Same. |
| `womens-quiz.html` | Archive, then remove immediately at cutover | Same. |
| `medical-consent.html` | Archive, then remove | Treatment consent is inapplicable to a directory. Replace only with recipient-specific inquiry consent in the new flow. |
| `privacy.html` | Replace after privacy review | Describe directory browsing, sourced listings, analytics, minimal inquiries, clinic disclosure, retention, user rights, processors, and contact details. |
| `terms.html` | Replace after legal review | Describe directory limitations, listing corrections, inquiry forwarding, clinic responsibility, sponsorship, acceptable use, and no medical advice. |
| `refund.html` | Archive, then remove | There are no patient payments or patient refunds. Clinic commercial terms should be a separate reviewed agreement, not a patient-facing refund policy. |

Archive means preserve the current state in a dated Git tag and retained deploy, not keep the page publicly reachable. Do not copy the old HTML into the new production bundle.

## Safe Netlify replacement sequence

### 1. Establish the recovery baseline

- Record the production site ID, team, domain aliases, DNS, SSL state, build command, publish directory, production branch, deploy contexts, headers, redirects, environment variables, functions, forms, plugins, notifications, and access controls from Netlify.
- Save the current production deploy ID and take a dated screenshot/export of settings.
- Tag the current Git commit, for example `legacy-telehealth-site-YYYY-MM-DD`, and protect the tag.
- Confirm that Netlify's previous production deploy can be restored without rebuilding.

**Review point:** an owner who has Netlify and DNS access verifies that the baseline is complete and that rollback authority is clear.

### 2. Build without touching production

- Develop the Next.js replacement on a dedicated branch with a separate Supabase staging project.
- Use Netlify Deploy Previews or a separate staging site. Do not change the current production branch, domain, or build settings during development.
- Seed only sourced wedge listings. Keep production inquiries disabled or clearly marked in non-production environments.
- Make database migrations additive and versioned. Do not make cutover depend on destructive database changes.

**Review point:** product, privacy/legal, accessibility, and clinic-operations reviewers approve the directory copy, listing facts, consent language, and correction workflow.

### 3. Verify the candidate release

- Run unit, integration, accessibility, link, and end-to-end tests.
- Test mobile and desktop search, empty/error states, direct clinic links, recipient-specific consent, rate limiting, inquiry delivery, correction requests, metadata, canonical URLs, robots, and sitemap.
- Verify that old medical questionnaires and card fields are absent from the built output and that forbidden telehealth terms do not reappear in public claims.
- Run a route-by-route redirect/`410` review using the disposition table above.
- Reconcile every published clinic fact against its recorded source and last verification date.

**Go/no-go point:** require named approval from product, engineering, privacy/legal, and the operator responsible for inquiry delivery.

### 4. Rehearse the cutover

- Deploy the exact candidate artifact to a staging alias with production-like environment variables pointed at a non-production database.
- Rehearse switching the candidate to production and restoring the saved legacy deploy on a non-production Netlify site.
- Reduce DNS TTL only if a domain-level move is actually required; prefer Netlify's atomic deploy publish on the existing site.
- Schedule the cutover during a staffed, low-risk window and freeze unrelated changes.

**Review point:** confirm the rollback takes minutes, not a rebuild, and that the old deploy remains available.

### 5. Publish atomically

- Back up the production database immediately before enabling the release.
- Publish the already-reviewed deploy artifact to the existing Netlify production site using an atomic deploy promotion.
- Apply reviewed redirects and `410` responses at the same cutover, not earlier.
- Smoke-test the custom domain, TLS, homepage, results, clinic details, inquiry consent, delivery, privacy/terms, correction channel, redirects, and monitoring from outside the Netlify account.

### 6. Monitor and close

- For at least 72 hours, monitor 4xx/5xx rates, broken links, inquiry failures, misdirected inquiries, spam, consent records, database errors, and clinic complaints.
- Review the first inquiries manually for correct recipient and minimal content.
- Keep the legacy tag and saved deploy for the agreed retention period, but do not expose legacy medical pages through navigation or search.
- After the observation window, document the cutover result and any follow-up work.

## Rollback plan

Rollback triggers include material inquiry misdelivery, missing consent records, exposure of private lead data, widespread errors, incorrect clinic facts with user-safety implications, broken legal pages, or inability to contact clinics.

To roll back:

1. Disable new inquiry submission with a server-side feature flag if inquiry handling is the affected surface.
2. Restore the recorded previous Netlify production deploy; do not rebuild it.
3. Leave additive database tables in place and preserve audit/consent records. Do not delete leads as part of an emergency deploy rollback.
4. If the legacy deploy must briefly return, immediately block or place a maintenance response in front of its medical questionnaires and fake payment fields. Restoring misleading intake pages is not an acceptable steady state.
5. Record the incident, affected records and recipients, remediation owner, and criteria for a second cutover.

Rollback must not send already-collected inquiries to new recipients, erase consent evidence, or silently replay failed deliveries.
