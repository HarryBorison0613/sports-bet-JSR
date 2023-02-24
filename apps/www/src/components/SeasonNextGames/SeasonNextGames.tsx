import useLeagueContext from 'src/hooks/useSeasonContext/useSeasonContext'
import MatchTable from 'src/components/MatchTable/MatchTable'

const SeasonNextGames: React.FC = () => {
  const { summary } = useLeagueContext()

  return (
    <MatchTable title="Próximos jogos" summaries={summary?.upcoming_events} />
  )
}

export default SeasonNextGames
