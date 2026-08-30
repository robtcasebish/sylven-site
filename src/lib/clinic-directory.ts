import type { ProvinceCode } from "@/lib/geography";

export const DIRECTORY_SOURCE_CHECK_DATE = "2026-07-19";

export type VerificationStatus = "verified" | "stale" | "disputed";
export type ReferralRequirement = "required" | "varies" | "unknown";

export type ListingSource = {
  id: string;
  label: string;
  sourceType: "clinic_website";
  url: string;
  checkedAt: string;
};

export type ClinicServiceListing = {
  slug: "mri" | "ultrasound";
  name: "MRI" | "Ultrasound";
  referralRequirement: ReferralRequirement;
  referralNote: string;
  sourceId: string;
};

export type ClinicListing = {
  slug: string;
  name: string;
  websiteUrl: string;
  phone: string;
  address: {
    line1: string;
    municipality: string;
    province: ProvinceCode;
    postalCode: string;
  };
  services: ClinicServiceListing[];
  verificationStatus: VerificationStatus;
  lastVerifiedAt: string;
  sources: ListingSource[];
};

const checkedSource = (
  id: string,
  label: string,
  url: string,
): ListingSource => ({
  id,
  label,
  sourceType: "clinic_website",
  url,
  checkedAt: DIRECTORY_SOURCE_CHECK_DATE,
});

export const clinicListings: ClinicListing[] = [
  {
    slug: "canada-diagnostic-centres-vancouver",
    name: "Canada Diagnostic Centres, Vancouver",
    websiteUrl: "https://www.canadadiagnostic.com/",
    phone: "604-709-8522",
    address: {
      line1: "Suite 136, 555 West 12th Avenue",
      municipality: "Vancouver",
      province: "BC",
      postalCode: "V5Z 3X7",
    },
    services: [
      {
        slug: "mri",
        name: "MRI",
        referralRequirement: "required",
        referralNote: "The clinic website says a physician referral is required.",
        sourceId: "cdc-services",
      },
      {
        slug: "ultrasound",
        name: "Ultrasound",
        referralRequirement: "required",
        referralNote: "The clinic website says a physician referral is required.",
        sourceId: "cdc-services",
      },
    ],
    verificationStatus: "verified",
    lastVerifiedAt: DIRECTORY_SOURCE_CHECK_DATE,
    sources: [
      checkedSource(
        "cdc-services",
        "Canada Diagnostic Centres service and contact information",
        "https://www.canadadiagnostic.com/",
      ),
      checkedSource(
        "cdc-location",
        "Canada Diagnostic Centres directions",
        "https://www.canadadiagnostic.com/contact/directions/",
      ),
    ],
  },
  {
    slug: "aim-medical-imaging",
    name: "AIM Medical Imaging",
    websiteUrl: "https://aimmedicalimaging.com/",
    phone: "604-733-4007",
    address: {
      line1: "1371 West Broadway",
      municipality: "Vancouver",
      province: "BC",
      postalCode: "V6H 1G9",
    },
    services: [
      {
        slug: "mri",
        name: "MRI",
        referralRequirement: "required",
        referralNote: "The clinic FAQ says MRI examinations require a physician referral.",
        sourceId: "aim-faq",
      },
    ],
    verificationStatus: "verified",
    lastVerifiedAt: DIRECTORY_SOURCE_CHECK_DATE,
    sources: [
      checkedSource(
        "aim-contact",
        "AIM Medical Imaging contact information",
        "https://aimmedicalimaging.com/appointments/contact-us/",
      ),
      checkedSource(
        "aim-faq",
        "AIM Medical Imaging MRI FAQ",
        "https://aimmedicalimaging.com/mri-services/faq/",
      ),
    ],
  },
  {
    slug: "access-mri-surrey",
    name: "Access MRI",
    websiteUrl: "https://www.accessmri.com/",
    phone: "604-575-5566",
    address: {
      line1: "15137 56 Avenue",
      municipality: "Surrey",
      province: "BC",
      postalCode: "V3S 9A5",
    },
    services: [
      {
        slug: "mri",
        name: "MRI",
        referralRequirement: "required",
        referralNote: "The clinic contact page says all services require a doctor's referral.",
        sourceId: "access-contact",
      },
      {
        slug: "ultrasound",
        name: "Ultrasound",
        referralRequirement: "required",
        referralNote: "The clinic contact page says all services require a doctor's referral.",
        sourceId: "access-contact",
      },
    ],
    verificationStatus: "verified",
    lastVerifiedAt: DIRECTORY_SOURCE_CHECK_DATE,
    sources: [
      checkedSource(
        "access-contact",
        "Access MRI contact and referral information",
        "https://www.accessmri.com/contact-us/",
      ),
      checkedSource(
        "access-services",
        "Access MRI service information",
        "https://www.accessmri.com/",
      ),
    ],
  },
  {
    slug: "vancouver-ultrasound",
    name: "Vancouver Ultrasound",
    websiteUrl: "https://vanultrasound.com/",
    phone: "604-569-0616",
    address: {
      line1: "#303, 550 West Broadway",
      municipality: "Vancouver",
      province: "BC",
      postalCode: "V5Z 0E9",
    },
    services: [
      {
        slug: "ultrasound",
        name: "Ultrasound",
        referralRequirement: "varies",
        referralNote:
          "The clinic says most diagnostic ultrasound exams require a requisition; confirm directly for the exam you need.",
        sourceId: "vancouver-ultrasound-contact",
      },
    ],
    verificationStatus: "verified",
    lastVerifiedAt: DIRECTORY_SOURCE_CHECK_DATE,
    sources: [
      checkedSource(
        "vancouver-ultrasound-contact",
        "Vancouver Ultrasound contact and referral information",
        "https://vanultrasound.com/contact-us/",
      ),
    ],
  },
];

export function getPublishedClinicListings(serviceSlug?: string) {
  return clinicListings.filter((clinic) => {
    if (clinic.verificationStatus !== "verified") return false;
    if (!serviceSlug) return true;
    return clinic.services.some((service) => service.slug === serviceSlug);
  });
}

export function getClinicListing(slug: string) {
  return clinicListings.find(
    (clinic) => clinic.slug === slug && clinic.verificationStatus === "verified",
  );
}

export function getServiceSource(clinic: ClinicListing, sourceId: string) {
  return clinic.sources.find((source) => source.id === sourceId);
}
