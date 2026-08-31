import { PageContainer } from "@/components/page-container";

export function DevelopmentDataNotice() {
  return (
    <aside className="development-notice" aria-label="Development status">
      <PageContainer>
        <strong>Preview environment.</strong>{" "}
        <span>
          Pilot listing facts were source-checked for research and still need
          pre-production review. Inquiries are disabled. No medical service is provided here.
        </span>
      </PageContainer>
    </aside>
  );
}
