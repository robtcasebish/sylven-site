import {
  EmptyState,
  PageContainer,
  SearchFormShell,
  ServiceCardShell,
} from "@/components";

export default function HomePage() {
  return (
    <>
      <section className="page-section">
        <PageContainer>
          <p className="eyebrow">Metro Vancouver directory — in development</p>
          <h1>Find private healthcare services near you</h1>
          <p className="lede">
            Sylven is being developed as a Canadian directory that helps people
            discover factual clinic information and contact clinics they choose.
          </p>
          <p className="boundary-copy">
            Sylven is not a healthcare provider and does not provide medical
            advice, diagnosis, treatment, prescriptions, or medical assessments.
          </p>
          <SearchFormShell />
        </PageContainer>
      </section>

      <section className="page-section">
        <PageContainer>
          <p className="eyebrow">Initial scope</p>
          <h2>Planned service categories</h2>
          <div className="service-list">
            <ServiceCardShell
              title="MRI"
              description="A development page for future sourced MRI clinic listings."
              href="/services/mri"
            />
            <ServiceCardShell
              title="Ultrasound"
              description="A development page for future sourced ultrasound clinic listings."
              href="/services/ultrasound"
            />
          </div>
        </PageContainer>
      </section>

      <section className="page-section">
        <PageContainer>
          <p className="eyebrow">Directory approach</p>
          <h2>How Sylven is intended to work</h2>
          <ol className="steps">
            <li>Choose a service and location.</li>
            <li>Review sourced, dated clinic facts once verified data exists.</li>
            <li>Contact only the clinic or clinics you choose.</li>
          </ol>
          <EmptyState title="Clinic data has not been added">
            <p>
              This foundation intentionally contains no invented listings,
              testimonials, prices, ratings, availability, or medical claims.
            </p>
          </EmptyState>
        </PageContainer>
      </section>
    </>
  );
}
