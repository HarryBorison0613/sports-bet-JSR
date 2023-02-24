import site from './site.js'
import manifest from './public/manifest.json'

/** @type {import('next-seo').NextSeoProps} */
const config = {
  title: 'Bets',
  titleTemplate: '%s | Apostas Esportivas Profissionais - Bets.com.br',
  canonical: site.site_url,
  openGraph: {
    site_name: 'Bets.com.br',
    type: 'website',
    locale: 'pt_BR',
    images: [
      {
        url: 'https://bets-com-test.imgix.net/default-og.png?fit=fill&fill=blur&w=1200&h=630&auto=compress',
      },
    ],
  },
  twitter: {
    handle: '@betscombr',
    site: '@betscombr',
  },
  additionalMetaTags: [
    {
      name: 'application-name',
      content: manifest.name,
    },
    {
      name: 'apple-mobile-web-app-capable',
      content: 'yes',
    },
    {
      name: 'apple-mobile-web-app-status-bar-style',
      content: 'default',
    },
    {
      name: 'apple-mobile-web-app-title',
      content: manifest.name,
    },
    {
      name: 'description',
      content: 'Apostas Esportivas Profissionais - Bets.com.br',
    },
    {
      name: 'format-detection',
      content: 'telephone=no',
    },
    {
      name: 'mobile-web-app-capable',
      content: 'yes',
    },
    {
      name: 'msapplication-TileColor',
      content: manifest.theme_color,
    },
    {
      name: 'msapplication-tap-highlight',
      content: 'no',
    },
    {
      name: 'theme-color',
      content: manifest.theme_color,
    },
    {
      name: 'author',
      content: 'Bets.com.br LiveScore',
    },
  ],
  additionalLinkTags: [
    {
      rel: 'apple-touch-icon',
      href: '/icons/logo@512w.png',
    },
    {
      rel: 'apple-touch-icon',
      href: '/icons/logo@152w.png',
      sizes: '152x152',
    },
    {
      rel: 'apple-touch-icon',
      href: '/icons/logo@180w.png',
      sizes: '180x180',
    },
    {
      rel: 'apple-touch-icon',
      href: '/icons/logo@167w.png',
      sizes: '167x167',
    },

    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/icons/logo@32w.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/icons/logo@16w.png',
    },
    {
      rel: 'manifest',
      href: '/manifest.json',
    },
    {
      rel: 'shortcut icon',
      href: '/icons/logo@32w.png',
    },
  ],
}

export default config
