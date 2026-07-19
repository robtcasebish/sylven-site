import Link from "next/link";

import { Breadcrumbs, PageContainer, SectionHeading } from "@/components";

export const metadata = { title: "For clinics" };

export default function ForClinicsPage() {
  return (
    <>
      <section className="page-section page-section--compact">
        <PageContainer>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "For clinics" }]} />
          <div className="content-grid">
            <div>
              <p className="eyebrow">For clinic teams</p>
              <h1>Accurate listings. Clear expectations.</h1>
              <p className="lede">
                Sylven is building a transparent way for private clinics to be
                discovered by people searching for a specific service nearby.
              </p>
            </div>
            <aside className="content-aside">
              <h2>Not accepting submissions yet</h2>
              <p>
                Listing, verification, correction, and commercial workflows are
                still in development. This page does not submit information.
              </p>
            </aside>
          </div>
        </PageContainer>
      </section>
      <section className="page-section">
        <PageContainer>
          <SectionHeading eyebrow="The listing model" title="Trust cannot be bought." align="split">
            <p>
              A paid plan may enhance presentation or provide clearly labelled
              placement. It will never purchase verification, clinical claims,
              or an implied recommendation.
            </p>
          </SectionHeading>
          <ul className="principle-list">
            <li><strong>Standard listing</strong><span>Core sourced facts, contact information, services, and locations.</span></li>
            <li><strong>Enhanced listing</strong><span>Optional richer presentation, clearly separated from factual verification.</span></li>
            <li><strong>Verification</strong><span>A non-purchasable freshness process with source and date records.</span></li>
            <li><strong>Corrections</strong><span>A traceable review process for clinic teams and members of the public.</span></li>
          </ul>
        </PageContainer>
      </section>
      <section className="page-section page-section--ink" id="corrections">
        <PageContainer className="split-callout">
          <div>
            <p className="eyebrow">Corrections and verification</p>
            <h2>Clinic-submitted information is a source—not an endorsement.</h2>
          </div>
          <div>
            <p>
              Before launch, every public fact will need a source, the date it
              was checked, a verification status, and a last verification date.
            </p>
            <Link className="text-link text-link--light" href="/methodology">
              Read the methodology <span aria-hidden="true">→</span>
            </Link>
          </div>
        </PageContainer>
      </section>
    </>
  );
}
