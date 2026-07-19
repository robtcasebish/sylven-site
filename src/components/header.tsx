import Link from "next/link";

import { PageContainer } from "@/components/page-container";

const navigation = [
  { href: "/services", label: "Services" },
  { href: "/for-clinics", label: "For clinics" },
  { href: "/privacy", label: "Privacy" },
];

export function Header() {
  return (
    <header className="site-header">
      <PageContainer className="site-header__inner">
        <Link className="wordmark" href="/" aria-label="Sylven home">
          Sylven
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
      </PageContainer>
    </header>
  );
}
