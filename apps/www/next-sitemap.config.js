import site from './site.js'
import { PrerenderRepository } from './dist/prerender-repository/index.js'

/** @type {import('next-sitemap').IConfig['additionalPaths']} */
const additionalPaths = async (config) => {
  // PrerenderRepository instance
  const prerenderRepo = new PrerenderRepository(true)

  // Load all categories
  const categories = await prerenderRepo.getSportCategoryPaths()

  // Load all seasons
  const seasons = await prerenderRepo.getSeasonPaths()

  // // Load all teams
  // const teams = await prerenderRepo.getTeamPaths()

  return Promise.all([
    ...categories?.map((x) =>
      config.transform(
        config,
        `/${x?.params?.sport}/${x?.params?.category}/${x?.params?.league_id}`
      )
    ),
    ...seasons?.map((x) =>
      config.transform(
        config,
        `/${x?.params?.sport}/${x?.params?.category}/${x?.params?.league_id}/${x?.params?.season_slug}/${x?.params?.season_id}`
      )
    ),
    // ...teams?.map((x) =>
    //   config.transform(
    //     config,
    //     `/${x?.params?.sport}/${x?.params?.category}/${x?.params?.league_id}/${x?.params?.season_slug}/${x?.params?.season_slug}/times/${x?.params?.team_slug}/${x?.params?.team_id}`
    //   )
    // ),
  ])
}

/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: site.site_url,
  generateRobotsTxt: true, // (optional)
  // ...other options
  additionalPaths,
  robotsTxtOptions: {
    additionalSitemaps: ['https://www.bets.com.br/artigos/sitemap.xml'],
    policies: [
      {
        userAgent: 'Googlebot',
        allow: ['/'],
      },
      {
        userAgent: 'Googlebot-Image',
        allow: ['/'],
      },
      // {
      //   userAgent: '*',
      //   disallow: ['/'],
      // },
    ],
  },
}

export default config
