import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The old Squarespace site's sitemap exposed /home as the homepage
      // URL (its canonical tag pointed to / instead). Redirect defensively
      // in case that URL got indexed or bookmarked anywhere.
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
