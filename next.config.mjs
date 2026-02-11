/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  experimental: {},
  typescript: {
    ignoreBuildErrors: true,
  },
  serverExternalPackages: ["ts3-nodejs-library", "ssh2"],
};

export default nextConfig;
