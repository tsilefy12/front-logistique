/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/logistique",
  assetPrefix: "/logistique/",
  reactStrictMode: true,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  eslint:{
    ignoreDuringBuilds:true
  },
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };

    return config;
  },
};

module.exports = nextConfig
