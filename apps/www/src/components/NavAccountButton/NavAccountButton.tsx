import Link from '@app/link'

const NavAccountButton: React.FC = () => {
  return (
    <Link href={{ pathname: '/api/auth/signin' }}>
      <a className="text-white hidden lg:block">
        <span>Cadastre-se / Login</span>
      </a>
    </Link>
  )
}

export default NavAccountButton
