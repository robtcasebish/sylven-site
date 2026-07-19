import { Breadcrumbs, ConsentNotice, EmptyState, PageContainer } from "@/components";
import { titleFromSlug } from "@/lib/directory";

type ClinicPageProps = { params: Promise<{ clinicSlug: string }> };

export async function generateMetadata({ params }: ClinicPageProps) {
  const { clinicSlug } = await params;
  return { title: `${titleFromSlug(clinicSlug)} listing preview` };
}

export default async function ClinicPage({ params }: ClinicPageProps) {
  const { clinicSlug } = await params;

  return (
    <>
      <section className="page-section page-section--compact">
        <PageContainer>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Clinics" },
              { label: titleFromSlug(clinicSlug) },
            ]}
          />
          <p className="eyebrow">Clinic listing preview</p>
          <h1>No verified clinic record</h1>
          <p className="lede">
            This URL demonstrates the future listing structure. It does not
            represent a real clinic or an endorsement by Sylven.
          </p>
        </PageContainer>
      </section>
      <section className="page-section">
        <PageContainer>
          <div className="content-grid">
            <EmptyState title="Listing facts will be source-backed">
              <p>
                A published record will separate clinic facts, locations,
                services, contact methods, sources, and verification history.
              </p>
            </EmptyState>
            <aside className="content-aside">
              <h2>Not a quality rating</h2>
              <p>
                Verification indicates factual freshness only. It does not mean
                Sylven recommends a clinic or has assessed clinical quality.
              </p>
            </aside>
          </div>
          <ConsentNotice />
        </PageContainer>
      </section>
    </>
  );
}
