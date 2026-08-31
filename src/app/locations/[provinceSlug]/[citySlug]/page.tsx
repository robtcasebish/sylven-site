import { notFound } from "next/navigation";

import { Breadcrumbs, ClinicListingCard, PageContainer } from "@/components";
import { getRegion, getService, regions } from "@/lib/directory";
import { listClinics } from "@/lib/directory-repository";

type LocationPageProps = {
  params: Promise<{ provinceSlug: string; citySlug: string }>;
  searchParams: Promise<{ service?: string }>;
};

export function generateStaticParams() {
  return regions.map((region) => ({
    provinceSlug: region.provinceSlug,
    citySlug: region.citySlug,
  }));
}

export async function generateMetadata({ params }: LocationPageProps) {
  const { citySlug, provinceSlug } = await params;
  const region = getRegion(provinceSlug, citySlug);
  return { title: region ? `Private healthcare in ${region.name}` : "Region not found" };
}

export default async function LocationPage({ params, searchParams }: LocationPageProps) {
  const { citySlug, provinceSlug } = await params;
  const { service: serviceSlug } = await searchParams;
  const region = getRegion(provinceSlug, citySlug);
  if (!region) notFound();

  const selectedService = serviceSlug ? getService(serviceSlug) : undefined;
  if (serviceSlug && !selectedService) notFound();
  const clinics = await listClinics(selectedService?.slug, region.communities);

  return (
    <>
      <section className="page-section page-section--compact">
        <PageContainer>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: region.province },
              { label: region.name },
            ]}
          />
          <div className="content-grid">
            <div>
              <p className="eyebrow">Directory region</p>
              <h1>
                {selectedService ? `${selectedService.name} in ` : "Private care in "}
                {region.name}
              </h1>
              <p className="lede">
                A focused list of sourced private clinic information across
                communities in the region.
              </p>
            </div>
            <aside className="content-aside">
              <h2>Canada is the destination</h2>
              <p>
                Each region is added only once it has sourced, verified
                listings behind it. More regions follow as the sourcing and
                verification model proves reliable there.
              </p>
            </aside>
          </div>
          <ul className="community-list" aria-label="Communities in this region">
            {region.communities.map((community) => <li key={community}>{community}</li>)}
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
