type LocationPageProps = {
  params: Promise<{ provinceSlug: string; citySlug: string }>;
};

export async function generateMetadata({ params }: LocationPageProps) {
  const { citySlug, provinceSlug } = await params;

  return { title: `${citySlug}, ${provinceSlug} — development` };
}

export default async function LocationPage({ params }: LocationPageProps) {
  const { citySlug, provinceSlug } = await params;

  return (
    <section className="page-section">
      <PageContainer>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: provinceSlug },
            { label: citySlug },
          ]}
        />
        <p className="eyebrow">Development location page</p>
        <h1>Location directory page</h1>
        <p>
          Requested identifiers: <span className="identifier">{citySlug}</span>{" "}
          in <span className="identifier">{provinceSlug}</span>
        </p>
        <EmptyState title="No location inventory yet">
          <p>No real clinics or geographic coverage claims are included.</p>
        </EmptyState>
      </PageContainer>
    </section>
  );
}
import { Breadcrumbs, EmptyState, PageContainer } from "@/components";
