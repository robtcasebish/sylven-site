import type { ProvinceCode } from "@/lib/geography";

export const DIRECTORY_SOURCE_CHECK_DATE = "2026-07-19";
// Second sourcing batch, added when the Toronto region was researched.
export const TORONTO_SOURCE_CHECK_DATE = "2026-08-30";

export type VerificationStatus = "verified" | "stale" | "disputed";
export type ReferralRequirement = "required" | "not_required" | "varies" | "unknown";

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
  // Optional because a clinic's own website does not always publish a
  // phone number; do not fill this in from a third-party source such as
  // a maps listing (see DATA_MODEL.md's provenance rule).
  phone?: string;
  email?: string;
  address: {
    line1: string;
    municipality: string;
    province: ProvinceCode;
    // Optional because a clinic's own website does not always publish
    // one; do not fill this in from a third-party source (see
    // DATA_MODEL.md's provenance rule).
    postalCode?: string;
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
  checkedAt: string = DIRECTORY_SOURCE_CHECK_DATE,
): ListingSource => ({
  id,
  label,
  sourceType: "clinic_website",
  url,
  checkedAt,
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
  {
    slug: "simply-mri-toronto",
    name: "Simply MRI",
    websiteUrl: "https://simplymri.com/",
    email: "info@simplymri.com",
    address: {
      line1: "2888 Bathurst St.",
      municipality: "Toronto",
      province: "ON",
      postalCode: "M6B 4H6",
    },
    services: [
      {
        slug: "mri",
        name: "MRI",
        referralRequirement: "not_required",
        referralNote:
          "The clinic's FAQ says it is a private screening service and you can book directly without a physician referral.",
        sourceId: "simply-mri-faq",
      },
    ],
    verificationStatus: "verified",
    lastVerifiedAt: TORONTO_SOURCE_CHECK_DATE,
    sources: [
      checkedSource(
        "simply-mri-services",
        "Simply MRI service and pricing information",
        "https://simplymri.com/",
        TORONTO_SOURCE_CHECK_DATE,
      ),
      checkedSource(
        "simply-mri-faq",
        "Simply MRI referral FAQ",
        "https://simplymri.com/faq",
        TORONTO_SOURCE_CHECK_DATE,
      ),
    ],
  },
  {
    slug: "toronto-ultrasound-imaging",
    name: "Toronto Ultrasound Imaging",
    websiteUrl: "https://torontoultrasound.ca/",
    phone: "416-921-1333",
    address: {
      line1: "180 Bloor Street West, Suite 204",
      municipality: "Toronto",
      province: "ON",
      // No postal code: not published anywhere on the clinic's own site.
    },
    services: [
      {
        slug: "ultrasound",
        name: "Ultrasound",
        referralRequirement: "required",
        referralNote:
          "The clinic says appointments are scheduled with a valid medical requisition, and patients should bring the original requisition form.",
        sourceId: "toronto-ultrasound-imaging-booking",
      },
    ],
    verificationStatus: "verified",
    lastVerifiedAt: TORONTO_SOURCE_CHECK_DATE,
    sources: [
      checkedSource(
        "toronto-ultrasound-imaging-booking",
        "Toronto Ultrasound Imaging booking and requisition information",
        "https://torontoultrasound.ca/",
        TORONTO_SOURCE_CHECK_DATE,
      ),
    ],
  },
  {
    slug: "radiant-medical-imaging-scarborough",
    name: "Radiant Medical Imaging",
    websiteUrl: "https://radiantmedicalimaging.com/",
    phone: "416-321-9243",
    address: {
      line1: "385 Silver Star Blvd, Suite 212",
      municipality: "Scarborough",
      province: "ON",
      postalCode: "M1V 0E3",
    },
    services: [
      {
        slug: "ultrasound",
        name: "Ultrasound",
        referralRequirement: "unknown",
        referralNote:
          "The clinic's website says it accepts requisition forms but does not state whether one is required to book a general ultrasound; confirm directly.",
        sourceId: "radiant-medical-imaging-services",
      },
    ],
    verificationStatus: "verified",
    lastVerifiedAt: TORONTO_SOURCE_CHECK_DATE,
    sources: [
      checkedSource(
        "radiant-medical-imaging-services",
        "Radiant Medical Imaging services and location information",
        "https://radiantmedicalimaging.com/",
        TORONTO_SOURCE_CHECK_DATE,
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
