const { i18n } = require("./next-i18next.config.js");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  redirects: async () => {
    return [
      {
        source: "/projects",
        destination: "/projects/store-finder",
        permanent: false,
      },
    ];
  },
  i18n,
};

module.exports = nextConfig;
