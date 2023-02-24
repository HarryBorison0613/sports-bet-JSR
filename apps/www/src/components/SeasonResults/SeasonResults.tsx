import MatchTable from 'src/components/MatchTable/MatchTable'
import useSeasonContext from 'src/hooks/useSeasonContext/useSeasonContext'

const SeasonResults: React.FC = () => {
  const { summary } = useSeasonContext()

  return <MatchTable title="Resultados" summaries={summary?.completed_events} />
}

export default SeasonResults
