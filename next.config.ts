import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   productionBrowserSourceMaps: true,
  // or if you're debugging server
  experimental: {
    // Add supported experimental options here if needed
  },
};

export default nextConfig;
