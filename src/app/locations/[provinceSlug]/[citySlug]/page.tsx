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
    <main>
      <p>Development placeholder</p>
      <h1>Location directory page</h1>
      <p>
        Requested location identifiers: {citySlug}, {provinceSlug}
      </p>
      <p>No real clinics or geographic coverage claims are included.</p>
    </main>
  );
}
