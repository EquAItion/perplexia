/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        hostname: 's2.googleusercontent.com',
      },
    ],
  },
  serverExternalPackages: ['pdf-parse'],
  experimental: {
    serverMinification: true,
  },
  env: {
    PORT: '8080',
  },
};

export default nextConfig;
