import cx from 'classnames'
import styles from './CategoryDetailsList.module.css'

export interface ICategoryDetailsListProps {
  title?: string
  loading?: boolean
}

const CategoryDetailsList: React.FC<
  React.PropsWithChildren<ICategoryDetailsListProps>
> = ({ title, loading, children }) => {
  return (
    <section>
      {loading ? (
        <div className={styles['title-loading']}></div>
      ) : (
        <small className={styles.title}>{title}</small>
      )}

      <div
        className={cx(styles.list, {
          [styles['list-loading']]: loading,
        })}
      >
        {loading ? (
          <>
            {[...Array(6)].map((_, index) => (
              <div className={styles['item-loading']} key={index}></div>
            ))}
          </>
        ) : (
          <>{children}</>
        )}
      </div>
    </section>
  )
}

export default CategoryDetailsList
