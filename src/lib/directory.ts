import type { ProvinceCode } from "@/lib/geography";

export type Region = {
  name: string;
  province: string;
  provinceCode: ProvinceCode;
  provinceSlug: string;
  citySlug: string;
  communities: readonly string[];
};

// Every published region. Adding an entry here is a content and sourcing
// decision, not just a technical one: a region should only be listed once
// it has sourced, dated, verified clinic records behind it (see
// MIGRATION_PLAN.md's expansion rule). The routing layer (geography.ts,
// the locations pages) supports any Canadian province; this list is
// deliberately short until more regions clear that bar.
export const regions: Region[] = [
  {
    name: "Metro Vancouver",
    province: "British Columbia",
    provinceCode: "BC",
    provinceSlug: "british-columbia",
    citySlug: "metro-vancouver",
    communities: [
      "Vancouver",
      "Burnaby",
      "Richmond",
      "Surrey",
      "North Vancouver",
      "New Westminster",
    ],
  },
  {
    name: "Toronto",
    province: "Ontario",
    provinceCode: "ON",
    provinceSlug: "ontario",
    citySlug: "toronto",
    communities: [
      "Toronto",
      "Scarborough",
      "North York",
      "Etobicoke",
      "Mississauga",
      "Markham",
    ],
  },
  {
    name: "Calgary",
    province: "Alberta",
    provinceCode: "AB",
    provinceSlug: "alberta",
    citySlug: "calgary",
    communities: ["Calgary", "Airdrie"],
  },
  {
    name: "Edmonton",
    province: "Alberta",
    provinceCode: "AB",
    provinceSlug: "alberta",
    citySlug: "edmonton",
    communities: ["Edmonton"],
  },
  {
    name: "Regina",
    province: "Saskatchewan",
    provinceCode: "SK",
    provinceSlug: "saskatchewan",
    citySlug: "regina",
    communities: ["Regina"],
  },
  {
    name: "Saskatoon",
    province: "Saskatchewan",
    provinceCode: "SK",
    provinceSlug: "saskatchewan",
    citySlug: "saskatoon",
    communities: ["Saskatoon"],
  },
  {
    name: "Halifax",
    province: "Nova Scotia",
    provinceCode: "NS",
    provinceSlug: "nova-scotia",
    citySlug: "halifax",
    communities: ["Halifax", "Dartmouth", "Sackville"],
  },
  {
    name: "Moncton",
    province: "New Brunswick",
    provinceCode: "NB",
    provinceSlug: "new-brunswick",
    citySlug: "moncton",
    communities: ["Moncton"],
  },
  {
    name: "Summerside",
    province: "Prince Edward Island",
    provinceCode: "PE",
    provinceSlug: "prince-edward-island",
    citySlug: "summerside",
    communities: ["Summerside"],
  },
];

// Convenience alias for the first published region, kept for pages that
// only need "a region to show" rather than the full list.
export const pilotLocation = regions[0];

export function getRegion(provinceSlug: string, citySlug: string) {
  return regions.find(
    (region) => region.provinceSlug === provinceSlug && region.citySlug === citySlug,
  );
}

// Finds which published region a clinic's municipality belongs to, so a
// clinic detail page can link back to the right region instead of a
// hardcoded one. Matches the region's own name or any of its listed
// communities, case-insensitively.
export function getRegionForMunicipality(municipality: string) {
  const normalized = municipality.toLowerCase();
  return regions.find(
    (region) =>
      region.name.toLowerCase() === normalized ||
      region.communities.some((community) => community.toLowerCase() === normalized),
  );
}

export const services = [
  {
    slug: "mri",
    name: "MRI",
    shortDescription:
      "Find private MRI clinic listings with sourced location and contact details.",
    listingDescription:
      "Future listings will show only sourced, dated facts supplied by clinics or checked against public clinic information.",
  },
  {
    slug: "ultrasound",
    name: "Ultrasound",
    shortDescription:
      "Explore private ultrasound clinic listings across the pilot region.",
    listingDescription:
      "Future listings will make their source and last verification date visible, without ranking clinical quality.",
  },
] as const;

export type ServiceSlug = (typeof services)[number]["slug"];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function titleFromSlug(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
