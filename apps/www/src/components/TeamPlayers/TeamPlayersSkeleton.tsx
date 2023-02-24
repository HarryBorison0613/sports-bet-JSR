import Card from 'src/components/Card/Card'
import Skeleton from 'src/components/Skeleton/Skeleton'

export const TeamPlayersSkeleton = () => {
  return (
    <Card title="Jogadores" className="animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {[...Array(12)].map((_, index) => (
          <Skeleton.Profile key={index} />
        ))}
      </div>
    </Card>
  )
}
