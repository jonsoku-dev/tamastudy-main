//@ts-check
const path = require('path');
const runtimeCaching = require('next-pwa/cache');
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  runtimeCaching,
  buildExcludes: [/middleware-manifest.json$/],
  disable: process.env.NODE_ENV === 'development',
});
const { createSecureHeaders } = require('next-secure-headers');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withNx } = require('@nrwl/next/plugins/with-nx');

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  output: 'standalone',
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  headers: async () => {
    return [{ source: '/(.*)', headers: createSecureHeaders() }];
  },
  // proxy !!!!!!!!
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:slug*",
  //       destination: "http://localhost:8080/:slug*",
  //     },
  //   ];
  // },
  experimental: {
    appDir: false,
    // this includes files from the monorepo base two directories up
    // outputFileTracingRoot: path.join(__dirname, '../../'),
  },
  reactStrictMode: true,
};

module.exports = withNx(withPWA(nextConfig));
