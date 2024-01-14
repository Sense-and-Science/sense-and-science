/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
      { protocol: 'https', hostname: 'ik.imagekit.io' },
    ],
  },
};

module.exports = nextConfig;
