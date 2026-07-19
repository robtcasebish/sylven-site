import Link from "next/link";

import { PageContainer } from "@/components/page-container";

export function Footer() {
  return (
    <footer className="site-footer">
      <PageContainer className="site-footer__inner">
        <div>
          <p className="wordmark wordmark--footer">Sylven</p>
          <p className="site-footer__boundary">
            A directory in development. Sylven is not a healthcare provider or
            emergency service.
          </p>
        </div>
        <nav aria-label="Footer navigation">
          <ul className="footer-nav">
            <li>
              <Link href="/services">Services</Link>
            </li>
            <li>
              <Link href="/for-clinics">For clinics</Link>
            </li>
            <li>
              <Link href="/privacy">Privacy</Link>
            </li>
            <li>
              <Link href="/terms">Terms</Link>
            </li>
          </ul>
        </nav>
      </PageContainer>
    </footer>
  );
}
