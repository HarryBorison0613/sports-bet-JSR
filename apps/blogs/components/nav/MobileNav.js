import { useLayoutEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Turn as Hamburger } from 'hamburger-react'
import Image from 'next/image'
import Dropdown from '@/components/nav/MobileDropdown'

function MobileNav({ navigations, headerHeight, pais }) {
  // State
  const [hamburger, setHamburger] = useState(false)
  const handleToggle = () => {
    setHamburger(!hamburger)
  }

  const handleClickItem = (e) => {
    document.querySelector('.hamburger-react').click()
  }

  const [isActive, setIsActive] = useState({
    status: false,
    keyDropdown: '',
  })

  const handleToggleMenu = (keyDropdown) => {
    if (isActive.keyDropdown.index === keyDropdown.index) {
      setIsActive({
        status: false,
        keyDropdown: keyDropdown.index,
      })
    } else {
      setIsActive({
        status: true,
        keyDropdown,
      })
    }
  }

  return (
    <>
      <div className="relative flex flex-column justify-center -mr-5 relative">
        <Hamburger
          color="#ffff"
          toggled={hamburger}
          toggle={setHamburger}
          className="z-12"
        />
        <div
          className={`nav-mobile overflow-scroll h-full w-[100%] pb-10 mt-10 pt-10 fixed list-none top-0 left-0 bottom-0 h-[300px] z-20 mt-100px bg-white flex flex-col p-4  ${
            hamburger ? ' visible' : 'hidden'
          }`}
          style={{ marginTop: headerHeight }}
        >
          <ul className="mb-10">
            {navigations.map((items, index) => (
              <li
                className="mobile-item border-b-2 mb-2 pb-1"
                key={items.title + index}
              >
                {items.submenu ? (
                  <>
                    <div className="menu-item menu-item-has-child flex flex-wrap items-center justify-between">
                      <div
                        className="button-wrap w-1/2"
                        onClick={handleClickItem}
                      >
                        <Link href={items.href}>
                          <a
                            className={`text-lg py-2.5 font-bold ${items.my_class}`}
                          >
                            {' '}
                            {items.title}{' '}
                          </a>
                        </Link>
                      </div>
                      <div
                        className="button-wrap w-1/2 flex items-center justify-end"
                        onClick={() => handleToggleMenu({ index })}
                      >
                        <button
                          type="button"
                          aria-haspopup="menu"
                          className={`w-5 h-5 relative menu-item__open-btn ${
                            isActive.keyDropdown.index === index
                              ? 'open-subbmenu'
                              : 'hidden-subbmenu'
                          }`}
                        >
                          <Image
                            src="/artigos/vectors/arrow-dark.svg"
                            alt="move"
                            layout="fill"
                          />
                        </button>
                      </div>
                    </div>
                    <div
                      className={`mobile-dropdown ${
                        isActive.keyDropdown.index === index
                          ? 'open-subbmenu'
                          : 'hidden-subbmenu'
                      }`}
                    >
                      <Dropdown submenus={items.submenu} />
                    </div>
                  </>
                ) : (
                  <Link href={items.href} onClick={handleClickItem}>
                    <a
                      className={`text-lg py-2.5 mb-2.5 font-bold ${items.my_class}`}
                    >
                      {' '}
                      {items.title}{' '}
                    </a>
                  </Link>
                )}
              </li>
            ))}

            {pais.map((items, index) => (
              <li
                className="flex flex-wrap mobile-item border-b-2 mb-2 pb-1"
                key={items.name + index}
              >
                <div className="w-30 h-30 relative">
                  <Image src={items.icon} alt="move" width={20} height={20} />
                </div>
                <div className="ml-2" onClick={handleClickItem}>
                  <Link href={items.href}>
                    <a className="text-md py-3"> {items.name} </a>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default MobileNav
