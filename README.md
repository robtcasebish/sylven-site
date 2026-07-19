# Sylven

Sylven is being rebuilt as a Canadian directory and discovery platform for private healthcare services. It is intended to help people find nearby clinics, review sourced factual listing information, and contact clinics they choose.

Sylven is not a healthcare provider, clinic, pharmacy, telehealth service, medical assessment service, or emergency service. It does not diagnose, prescribe, recommend treatment, or collect detailed medical histories.

## Repository status

The standalone HTML files currently in this repository are a legacy prototype for the wrong product. They describe telehealth programs, medical eligibility questionnaires, physician and pharmacy operations, medication delivery, patient memberships, testimonials, and placeholder payment flows. These claims and flows are not the product being built.

The legacy prototype is preserved unchanged on the `legacy-telehealth-site` branch. New development takes place on `directory-rebuild`. Do not work directly on `main`.

## Deployment safety

The current production Netlify deployment must not be changed until a separate, explicit deployment task is approved. Application scaffolding and development work on `directory-rebuild` are non-production and must not silently alter domains, Netlify settings, build settings, environment variables, redirects, or the production branch.

Do not copy legacy telehealth claims, medical program language, eligibility logic, testimonials, provider or pharmacy claims, patient pricing, or payment fields into the replacement application.

## Product boundaries

The first release is deliberately small:

- directory discovery for private-pay MRI and ultrasound services in Metro Vancouver;
- factual clinic and location pages supported by a recorded source and last verification date;
- minimal inquiry forms with explicit consent for each clinic receiving an inquiry; and
- no patient accounts, medical assessments, prescriptions, patient payments, real clinic data, or clinic dashboard.

See the root planning documents for the authoritative scope:

- `PRODUCT.md`
- `MIGRATION_PLAN.md`
- `ARCHITECTURE.md`
- `DATA_MODEL.md`
- `AGENTS.md`

The presence of a clinic in future development data must not imply that Sylven is live, comprehensive, verified across Canada, or endorses that clinic. Real clinic data may be added only through a separately approved sourcing and verification task.
