import Card, { ICardProps } from 'src/components/Card/Card'
import Skeleton from 'src/components/Skeleton/Skeleton'
import cx from 'classnames'

const GameClassificationSkeleton: React.FC<ICardProps> = ({
  className,
  ...restProps
}) => {
  return (
    <Card
      title="Classificação"
      className={cx('animate-pulse', className)}
      {...restProps}
    >
      <Skeleton.List />
    </Card>
  )
}

export default GameClassificationSkeleton
