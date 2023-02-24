import { useMobileBottomNav } from 'src/hooks/useMobileBottomNav/useMobileBottomNav'
import type { Url } from 'url'
import Link from '@app/link'
import cx from 'classnames'

export interface IMobileBottomNavItem {
  label: string
  Icon: React.ElementType
  href: Partial<Url>
  active?: boolean
}

const MobileBottomNav: React.FC = () => {
  const { items } = useMobileBottomNav()

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-[72px] bg-white border-t z-[1000] shadow-lg flex items-start justify-between ">
      {items?.map((item) => (
        <Link key={item?.label} href={item?.href}>
          <a
            className={cx(
              'grid place-items-center gap-1 px-6 pt-2 text-slate-700',
              {
                '!text-primary-500': item?.active,
              }
            )}
          >
            <item.Icon className="text-2xl" />
            <span className="text-xs lowercase">{item?.label}</span>
          </a>
        </Link>
      ))}
    </nav>
  )
}

export default MobileBottomNav
