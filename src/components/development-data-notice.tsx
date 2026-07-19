import { PageContainer } from "@/components/page-container";

export function DevelopmentDataNotice() {
  return (
    <aside className="development-notice" aria-label="Development status">
      <PageContainer>
        <strong>Preview environment.</strong>{" "}
        <span>
          Clinic listings and inquiries are not live. No medical service is
          provided here.
        </span>
      </PageContainer>
    </aside>
  );
}
