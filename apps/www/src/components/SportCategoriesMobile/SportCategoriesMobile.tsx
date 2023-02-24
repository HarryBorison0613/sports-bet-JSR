import Image from '@app/image'
import useGlobalContext from 'src/hooks/useGlobalContext/useGlobalContext'
import Dropdown, { IDropdownItem } from '../Dropdown/Dropdown'
import React from 'react'
import { CaretDownIcon } from 'src/icons/caret-down'

const SportCategoriesMobile: React.FC = () => {
  const { categories, isLoadingGlobalContext, query, category, pathname } =
    useGlobalContext()

  const items = React.useMemo<IDropdownItem[]>(
    () =>
      categories?.map((item) => ({
        label: item?.name,
        icon: item?.country_info?.icon,
        href: {
          pathname: '/[sport]/[category]/[league_id]',
          query: {
            sport: query?.sport,
            category: item?.slug,
            league_id: item?.latest_competition?.league_id,
          },
        },
      })) ?? [],
    [categories, query?.sport]
  )

  if (
    isLoadingGlobalContext ||
    !categories ||
    categories?.length === 0 ||
    pathname?.endsWith('vivo')
  ) {
    return <></>
  }

  return (
    <div className="z-[1000] relative lg:hidden">
      <Dropdown
        items={items}
        menuClassName="z-[1000] text-slate-600"
        className="flex items-center gap-2 cursor-pointer text-white"
      >
        {category?.country_info?.icon && (
          <Image
            src={category?.country_info?.icon}
            alt={category?.name}
            width={20}
            height={20}
          />
        )}

        <span className="truncate max-w-[100px]">{category?.name}</span>

        <CaretDownIcon />
      </Dropdown>
    </div>
  )
}

export default SportCategoriesMobile
