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

### Expansion decision: 2026-08-30, Toronto added as a second region

Following the geography decision above, a second region, Toronto (Ontario), was sourced and added to `regions` in `src/lib/directory.ts`, using the same method as the Metro Vancouver pilot: clinic-controlled sources only, dated checks, referral requirement confirmed or marked unknown where the clinic's own site did not say. Three clinics were added: Simply MRI (Toronto, MRI, no referral required), Toronto Ultrasound Imaging (Toronto, ultrasound, referral required), and Radiant Medical Imaging (Scarborough, ultrasound, referral requirement unknown).

Two findings from this sourcing pass are worth recording:

- **Ontario's private imaging market looks different from BC's.** Several sites that surfaced in search (Surgency, Axxess Imaging, MedCentra) turned out to be referral or booking intermediaries that arrange access to imaging at facilities they do not disclose the address of, not clinics with a publishable location themselves. They were excluded rather than listed with a placeholder address. One of these sites also claimed "private MRIs are not legally available in Ontario," which independent sources (an NCBI review of privately operated imaging facilities in Canada, and Ontario's own Independent Health Facilities Act guidance) do not support; Ontario permits privately operated diagnostic MRI, it just runs through a different licensing structure than BC's. Do not repeat that unverified legality claim in any public copy.
- **Two fields are missing for one listing.** Simply MRI has no publicly listed phone number (email only), and Toronto Ultrasound Imaging has no publicly listed postal code. Both fields were left blank rather than filled from a third-party source, per the provenance rule above. `phone`, `email`, and `postalCode` are now optional on a clinic listing for this reason.

### Expansion decision: 2026-08-30, Calgary and Edmonton added as Alberta's first regions

Following the Canada-wide geography decision above, two Alberta regions, Calgary and Edmonton, were sourced and added to `regions` in `src/lib/directory.ts`, using the same method as Metro Vancouver and Toronto: clinic-controlled sources only, dated checks, referral requirement confirmed from the clinic's own site. Three clinics were added: Mayfair Diagnostics at its Mayfair Place location (Calgary, MRI), MIC Medical Imaging at its Century Park location (Edmonton, MRI), and Wosler Diagnostics (Calgary, ultrasound).

Two findings from this sourcing pass are worth recording:

- **Alberta legalized self-referred, self-paid diagnostic imaging on July 31, 2026, but none of the three sourced clinics have adopted it yet.** The provincial government now lets residents pay privately for MRI, CT, ultrasound, and X-ray exams at participating accredited facilities without a doctor's referral, provided a regulated health professional confirms eligibility first. All three sourced clinics still require a physician (or other authorized provider) requisition on their own current published policy: Mayfair Diagnostics' MRI page still says an MRI "must be requested by a health care practitioner," Wosler Diagnostics' FAQ requires a requisition for all exams, and MIC Medical Imaging's own self-referral policy page states it is "not offering preventative health testing without a requisition at this time" even though the provincial program now permits it. Do not describe Alberta clinics generally as self-pay-without-referral; report each clinic's own current stated policy, the same way Simply MRI (Toronto) and these three Alberta clinics were sourced separately with different results.
- **One candidate was excluded as an unclear intermediary.** Invest-Med (invest-med.ca) advertises a "no referral needed" full-body MRI package with a Calgary address, but its own site describes it as a preventative-health screening and consulting service that bundles imaging with bloodwork and physician consultations, without stating whether it operates its own scanner or arranges the scan at a separate facility. Consistent with excluding Surgency, Axxess Imaging, and MedCentra in the Toronto pass, it was left out until its actual imaging arrangement can be confirmed from a clearer source.

Yukon, the Northwest Territories, and Nunavut are intentionally excluded from this pass. Given their small populations and reliance on the public system for imaging, no private MRI or ultrasound clinics were expected there and none were sourced; add a territory only if evidence of an actual private clinic surfaces.

### Expansion decision: 2026-08-31, Manitoba reviewed and excluded

Manitoba was researched for a Winnipeg region using the same method as the other provinces, and no region was added. A published, methodologically-focused review of privately operated medical imaging in Canada states plainly that there are currently no private MRI or CT facilities operating in Manitoba. Separately, Prota Clinic, a private Winnipeg clinic that had been charging for diagnostic ultrasounds and echocardiograms, was ordered to stop after the federal government clawed back part of Manitoba's health transfer funding over the fees; the clinic's own site now states it is "currently unable to perform medically indicated ultrasounds or echocardiograms." No other candidate cleared the bar. Per the expansion rule above, a region is only added once sourced, dated clinic records support it, so Manitoba stays out of `regions` until that changes; revisit if a new private clinic opens or Prota Clinic resumes a lawful offering.

### Expansion decision: 2026-08-31, Regina and Saskatoon added as Saskatchewan's first regions

Two Saskatchewan regions, Regina and Saskatoon, were sourced and added to `regions` in `src/lib/directory.ts`. Saskatchewan has the longest-running private diagnostic imaging market of the provinces reviewed so far: Open Skies MRI Diagnostics in Regina describes itself as the first accredited and licensed private MRI facility in the province, operating since 2012, well before Saskatchewan's 2015 legislative change formally opened the door to more private-pay MRI providers. Two clinics were added: Open Skies MRI Diagnostics (Regina, MRI, referral required) and Saskatoon Medical Imaging's Centre Mall location (Saskatoon, MRI and ultrasound, referral required).

One candidate was excluded as an unclear hybrid model: National Medical Imaging (Saskatoon) markets itself as a private MRI/CT centre, but its own site says a patient "must have a referral from your physician and be placed on the Saskatchewan Health Authority's (SHA) waitlist to benefit from our services," which reads as a contracted public-waitlist-reduction service rather than a direct self-pay option. It was left out until its actual pricing and access model can be confirmed from a clearer source. YXE Medical Imaging (Saskatoon, ultrasound and mammography) was also looked at but dropped from this pass because its referral policy could not be confirmed from its own site.

### Expansion decision: 2026-08-31, Halifax added as Nova Scotia's first region

Halifax was sourced and added to `regions` in `src/lib/directory.ts`. Three clinics were added: HealthView Medical Imaging (Halifax, MRI and ultrasound, referral required), Why Wait Imaging (Halifax, MRI and ultrasound, referral requirement unknown), and Wosler Diagnostics (Sackville, ultrasound, referral required; the same chain already sourced for Calgary, whose own FAQ says it applies the same all-provinces requisition policy in Nova Scotia).

One finding is important enough to flag before this region is treated like the others: **Nova Scotia's private imaging market is under active federal-provincial dispute, unlike Alberta's or Saskatchewan's.** Health Canada has been requiring Nova Scotia to repay federal health transfer funding, over $1.277 million for the 2020-21 fiscal year alone, as a Canada Health Act penalty for allowing HealthView Medical Imaging to charge patients for MRI, arthroscopy, and ultrasound exams. Nova Scotia's government has so far chosen to accept the funding clawback and let HealthView keep operating rather than order it to stop, the opposite of the choice Manitoba made with Prota Clinic. This is a materially different, and less settled, legal footing than BC, Ontario, Alberta, or Saskatchewan, where private-pay diagnostic imaging is not disputed the same way. Do not describe Nova Scotia's private imaging market as settled or risk-free in any public copy; the clinics are real and currently operating, but the underlying legal dispute could change that.

**Correction, same day:** further checking turned up more recent reporting that changes the HealthView part of this picture. Nova Scotia reportedly signed a contract to publicly fund imaging at HealthView specifically and eliminate patient charges there, after which Ottawa fully reimbursed the province's $3.79 million clawback in March 2025. HealthView's own site, checked the same day this entry was written, still describes a booking process where "clinic staff will explain the cost at the time of booking," which does not obviously match a fully publicly-funded service, so HealthView's current patient-facing billing model could not be reconciled between these two sources and should be confirmed directly before this listing is relied on. What is not in question: Wosler Diagnostics and Why Wait Imaging, the other two Nova Scotia clinics sourced above, are separately reported as still charging patients directly to bypass the public wait list, which the same reporting called a "thinly veiled two-tier system." Treat HealthView's referral and billing details in this directory as needing re-verification sooner than the other Nova Scotia listings.

### Expansion decision: 2026-08-31, Moncton added as New Brunswick's first region

Moncton was sourced and added to `regions` in `src/lib/directory.ts`. One clinic was added: IRM Moncton MRI (Moncton, MRI and ultrasound, referral required for both). IRM Moncton MRI is, like HealthView Medical Imaging in Halifax, operated by Canadian Health Solutions, a private health services group headquartered in Saint John, NB; its own clinics page lists imaging locations only in Moncton and Halifax, with separate assessment and wellness clinics in Saint John that do not offer MRI or ultrasound. No Saint John or Fredericton private imaging clinic could be found with its own disclosed address; the results that surfaced for those cities were either the same aggregator/directory sites already excluded elsewhere or generic consultation-booking platforms with no physical premises named. New Brunswick therefore starts with a single region until a genuine Saint John or Fredericton clinic is sourced.

### Expansion decision: 2026-08-31, Newfoundland and Labrador reviewed and excluded

Newfoundland and Labrador was researched and no region was added, consistent with the earlier finding that the province currently has no private MRI or CT facilities. Two candidates were checked and ruled out. "Newfoundland Diagnostics" is not a Newfoundland clinic at all; it is an unrelated UK at-home diagnostic test company that happens to share the name. On-Site Medical's planned mobile MRI unit for the province is a real, named project with a disclosed address, but its own site still describes the unit as not yet operational, matching reporting from November 2024 that placed launch "within the next year, and possibly sooner"; with no evidence it has since gone live, it does not clear the bar for a current listing. Revisit if the mobile unit begins operating or another clinic surfaces.

### Expansion decision: 2026-08-31, Summerside added as Prince Edward Island's first region

Summerside was sourced and added to `regions` in `src/lib/directory.ts`. One clinic was added: Summerside Diagnostic Imaging Centre (Summerside, MRI only; its own site lists ultrasound as "coming soon" and not yet available, so ultrasound was left off this listing rather than published ahead of the clinic actually offering it). This is PEI's first private MRI clinic, and like Nova Scotia's HealthView, its funding picture is mixed rather than purely private-pay: Health PEI has separately contracted with the clinic to help reduce the province's public MRI wait list, at a reported cost of roughly $720,000, while the clinic's own site also lists card payment as an accepted payment method and accepts referrals from a broad range of provider types (chiropractors, physiotherapists, nurse practitioners, primary physicians, and specialists) without stating whether a referral is strictly required. Referral requirement is recorded as unknown rather than assumed. Separately, Health PEI has also been paying for some Islanders' MRIs to be done out of province at IRM Moncton MRI in New Brunswick (already listed above); that arrangement does not itself create a PEI-based clinic and is not reflected as a listing here.

### Expansion decision: 2026-08-31, Quebec skipped by product owner decision

With every other province and PEI/Nova Scotia/New Brunswick region sourced or explicitly reviewed and excluded, the product owner decided to skip Quebec entirely rather than schedule the outstanding language-of-commerce review referenced in the original Canada-wide geography decision above. This is a decision not to pursue Quebec, not a statement that the review happened and passed; Quebec's requirement that public-facing commercial content be in French, along with any other provincial rule for advertising private health services there, remains unreviewed. No Quebec region or clinic should be added to `regions` or `clinicListings` without a product owner decision reopening this.

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
