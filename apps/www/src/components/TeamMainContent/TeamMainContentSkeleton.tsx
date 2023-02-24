import Card from 'src/components/Card/Card'
import Skeleton from 'src/components/Skeleton/Skeleton'

const TeamMainContentSkeleton: React.FC = () => {
  return (
    <Card className="animate-pulse">
      <Card.Content>
        <Card.Header.Skeleton />
      </Card.Content>
      <Card.Content>
        <Skeleton.Description />
      </Card.Content>
    </Card>
  )
}

export default TeamMainContentSkeleton
