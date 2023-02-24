import { GetStaticPaths, GetStaticProps } from 'next'
import TeamCompetitions from 'src/components/TeamCompetitions/TeamCompetitions'
import TeamInformation from 'src/components/TeamInformation/TeamInformation'
import TeamMainContent from 'src/components/TeamMainContent/TeamMainContent'
import TeamNextGames from 'src/components/TeamNextGames/TeamNextGames'
import TeamPlayers from 'src/components/TeamPlayers/TeamPlayers'
import TeamResults from 'src/components/TeamResults/TeamResults'
import TeamLayout from 'src/layouts/TeamLayout/TeamLayout'
import { PrerenderRepository } from 'src/repositories/prerender-repository'
import { withDefaultISRConfig, withSportsPathStaticProps } from 'src/utils/isr'
import TeamMatch from 'src/components/TeamMatch/TeamMatch'
import { generateCanonicalUrl } from 'src/utils/url'
import TeamLiveMatches from 'src/components/TeamLiveMatches/TeamLiveMatches'

const TeamPage: React.FC = () => {
  return (
    <>
      <TeamMainContent />

      <TeamInformation className="lg:hidden" />
      <TeamCompetitions className="lg:hidden" />
      <TeamMatch className="lg:hidden" />

      <TeamPlayers />

      <TeamLiveMatches />

      <TeamNextGames className="hidden lg:block" />
      <TeamResults className="hidden lg:block" />

      <TeamCompetitions className="hidden lg:block" />
    </>
  )
}

;(TeamPage as any).Layout = TeamLayout

export default TeamPage

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

    // Extract params
    const { sport, team_id } = ctx?.params as any

    // Pre-render paths
    const teamSummary = await prerenderRepo.teamSummary(sport, team_id)

    // Canonical url
    const canonical = generateCanonicalUrl(
      `/{sport}/{category}/{league_id}/{season_slug}/{season_id}/times/{team_slug}/{team_id}`,
      ctx?.params
    )

    return withDefaultISRConfig({
      props: {
        seo: {
          title: `${teamSummary?.profile?.competitor?.name}`,
          titleTemplate: `%s placar ao vivo, notícias, estatísticas, partidas e resultados - ${sport} - Bets.com.br`,
          description: `${teamSummary?.profile?.summary_text}`,
          canonical,
        },
      },
    })
  }
)
