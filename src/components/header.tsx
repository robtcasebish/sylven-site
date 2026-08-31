import Link from "next/link";

import { PageContainer } from "@/components/page-container";

const navigation = [
  { href: "/services", label: "Browse services" },
  { href: "/methodology", label: "How listings work" },
  { href: "/for-clinics", label: "For clinics" },
];

export function Header() {
  return (
    <header className="site-header">
      <PageContainer className="site-header__inner">
        <Link className="brand" href="/" aria-label="Sylven directory home">
          <span className="brand__mark" aria-hidden="true">S</span>
          <span>
            <span className="wordmark">Sylven</span>
            <span className="brand__descriptor">Private care directory</span>
          </span>
        </Link>
        <nav aria-label="Primary navigation">
          <ul className="site-nav">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link className="header-cta" href="/services">
          Explore the pilot
        </Link>
      </PageContainer>
    </header>
  );
}
