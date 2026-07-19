import { PageContainer } from "@/components/page-container";

export function DevelopmentDataNotice() {
  return (
    <aside className="development-notice" aria-label="Development status">
      <PageContainer>
        <strong>Non-production scaffold.</strong>{" "}
        <span>
          No live clinic inventory, medical assessment, inquiry processing, or
          patient service is available here.
        </span>
      </PageContainer>
    </aside>
  );
}
