/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enable static export
  images: {
    unoptimized: true // Required for static export
  },
  trailingSlash: true // Helps with static export routing
};

export default nextConfig;