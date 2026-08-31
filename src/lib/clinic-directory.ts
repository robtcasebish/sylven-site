import type { ProvinceCode } from "@/lib/geography";

export const DIRECTORY_SOURCE_CHECK_DATE = "2026-07-19";
// Second sourcing batch, added when the Toronto region was researched.
export const TORONTO_SOURCE_CHECK_DATE = "2026-08-30";
// Third sourcing batch, added when Calgary and Edmonton (Alberta) were researched.
export const ALBERTA_SOURCE_CHECK_DATE = "2026-08-30";
// Fourth sourcing batch, added when Regina and Saskatoon (Saskatchewan) were researched.
export const SASKATCHEWAN_SOURCE_CHECK_DATE = "2026-08-31";
// Fifth sourcing batch, added when Halifax (Nova Scotia) was researched.
export const NOVA_SCOTIA_SOURCE_CHECK_DATE = "2026-08-31";
// Sixth sourcing batch, added when Moncton (New Brunswick) was researched.
export const NEW_BRUNSWICK_SOURCE_CHECK_DATE = "2026-08-31";
// Seventh sourcing batch, added when Summerside (Prince Edward Island) was researched.
export const PEI_SOURCE_CHECK_DATE = "2026-08-31";

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
  {
    slug: "mayfair-diagnostics-calgary",
    name: "Mayfair Diagnostics, Mayfair Place",
    websiteUrl: "https://www.radiology.ca/",
    phone: "403-777-4674",
    address: {
      line1: "132, 6707 Elbow Dr SW",
      municipality: "Calgary",
      province: "AB",
      // No postal code: not published on the clinic's own site or clinic list PDF.
    },
    services: [
      {
        slug: "mri",
        name: "MRI",
        referralRequirement: "required",
        referralNote:
          "The clinic's MRI page says an MRI must be requested by a health care practitioner.",
        sourceId: "mayfair-mri-services",
      },
    ],
    verificationStatus: "verified",
    lastVerifiedAt: ALBERTA_SOURCE_CHECK_DATE,
    sources: [
      checkedSource(
        "mayfair-mri-services",
        "Mayfair Diagnostics MRI service information",
        "https://www.radiology.ca/services/magnetic-resonance-imaging-mri/",
        ALBERTA_SOURCE_CHECK_DATE,
      ),
      checkedSource(
        "mayfair-clinic-list",
        "Mayfair Diagnostics clinic and services list",
        "https://www.radiology.ca/wp-content/uploads/2024/02/Mayfair-Diagnostics-Clinic-and-Services-List.pdf",
        ALBERTA_SOURCE_CHECK_DATE,
      ),
    ],
  },
  {
    slug: "mic-medical-imaging-century-park",
    name: "MIC Medical Imaging, Century Park",
    websiteUrl: "https://www.mic.ca/",
    phone: "780-450-1500",
    address: {
      line1: "#201, 2377 - 111 Street NW",
      municipality: "Edmonton",
      province: "AB",
      // No postal code: not published on the clinic's own site.
    },
    services: [
      {
        slug: "mri",
        name: "MRI",
        referralRequirement: "required",
        referralNote:
          "Alberta now allows self-referred, self-paid diagnostic imaging, but MIC's own site says it is 'not offering preventative health testing without a requisition at this time', so a requisition is still required here.",
        sourceId: "mic-self-referral-policy",
      },
    ],
    verificationStatus: "verified",
    lastVerifiedAt: ALBERTA_SOURCE_CHECK_DATE,
    sources: [
      checkedSource(
        "mic-private-mri",
        "MIC Medical Imaging private MRI locations",
        "https://www.mic.ca/for-patients/procedure-information/mri-magnetic-resonance-imaging/private-mri-edmonton/",
        ALBERTA_SOURCE_CHECK_DATE,
      ),
      checkedSource(
        "mic-self-referral-policy",
        "MIC Medical Imaging self-referral policy",
        "https://www.mic.ca/self-referral-for-pht-services/",
        ALBERTA_SOURCE_CHECK_DATE,
      ),
    ],
  },
  {
    slug: "wosler-diagnostics-calgary",
    name: "Wosler Diagnostics",
    websiteUrl: "https://wosler.ca/",
    phone: "1-844-967-5352",
    address: {
      line1: "Suite 260, 8500 Blackfoot Trail SE",
      municipality: "Calgary",
      province: "AB",
      postalCode: "T2J 7E1",
    },
    services: [
      {
        slug: "ultrasound",
        name: "Ultrasound",
        referralRequirement: "required",
        referralNote:
          "The clinic's FAQ says a valid requisition from a physician, nurse practitioner, or other authorized healthcare provider is required for all diagnostic imaging exams.",
        sourceId: "wosler-faq",
      },
    ],
    verificationStatus: "verified",
    lastVerifiedAt: ALBERTA_SOURCE_CHECK_DATE,
    sources: [
      checkedSource(
        "wosler-contact",
        "Wosler Diagnostics contact and address information",
        "https://wosler.ca/contact/",
        ALBERTA_SOURCE_CHECK_DATE,
      ),
      checkedSource(
        "wosler-faq",
        "Wosler Diagnostics FAQ",
        "https://wosler.ca/faq/",
        ALBERTA_SOURCE_CHECK_DATE,
      ),
    ],
  },
  {
    slug: "open-skies-mri-regina",
    name: "Open Skies MRI Diagnostics",
    websiteUrl: "https://openskies.ca/",
    phone: "306-352-6736",
    address: {
      line1: "1-2727 Parliament Avenue",
      municipality: "Regina",
      province: "SK",
      postalCode: "S4S 6X5",
    },
    services: [
      {
        slug: "mri",
        name: "MRI",
        referralRequirement: "required",
        referralNote:
          "The clinic's FAQ says a requisition must be sent to their office before an appointment can be scheduled.",
        sourceId: "open-skies-faq",
      },
    ],
    verificationStatus: "verified",
    lastVerifiedAt: SASKATCHEWAN_SOURCE_CHECK_DATE,
    sources: [
      checkedSource(
        "open-skies-home",
        "Open Skies MRI Diagnostics service and contact information",
        "https://openskies.ca/",
        SASKATCHEWAN_SOURCE_CHECK_DATE,
      ),
      checkedSource(
        "open-skies-faq",
        "Open Skies MRI Diagnostics FAQ",
        "https://openskies.ca/faq",
        SASKATCHEWAN_SOURCE_CHECK_DATE,
      ),
    ],
  },
  {
    slug: "saskatoon-medical-imaging-centre-mall",
    name: "Saskatoon Medical Imaging, Centre Mall",
    websiteUrl: "https://www.saskatoonmedicalimaging.ca/",
    phone: "306-477-1000",
    address: {
      line1: "C1 3510 8th Street East",
      municipality: "Saskatoon",
      province: "SK",
      postalCode: "S7H 0W6",
    },
    services: [
      {
        slug: "mri",
        name: "MRI",
        referralRequirement: "required",
        referralNote:
          "The clinic's booking process page says your doctor fills out a requisition form that serves as your referral to the clinic.",
        sourceId: "smi-process",
      },
      {
        slug: "ultrasound",
        name: "Ultrasound",
        referralRequirement: "required",
        referralNote:
          "The clinic's booking process page says your doctor fills out a requisition form that serves as your referral to the clinic.",
        sourceId: "smi-process",
      },
    ],
    verificationStatus: "verified",
    lastVerifiedAt: SASKATCHEWAN_SOURCE_CHECK_DATE,
    sources: [
      checkedSource(
        "smi-locations",
        "Saskatoon Medical Imaging locations and services",
        "https://www.saskatoonmedicalimaging.ca/",
        SASKATCHEWAN_SOURCE_CHECK_DATE,
      ),
      checkedSource(
        "smi-process",
        "Saskatoon Medical Imaging booking process",
        "https://www.saskatoonmedicalimaging.ca/our-process",
        SASKATCHEWAN_SOURCE_CHECK_DATE,
      ),
    ],
  },
  {
    slug: "healthview-medical-imaging-halifax",
    name: "HealthView Medical Imaging",
    websiteUrl: "https://healthviewimaging.ca/",
    phone: "902-443-9922",
    address: {
      line1: "255 Lacewood Drive, Suite 100A",
      municipality: "Halifax",
      province: "NS",
      postalCode: "B3M 4G2",
    },
    services: [
      {
        slug: "mri",
        name: "MRI",
        referralRequirement: "required",
        referralNote:
          "The clinic's MRI FAQ says all Healthview scans require a referral from your healthcare provider.",
        sourceId: "healthview-mri-faq",
      },
      {
        slug: "ultrasound",
        name: "Ultrasound",
        referralRequirement: "required",
        referralNote:
          "The clinic's MRI FAQ says all Healthview scans require a referral from your healthcare provider.",
        sourceId: "healthview-mri-faq",
      },
    ],
    verificationStatus: "verified",
    lastVerifiedAt: NOVA_SCOTIA_SOURCE_CHECK_DATE,
    sources: [
      checkedSource(
        "healthview-home",
        "Healthview Medical Imaging service information",
        "https://healthviewimaging.ca/",
        NOVA_SCOTIA_SOURCE_CHECK_DATE,
      ),
      checkedSource(
        "healthview-mri-faq",
        "Healthview Medical Imaging MRI FAQ",
        "https://healthviewimaging.ca/index.php/mri/faq/",
        NOVA_SCOTIA_SOURCE_CHECK_DATE,
      ),
      checkedSource(
        "healthview-contact",
        "Healthview Medical Imaging contact information",
        "https://healthviewimaging.ca/index.php/contact/",
        NOVA_SCOTIA_SOURCE_CHECK_DATE,
      ),
    ],
  },
  {
    slug: "why-wait-imaging-halifax",
    name: "Why Wait Imaging",
    websiteUrl: "https://whywaitimaging.ca/",
    phone: "902-800-8727",
    address: {
      line1: "Suite 50, 6140 Young Street",
      municipality: "Halifax",
      province: "NS",
      postalCode: "B3K 0G2",
    },
    services: [
      {
        slug: "mri",
        name: "MRI",
        referralRequirement: "unknown",
        referralNote:
          "The clinic's site advertises same-day private-pay MRI but does not state whether a physician referral is required to book; confirm directly.",
        sourceId: "why-wait-services",
      },
      {
        slug: "ultrasound",
        name: "Ultrasound",
        referralRequirement: "unknown",
        referralNote:
          "The clinic's site advertises same-day private-pay ultrasound but does not state whether a physician referral is required to book; confirm directly.",
        sourceId: "why-wait-services",
      },
    ],
    verificationStatus: "verified",
    lastVerifiedAt: NOVA_SCOTIA_SOURCE_CHECK_DATE,
    sources: [
      checkedSource(
        "why-wait-services",
        "Why Wait Imaging services and contact information",
        "https://whywaitimaging.ca/services/",
        NOVA_SCOTIA_SOURCE_CHECK_DATE,
      ),
    ],
  },
  {
    slug: "wosler-diagnostics-sackville",
    name: "Wosler Diagnostics",
    websiteUrl: "https://wosler.ca/",
    phone: "902-593-4456",
    address: {
      line1: "159 Cobequid Road, Suite 203 Lower",
      municipality: "Sackville",
      province: "NS",
      postalCode: "B4C 2N1",
    },
    services: [
      {
        slug: "ultrasound",
        name: "Ultrasound",
        referralRequirement: "required",
        referralNote:
          "The clinic's FAQ says a valid requisition from a physician, nurse practitioner, or other authorized healthcare provider is required for all diagnostic imaging exams, and that this applies across the provinces it serves, including Nova Scotia.",
        sourceId: "wosler-halifax-location",
      },
    ],
    verificationStatus: "verified",
    lastVerifiedAt: NOVA_SCOTIA_SOURCE_CHECK_DATE,
    sources: [
      checkedSource(
        "wosler-halifax-location",
        "Wosler Diagnostics Halifax-area location and services",
        "https://radiology.wosler.ca/halifax",
        NOVA_SCOTIA_SOURCE_CHECK_DATE,
      ),
      checkedSource(
        "wosler-faq-ns",
        "Wosler Diagnostics FAQ",
        "https://wosler.ca/faq/",
        NOVA_SCOTIA_SOURCE_CHECK_DATE,
      ),
    ],
  },
  {
    slug: "irm-moncton-mri",
    name: "IRM Moncton MRI",
    websiteUrl: "https://monctonmri.com/",
    phone: "506-204-7040",
    address: {
      line1: "585 Mapleton Road, Suite 101",
      municipality: "Moncton",
      province: "NB",
      postalCode: "E1G 2K5",
    },
    services: [
      {
        slug: "mri",
        name: "MRI",
        referralRequirement: "required",
        referralNote:
          "The clinic's MRI FAQ says all MRI scans require a referral from your healthcare provider.",
        sourceId: "irm-moncton-mri-faq",
      },
      {
        slug: "ultrasound",
        name: "Ultrasound",
        referralRequirement: "required",
        referralNote:
          "The clinic's ultrasound FAQ says to bring your requisition, and that the sonographer can only scan the area indicated on the requisition from your doctor.",
        sourceId: "irm-moncton-ultrasound-faq",
      },
    ],
    verificationStatus: "verified",
    lastVerifiedAt: NEW_BRUNSWICK_SOURCE_CHECK_DATE,
    sources: [
      checkedSource(
        "irm-moncton-home",
        "IRM Moncton MRI service and contact information",
        "https://monctonmri.com/",
        NEW_BRUNSWICK_SOURCE_CHECK_DATE,
      ),
      checkedSource(
        "irm-moncton-mri-faq",
        "IRM Moncton MRI FAQ",
        "https://monctonmri.com/index.php/magnetic-resonance-imaging/faq/",
        NEW_BRUNSWICK_SOURCE_CHECK_DATE,
      ),
      checkedSource(
        "irm-moncton-ultrasound-faq",
        "IRM Moncton MRI ultrasound FAQ",
        "https://monctonmri.com/index.php/ultrasound/faq/",
        NEW_BRUNSWICK_SOURCE_CHECK_DATE,
      ),
    ],
  },
  {
    slug: "summerside-diagnostic-imaging-centre",
    name: "Summerside Diagnostic Imaging Centre",
    websiteUrl: "https://www.summersideimaging.com/",
    phone: "902-436-1119",
    email: "info@summersideimaging.com",
    address: {
      line1: "107 Walker Ave",
      municipality: "Summerside",
      province: "PE",
      // No postal code: not published on the clinic's own site.
    },
    services: [
      {
        slug: "mri",
        name: "MRI",
        referralRequirement: "unknown",
        // Ultrasound is intentionally not listed: the clinic's own site
        // describes it as "coming soon" and not yet available.
        referralNote:
          "The clinic's patient information page says it accepts referrals from a broad range of provider types and lists card payment as an accepted payment method, but does not state whether a referral is strictly required to book; confirm directly.",
        sourceId: "summerside-patient-info",
      },
    ],
    verificationStatus: "verified",
    lastVerifiedAt: PEI_SOURCE_CHECK_DATE,
    sources: [
      checkedSource(
        "summerside-home",
        "Summerside Diagnostic Imaging Centre service and contact information",
        "https://www.summersideimaging.com/",
        PEI_SOURCE_CHECK_DATE,
      ),
      checkedSource(
        "summerside-patient-info",
        "Summerside Diagnostic Imaging Centre patient information",
        "https://www.summersideimaging.com/patient-information/",
        PEI_SOURCE_CHECK_DATE,
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
