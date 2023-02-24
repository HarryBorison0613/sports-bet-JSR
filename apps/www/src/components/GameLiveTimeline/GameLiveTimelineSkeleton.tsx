import Card from 'src/components/Card/Card'
import Skeleton from 'src/components/Skeleton/Skeleton'

export const GameLiveTimelineSkeleton = () => (
  <Card>
    <Card.Content>
      <Skeleton.List />
    </Card.Content>
  </Card>
)
