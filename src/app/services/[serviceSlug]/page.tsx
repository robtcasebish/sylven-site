type ServicePageProps = {
  params: Promise<{ serviceSlug: string }>;
};

export async function generateMetadata({ params }: ServicePageProps) {
  const { serviceSlug } = await params;

  return { title: `${serviceSlug} — development` };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { serviceSlug } = await params;

  return (
    <section className="page-section">
      <PageContainer>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: serviceSlug },
          ]}
        />
        <p className="eyebrow">Development service page</p>
        <h1>Service directory page</h1>
        <p>
          Requested service identifier:{" "}
          <span className="identifier">{serviceSlug}</span>
        </p>
        <EmptyState title="No clinic listings yet">
          <p>
            No clinic availability, clinical suitability, price, or verification
            is represented in this scaffold.
          </p>
        </EmptyState>
      </PageContainer>
    </section>
  );
}
import { Breadcrumbs, EmptyState, PageContainer } from "@/components";
