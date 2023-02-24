import Card, { ICardProps } from 'src/components/Card/Card'
import useCreateHref from 'src/hooks/useCreateHref/useCreateHref'
import useTeamContext from 'src/hooks/useTeamContext/useTeamContext'
import { TeamCompetitionsSkeleton } from './TeamCompetitionsSkeleton'

const TeamCompetitions: React.FC<ICardProps> = (props) => {
  const { isLoadingTeamContext, summary } = useTeamContext()

  const { query } = useCreateHref()

  if (isLoadingTeamContext) {
    return <TeamCompetitionsSkeleton {...props} />
  }

  if (!summary?.competitions) {
    return <></>
  }

  return (
    <Card title="Competições" {...props}>
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
        {summary?.competitions?.map((comp) => (
          <Card.Content
            key={comp?.league_id}
            className="border-r border-b h-full"
          >
            <Card.Header
              size="small"
              title={comp?.name}
              titleHref={{
                pathname: '/[sport]/[category]/[league_id]/[season_slug]',
                query: {
                  sport: query?.sport,
                  category: comp?.country_info?.slug,
                  league_id: comp?.league_id,
                  season_slug: comp?.slug,
                },
              }}
              icon={comp?.icon}
              descriptionText={comp?.country_info?.name ?? comp?.category?.name}
            />
          </Card.Content>
        ))}
      </div>
    </Card>
  )
}

export default TeamCompetitions
