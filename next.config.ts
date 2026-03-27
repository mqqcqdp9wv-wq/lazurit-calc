import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? "/lazurit-calc" : "",
  assetPrefix: isProd ? "/lazurit-calc/" : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
