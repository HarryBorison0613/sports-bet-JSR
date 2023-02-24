import type { GetStaticPaths } from 'next'
import { PrerenderRepository } from 'src/repositories/prerender-repository'
import { withDefaultISRConfig, withSportsPathStaticProps } from 'src/utils/isr'
import { generateCanonicalUrl } from 'src/utils/url'
import dynamic from 'next/dynamic'
import SportCategoryLayout from 'src/layouts/SportCategoryLayout/SportCategoryLayout'

const SportCategoryDetails = dynamic(
  () => import('src/components/SportCategoryDetails/SportCategoryDetails'),
  { ssr: true }
)

const HotNews = dynamic(() => import('src/components/HotNews/HotNews'), {
  ssr: false,
})

const RealtimeTweets = dynamic(
  () => import('src/components/RealtimeTweets/RealtimeTweets'),
  { ssr: false }
)

const SportByCategoryPage: React.FC = () => {
  return (
    <>
      <SportCategoryDetails />
      <HotNews />
      <RealtimeTweets />
    </>
  )
}

;(SportByCategoryPage as any).Layout = SportCategoryLayout

export default SportByCategoryPage

/**
 * All paths
 * @returns
 */
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: 'blocking',
    paths: [],
  }
}

/**
 * Render page content
 * @param ctx
 * @returns
 */
export const getStaticProps = withSportsPathStaticProps(async (ctx) => {
  // Extract variables
  const { sport, category, league_id } = ctx?.params as any

  // // Pre-render repo
  const prerenderRepo = new PrerenderRepository(false)

  // Fetch league summary
  const initLeagueSummary = await prerenderRepo.leagueSummary(
    sport,
    category,
    league_id
  )

  // Canonical url
  const canonical = generateCanonicalUrl(
    `/{sport}/{category}/{league_id}`,
    ctx?.params
  )

  return withDefaultISRConfig({
    props: {
      seo: {
        title: `${initLeagueSummary?.league?.name}`,
        titleTemplate: `%s | ${sport} Resultados ao vivo | Bets.com.br`,
        description: `${initLeagueSummary?.summary_text}`,
        canonical,
      },
      // initLeagueSummary,
    },
  })
})
