import Link from "next/link";

import {
  Breadcrumbs,
  PageContainer,
  ServiceCardShell,
} from "@/components";
import { services } from "@/lib/directory";

export const metadata = { title: "Browse private healthcare services" };

export default function ServicesPage() {
  return (
    <>
      <section className="page-section page-section--compact">
        <PageContainer>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services" }]} />
          <div className="content-grid">
            <div>
              <p className="eyebrow">Metro Vancouver pilot</p>
              <h1>Browse private healthcare services</h1>
              <p className="lede">
                Begin with a service category. Public clinic facts will appear
                only after their source and verification date are recorded.
              </p>
            </div>
            <aside className="content-aside">
              <h2>Starting deliberately small</h2>
              <p>
                MRI and ultrasound are the pilot categories. This focused scope
                lets Sylven establish a trustworthy listing process before
                expanding across Canada.
              </p>
            </aside>
          </div>
        </PageContainer>
      </section>
      <section className="page-section">
        <PageContainer>
          <div className="service-list">
            {services.map((service, index) => (
              <ServiceCardShell
                key={service.slug}
                title={service.name}
                description={service.shortDescription}
                href={`/services/${service.slug}`}
                index={String(index + 1).padStart(2, "0")}
              />
            ))}
          </div>
          <div className="pilot-area">
            <div>
              <p className="eyebrow">Need to understand a listing?</p>
              <h3>See how facts earn their place.</h3>
            </div>
            <p>
              Verification means information was checked. It is not a clinical
              endorsement, ranking, or guarantee.
            </p>
            <Link className="button-link button-link--secondary" href="/methodology">
              Listing methodology <span aria-hidden="true">→</span>
            </Link>
          </div>
        </PageContainer>
      </section>
    </>
  );
}
