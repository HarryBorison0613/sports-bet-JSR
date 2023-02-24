import Link from 'next/link'
import Image from 'next/image'
import { esports, footerMenu, pais, socialLinks } from '@/lib/const'
import React, { useState } from 'react'

const Footer = ({ settings }) => {
  const { twitter, facebook, title } = settings
  const logo =
    settings?.icon ||
    settings.defaultSettings.siteLogo ||
    settings.defaultSettings.siteIcon

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  //show or not countries
  const [isActive, setActive] = useState('false')
  const handleToggle = () => {
    setActive(!isActive)
  }

  //show or not countries
  const [isShown, setIsShown] = useState(true)
  const changeVisibility = (event) => {
    setIsShown((current) => !current)
  }

  return (
    <>
      <div className="container">
        <div className="flex flex-wrap space-x-5 w-full md:px-20 px-5">
          {socialLinks.map((social, index) => (
            <Link href={social.link} key={social.title}>
              <a
                className={`text-white flex-1 py-3 bg-[#3B5998] flex flex-col items-center gap-y-4 p-2 text-center hover:bg-primary ${
                  social.title == 'Instagram'
                    ? 'bg-instagram hover:bg-primary'
                    : social.title == 'Facebook'
                    ? 'bg-[#3B5998]'
                    : 'bg-[#4099FF]'
                }`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.title}
              >
                <Image
                  src={social.image}
                  alt={social.title}
                  width={30}
                  height={30}
                />
                <span className="text-sm">Curta-nos no {social.title}</span>
              </a>
            </Link>
          ))}
        </div>
      </div>
      <footer className="mt-10 lg:mt-[100px]  bg-gradient-to-b from-primary to-secondary pt-5 md:pt-10">
        <div className="container text-white relative">
          <div className="flex flex-wrap pt-10 lg:pb-10">
            <div className="w-full md:w-1/2 lg:w-1/4 md:pr-5 lg:pr-10">
              <Link href="/">
                <a className="flex">
                  <Image
                    src={logo}
                    alt="Bets.com.br"
                    aria-label="website-icon"
                    width={100}
                    height={86}
                  />
                </a>
              </Link>
              <p className="text-lg font-normal mt-5 mb-5">
                O Melhor site de notícias esportivas no Brasil.
                <br />
                <br />
                BETS.com.br é um site feito no Brasil para brasileiros. Temos
                mais de 450.000 páginas de conteúdo esportivo, estatísticas,
                ligas, jogos e conteúdo de apostas. Cadastre-se para receber
                atualizações diárias do BETS!
              </p>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4 mb-5 md:pr-5 lg:pr-10">
              <div className="flex items-center" onClick={handleToggle}>
                <h5 className="text-lg font-bold">ESPORTES</h5>
                <div className="md:border-t-2 md:border-t-white flex-1 ml-2">
                  <span
                    className={`footer-menu__arrow-wrap ${
                      !isActive ? 'active' : ''
                    }`}
                  >
                    <Image
                      src="/artigos/vectors/arrow.svg"
                      alt="dropdown account menu arrow"
                      width={15}
                      height={15}
                    />
                  </span>
                </div>
              </div>
              <div
                className={`flex flex-col gap-y-2.5 mt-3.5 footer__menu ${
                  !isActive ? 'active' : ''
                }`}
              >
                {esports.map((item) => (
                  <Link key={item.name} href={item.href}>
                    <a className="flex items-center gap-3.5 text-lg font-normal">
                      <Image
                        src={item.icon}
                        alt="icon"
                        width={20}
                        height={20}
                      />
                      {item.name}
                    </a>
                  </Link>
                ))}
              </div>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4 mb-5 md:pr-5 lg:pr-10">
              <div className="flex items-center" onClick={changeVisibility}>
                <h5 className="text-lg font-bold">PAÍS</h5>
                <div className="md:border-t-2 md:border-t-white flex-1 ml-2">
                  <span
                    className={`footer-menu__arrow-wrap ${
                      !isShown ? 'active' : ''
                    }`}
                  >
                    <Image
                      src="/artigos/vectors/arrow.svg"
                      alt="dropdown account menu arrow"
                      width={15}
                      height={15}
                    />
                  </span>
                </div>
              </div>
              <div
                className={`flex flex-col gap-y-2.5 mt-3.5 footer__menu ${
                  !isShown ? 'active' : ''
                }`}
              >
                {pais.map((item) => (
                  <Link key={item.name} href={item.href}>
                    <a className="flex items-center gap-3.5 text-lg font-normal">
                      <Image
                        src={item.icon}
                        alt="icon"
                        width={20}
                        height={20}
                      />
                      {item.name}
                    </a>
                  </Link>
                ))}
              </div>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4 md:pr-5 lg:pr-10">
              <div className="flex items-center">
                <h5 className="text-lg font-bold">ESPORTES</h5>
                <div className="border-t-2 border-t-white flex-1 ml-2"></div>
              </div>
              <div className="flex flex-col gap-y-2.5 mt-3.5">
                {footerMenu.map((item) => (
                  <Link key={item.name} href={item.href}>
                    <a className="flex items-center gap-3.5 text-lg font-normal">
                      {item.name}
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="text-white font-light py-4 lg:mt-12 mt-5">
            © {new Date().getFullYear()} {title} Todos os direitos reservados.
          </div>
        </div>

        <div
          onClick={scrollTop}
          className="fixed h-12 w-12 bg-white border-2 border-primary right-5 md:right-20 bottom-12 rounded-full cursor-pointer flex items-center justify-center"
        >
          <svg
            width="23"
            height="14"
            viewBox="0 0 23 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.4982 4.11035L3.30923 11.2993L3.07353 11.0636L11.5588 2.57829L20.0441 11.0636L19.8084 11.2993L12.6195 4.11035L11.5588 3.04969L10.4982 4.11035Z"
              fill="white"
              stroke="#04315E"
              strokeWidth="3"
            />
          </svg>
        </div>
      </footer>
    </>
  )
}

export default Footer
