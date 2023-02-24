import cx from 'classnames'
import styles from './TabBarButton.module.css'
import Link from '@app/link'
import type { ParsedUrlQuery } from 'querystring'

export interface ITabBarButtonProps {
  label: string
  active?: boolean
  pathname: string
  asPath: string
  query: ParsedUrlQuery
  Icon: React.ElementType
}

const TabBarButton: React.FC<ITabBarButtonProps> = ({
  active,
  label,
  pathname,
  query,
  Icon,
}) => {
  return (
    <Link
      href={{
        pathname,
        query,
      }}
    >
      <a
        className={cx(styles.base, {
          [styles.active]: active,
        })}
        aria-label={label}
      >
        <Icon className="text-xl lg:hidden" />
        <span className="hidden lg:block">{label}</span>
      </a>
    </Link>
  )
}

export default TabBarButton
