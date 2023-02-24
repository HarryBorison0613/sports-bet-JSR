import useTeamContext from 'src/hooks/useTeamContext/useTeamContext'
import { ICardProps } from 'src/components/Card/Card'
import MatchTable from 'src/components/MatchTable/MatchTable'

const TeamNextGames: React.FC<ICardProps> = (props) => {
  const { summary, isLoadingTeamContext } = useTeamContext()

  return (
    <MatchTable
      title="Próximos jogos"
      summaries={summary?.upcoming_events}
      loading={isLoadingTeamContext}
      {...props}
    />
  )
}

export default TeamNextGames
