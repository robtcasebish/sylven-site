import { Breadcrumbs, PageContainer } from "@/components";

export const metadata = { title: "Privacy preview" };

export default function PrivacyPage() {
  return (
    <section className="page-section page-section--compact">
      <PageContainer>
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Privacy" }]} />
        <div className="content-grid">
          <div>
            <p className="eyebrow">Preview policy boundary</p>
            <h1>Privacy should start with restraint.</h1>
            <p className="lede">
              A reviewed directory privacy policy will be published before any
              personal information is collected. This preview does not submit
              or deliver inquiries.
            </p>
            <ul className="principle-list">
              <li><strong>Minimal contact</strong><span>Name, email, optional phone, preferred contact method, and selected service.</span></li>
              <li><strong>Named recipients</strong><span>Consent must identify every clinic receiving an inquiry.</span></li>
              <li><strong>No medical history</strong><span>No symptoms, diagnoses, medication lists, health card details, or attachments.</span></li>
              <li><strong>Server-only records</strong><span>Inquiry and consent data must be private, access-controlled, and excluded from analytics.</span></li>
            </ul>
          </div>
          <aside className="content-aside">
            <h2>No information is collected here</h2>
            <p>
              Search controls in this staging preview navigate between public
              pages only. There is no live inquiry form or database connection.
            </p>
          </aside>
        </div>
      </PageContainer>
    </section>
  );
}
