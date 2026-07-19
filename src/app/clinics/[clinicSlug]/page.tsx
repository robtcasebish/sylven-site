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
    <main>
      <p>Development placeholder</p>
      <h1>Clinic listing page</h1>
      <p>Requested clinic identifier: {clinicSlug}</p>
      <p>No real clinic facts, endorsement, or verification claim is included.</p>
    </main>
  );
}
