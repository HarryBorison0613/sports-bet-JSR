import CardGrid from 'src/components/CardGrid/CardGrid'
import SeasonTeamsContent from './SeasonTeamsContent'
import useSeasonContext from 'src/hooks/useSeasonContext/useSeasonContext'

const SeasonTeams: React.FC = () => {
  const { isLoadingSeasonContext, teams } = useSeasonContext()

  // Loading State
  if (isLoadingSeasonContext) {
    return <CardGrid title="Equipes" className="grid-cols-3" loading={true} />
  }

  if (!teams || teams?.length === 0) {
    return <></>
  }

  return <SeasonTeamsContent teams={teams} />
}

export default SeasonTeams
