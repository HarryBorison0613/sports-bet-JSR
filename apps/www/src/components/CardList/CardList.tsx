import Card, { ICardProps } from 'src/components/Card/Card'
import CardListButton from 'src/components/CardListButton/CardListButton'
import styles from './CardList.module.css'

export interface ICardListProps extends ICardProps {
  title: string
  loading?: boolean
  skeletonCount?: number
  error?: boolean
  empty?: boolean
  className?: string
}

const CardList: React.FC<React.PropsWithChildren<ICardListProps>> = ({
  loading,
  skeletonCount,
  children,
  error,
  empty,
  ...restProps
}) => {
  return (
    <Card {...restProps}>
      {error && !loading && <div className={styles.error}>- Error -</div>}
      {empty && !loading && <div className={styles.error}>- No Data -</div>}
      {loading ? (
        <>
          {[...Array(skeletonCount)].map((_, index) => (
            <CardListButton key={index} loading={loading} />
          ))}
        </>
      ) : (
        <>{children}</>
      )}
    </Card>
  )
}

CardList.defaultProps = {
  skeletonCount: 6,
}

export default CardList
