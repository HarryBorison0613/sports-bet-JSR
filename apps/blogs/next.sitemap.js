// const siteUrl =
//   process.env.SITE_URL ||
//   (process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`) ||
//   "https://bets.com.br/artigos"

const siteUrl =
   "https://bets.com.br/artigos"

module.exports = {
  siteUrl: siteUrl,
  changefreq: "daily",
  generateRobotsTxt: true, // (optional)
  sitemapSize: 10000,
  // ...other options
  exclude: ["/api"],

  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/api",
      },
    ],
    
    additionalSitemaps: [
      `${siteUrl}/api/v1/sitemap-posts`,
      `${siteUrl}/api/v1/sitemap-tags`
    ],
  },
}
