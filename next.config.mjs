/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    WORKFLOW_BASE_URL: process.env.WORKFLOW_BASE_URL,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
