import { Transition, Menu } from '@headlessui/react'
import React from 'react'
import styles from './Dropdown.module.css'
import Image from '@app/image'
import type { Url } from 'url'
import cx from 'classnames'
import Link from 'next/link'

export interface IDropdownItem {
  label: string
  icon?: string
  href: Partial<Url>
}

export interface IDropdownProps {
  items: IDropdownItem[]
  className?: string
  menuClassName?: string
  origin?: 'top-left' | 'top-right'
}

const Dropdown: React.FC<React.PropsWithChildren<IDropdownProps>> = ({
  items,
  children,
  className,
  origin,
  menuClassName,
}) => {
  return (
    <Menu as="div" className={cx(styles.menu, menuClassName)}>
      <Menu.Button className={cx(styles['menu-button'], className)}>
        {children}
      </Menu.Button>

      <Transition
        as={React.Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={cx(
            'absolute mt-2 w-max divide-y divide-slate-200 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-y-auto z-10',
            'min-w-[120px] max-h-[300px] max-w-xs',
            {
              'right-0 origin-top-right': origin === 'top-right',
            }
          )}
        >
          {items?.map((item, index) => (
            <Menu.Item key={index}>
              {() => (
                <Link
                  href={item?.href}
                  passHref={true}
                  prefetch={false}
                  scroll={false}
                >
                  <a className={styles['menu-item']}>
                    {item?.icon && (
                      <Image
                        className="max-h-[28px] object-contain"
                        src={item?.icon}
                        alt={item.label}
                        width={28}
                        height={28}
                      />
                    )}

                    <span className={styles.label}>{item.label}</span>
                  </a>
                </Link>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

Dropdown.defaultProps = {
  origin: 'top-right',
}

export default Dropdown
