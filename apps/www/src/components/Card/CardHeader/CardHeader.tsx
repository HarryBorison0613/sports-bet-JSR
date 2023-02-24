import CardHeaderSkeleton from './CardHeaderSkeleton/CardHeaderSkeleton'
import styles from './CardHeader.module.css'
import Image from '@app/image'
import Link from '@app/link'
import cx from 'classnames'
import { Url } from 'url'
import React from 'react'

export interface ICardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  titleHref?: Partial<Url>
  icon?: string
  descriptionIcon?: string
  descriptionText?: React.ReactNode
  description?: React.ReactNode
  size?: 'small'
  titleClassName?: string
  descriptionClassName?: string
  as?: any
}

export type ICardHeaderComponent = React.FC<
  React.PropsWithChildren<ICardHeaderProps>
> & {
  Skeleton: React.FC
}

const getImageSize = (size?: any) => {
  switch (size) {
    case 'small':
      return 32
    default:
      return 56
  }
}

const CardHeader: ICardHeaderComponent = ({
  icon,
  title,
  descriptionIcon,
  descriptionText,
  description,
  titleHref,
  children,
  size,
  className,
  titleClassName,
  descriptionClassName,
  as,
  ...rest
}) => {
  const Tag = as ?? 'div'

  const TitleTag = size !== 'small' ? 'h1' : 'h2'

  const titleStyle = React.useMemo(
    () =>
      cx(styles.title, {
        [styles['title-link']]: Boolean(titleHref),
        [styles['title-small']]: size === 'small',
      }),
    [size, titleHref]
  )

  return (
    <Tag className={cx(styles.base, className)} {...rest} >
      {icon && (
        <Image
          className="max-h-[56px]"
          src={icon}
          alt={title}
          width={getImageSize(size)}
          height={getImageSize(size)}
          key={title}
        />
      )}

      <div className={styles.info}>
        {titleHref ? (
          <Link href={titleHref}>
            <a className={cx(titleStyle, titleClassName)} title={title}>
              <TitleTag>{title}</TitleTag>
            </a>
          </Link>
        ) : (
          <div className={cx(titleStyle, titleClassName)} title={title}>
            <TitleTag>{title}</TitleTag>
          </div>
        )}

        <div className={cx(styles.description, descriptionClassName)}>
          {descriptionIcon && (
            <Image src={descriptionIcon!} alt={title} width={18} height={18} key={title}/>
          )}

          {descriptionText && (
            <div className={cx(styles['description-text'])}>
              {descriptionText}
            </div>
          )}

          {description}
        </div>
      </div>

      {children}
    </Tag>
  )
}

CardHeader.Skeleton = CardHeaderSkeleton

export default CardHeader
