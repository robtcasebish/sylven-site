// Canada-wide province and territory reference data.
//
// This is a controlled allow list, not a claim that Sylven has listings in
// every province or territory. Adding a province code here only makes the
// routing and validation layers accept it; publishing a region still
// requires the region to be added to `regions` in `directory.ts` with real,
// sourced clinic data behind it.
export const CANADIAN_PROVINCES = [
  { code: "AB", name: "Alberta" },
  { code: "BC", name: "British Columbia" },
  { code: "MB", name: "Manitoba" },
  { code: "NB", name: "New Brunswick" },
  { code: "NL", name: "Newfoundland and Labrador" },
  { code: "NS", name: "Nova Scotia" },
  { code: "NT", name: "Northwest Territories" },
  { code: "NU", name: "Nunavut" },
  { code: "ON", name: "Ontario" },
  { code: "PE", name: "Prince Edward Island" },
  { code: "QC", name: "Quebec" },
  { code: "SK", name: "Saskatchewan" },
  { code: "YT", name: "Yukon" },
] as const;

export type ProvinceCode = (typeof CANADIAN_PROVINCES)[number]["code"];

export function isProvinceCode(value: string): value is ProvinceCode {
  return CANADIAN_PROVINCES.some((province) => province.code === value);
}

export function getProvinceName(code: string) {
  return CANADIAN_PROVINCES.find((province) => province.code === code)?.name;
}
