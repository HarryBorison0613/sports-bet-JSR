import Card from 'src/components/Card/Card'
import Skeleton from 'src/components/Skeleton/Skeleton'

export interface ICardListSkeletonProps {
  title: string
}

const CardListSkeleton: React.FC<ICardListSkeletonProps> = ({ title }) => {
  return (
    <Card title={title} className="animate-pulse">
      <Card.Content>
        <Skeleton.List />
      </Card.Content>
    </Card>
  )
}

export default CardListSkeleton
