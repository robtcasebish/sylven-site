import Link from "next/link";

import {
  PageContainer,
  SearchFormShell,
  SectionHeading,
  ServiceCardShell,
} from "@/components";
import { pilotLocation, services } from "@/lib/directory";

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <PageContainer>
          <div className="hero__status">
            <span className="status-dot" aria-hidden="true" />
            Metro Vancouver pilot · Canada-wide vision
          </div>
          <div className="hero__grid">
            <div className="hero__copy">
              <p className="eyebrow">Private care, made findable</p>
              <h1>Find the right clinic, without the runaround.</h1>
              <p className="lede hero__lede">
                Sylven is a Canadian directory for discovering private
                healthcare services, comparing sourced clinic information, and
                contacting the clinics you choose.
              </p>
            </div>
            <div className="hero__aside" aria-label="Product boundaries">
              <p className="hero__aside-number">01</p>
              <p>
                Clear facts, visible sources, and no paid clinical rankings.
              </p>
              <p>
                Sylven is not a healthcare provider, clinic, or medical
                assessment service. It is a directory.
              </p>
            </div>
          </div>
          <SearchFormShell />
        </PageContainer>
      </section>

      <section className="signal-strip" aria-label="Directory principles">
        <PageContainer className="signal-strip__inner">
          <p><strong>Source-first</strong><span>Every public clinic fact needs provenance.</span></p>
          <p><strong>Freshness visible</strong><span>Listings show when details were checked.</span></p>
          <p><strong>You choose</strong><span>Only selected clinics receive an inquiry.</span></p>
        </PageContainer>
      </section>

      <section className="page-section">
        <PageContainer>
          <SectionHeading
            eyebrow="Start with the pilot"
            title="Two services. One focused region."
            align="split"
          >
            <p>
              We are starting deliberately small so every listing can be
              sourced, checked, and useful. More services and Canadian regions
              can follow once the model works.
            </p>
          </SectionHeading>
          <div className="service-list">
            {services.map((service, index) => (
              <ServiceCardShell
                key={service.slug}
                title={service.name}
                description={service.shortDescription}
                href={`/services/${service.slug}`}
                index={String(index + 1).padStart(2, "0")}
              />
            ))}
          </div>
          <div className="pilot-area">
            <div>
              <p className="eyebrow">Initial geography</p>
              <h3>{pilotLocation.name}</h3>
              <p>
                The first release is designed around communities across the
                region while the directory establishes a reliable verification
                process.
              </p>
            </div>
            <ul className="community-list" aria-label="Planned pilot communities">
              {pilotLocation.communities.map((community) => (
                <li key={community}>{community}</li>
              ))}
            </ul>
            <Link
              className="button-link button-link--secondary"
              href="/locations/british-columbia/metro-vancouver"
            >
              View the pilot area <span aria-hidden="true">→</span>
            </Link>
          </div>
        </PageContainer>
      </section>

      <section className="page-section page-section--ink">
        <PageContainer>
          <SectionHeading
            eyebrow="Built for confidence"
            title="Useful information, with its receipts."
            align="split"
          >
            <p>
              A directory should make facts easier to evaluate—not hide where
              they came from or imply that placement equals quality.
            </p>
          </SectionHeading>
          <ol className="feature-steps">
            <li>
              <span>01</span>
              <div>
                <h3>Search by service and place</h3>
                <p>Start with what you are looking for and where you are.</p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <h3>Review sourced listing facts</h3>
                <p>See the source, verification status, and date checked.</p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <h3>Contact your chosen clinic</h3>
                <p>Share only minimal logistical information with named recipients.</p>
              </div>
            </li>
          </ol>
          <Link className="text-link text-link--light" href="/methodology">
            Read the listing methodology <span aria-hidden="true">→</span>
          </Link>
        </PageContainer>
      </section>

      <section className="page-section">
        <PageContainer className="split-callout">
          <div>
            <p className="eyebrow">For clinic teams</p>
            <h2>Be easier to find—and easier to understand.</h2>
          </div>
          <div>
            <p>
              Sylven is designing a transparent listing model for clinics that
              want accurate information, clear corrections, and qualified local
              discovery without clinical endorsements.
            </p>
            <Link className="button-link" href="/for-clinics">
              Learn about clinic listings <span aria-hidden="true">→</span>
            </Link>
          </div>
        </PageContainer>
      </section>
    </>
  );
}
