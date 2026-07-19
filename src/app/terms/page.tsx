import { Breadcrumbs, PageContainer } from "@/components";

export const metadata = { title: "Terms preview" };

export default function TermsPage() {
  return (
    <section className="page-section page-section--compact">
      <PageContainer>
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Terms" }]} />
        <div className="content-grid">
          <div>
            <p className="eyebrow">Development boundary</p>
            <h1>Directory terms are being prepared.</h1>
            <p className="lede">
              Reviewed terms will be added before public launch. The legacy
              telehealth, treatment, membership, medication, and refund terms
              do not apply to this directory product.
            </p>
            <ul className="principle-list">
              <li><strong>Directory only</strong><span>Sylven helps people discover and contact clinics; it does not provide care.</span></li>
              <li><strong>Clinic responsibility</strong><span>Clinics determine availability, suitability, pricing, and whether they can help.</span></li>
              <li><strong>No guarantee</strong><span>A listing or inquiry does not guarantee contact, acceptance, availability, or an appointment.</span></li>
              <li><strong>Clear sponsorship</strong><span>Commercial placement must be labelled and cannot purchase verification.</span></li>
            </ul>
          </div>
          <aside className="content-aside">
            <h2>Not final legal terms</h2>
            <p>
              This page communicates intended product boundaries for review. It
              is not the final legal agreement for a public release.
            </p>
          </aside>
        </div>
      </PageContainer>
    </section>
  );
}
