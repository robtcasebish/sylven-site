export const metadata = { title: "Terms — development" };

export default function TermsPage() {
  return (
    <section className="page-section">
      <PageContainer>
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Terms" }]} />
        <p className="eyebrow">Development placeholder</p>
        <h1>Terms</h1>
        <p className="lede">
          Reviewed directory terms will replace this placeholder before a public
          release. Legacy telehealth terms do not apply to the new product.
        </p>
      </PageContainer>
    </section>
  );
}
import { Breadcrumbs, PageContainer } from "@/components";
