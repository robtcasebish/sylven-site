import { describe, expect, it } from "vitest";

import { CANADIAN_PROVINCES, getProvinceName, isProvinceCode } from "@/lib/geography";

describe("Canadian province and territory reference data", () => {
  it("lists all thirteen provinces and territories exactly once", () => {
    expect(CANADIAN_PROVINCES).toHaveLength(13);
    const codes = CANADIAN_PROVINCES.map((province) => province.code);
    expect(new Set(codes).size).toBe(codes.length);
  });

  it("validates a known code and rejects an unknown one", () => {
    expect(isProvinceCode("BC")).toBe(true);
    expect(isProvinceCode("ON")).toBe(true);
    expect(isProvinceCode("XX")).toBe(false);
  });

  it("resolves a province code to its full name", () => {
    expect(getProvinceName("BC")).toBe("British Columbia");
    expect(getProvinceName("QC")).toBe("Quebec");
    expect(getProvinceName("ZZ")).toBeUndefined();
  });
});
