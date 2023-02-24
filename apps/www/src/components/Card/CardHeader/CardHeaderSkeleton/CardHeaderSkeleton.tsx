import styles from './CardHeaderSkeleton.module.css'

const CardHeaderSkeleton: React.FC = () => {
  return (
    <div className={styles.base}>
      <div className={styles.icon} />
      <div className={styles.header}>
        <div className={styles.title}></div>
        <div className={styles.description}></div>
      </div>
      <div></div>
    </div>
  )
}

export default CardHeaderSkeleton
