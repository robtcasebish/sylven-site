export const metadata = { title: "Privacy — development" };

export default function PrivacyPage() {
  return (
    <section className="page-section">
      <PageContainer>
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Privacy" }]} />
        <p className="eyebrow">Development placeholder</p>
        <h1>Privacy</h1>
        <p className="lede">
          A reviewed directory privacy policy will be added before any personal
          information is collected. This scaffold does not submit inquiries.
        </p>
        <p>
          Detailed medical histories, diagnoses, medication lists, health card
          details, and payment information are outside Sylven&apos;s directory scope.
        </p>
      </PageContainer>
    </section>
  );
}
import { Breadcrumbs, PageContainer } from "@/components";
