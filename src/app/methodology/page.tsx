import Link from "next/link";

import { Breadcrumbs, PageContainer, SectionHeading } from "@/components";

export const metadata = { title: "Listing methodology" };

export default function MethodologyPage() {
  return (
    <>
      <section className="page-section page-section--compact">
        <PageContainer>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Listing methodology" }]} />
          <p className="eyebrow">How listings work</p>
          <h1>Facts should arrive with context.</h1>
          <p className="lede">
            Sylven is building a directory where people can see what was
            checked, when it was checked, and where the information came from.
          </p>
        </PageContainer>
      </section>
      <section className="page-section">
        <PageContainer className="content-grid">
          <div>
            <p className="eyebrow">Current pilot</p>
            <h2>Clinic-controlled sources, reviewed by a person.</h2>
          </div>
          <div>
            <p>
              The initial Metro Vancouver records were checked against public
              clinic websites on July 19, 2026. Sylven records the exact page used
              for each listing and excludes unsupported claims, testimonials,
              ratings, and advertised availability promises.
            </p>
            <p>
              A clinic website is evidence of what the clinic publishes, not an
              independent assessment of clinical quality. People should confirm
              current services, referral requirements, availability, and costs
              directly with the clinic.
            </p>
          </div>
        </PageContainer>
      </section>
      <section className="page-section">
        <PageContainer>
          <SectionHeading eyebrow="Publication standard" title="The minimum for every public fact." />
          <ul className="fact-list">
            <li><strong>Source type</strong><span>For example, a clinic website, clinic submission, or protected evidence record.</span></li>
            <li><strong>Source reference</strong><span>A public URL or internal evidence reference appropriate to the fact.</span></li>
            <li><strong>Date checked</strong><span>The date an operator reviewed the source.</span></li>
            <li><strong>Verification date</strong><span>The last date the published fact passed its freshness review.</span></li>
            <li><strong>Status</strong><span>Only approved, current records can be published. Disputed or stale facts stay hidden.</span></li>
          </ul>
        </PageContainer>
      </section>
      <section className="page-section page-section--ink">
        <PageContainer className="content-grid">
          <div>
            <p className="eyebrow">What verification means</p>
            <h2>Checked for freshness. Never certified for quality.</h2>
          </div>
          <div>
            <p>
              Verification does not assess safety, clinical outcomes, provider
              quality, suitability, or whether a clinic is right for someone.
              Clinics make care decisions and deliver all healthcare services.
            </p>
            <Link className="text-link text-link--light" href="/for-clinics#corrections">
              Clinic corrections <span aria-hidden="true">→</span>
            </Link>
          </div>
        </PageContainer>
      </section>
    </>
  );
}
