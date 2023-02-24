import Card, { ICardProps } from 'src/components/Card/Card'
import Skeleton from 'src/components/Skeleton/Skeleton'
import cx from 'classnames'

export const TeamInformationSkeleton: React.FC<ICardProps> = ({
  className,
  ...restProps
}) => (
  <Card
    title="Informações da Equipe"
    className={cx('animate-pulse', className)}
    {...restProps}
  >
    <Card.Content className="grid place-items-center py-4">
      <div className="w-[80px] aspect-square rounded-md bg-slate-200" />
    </Card.Content>
    <Card.Content>
      <Skeleton.List />
    </Card.Content>
  </Card>
)
