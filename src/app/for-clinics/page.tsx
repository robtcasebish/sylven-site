export const metadata = { title: "For clinics — development" };

export default function ForClinicsPage() {
  return (
    <section className="page-section">
      <PageContainer>
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "For clinics" }]}
        />
        <p className="eyebrow">Development information</p>
        <h1>Information for clinics</h1>
        <p className="lede">
          Listing, correction, verification, and commercial processes are not
          yet operating through this scaffold.
        </p>
        <p>
          Future public clinic facts must record their source and last
          verification date. Verification will not be purchasable or presented
          as a clinical endorsement.
        </p>
      </PageContainer>
    </section>
  );
}
import { Breadcrumbs, PageContainer } from "@/components";
