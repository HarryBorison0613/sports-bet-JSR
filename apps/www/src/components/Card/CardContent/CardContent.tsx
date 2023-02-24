import styles from './CardContent.module.css'
import cx from 'classnames'

export type ICardContentProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

const CardContent: React.FC<ICardContentProps> = ({
  children,
  className,
  title,
}) => {
  return (
    <div className={cx(styles.base, className)} title={title}>
      {title && (
        <div className="text-primary-500 font-bold text-sm mb-2 first-letter:uppercase">
          {title}
        </div>
      )}

      {children}
    </div>
  )
}

export default CardContent
