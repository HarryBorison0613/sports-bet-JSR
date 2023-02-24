import React from 'react'
import useGlobalContext from 'src/hooks/useGlobalContext/useGlobalContext'
import useSportCategoryContext from 'src/hooks/useSportCategoryContext/useSportCategoryContext'
import Dropdown, { IDropdownItem } from '../Dropdown/Dropdown'

export interface ICompetitionSwitcherDropdownProps {}

const CompetitionSwitcherDropdown: React.FC<
  ICompetitionSwitcherDropdownProps
> = () => {
  const { category, isLoadingGlobalContext, query } = useGlobalContext()

  const { isLoadingSportCategoryContext } = useSportCategoryContext()

  const items = React.useMemo<IDropdownItem[]>(
    () =>
      category?.competitions?.map((x) => ({
        label: x?.name,
        icon: x?.icon,
        href: {
          pathname: '/[sport]/[category]/[league_id]',
          query: {
            ...query,
            league_id: x?.league_id,
          },
        },
      })) ?? [],
    [category?.competitions, query]
  )

  if (isLoadingGlobalContext || isLoadingSportCategoryContext) {
    return <React.Fragment />
  }

  return (
    <Dropdown items={items}>
      <span>Ver outra Liga</span>
    </Dropdown>
  )
}

export default CompetitionSwitcherDropdown
