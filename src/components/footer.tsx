import Link from "next/link";

import { PageContainer } from "@/components/page-container";

export function Footer() {
  return (
    <footer className="site-footer">
      <PageContainer className="site-footer__inner">
        <div className="site-footer__brand">
          <p className="wordmark wordmark--footer">Sylven</p>
          <p className="site-footer__boundary">
            A Canadian directory for discovering private healthcare services.
            Sylven is not a clinic, healthcare provider, or emergency service.
          </p>
        </div>
        <div className="footer-links">
          <nav aria-label="Directory navigation">
            <p className="footer-heading">Directory</p>
            <ul className="footer-nav">
              <li><Link href="/services">Browse services</Link></li>
              <li><Link href="/methodology">Listing methodology</Link></li>
              <li><Link href="/for-clinics">For clinics</Link></li>
            </ul>
          </nav>
          <nav aria-label="Legal navigation">
            <p className="footer-heading">Information</p>
            <ul className="footer-nav">
              <li><Link href="/privacy">Privacy</Link></li>
              <li><Link href="/terms">Terms</Link></li>
            </ul>
          </nav>
        </div>
        <p className="site-footer__meta">
          Metro Vancouver pilot · Built in Canada · Development preview
        </p>
      </PageContainer>
    </footer>
  );
}
