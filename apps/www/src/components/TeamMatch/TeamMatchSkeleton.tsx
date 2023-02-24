import Card, { ICardProps } from 'src/components/Card/Card'
import cx from 'classnames'

export const TeamMatchSkeleton: React.FC<ICardProps> = ({
  className,
  ...restProps
}) => {
  return (
    <Card
      title="Jogo"
      className={cx('animate-pulse', className)}
      {...restProps}
    >
      <Card.Content>
        <Card.Header.Skeleton />
      </Card.Content>
      <Card.Content className="flex gap-4 items-center justify-between">
        {[...Array(2)].map((_, index) => (
          <div
            key={index}
            className="bg-slate-200 rounded-md flex-1 aspect-square"
          ></div>
        ))}
      </Card.Content>
    </Card>
  )
}
