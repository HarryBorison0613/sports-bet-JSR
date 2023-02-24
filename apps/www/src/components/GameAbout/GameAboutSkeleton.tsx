import Card from 'src/components/Card/Card'
import Skeleton from 'src/components/Skeleton/Skeleton'

export const GameAboutSkeleton = () => (
  <Card title="Sobre o jogo" className="animate-pulse">
    <Card.Content>
      <Skeleton.Description />
    </Card.Content>
    <Card.Content>
      <Skeleton.Description />
    </Card.Content>
  </Card>
)
