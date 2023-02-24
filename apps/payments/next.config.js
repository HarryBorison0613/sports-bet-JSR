/* @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  images: {
    loader: 'akamai',
    path: '',
  },

  basePath: '/conta/pagamentos',
  // assetPrefix: '/conta/pagamentos',
})
