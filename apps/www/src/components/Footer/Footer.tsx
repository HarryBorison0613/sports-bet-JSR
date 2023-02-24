import Link from '@app/link'
import { footerLinks } from './footerLinks'
import cx from 'classnames'
import Container from 'src/components/Container/Container'
import Logo from 'src/components/Logo/Logo'
import { FooterSection } from './FooterSection'
import useSportTabBar from 'src/hooks/useSportTabBar/useSportTabBar'

export interface IFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const Footer: React.FC<IFooterProps> = ({ className, ...restProps }) => {
  const { items: sportItems } = useSportTabBar()

  return (
    <footer
      {...restProps}
      className={cx('bg-primary-500 text-white py-10 mt-8 relative z-100', className)}
    >
      <Container className="space-y-12  w-11/12 divide-y">
        <div className="grid grid-cols-3 gap-6 lg:gap-12 gap-y-12">
          <div className="grid gap-4 col-span-4 lg:col-span-1">
            <Logo />
            <p>O Melhor site de notícias esportivas no Brasil.</p>
            <p>
              BETS.com.br é um site feito no Brasil para brasileiros. Temos mais
              de 450.000 páginas de conteúdo esportivo, estatísticas, ligas,
              jogos e conteúdo de apostas. Cadastre-se para receber atualizações
              diárias do BETS!
            </p>
          </div>

          <FooterSection title="ESPORTES">
            {sportItems?.map((item, index) => (
              <Link
                key={index}
                href={{
                  pathname: item?.pathname,
                  query: item?.query,
                }}
              >
                <a className="hover:underline cursor-pointer flex items-center gap-2">
                  {item?.Icon && <item.Icon className="text-lg" />}
                  <span>{item?.label}</span>
                </a>
              </Link>
            ))}
          </FooterSection>

          <FooterSection title="Jurídica">
            {footerLinks?.map((link, index) => (
              <Link
                key={index}
                href={link?.url}
                passHref={true}
                prefetch={false}
                scroll={true}
              >
                <a className="hover:underline block cursor-pointer ">
                  {link?.label}
                </a>
              </Link>
            ))}
          </FooterSection>
        </div>

        <div className="pt-8">
          © {new Date().getFullYear()} Bets.com.br Todos os direitos reservados.
        </div>
      </Container>
    </footer>
  )
}

export default Footer
