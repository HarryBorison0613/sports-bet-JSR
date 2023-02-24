import withPlugins from 'next-compose-plugins'
import withPWA from 'next-pwa'

/**
 * Custom header management to not index preview deployments with custom domain.
 * @see https://github.com/vercel/vercel/discussions/5714#discussioncomment-2881015
 * @returns
 */
const headers = async () => {
  const headers = []

  if (process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production') {
    headers.push({
      headers: [
        {
          key: 'X-Robots-Tag',
          value: 'noindex',
        },
      ],
      source: '/:path*',
    })
  }

  return headers
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    defaultLocale: 'pt',
    locales: ['pt'],
  },
  pwa: {
    dest: 'public',
  },
  experimental: {
    images: {
      allowFutureImage: true,
    },
  },
  reactStrictMode: false,
  images: {
    domains: ['ghost.bets.com.br', 'pbs.twimg.com'],
    formats: ['image/webp'],
  },
  redirects: async () => [
    // {
    //   source: '/',
    //   destination: '/futebol/brasil/325',
    //   permanent: true,
    // },
  ],
  rewrites: async () => ({
    beforeFiles: [
      {
        source: '/',
        destination: '/futebol/brasil/325',
      },
      // {
      //   source: '/bets-termos',
      //   destination: 'https://stats.bets.com.br/bets-termos/',
      // },
      // {
      //   source: '/privacy',
      //   destination: 'https://stats.bets.com.br/privacy/',
      // },
      // {
      //   source: '/responsible',
      //   destination: 'https://stats.bets.com.br/responsible/',
      // },
      // {
      //   source: '/bonus',
      //   destination: 'https://stats.bets.com.br/bonus/',
      // },
      // {
      //   source: '/artigos/:path*',
      //   destination: 'https://blogs.bets.com.br/artigos/:path*',
      // },
      {
        source: '/artigos',
        destination: 'https://bets-blog.vercel.app/artigos',
      },
      {
        source: '/artigos/:path*',
        destination: `https://bets-blog.vercel.app/artigos/:path*`,
      },
      {
        source: '/conta/pagamentos',
        destination: 'https://bets-payments.vercel.app/conta/pagamentos',
      },
      {
        source: '/conta/pagamentos/:path*',
        destination: 'https://bets-payments.vercel.app/conta/pagamentos/:path*',
      },
    ],
  }),
  headers,
}

const plugins = []

if (process.env.NODE_ENV === 'production') {
  plugins.push(withPWA)
}

export default withPlugins(plugins, nextConfig)
