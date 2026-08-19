import type { Metadata } from "next";
import { Anton, Epilogue } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SITE_URL, SITE_DESCRIPTION, SOCIAL_LINKS } from "@/lib/site";
import "./globals.css";

const anton = Anton({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
});

const epilogue = Epilogue({
  variable: "--font-body",
  subsets: ["latin"],
});

const TITLE = "Mattia Saviolo | Techno Producer, Mixing & Mastering Engineer";
const OG_IMAGE = "/brand/video-thumbnail.png";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Mattia Saviolo",
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "Mattia Saviolo",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: OG_IMAGE,
        width: 1500,
        height: 844,
        alt: "Mattia Saviolo in the studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Mattia Saviolo",
      description: SITE_DESCRIPTION,
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Mattia Saviolo",
      url: SITE_URL,
      image: `${SITE_URL}${OG_IMAGE}`,
      jobTitle: "Techno Producer, Mixing & Mastering Engineer",
      sameAs: SOCIAL_LINKS.map((link) => link.href),
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${epilogue.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
