import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/cervi-risk",
        destination: "https://cervi-risk.vercel.app",
        permanent: false,
      },
      {
        source: "/cervi-risk/:path*",
        destination: "https://cervi-risk.vercel.app/:path*",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
