import { describe, expect, it } from "vitest";

import {
  ALBERTA_SOURCE_CHECK_DATE,
  DIRECTORY_SOURCE_CHECK_DATE,
  TORONTO_SOURCE_CHECK_DATE,
  clinicListings,
  getClinicListing,
  getPublishedClinicListings,
} from "@/lib/clinic-directory";

const VALID_CHECK_DATES = [
  DIRECTORY_SOURCE_CHECK_DATE,
  TORONTO_SOURCE_CHECK_DATE,
  ALBERTA_SOURCE_CHECK_DATE,
];

describe("source-checked clinic directory", () => {
  it("publishes only verified records with complete provenance", () => {
    const published = getPublishedClinicListings();

    expect(published).toHaveLength(10);
    for (const clinic of published) {
      expect(VALID_CHECK_DATES).toContain(clinic.lastVerifiedAt);
      expect(clinic.websiteUrl).toMatch(/^https:\/\//);
      expect(clinic.sources.length).toBeGreaterThan(0);
      expect(clinic.sources.every((source) =>
        source.url.startsWith("https://") &&
        VALID_CHECK_DATES.includes(source.checkedAt) &&
        source.sourceType === "clinic_website"
      )).toBe(true);
      expect(clinic.services.every((service) =>
        clinic.sources.some((source) => source.id === service.sourceId)
      )).toBe(true);
      // A clinic must be reachable some way: phone or email, not neither.
      expect(clinic.phone || clinic.email).toBeTruthy();
    }
  });

  it("filters by the controlled service taxonomy", () => {
    expect(getPublishedClinicListings("mri").map(({ slug }) => slug)).toEqual([
      "canada-diagnostic-centres-vancouver",
      "aim-medical-imaging",
      "access-mri-surrey",
      "simply-mri-toronto",
      "mayfair-diagnostics-calgary",
      "mic-medical-imaging-century-park",
    ]);
    expect(getPublishedClinicListings("ultrasound")).toHaveLength(6);
    expect(getPublishedClinicListings("prescriptions")).toHaveLength(0);
  });

  it("does not publish stale or disputed records", () => {
    const original = clinicListings[0].verificationStatus;
    clinicListings[0].verificationStatus = "stale";
    expect(getClinicListing(clinicListings[0].slug)).toBeUndefined();
    clinicListings[0].verificationStatus = original;
  });
});
