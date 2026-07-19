import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

const migration = readFileSync(
  resolve("supabase/migrations/202607190001_initial_directory.sql"),
  "utf8",
);

const protectedTables = [
  "services",
  "clinics",
  "locations",
  "clinic_services",
  "listing_verifications",
  "leads",
  "lead_consents",
];

describe("initial Supabase migration policy", () => {
  it("creates and enables RLS on every documented table", () => {
    for (const table of protectedTables) {
      expect(migration).toContain(`create table public.${table}`);
      expect(migration).toContain(`alter table public.${table} enable row level security`);
    }
  });

  it("exposes only the sanitized freshness-gated directory view", () => {
    expect(migration).toContain("create view public.public_clinic_directory");
    expect(migration).toContain("last_verified_at >= current_date - 180");
    expect(migration).toContain("grant select on public.public_clinic_directory to anon, authenticated");
    expect(migration).toContain("revoke all on table public.services, public.clinics");
  });

  it("binds every consent to one lead and one recipient clinic", () => {
    expect(migration).toContain("unique (lead_id, clinic_id)");
    expect(migration).toContain("consent_text_snapshot text not null");
    expect(migration).toContain("disclosure_purpose = 'clinic_inquiry'");
    expect(migration).toContain("Consent evidence is immutable");
    expect(migration).toContain("Consent service must match the lead service and recipient clinic");
    expect(migration).toContain("A lead cannot be delivered without recipient consent");
  });
});
