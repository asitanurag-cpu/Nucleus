import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/playbooks",
        destination: "/library",
        permanent: true,
      },
      {
        source: "/playbooks/:slug",
        destination: "/library/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
