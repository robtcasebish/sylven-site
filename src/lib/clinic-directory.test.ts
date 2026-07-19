import { describe, expect, it } from "vitest";

import {
  DIRECTORY_SOURCE_CHECK_DATE,
  clinicListings,
  getClinicListing,
  getPublishedClinicListings,
} from "@/lib/clinic-directory";

describe("source-checked clinic directory", () => {
  it("publishes only verified records with complete provenance", () => {
    const published = getPublishedClinicListings();

    expect(published).toHaveLength(4);
    for (const clinic of published) {
      expect(clinic.lastVerifiedAt).toBe(DIRECTORY_SOURCE_CHECK_DATE);
      expect(clinic.websiteUrl).toMatch(/^https:\/\//);
      expect(clinic.sources.length).toBeGreaterThan(0);
      expect(clinic.sources.every((source) =>
        source.url.startsWith("https://") &&
        source.checkedAt === DIRECTORY_SOURCE_CHECK_DATE &&
        source.sourceType === "clinic_website"
      )).toBe(true);
      expect(clinic.services.every((service) =>
        clinic.sources.some((source) => source.id === service.sourceId)
      )).toBe(true);
    }
  });

  it("filters by the controlled service taxonomy", () => {
    expect(getPublishedClinicListings("mri").map(({ slug }) => slug)).toEqual([
      "canada-diagnostic-centres-vancouver",
      "aim-medical-imaging",
      "access-mri-surrey",
    ]);
    expect(getPublishedClinicListings("ultrasound")).toHaveLength(3);
    expect(getPublishedClinicListings("prescriptions")).toHaveLength(0);
  });

  it("does not publish stale or disputed records", () => {
    const original = clinicListings[0].verificationStatus;
    clinicListings[0].verificationStatus = "stale";
    expect(getClinicListing(clinicListings[0].slug)).toBeUndefined();
    clinicListings[0].verificationStatus = original;
  });
});
