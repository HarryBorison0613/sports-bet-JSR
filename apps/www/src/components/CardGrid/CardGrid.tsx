import cx from 'classnames'
import Card, { ICardProps } from '../Card/Card'
import CardGridItem, { ICardGridItemProps } from './CardGridItem'

export interface ICardGridProps extends ICardProps {
  loading?: boolean
  className?: string
  skeletonCount?: number
}

export type ICardGridComponentProps = React.FC<
  React.PropsWithChildren<ICardGridProps>
> & {
  Item: React.ForwardRefExoticComponent<
    ICardGridItemProps & React.RefAttributes<any>
  >
}

const CardGrid: ICardGridComponentProps = ({
  className,
  children,
  loading,
  skeletonCount,
  ...restProps
}) => {
  return (
    <Card {...restProps}>
      <div
        className={cx(
          'grid',
          {
            'animate-pulse': loading,
          },
          className
        )}
      >
        {loading ? (
          [...Array(10)].map((_, index) => (
            <CardGrid.Item key={index} loading={true} />
          ))
        ) : (
          <>{children}</>
        )}
      </div>
    </Card>
  )
}

CardGrid.Item = CardGridItem

CardGrid.defaultProps = {
  skeletonCount: 12,
}

export default CardGrid
