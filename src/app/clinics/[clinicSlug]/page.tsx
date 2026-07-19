type ClinicPageProps = {
  params: Promise<{ clinicSlug: string }>;
};

export async function generateMetadata({ params }: ClinicPageProps) {
  const { clinicSlug } = await params;

  return { title: `${clinicSlug} — development` };
}

export default async function ClinicPage({ params }: ClinicPageProps) {
  const { clinicSlug } = await params;

  return (
    <section className="page-section">
      <PageContainer>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Clinics" },
            { label: clinicSlug },
          ]}
        />
        <p className="eyebrow">Development clinic page</p>
        <h1>Clinic listing page</h1>
        <p>
          Requested clinic identifier:{" "}
          <span className="identifier">{clinicSlug}</span>
        </p>
        <EmptyState title="No verified clinic record">
          <p>
            No clinic facts, endorsement, source, verification, availability, or
            contact channel is represented by this placeholder.
          </p>
        </EmptyState>
        <ConsentNotice />
      </PageContainer>
    </section>
  );
}
import {
  Breadcrumbs,
  ConsentNotice,
  EmptyState,
  PageContainer,
} from "@/components";
