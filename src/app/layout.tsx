import type { Metadata } from "next";
import type { ReactNode } from "react";

import {
  DevelopmentDataNotice,
  Footer,
  Header,
} from "@/components";

import "./globals.css";

const siteUrl =
  process.env.URL ?? "https://sylven-directory-staging.netlify.app";

export const metadata: Metadata = {
  title: {
    default: "Sylven: Find private healthcare services in Canada",
    template: "%s | Sylven",
  },
  description:
    "A Canadian directory for discovering private healthcare services and contacting clinics you choose.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Sylven: Private care, made findable",
    description:
      "Discover private healthcare services with sourced, dated clinic information.",
    type: "website",
    locale: "en_CA",
    images: [
      {
        url: "/og.png",
        alt: "Sylven: Private care, made findable",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sylven: Private care, made findable",
    description:
      "Discover private healthcare services with sourced, dated clinic information.",
    images: ["/og.png"],
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en-CA">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <Header />
        <DevelopmentDataNotice />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
