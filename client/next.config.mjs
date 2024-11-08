/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["ipfs.io", "gateway.pinata.cloud","img.freepik.com"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
