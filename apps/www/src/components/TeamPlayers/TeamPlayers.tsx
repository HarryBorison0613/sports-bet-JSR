import useTeamContext from 'src/hooks/useTeamContext/useTeamContext'
import { TeamPlayersSkeleton } from './TeamPlayersSkeleton'
import { TeamPlayersContent } from './TeamPlayersContent'

const TeamPlayers: React.FC = () => {
  const { isLoadingTeamContext, profile } = useTeamContext()

  // Loading State
  if (isLoadingTeamContext) {
    return <TeamPlayersSkeleton />
  }

  // Empty
  if (!profile?.players) {
    return <></>
  }

  return <TeamPlayersContent profile={profile} />
}

export default TeamPlayers
