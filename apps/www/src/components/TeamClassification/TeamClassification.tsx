import CardListSkeleton from 'src/components/CardListSkeleton/CardListSkeleton'
import useClassificationContext from 'src/hooks/useClassificationContext/useClassificationContext'
import { TeamClassificationContent } from './TeamClassificationContent'

const TeamClassification: React.FC = () => {
  const { isLoading, activeSeasonStandingGroup } = useClassificationContext()

  // Loading state
  if (isLoading) {
    return <CardListSkeleton title="Classificação" />
  }

  if (!activeSeasonStandingGroup?.standings) {
    return <></>
  }

  return (
    <TeamClassificationContent
      standings={activeSeasonStandingGroup?.standings}
    />
  )
}

export default TeamClassification
