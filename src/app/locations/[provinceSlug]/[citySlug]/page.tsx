import { notFound } from "next/navigation";

import { Breadcrumbs, ClinicListingCard, PageContainer } from "@/components";
import { getService, pilotLocation } from "@/lib/directory";
import { listClinics } from "@/lib/directory-repository";

type LocationPageProps = {
  params: Promise<{ provinceSlug: string; citySlug: string }>;
  searchParams: Promise<{ service?: string }>;
};

export function generateStaticParams() {
  return [{
    provinceSlug: pilotLocation.provinceSlug,
    citySlug: pilotLocation.citySlug,
  }];
}

export const metadata = { title: "Private healthcare in Metro Vancouver" };

export default async function LocationPage({ params, searchParams }: LocationPageProps) {
  const { citySlug, provinceSlug } = await params;
  const { service: serviceSlug } = await searchParams;
  if (
    citySlug !== pilotLocation.citySlug ||
    provinceSlug !== pilotLocation.provinceSlug
  ) notFound();

  const selectedService = serviceSlug ? getService(serviceSlug) : undefined;
  if (serviceSlug && !selectedService) notFound();
  const clinics = await listClinics(selectedService?.slug);

  return (
    <>
      <section className="page-section page-section--compact">
        <PageContainer>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: pilotLocation.province },
              { label: pilotLocation.name },
            ]}
          />
          <div className="content-grid">
            <div>
              <p className="eyebrow">Initial directory region</p>
              <h1>
                {selectedService ? `${selectedService.name} in ` : "Private care in "}
                {pilotLocation.name}
              </h1>
              <p className="lede">
                A focused pilot for finding sourced private clinic information
                across communities in the region.
              </p>
            </div>
            <aside className="content-aside">
              <h2>Canada is the destination</h2>
              <p>
                Metro Vancouver is the starting point, not the product limit.
                Geography will expand after the sourcing and verification model
                proves reliable.
              </p>
            </aside>
          </div>
          <ul className="community-list" aria-label="Pilot communities">
            {pilotLocation.communities.map((community) => <li key={community}>{community}</li>)}
          </ul>
        </PageContainer>
      </section>
      <section className="page-section">
        <PageContainer>
          <div className="results-heading">
            <h2>{selectedService ? `${selectedService.name} listings` : "Directory listings"}</h2>
            <p>{clinics.length} source-checked {clinics.length === 1 ? "listing" : "listings"}</p>
          </div>
          <div className="clinic-results-list">
            {clinics.map((clinic) => <ClinicListingCard clinic={clinic} key={clinic.slug} />)}
          </div>
          <p className="results-disclaimer">
            Source checking confirms that the displayed facts matched the linked
            clinic-controlled pages on the date shown. It is not a quality rating,
            endorsement, or guarantee of current availability. Confirm details with
            the clinic before making arrangements.
          </p>
        </PageContainer>
      </section>
    </>
  );
}
