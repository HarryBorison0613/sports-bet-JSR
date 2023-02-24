import type { GetStaticProps, GetStaticPaths } from 'next'
import SeasonLiveMatches from 'src/components/SeasonLiveMatches/SeasonLiveMatches'
import SeasonMainContent from 'src/components/SeasonMainContent/SeasonMainContent'
import SeasonNextGames from 'src/components/SeasonNextGames/SeasonNextGames'
import SeasonResults from 'src/components/SeasonResults/SeasonResults'
import SeasonLayout from 'src/layouts/SeasonLayout/SeasonLayout'
import { PrerenderRepository } from 'src/repositories/prerender-repository'
import { withDefaultISRConfig, withSportsPathStaticProps } from 'src/utils/isr'
import { generateCanonicalUrl } from 'src/utils/url'

const SeasonPage: React.FC = () => {
  return (
    <>
      <SeasonMainContent />
      <SeasonLiveMatches />
      <SeasonResults />
      <SeasonNextGames />
    </>
  )
}

;(SeasonPage as any).Layout = SeasonLayout

export default SeasonPage

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: 'blocking',
    paths: [], // Always use ISR
  }
}

export const getStaticProps: GetStaticProps = withSportsPathStaticProps(
  async (ctx) => {
    // Prerender repository instance
    const preRenderRepo = new PrerenderRepository(false)

    // Extract params
    const { sport, season_id } = ctx?.params as any

    // // Parse season summary
    const initSeasonSummary = await preRenderRepo.seasonSummary(
      sport,
      season_id
    )

    // Canonical url
    const canonical = generateCanonicalUrl(
      `/{sport}/{category}/{league_id}/{season_slug}/{season_id}`,
      ctx?.params
    )

    return withDefaultISRConfig({
      props: {
        seo: {
          // https://github.com/bets-com-br/bets-com/issues/203
          title: `${initSeasonSummary?.sport_event_context?.season?.name}`,
          titleTemplate: `%s placar ao vivo, notícias, estatísticas, partidas e resultados - ${sport} - Bets.com.br`,
          description: `${initSeasonSummary?.season_summary_text}`,
          canonical,
        },
        //  initSeasonSummary,
      },
    })
  }
)
