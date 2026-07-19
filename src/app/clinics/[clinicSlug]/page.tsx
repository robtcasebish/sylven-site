import { notFound } from "next/navigation";

import { Breadcrumbs, PageContainer } from "@/components";
import { findClinic, getStaticClinicSlugs } from "@/lib/directory-repository";

type ClinicPageProps = { params: Promise<{ clinicSlug: string }> };

export async function generateMetadata({ params }: ClinicPageProps) {
  const { clinicSlug } = await params;
  const clinic = await findClinic(clinicSlug);
  return { title: clinic ? `${clinic.name} directory listing` : "Clinic not found" };
}

export function generateStaticParams() {
  return getStaticClinicSlugs();
}

export default async function ClinicPage({ params }: ClinicPageProps) {
  const { clinicSlug } = await params;
  const clinic = await findClinic(clinicSlug);
  if (!clinic) notFound();

  return (
    <>
      <section className="page-section page-section--compact">
        <PageContainer>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Metro Vancouver", href: "/locations/british-columbia/metro-vancouver" },
              { label: clinic.name },
            ]}
          />
          <p className="eyebrow">Source-checked directory listing</p>
          <h1>{clinic.name}</h1>
          <p className="lede">
            Public contact, location, and pilot-service information gathered from
            the clinic-controlled sources listed below.
          </p>
        </PageContainer>
      </section>
      <section className="page-section">
        <PageContainer>
          <div className="listing-detail-grid">
            <div className="listing-facts">
              <section aria-labelledby="contact-heading">
                <p className="section-number">01</p>
                <h2 id="contact-heading">Contact and location</h2>
                <address>
                  {clinic.address.line1}<br />
                  {clinic.address.municipality}, {clinic.address.province} {clinic.address.postalCode}
                </address>
                <p><a href={`tel:${clinic.phone.replace(/[^\d+]/g, "")}`}>{clinic.phone}</a></p>
                <p>
                  <a href={clinic.websiteUrl} rel="noreferrer">
                    Visit clinic website <span aria-hidden="true">↗</span>
                  </a>
                </p>
              </section>
              <section aria-labelledby="services-heading">
                <p className="section-number">02</p>
                <h2 id="services-heading">Services in this pilot</h2>
                <div className="listing-services">
                  {clinic.services.map((service) => (
                    <article key={service.slug}>
                      <h3>{service.name}</h3>
                      <p>{service.referralNote}</p>
                    </article>
                  ))}
                </div>
              </section>
              <section aria-labelledby="sources-heading">
                <p className="section-number">03</p>
                <h2 id="sources-heading">Sources</h2>
                <ul className="source-list">
                  {clinic.sources.map((source) => (
                    <li key={source.id}>
                      <a href={source.url} rel="noreferrer">{source.label} <span aria-hidden="true">↗</span></a>
                      <span>Clinic website · checked {source.checkedAt}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
            <aside className="content-aside">
              <p className="verification-label">
                <span className="status-dot" aria-hidden="true" /> Source checked
              </p>
              <h2>What this status means</h2>
              <p>
                These facts matched the linked sources on {clinic.lastVerifiedAt}.
                Sylven has not assessed clinical quality and does not endorse this
                clinic or guarantee availability.
              </p>
              <p>Confirm service details, referral requirements, and costs directly with the clinic.</p>
            </aside>
          </div>
        </PageContainer>
      </section>
    </>
  );
}
