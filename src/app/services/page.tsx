import {
  Breadcrumbs,
  PageContainer,
  ServiceCardShell,
} from "@/components";

export const metadata = { title: "Services — development" };

export default function ServicesPage() {
  return (
    <section className="page-section">
      <PageContainer>
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services" }]} />
        <p className="eyebrow">Development directory</p>
        <h1>Browse services</h1>
        <p className="lede">
          These planned categories contain no real clinic inventory or claims.
        </p>
        <div className="service-list">
          <ServiceCardShell
            title="MRI"
            description="A shell for future sourced and dated clinic listings."
            href="/services/mri"
          />
          <ServiceCardShell
            title="Ultrasound"
            description="A shell for future sourced and dated clinic listings."
            href="/services/ultrasound"
          />
        </div>
      </PageContainer>
    </section>
  );
}
