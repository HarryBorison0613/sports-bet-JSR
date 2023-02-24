import React from 'react'
import useCreateHref from 'src/hooks/useCreateHref/useCreateHref'
import useSeasonSummary from 'src/hooks/useSeasonSummary/useSeasonSummary'
import type {
  ICategory,
  ILeague,
  IPlayer,
  ISeason,
  ISeasonSummary,
  ITeam,
} from 'src/interface'
import { Url } from 'url'
import { ClassificationContextProvider } from '../ClassificationContext/ClassificationContext'

export interface ISeasonContextProps {
  query?: any
  summary?: ISeasonSummary
  initSeasonSummary?: ISeasonSummary
  season?: ISeason
  seasonHref?: Partial<Url> | undefined
  category?: ICategory
  competition?: ILeague
  isLoadingSeasonContext?: boolean
  teams?: ITeam[]
  bestPlayers?: IPlayer[]
}

export const SeasonContext = React.createContext<ISeasonContextProps>({})

export const SeasonContextProvider: React.FC<
  React.PropsWithChildren<ISeasonContextProps>
> = ({ children, initSeasonSummary, ...restProps }) => {
  const { createSeasonHref, query } = useCreateHref()

  const { data, isValidating: isValidatingSeasonSummary } = useSeasonSummary(
    query?.sport as any,
    query?.season_id as any
    // {
    //   fallbackData: initSeasonSummary,
    //   revalidateIfStale: false,
    //   revalidateOnMount: false,
    // }
  )

  const season = React.useMemo(
    () => data?.sport_event_context?.season,
    [data?.sport_event_context?.season]
  )

  const category = React.useMemo(
    () => data?.sport_event_context?.category,
    [data?.sport_event_context?.category]
  )

  const competition = React.useMemo(
    () => data?.sport_event_context?.competition,
    [data?.sport_event_context?.competition]
  )

  const teams = React.useMemo(() => data?.teams, [data?.teams])

  const bestPlayers = React.useMemo(
    () => data?.best_players,
    [data?.best_players]
  )

  const isLoadingSeasonContext = React.useMemo(
    () => isValidatingSeasonSummary,
    [isValidatingSeasonSummary]
  )

  const seasonHref = React.useMemo(
    () =>
      season && category?.country_info
        ? createSeasonHref({
            ...season,
            country_info: {
              ...category?.country_info,
              slug: category?.slug,
            },
          })
        : undefined,
    [category?.country_info, category?.slug, createSeasonHref, season]
  )
  return (
    <ClassificationContextProvider {...restProps}>
      <SeasonContext.Provider
        value={{
          isLoadingSeasonContext,
          summary: data,
          season,
          category,
          competition,
          seasonHref,
          query,
          teams,
          bestPlayers,
        }}
      >
        {children}
      </SeasonContext.Provider>
    </ClassificationContextProvider>
  )
}
