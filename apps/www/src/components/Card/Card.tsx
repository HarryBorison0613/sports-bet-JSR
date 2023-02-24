import styles from './Card.module.css'
import cx from 'classnames'
import Image from '@app/image'
import CardContent, { ICardContentProps } from './CardContent/CardContent'
import CardDescription from './CardDescription/CardDescription'
import CardHeader, { ICardHeaderComponent } from './CardHeader/CardHeader'
import {
  CardLineItem,
  ICardLineItemComponent,
} from './CardLineItem/CardLineItem'

export interface ICardProps {
  title?: string
  titleIcon?: string
  className?: string
  viewMore?: boolean
  onClickViewMore?: () => void
  as?: any
  variant?: 'danger'
}

export type ICardComponent = React.FC<React.PropsWithChildren<ICardProps>> & {
  Content: React.FC<ICardContentProps>
  Description: React.FC<any>
  Header: ICardHeaderComponent
  LineItem: ICardLineItemComponent
}

const Card: ICardComponent = ({
  children,
  title,
  titleIcon,
  className,
  viewMore,
  onClickViewMore,
  as,
  variant,
}) => {
  const Tag = as ?? 'div'

  return (
    <Tag className={cx(styles.base, className)}>
      {title && (
        <div
          className={cx(styles.header, {
            '!bg-red-500 !text-white': variant === 'danger',
          })}
        >
          {titleIcon && (
            <Image src={titleIcon!} alt={title} width={24} height={24} />
          )}

          <h2
            className={cx(styles.title, {
              '!text-white': variant === 'danger',
            })}
          >
            {title}
          </h2>
        </div>
      )}

      {children}

      {viewMore && (
        <div className={styles['view-more']} onClick={onClickViewMore}>
          Veja Mais
        </div>
      )}
    </Tag>
  )
}

Card.Header = CardHeader
Card.Content = CardContent
Card.Description = CardDescription
Card.LineItem = CardLineItem

export default Card
