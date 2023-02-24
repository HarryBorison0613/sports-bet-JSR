import cx from 'classnames'
import styles from './Container.module.css'

const Container: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
}) => {
  return <div className={cx(styles.base, className)}>{children}</div>
}

export default Container
