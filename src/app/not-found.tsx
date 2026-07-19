import Link from "next/link";

import { PageContainer } from "@/components";

export default function NotFound() {
  return (
    <section className="page-section">
      <PageContainer>
        <p className="eyebrow">404 · Page not found</p>
        <h1>This path is not in the directory.</h1>
        <p className="lede">
          The page may have moved, or the requested service or location is not
          part of the current Metro Vancouver pilot.
        </p>
        <Link className="button-link" href="/services">Browse pilot services</Link>
      </PageContainer>
    </section>
  );
}
