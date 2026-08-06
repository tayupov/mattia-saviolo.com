import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Release cover art pulled from Spotify's CDN.
      { protocol: "https", hostname: "i.scdn.co" },
    ],
  },
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
