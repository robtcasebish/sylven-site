import type { Metadata } from "next";
import type { ReactNode } from "react";

import {
  DevelopmentDataNotice,
  Footer,
  Header,
} from "@/components";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Sylven directory — development",
    template: "%s | Sylven directory",
  },
  description:
    "A non-production foundation for a Canadian private healthcare directory.",
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
