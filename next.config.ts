import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      // Google Drive direct-link viewer
      {
        protocol: "https",
        hostname: "drive.google.com",
      },
      // Google Drive CDN (lh3 links from sharing)
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;
