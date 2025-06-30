/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://bp-golf-app-backend.vercel.app/api/:path*',
      },
    ];
  },
};
module.exports = nextConfig;