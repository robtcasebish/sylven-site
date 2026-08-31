import { notFound } from "next/navigation";

import { Breadcrumbs, ClinicListingCard, PageContainer } from "@/components";
import { getService, services } from "@/lib/directory";
import { listClinics } from "@/lib/directory-repository";

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
  const clinics = await listClinics(service.slug);

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
              <h1>{service.name} clinics</h1>
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
            <p>{clinics.length} source-checked {clinics.length === 1 ? "listing" : "listings"}</p>
          </div>
          <div className="clinic-results-list">
            {clinics.map((clinic) => <ClinicListingCard clinic={clinic} key={clinic.slug} />)}
          </div>
          <p className="results-disclaimer">
            Listings are ordered alphabetically. Source checking is not a quality
            rating or endorsement. Confirm current details directly with the clinic.
          </p>
        </PageContainer>
      </section>
    </>
  );
}
