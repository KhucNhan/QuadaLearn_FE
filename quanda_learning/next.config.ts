import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true, // bỏ lỗi eslint khi build
  },
  reactStrictMode: true,
};

export default nextConfig;
