import { describe, expect, it } from "vitest";

import { regions } from "@/lib/directory";
import { listClinics, rowsToClinics } from "@/lib/directory-repository";

describe("region-scoped clinic listing", () => {
  it("returns only clinics in the requested region's communities", async () => {
    const vancouver = regions.find((region) => region.name === "Metro Vancouver")!;
    const toronto = regions.find((region) => region.name === "Toronto")!;

    const vancouverClinics = await listClinics(undefined, vancouver.communities);
    const torontoClinics = await listClinics(undefined, toronto.communities);

    expect(vancouverClinics.length).toBeGreaterThan(0);
    expect(torontoClinics.length).toBeGreaterThan(0);

    for (const clinic of vancouverClinics) {
      expect(toronto.communities).not.toContain(clinic.address.municipality);
    }
    for (const clinic of torontoClinics) {
      expect(vancouver.communities).not.toContain(clinic.address.municipality);
    }
  });

  it("still applies the service filter alongside a region filter", async () => {
    const toronto = regions.find((region) => region.name === "Toronto")!;
    const mriInToronto = await listClinics("mri", toronto.communities);

    expect(mriInToronto.every((clinic) =>
      clinic.services.some((service) => service.slug === "mri"),
    )).toBe(true);
    expect(mriInToronto.every((clinic) =>
      toronto.communities.includes(clinic.address.municipality),
    )).toBe(true);
  });

  it("keeps Calgary and Edmonton clinics scoped to their own region despite sharing a province", () => {
    const calgary = regions.find((region) => region.name === "Calgary")!;
    const edmonton = regions.find((region) => region.name === "Edmonton")!;

    return Promise.all([
      listClinics(undefined, calgary.communities),
      listClinics(undefined, edmonton.communities),
    ]).then(([calgaryClinics, edmontonClinics]) => {
      expect(calgaryClinics.length).toBeGreaterThan(0);
      expect(edmontonClinics.length).toBeGreaterThan(0);

      for (const clinic of calgaryClinics) {
        expect(edmonton.communities).not.toContain(clinic.address.municipality);
      }
      for (const clinic of edmontonClinics) {
        expect(calgary.communities).not.toContain(clinic.address.municipality);
      }
    });
  });

  it("keeps Regina and Saskatoon clinics scoped to their own region despite sharing a province", () => {
    const regina = regions.find((region) => region.name === "Regina")!;
    const saskatoon = regions.find((region) => region.name === "Saskatoon")!;

    return Promise.all([
      listClinics(undefined, regina.communities),
      listClinics(undefined, saskatoon.communities),
    ]).then(([reginaClinics, saskatoonClinics]) => {
      expect(reginaClinics.length).toBeGreaterThan(0);
      expect(saskatoonClinics.length).toBeGreaterThan(0);

      for (const clinic of reginaClinics) {
        expect(saskatoon.communities).not.toContain(clinic.address.municipality);
      }
      for (const clinic of saskatoonClinics) {
        expect(regina.communities).not.toContain(clinic.address.municipality);
      }
    });
  });

  it("includes a clinic addressed to a satellite community (Sackville) in its metro region (Halifax)", async () => {
    const halifax = regions.find((region) => region.name === "Halifax")!;
    const halifaxClinics = await listClinics(undefined, halifax.communities);

    expect(halifaxClinics.length).toBeGreaterThan(0);
    expect(halifaxClinics.some((clinic) => clinic.address.municipality === "Sackville")).toBe(
      true,
    );
  });

  it("scopes Moncton clinics correctly", async () => {
    const moncton = regions.find((region) => region.name === "Moncton")!;
    const monctonClinics = await listClinics(undefined, moncton.communities);

    expect(monctonClinics.length).toBeGreaterThan(0);
    expect(monctonClinics.every((clinic) => clinic.address.municipality === "Moncton")).toBe(
      true,
    );
  });

  it("scopes Summerside clinics correctly", async () => {
    const summerside = regions.find((region) => region.name === "Summerside")!;
    const summersideClinics = await listClinics(undefined, summerside.communities);

    expect(summersideClinics.length).toBeGreaterThan(0);
    expect(
      summersideClinics.every((clinic) => clinic.address.municipality === "Summerside"),
    ).toBe(true);
  });

  it("returns every clinic when no region filter is given", async () => {
    const all = await listClinics();
    const scoped = await listClinics(undefined, regions.flatMap((region) => region.communities));

    expect(all.length).toBe(scoped.length);
  });
});

describe("rowsToClinics (Supabase public_clinic_directory row mapping)", () => {
  // A clinic's own site does not always publish a phone number or a postal
  // code, and the public_clinic_directory view passes that through as SQL
  // null rather than a placeholder string. This must survive the trip from
  // Postgres/PostgREST to the ClinicListing shape as "field omitted", the
  // same as the fixture data already does for these clinics.
  const baseRow = {
    clinic_slug: "example-clinic",
    clinic_name: "Example Clinic",
    website_url: "https://example-clinic.example/",
    clinic_phone: null,
    clinic_email: "hello@example-clinic.example",
    address_line_1: "1 Example St",
    municipality: "Example City",
    province_code: "ON" as const,
    postal_code: null,
    service_slug: "mri" as const,
    service_name: "MRI" as const,
    referral_requirement: "required" as const,
    referral_notes: "Referral required.",
    clinic_source_type: "clinic_website" as const,
    clinic_source_url: "https://example-clinic.example/",
    clinic_source_label: "Example Clinic site",
    clinic_source_checked_at: "2026-08-31",
    location_source_type: "clinic_website" as const,
    location_source_url: "https://example-clinic.example/",
    location_source_label: "Example Clinic site",
    location_source_checked_at: "2026-08-31",
    service_source_type: "clinic_website" as const,
    service_source_url: "https://example-clinic.example/mri",
    service_source_label: "Example Clinic MRI page",
    service_source_checked_at: "2026-08-31",
    last_verified_at: "2026-08-31",
    verification_status: "verified" as const,
  };

  it("maps a null phone and null postal code to omitted fields, not the string 'null'", () => {
    const [clinic] = rowsToClinics([baseRow]);

    expect(clinic.phone).toBeUndefined();
    expect(clinic.address.postalCode).toBeUndefined();
    expect(clinic.email).toBe("hello@example-clinic.example");
  });

  it("still surfaces a phone number when the view provides one", () => {
    const [clinic] = rowsToClinics([{ ...baseRow, clinic_phone: "555-000-1111" }]);

    expect(clinic.phone).toBe("555-000-1111");
  });
});
