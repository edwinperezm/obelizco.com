/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Enables static exports for hosting on Netlify
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,  // Required for static exports
  },
  // Optional: Add basePath if you're deploying to a subdirectory
  // basePath: '/landing',
}

export default nextConfig
