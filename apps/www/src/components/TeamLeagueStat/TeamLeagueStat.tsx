import CardListSkeleton from 'src/components/CardListSkeleton/CardListSkeleton'
import useTeamContext from 'src/hooks/useTeamContext/useTeamContext'
import TeamLeagueStatContent from './TeamLeagueStatContent/TeamLeagueStatContent'

const TeamLeagueStat: React.FC = () => {
  const { summary, isLoadingTeamContext } = useTeamContext()

  if (isLoadingTeamContext) {
    return <CardListSkeleton title="Estatísticas da Temporada" />
  }

  if (
    !summary?.stats ||
    Object.keys(summary?.stats)?.length === 0 ||
    !summary?.competitions ||
    summary?.competitions?.length === 0
  ) {
    return <></>
  }

  return (
    <TeamLeagueStatContent
      stat={summary?.stats}
      competitions={summary?.competitions}
    />
  )
}

export default TeamLeagueStat
