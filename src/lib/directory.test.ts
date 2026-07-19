import { describe, expect, it } from "vitest";

import { getService, titleFromSlug } from "@/lib/directory";

describe("directory helpers", () => {
  it("resolves only configured pilot services", () => {
    expect(getService("mri")?.name).toBe("MRI");
    expect(getService("ultrasound")?.name).toBe("Ultrasound");
    expect(getService("prescriptions")).toBeUndefined();
  });

  it("turns safe URL slugs into readable labels", () => {
    expect(titleFromSlug("metro-vancouver")).toBe("Metro Vancouver");
  });
});
