import Card from 'src/components/Card/Card'
import { GameStatisticSkeleton } from './GameStatisticSkeleton'
import GameStatisticItem from './GameStatisticItem'
import { useGameStatistics } from './hook'

const GameStatistics: React.FC = () => {
  const { isLoadingGameContext, homeStats, awayStats, t } = useGameStatistics()

  // Loading state
  if (isLoadingGameContext) {
    return <GameStatisticSkeleton />
  }

  // Empty
  if (!homeStats || Object.keys(homeStats)?.length === 0) {
    return <></>
  }

  return (
    <Card title="Estatísticas">
      {Object.keys(homeStats)?.map((key) => (
        <GameStatisticItem
          key={key}
          label={t(key) ?? key}
          homeScore={homeStats[key]}
          awayScore={awayStats[key]}
        />
      ))}
    </Card>
  )
}

export default GameStatistics
