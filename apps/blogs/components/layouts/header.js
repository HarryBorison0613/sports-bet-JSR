import Link from 'next/link'
import Image from 'next/image'
import {
  navigations,
  topMenu,
  categoriesFotballNav,
  pais,
  live,
  socialLinks,
} from '../../lib/const'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import SearchPopUp from '@/components/layouts/search'
import MenuItems from '../nav/MenuItems'
import MobileNav from '../nav/MobileNav'

const HeaderDesktop = ({ settings, targetRef, headerHeight }) => {
  const router = useRouter()

  const logo =
    settings?.icon ||
    settings.defaultSettings.siteLogo ||
    settings.defaultSettings.siteIcon
  const [isActive, setActive] = useState('false')
  const handleToggle = () => {
    setActive(!isActive)
  }

  return (
    <>
      <header
        className="bg-gradient-to-b from-primary to-secondary fixed top-0 w-full z-50"
        ref={targetRef}
      >
        <div className="container mx-auto py-3 flex justify-between items-center h-[100px]">
          <div className="heading__left w-1/3 flex justify-start">
            <div className="flex flex-wrap items-center w-full">
              {socialLinks.map((social, index) => (
                <Link href={social.link} key={social.title}>
                  <a className="flex items-center gap-x-1.5 mr-1 md:mr-2.5 relative w-[30px] md:w-auto rounded-full border-[1px] md:border-2 border-white border-solid p-[6px] md:p-2 hover:bg-[#00000021]">
                    <Image
                      src={social.image}
                      alt={social.title}
                      width={20}
                      height={20}
                    />
                  </a>
                </Link>
              ))}
            </div>
            {/* <div className="text-sm font-medium text-white lg:flex block items-center gap-x-5 top-menu">

                  <div className="flex items-center lg:hidden top-menu__mobile-dropdown-item gap-x-1.5" onClick={handleToggle} >
                      <Image
                          src='/vectors/profil.svg'
                          alt='dropdown account menu'
                          width={25}
                          height={25}
                        />
                      <span> Account </span>

                      <span className={`top-menu__arrow-wrap ${!isActive ? 'active' : ''}`}>
                        <Image
                            src='/vectors/arrow.svg'
                            alt='dropdown account menu arrow'
                            width={7}
                            height={7}
                          />
                      </span>

                  </div>

                  <div className={`text-sm font-medium text-white lg:flex block items-center gap-x-5 top-menu absolute lg:bg-transparent bg-primary p-3 lg:pl-0 w-[150px] md:w-[200px] lg:w-auto drop-shadow-md lg:filter-none mt-2 z-10 hidden ${!isActive ? 'active' : ''}`}>
                    {topMenu.map((nav, index) => (
                      <Link href={nav.href} key={nav.name} >
                        <a className="flex items-center gap-x-1.5 relative top-menu__link mb-2 w-full lg:w-auto">
                          <Image
                            src={nav.icon}
                            alt={nav.icon}
                            width={25}
                            height={25}
                          />
                          {nav.name}
                        </a>
                      </Link>
                    ))}


                  </div>
                </div> */}
          </div>

          <div className="heading__center w-1/3 flex justify-center">
            <Link href="/">
              <a className="flex">
                <Image
                  src={logo}
                  alt="Bets.com.br"
                  aria-label="website-icon"
                  width={70}
                  height={60}
                />
              </a>
            </Link>
          </div>

          <div className="heading__right w-1/3 flex justify-end">
            <div className="hidden lg:block">
              {<SearchPopUp settings={settings} />}
            </div>

            {/* <div className="flex items-center lg:hidden">
                  <Link href="#">
                    <a className="flex">
                      <Image
                          src='/vectors/mobile-menu.svg'
                          alt="mobile-menu"
                          aria-label="mobile-menu"
                          width={20}
                          height={15}
                        />
                    </a>
                  </Link>
                </div> */}

            <div className="flex items-center lg:hidden flex items-center justify-between text-white text-black">
              <div className="container h-full">
                <div className="mega-drop-down collapsed h-full">
                  <nav className="itmes-center w-full h-full justify-between">
                    <MobileNav
                      navigations={navigations}
                      headerHeight={headerHeight}
                      pais={pais}
                    />
                  </nav>
                </div>
              </div>

              {/* <Image
                    src="/vectors/mobile-menu.svg"
                    alt="mobile-menu"
                    aria-label="mobile-menu"
                    width={20}
                    height={15}
                  /> */}
            </div>
          </div>
        </div>

        <div className="bg-primary h-[60px] flex items-center justify-between text-white text-base">
          <div className="container h-full">
            <div className="mega-drop-down collapsed h-full hidden lg:block">
              <nav className="main-menu itmes-center w-full h-full justify-between hidden lg:flex">
                {navigations.map((menu, index) => (
                  <MenuItems
                    items={menu}
                    key={index}
                    pais={pais}
                    live={live}
                    index={index}
                  />
                ))}
              </nav>
            </div>

            <div className="lg:hidden flex items-center justify-between h-full">
              <div className="lg:hidden">
                {<SearchPopUp settings={settings} />}
              </div>

              <a
                className="flex items-center justify-center main-menu__live relative font-semibold h-[20px] w-[40px] rounded-md border border-white flex overflow-hidden lg:hidden bg-white text-danger text-xs pr-1"
                href="https://www.bets.com.br"
              >
                LIVE
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default HeaderDesktop
