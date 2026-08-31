import { describe, expect, it } from "vitest";

import {
  getRegion,
  getRegionForMunicipality,
  getService,
  regions,
  titleFromSlug,
} from "@/lib/directory";

describe("directory helpers", () => {
  it("resolves only configured pilot services", () => {
    expect(getService("mri")?.name).toBe("MRI");
    expect(getService("ultrasound")?.name).toBe("Ultrasound");
    expect(getService("prescriptions")).toBeUndefined();
  });

  it("turns safe URL slugs into readable labels", () => {
    expect(titleFromSlug("metro-vancouver")).toBe("Metro Vancouver");
  });

  it("resolves a published region by province and city slug", () => {
    expect(getRegion("british-columbia", "metro-vancouver")?.name).toBe("Metro Vancouver");
    expect(getRegion("ontario", "toronto")?.name).toBe("Toronto");
    expect(getRegion("alberta", "calgary")?.name).toBe("Calgary");
    expect(getRegion("alberta", "edmonton")?.name).toBe("Edmonton");
    expect(getRegion("saskatchewan", "regina")?.name).toBe("Regina");
    expect(getRegion("saskatchewan", "saskatoon")?.name).toBe("Saskatoon");
    expect(getRegion("nova-scotia", "halifax")?.name).toBe("Halifax");
    expect(getRegion("new-brunswick", "moncton")?.name).toBe("Moncton");
    expect(getRegion("ontario", "ottawa")).toBeUndefined();
  });

  it("keeps every published region's province code inside the Canadian allow list", () => {
    for (const region of regions) {
      expect(region.provinceCode).toMatch(/^[A-Z]{2}$/);
    }
  });

  it("resolves a clinic's municipality back to its published region", () => {
    expect(getRegionForMunicipality("Surrey")?.name).toBe("Metro Vancouver");
    expect(getRegionForMunicipality("Scarborough")?.name).toBe("Toronto");
    expect(getRegionForMunicipality("toronto")?.name).toBe("Toronto");
    expect(getRegionForMunicipality("Calgary")?.name).toBe("Calgary");
    expect(getRegionForMunicipality("Edmonton")?.name).toBe("Edmonton");
    expect(getRegionForMunicipality("Regina")?.name).toBe("Regina");
    expect(getRegionForMunicipality("Saskatoon")?.name).toBe("Saskatoon");
    expect(getRegionForMunicipality("Halifax")?.name).toBe("Halifax");
    expect(getRegionForMunicipality("Sackville")?.name).toBe("Halifax");
    expect(getRegionForMunicipality("Moncton")?.name).toBe("Moncton");
    expect(getRegionForMunicipality("Yellowknife")).toBeUndefined();
  });
});
