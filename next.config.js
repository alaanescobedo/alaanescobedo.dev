/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  redirects: async () => {
    return [
      {
        source: "/projects",
        destination: "/projects/store-finder",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
