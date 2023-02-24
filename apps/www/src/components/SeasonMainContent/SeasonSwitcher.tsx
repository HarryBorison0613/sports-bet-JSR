import React from 'react'
import useCreateHref from 'src/hooks/useCreateHref/useCreateHref'
import Dropdown, { IDropdownItem } from 'src/components/Dropdown/Dropdown'
import type { ISeason } from 'src/interface'
import { ChevronDownIcon } from 'src/icons/chevron-down'

export interface ISeasonSwitcherProps {
  allSeasons: ISeason[]
}

const SeasonSwitcher: React.FC<
  React.PropsWithChildren<ISeasonSwitcherProps>
> = ({ allSeasons, children }) => {
  const { createSeasonHref, query } = useCreateHref()

  const items = React.useMemo<IDropdownItem[]>(
    () =>
      allSeasons?.map((season) => ({
        label: season?.year,
        href: createSeasonHref({
          ...season,
          country_info: {
            ...season?.country_info,
            slug: query?.category as string,
          },
        }),
      })),
    [allSeasons, createSeasonHref, query?.category]
  )

  return (
    <Dropdown
      items={items}
      className="!bg-transparent !text-slate-500 !p-0 !px-2 !text-xs !border flex items-center gap-1"
      origin="top-left"
    >
      <span>{children}</span>
      <ChevronDownIcon />
    </Dropdown>
  )
}

export default SeasonSwitcher
