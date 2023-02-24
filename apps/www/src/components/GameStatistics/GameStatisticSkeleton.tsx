import Card from 'src/components/Card/Card'
import Skeleton from 'src/components/Skeleton/Skeleton'

export const GameStatisticSkeleton = () => (
  <Card title="Estatísticas" className="animate-pulse">
    <Skeleton.List />
  </Card>
)
