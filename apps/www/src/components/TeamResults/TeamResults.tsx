import useTeamContext from 'src/hooks/useTeamContext/useTeamContext'
import MatchTable from 'src/components/MatchTable/MatchTable'
import type { ICardProps } from 'src/components/Card/Card'

const TeamResults: React.FC<ICardProps> = (props) => {
  const { summary, isLoadingTeamContext } = useTeamContext()

  return (
    <MatchTable
      title="Resultados"
      summaries={summary?.completed_events}
      loading={isLoadingTeamContext}
      {...props}
    />
  )
}

export default TeamResults
