import Container from 'src/components/Container/Container'
import Logo from 'src/components/Logo/Logo'
import NavLink, { INavLinkProps } from '../NavLink/NavLink'
import SportCategoriesMobile from '../SportCategoriesMobile/SportCategoriesMobile'
import styles from './Navbar.module.css'
import Link from '@app/link'

import useGlobalContext from 'src/hooks/useGlobalContext/useGlobalContext'
import { Logout } from '../Login/Login'

const navLinks: INavLinkProps[] = [
  {
    label: 'Cadastre-se',
    href: {
      //pathname: '/api/auth/sign',
      pathname: 'https://www.bets.com.br/conta/cadastro',
    },
  },
  {
    label: 'Login',
    href: {
      //pathname: '/api/auth/sign',
      pathname: 'https://pro.bets.com.br/',
      //pathname: '/conta',
    },
  },
  {
    label: 'Notícias',
    href: {
      pathname: '/artigos',
    },
  },
]

const Navbar: React.FC = () => {
  const { isLogin, dispatchUserInfo } = useGlobalContext()

  const handleLogout = (e: any) => {
    Logout()
    dispatchUserInfo({ type: 'resolved', data: { isLogin: false, data: null } })
  }

  return (
    <nav className={`${styles.base} relative z-100`}>
      <Container className={styles.container}>
        <div className="flex-1 grid grid-cols-3 items-center h">
          <div className="hidden lg:flex items-center gap-8">
            {isLogin ? (
              <>
                <Link href="/conta">
                  <p className="text-white/80 hidden lg:block hover:text-white transition-all cursor-pointer ml-10">
                    MyAccount
                  </p>
                </Link>
                <p
                  className="text-white/80 hidden lg:block hover:text-white transition-all cursor-pointer"
                  onClick={handleLogout}
                >
                  Log out
                </p>
              </>
            ) : (
              navLinks?.map((link, index) => <NavLink {...link} key={index} />)
            )}
          </div>

          <div className="flex w-max lg:w-full justify-center">
            <Logo />
          </div>

          <div className="flex justify-end">{/* <SearchForm /> */}</div>
        </div>

        <SportCategoriesMobile />
        {/* <MobileSearch /> */}
      </Container>
    </nav>
  )
}

export default Navbar
