import Link from '@app/link'
import type { Url } from 'url'

export interface INavLinkProps {
  label: string
  href: Partial<Url>
}

const NavLink: React.FC<INavLinkProps> = ({ href, label }) => {
  return (
    <Link href={href}>
      <a className="text-white/80 hidden lg:block hover:text-white transition-all">
        <span>{label}</span>
      </a>
    </Link>
  )
}

export default NavLink
