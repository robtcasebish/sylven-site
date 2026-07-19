import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumbs, EmptyState, PageContainer } from "@/components";
import { getService, pilotLocation, services } from "@/lib/directory";

type ServicePageProps = {
  params: Promise<{ serviceSlug: string }>;
};

export function generateStaticParams() {
  return services.map((service) => ({ serviceSlug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps) {
  const { serviceSlug } = await params;
  const service = getService(serviceSlug);
  return { title: service ? `Private ${service.name} clinics` : "Service not found" };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { serviceSlug } = await params;
  const service = getService(serviceSlug);
  if (!service) notFound();

  return (
    <>
      <section className="page-section page-section--compact">
        <PageContainer>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Services", href: "/services" },
              { label: service.name },
            ]}
          />
          <div className="content-grid">
            <div>
              <p className="eyebrow">Private service directory</p>
              <h1>{service.name} clinics in {pilotLocation.name}</h1>
              <p className="lede">{service.shortDescription}</p>
            </div>
            <aside className="content-aside">
              <h2>What listings will show</h2>
              <p>{service.listingDescription}</p>
            </aside>
          </div>
        </PageContainer>
      </section>
      <section className="page-section">
        <PageContainer>
          <div className="results-heading">
            <h2>Clinic listings</h2>
            <p>0 verified listings in this preview</p>
          </div>
          <EmptyState title="Verified clinic listings are being prepared">
            <p>
              This preview does not invent clinic names, availability, prices,
              referral rules, or contact details. Listings will appear after
              provenance and freshness checks are complete.
            </p>
            <p>
              <Link href="/methodology">See how listing verification works</Link>
            </p>
          </EmptyState>
        </PageContainer>
      </section>
    </>
  );
}
