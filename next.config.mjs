/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  experimental: {},
  serverExternalPackages: ["ts3-nodejs-library", "ssh2"],
};

export default nextConfig;
