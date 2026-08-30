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
    expect(getRegionForMunicipality("Halifax")).toBeUndefined();
  });
});
