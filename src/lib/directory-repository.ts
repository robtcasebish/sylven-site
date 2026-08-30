import {
  clinicListings,
  getClinicListing as getFixtureClinic,
  getPublishedClinicListings as getFixtureClinics,
  type ClinicListing,
  type ClinicServiceListing,
  type ListingSource,
} from "@/lib/clinic-directory";
import type { ProvinceCode } from "@/lib/geography";

type PublicDirectoryRow = {
  clinic_slug: string;
  clinic_name: string;
  website_url: string;
  clinic_phone: string;
  address_line_1: string;
  municipality: string;
  province_code: ProvinceCode;
  postal_code: string;
  service_slug: "mri" | "ultrasound";
  service_name: "MRI" | "Ultrasound";
  referral_requirement: ClinicServiceListing["referralRequirement"];
  referral_notes: string;
  clinic_source_type: "clinic_website";
  clinic_source_url: string;
  clinic_source_label: string;
  clinic_source_checked_at: string;
  location_source_type: "clinic_website";
  location_source_url: string;
  location_source_label: string;
  location_source_checked_at: string;
  service_source_type: "clinic_website";
  service_source_url: string;
  service_source_label: string;
  service_source_checked_at: string;
  last_verified_at: string;
  verification_status: "verified";
};

function getSupabaseConfiguration() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return url && anonKey ? { url, anonKey } : undefined;
}

function rowsToClinics(rows: PublicDirectoryRow[]): ClinicListing[] {
  const clinics = new Map<string, ClinicListing>();

  for (const row of rows) {
    const sourceId = `${row.clinic_slug}-${row.service_slug}`;
    const rowSources: ListingSource[] = [
      {
        id: `${row.clinic_slug}-clinic`,
        label: row.clinic_source_label,
        sourceType: row.clinic_source_type,
        url: row.clinic_source_url,
        checkedAt: row.clinic_source_checked_at,
      },
      {
        id: `${row.clinic_slug}-location`,
        label: row.location_source_label,
        sourceType: row.location_source_type,
        url: row.location_source_url,
        checkedAt: row.location_source_checked_at,
      },
      {
        id: sourceId,
        label: row.service_source_label,
        sourceType: row.service_source_type,
        url: row.service_source_url,
        checkedAt: row.service_source_checked_at,
      },
    ];
    const service: ClinicServiceListing = {
      slug: row.service_slug,
      name: row.service_name,
      referralRequirement: row.referral_requirement,
      referralNote: row.referral_notes,
      sourceId,
    };
    const existing = clinics.get(row.clinic_slug);

    if (existing) {
      existing.services.push(service);
      for (const source of rowSources) {
        if (!existing.sources.some((item) => item.url === source.url)) {
          existing.sources.push(source);
        }
      }
      continue;
    }

    clinics.set(row.clinic_slug, {
      slug: row.clinic_slug,
      name: row.clinic_name,
      websiteUrl: row.website_url,
      phone: row.clinic_phone,
      address: {
        line1: row.address_line_1,
        municipality: row.municipality,
        province: row.province_code,
        postalCode: row.postal_code,
      },
      services: [service],
      verificationStatus: row.verification_status,
      lastVerifiedAt: row.last_verified_at,
      sources: rowSources.filter(
        (source, index, sources) =>
          sources.findIndex((item) => item.url === source.url) === index,
      ),
    });
  }

  return [...clinics.values()];
}

async function getSupabaseClinics() {
  const configuration = getSupabaseConfiguration();
  if (!configuration) return undefined;

  const response = await fetch(
    `${configuration.url}/rest/v1/public_clinic_directory?select=*&order=clinic_name.asc,service_name.asc`,
    {
      headers: {
        apikey: configuration.anonKey,
        Authorization: `Bearer ${configuration.anonKey}`,
      },
      next: { revalidate: 3600 },
    },
  );

  if (!response.ok) {
    throw new Error("The directory data source is temporarily unavailable.");
  }

  return rowsToClinics((await response.json()) as PublicDirectoryRow[]);
}

export async function listClinics(serviceSlug?: string, communities?: readonly string[]) {
  const supabaseClinics = await getSupabaseClinics();
  let clinics = supabaseClinics ?? getFixtureClinics();

  if (serviceSlug) {
    clinics = clinics.filter((clinic) =>
      clinic.services.some((service) => service.slug === serviceSlug),
    );
  }

  if (communities) {
    const normalized = communities.map((community) => community.toLowerCase());
    clinics = clinics.filter((clinic) =>
      normalized.includes(clinic.address.municipality.toLowerCase()),
    );
  }

  return clinics;
}

export async function findClinic(slug: string) {
  const supabaseClinics = await getSupabaseClinics();
  if (!supabaseClinics) return getFixtureClinic(slug);
  return supabaseClinics.find((clinic) => clinic.slug === slug);
}

export function getStaticClinicSlugs() {
  return clinicListings.map(({ slug }) => ({ clinicSlug: slug }));
}
