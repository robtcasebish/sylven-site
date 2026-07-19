export const pilotLocation = {
  name: "Metro Vancouver",
  province: "British Columbia",
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
} as const;

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
