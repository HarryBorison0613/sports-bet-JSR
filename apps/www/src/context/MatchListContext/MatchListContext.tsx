import { useRouter } from 'next/router'
import React from 'react'
import type { IGameSummary } from 'src/interface'
import useSWR from 'swr'
import { useI18n } from '@corex/use-i18n'
import { formatDateToAPIQuery } from 'src/utils/date'

export interface IFilterItem {
  id: string
  label: string
  predicate: (game: IGameSummary) => boolean
}

export interface IMatchListContextProps {
  selectedDate: Date
  onSelectDate: React.Dispatch<React.SetStateAction<Date>>
  games: IGameSummary[]
  isLoadingMatchListContext: boolean
  query: any
  matchListFilters: IFilterItem[]
  activeFilter: IFilterItem
  setActiveFilter: React.Dispatch<React.SetStateAction<IFilterItem>>
}

export const MatchListContext = React.createContext<IMatchListContextProps>(
  {} as any
)

export const MatchListContextProvider: React.FC<
  React.PropsWithChildren<any>
> = ({ children }) => {
  const { t } = useI18n()

  const { query } = useRouter()

  const [selectedDate, onSelectDate] = React.useState(new Date())

  const formattedDate = React.useMemo(
    () => (selectedDate ? formatDateToAPIQuery(selectedDate) : null),
    [selectedDate]
  )

  const { data, isValidating: isLoadingMatchListContext } = useSWR<
    IGameSummary[]
  >(
    formattedDate && query?.sport
      ? `/api/${query?.sport}/match-list/${formattedDate}`
      : null
  )

  const matchListFilters = React.useMemo<IFilterItem[]>(
    () => [
      {
        id: 'all',
        label: t('all'),
        predicate: (game: IGameSummary) => Boolean(game),
      },
      {
        id: 'live',
        label: t('live'),
        predicate: (game: IGameSummary) =>
          game?.sport_event_status?.status === 'live',
      },
    ],
    [t]
  )

  const [activeFilter, setActiveFilter] = React.useState(matchListFilters[0])

  const games = React.useMemo(
    () => data?.filter(activeFilter?.predicate) ?? [],
    [activeFilter?.predicate, data]
  )

  return (
    <MatchListContext.Provider
      value={{
        selectedDate,
        onSelectDate,
        games,
        isLoadingMatchListContext,
        query,
        matchListFilters,
        activeFilter,
        setActiveFilter,
      }}
    >
      {children}
    </MatchListContext.Provider>
  )
}
