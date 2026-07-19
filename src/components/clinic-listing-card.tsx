import Link from "next/link";

import type { ClinicListing } from "@/lib/clinic-directory";

type ClinicListingCardProps = { clinic: ClinicListing };

export function ClinicListingCard({ clinic }: ClinicListingCardProps) {
  const headingId = `clinic-${clinic.slug}`;

  return (
    <article className="clinic-listing-card" aria-labelledby={headingId}>
      <div className="clinic-listing-card__topline">
        <p>{clinic.address.municipality}, {clinic.address.province}</p>
        <p className="verification-label">
          <span className="status-dot" aria-hidden="true" />
          Source checked
        </p>
      </div>
      <h3 id={headingId}>
        <Link href={`/clinics/${clinic.slug}`}>{clinic.name}</Link>
      </h3>
      <address>
        {clinic.address.line1}<br />
        {clinic.address.municipality}, {clinic.address.province} {clinic.address.postalCode}
      </address>
      <ul className="service-tags" aria-label="Services in this pilot directory">
        {clinic.services.map((service) => <li key={service.slug}>{service.name}</li>)}
      </ul>
      <div className="clinic-listing-card__footer">
        <p>
          Checked <time dateTime={clinic.lastVerifiedAt}>{clinic.lastVerifiedAt}</time>
        </p>
        <Link href={`/clinics/${clinic.slug}`}>View sourced listing <span aria-hidden="true">→</span></Link>
      </div>
    </article>
  );
}
