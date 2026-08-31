import { describe, expect, it } from "vitest";

import { regions } from "@/lib/directory";
import { listClinics } from "@/lib/directory-repository";

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

  it("returns every clinic when no region filter is given", async () => {
    const all = await listClinics();
    const scoped = await listClinics(undefined, regions.flatMap((region) => region.communities));

    expect(all.length).toBe(scoped.length);
  });
});
