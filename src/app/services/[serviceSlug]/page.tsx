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
    <main>
      <p>Development placeholder</p>
      <h1>Service directory page</h1>
      <p>Requested service identifier: {serviceSlug}</p>
      <p>No clinic availability or medical suitability is represented here.</p>
    </main>
  );
}
