import useClassificationContext from 'src/hooks/useClassificationContext/useClassificationContext'
import GameClassificationSkeleton from './GameClassificationSkeleton'
import { GameClassificationContent } from './GameClassificationContent'
import type { ICardProps } from 'src/components/Card/Card'

const GameClassification: React.FC<ICardProps> = (props) => {
  const { isLoading, activeSeasonStandingGroup } = useClassificationContext()

  // Loading state
  if (isLoading) {
    return <GameClassificationSkeleton {...props} />
  }

  // Empty state
  if (!activeSeasonStandingGroup) {
    return <></>
  }

  return <GameClassificationContent {...props} />
}

export default GameClassification
