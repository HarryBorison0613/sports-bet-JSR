import GameMainContent from 'src/components/GameMainContent/GameMainContent'
import GameLayout from 'src/layouts/GameLayout/GameLayout'
import type { GetStaticPaths, GetStaticProps } from 'next'
import { withDefaultISRConfig, withSportsPathStaticProps } from 'src/utils/isr'
import { PrerenderRepository } from 'src/repositories/prerender-repository'
import type { IPageSEOProps } from 'src/interface'
import dynamic from 'next/dynamic'
import { generateCanonicalUrl } from 'src/utils/url'

// Dynamic import sports radar widget
const GameLiveWidget = dynamic(
  () => import('src/components/GameLiveWidget/GameLiveWidget'),
  {
    ssr: false,
  }
)

const GamePage: React.FC = () => {
  return (
    <>
      <GameMainContent />
      {/* <GameLiveTimeline /> */}
      <GameLiveWidget />
    </>
  )
}

;(GamePage as any).Layout = GameLayout

export default GamePage

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: 'blocking',
    paths: [], // Always use ISR,
  }
}

export const getStaticProps: GetStaticProps = withSportsPathStaticProps(
  async (ctx) => {
    // Create prerender repo instance
    const prerenderRepo = new PrerenderRepository(false)

    // Pre-render paths
    const gameSummary = await prerenderRepo.gameSummary(
      ctx?.params?.sport as string,
      ctx?.params?.game_id as string
    )

    // Extract variables
    const homeTeamName = gameSummary?.home_profile?.competitor?.name
    const awayTeamName = gameSummary?.away_profile?.competitor?.name
    const dateFormatted = gameSummary?.sport_event?.start_date_formatted

    // Canonical url
    const canonical = generateCanonicalUrl(
      `/{sport}/{category}/{league_id}/{season_slug}/{season_id}/jogos/{game_id}`,
      ctx?.params
    )

    // Create SEO Props
    const props: IPageSEOProps = {
      seo: {
        // https://github.com/bets-com-br/bets-com/issues/204
        title: `${homeTeamName} vs ${awayTeamName}`,
        titleTemplate: `%s placar ao vivo, H2H e escalações e Estatísticas da partida - ${dateFormatted} - Bets.com.br`,
        canonical,
      },
    }

    return withDefaultISRConfig({
      props,
    })
  }
)
