import Card from 'src/components/Card/Card'
import Skeleton from 'src/components/Skeleton/Skeleton'
import Progress from 'src/components/Progress/Progress'

export const SeasonMainContentSkeleton = () => (
  <Card className="animate-pulse">
    <Card.Content>
      <Card.Header.Skeleton />
      <Progress.Skeleton />
    </Card.Content>

    <Card.Content>
      <Skeleton.Description />
    </Card.Content>
  </Card>
)
