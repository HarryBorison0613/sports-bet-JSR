import { useRouter } from 'next/router'
import React from 'react'
import useGameSummary from 'src/hooks/useGameSummary/useGameSummary'
import type {
  ICategory,
  IGameSummary,
  ILeague,
  ISeason,
  ITeam,
} from 'src/interface'
import { ClassificationContextProvider } from '../ClassificationContext/ClassificationContext'

export interface IGameContextProvider {
  gameSummary?: IGameSummary
  isLoadingGameContext?: boolean
  season: ISeason
  homeTeam?: ITeam
  awayTeam?: ITeam
  category: ICategory
  competition: ILeague
}

export const GameContext = React.createContext<IGameContextProvider>({} as any)

export const GameContextProvider: React.FC<React.PropsWithChildren<any>> = ({
  children,
}) => {
  const { query } = useRouter()

  const { data, isValidating: isValidatingGameContext } = useGameSummary(
    query?.sport as string,
    query?.game_id as string
  )

  const season = React.useMemo(
    () => data?.sport_event?.sport_event_context?.season!,
    [data?.sport_event?.sport_event_context?.season]
  )

  const category = React.useMemo(
    () => data?.sport_event?.sport_event_context?.category!,
    [data?.sport_event?.sport_event_context?.category]
  )

  const competition = React.useMemo(
    () => data?.sport_event?.sport_event_context?.competition!,
    [data?.sport_event?.sport_event_context?.competition]
  )

  const findTeam = React.useCallback(
    (predicate: (x: ITeam) => boolean) =>
      data?.sport_event?.competitors?.find(predicate),
    [data?.sport_event?.competitors]
  )

  const homeTeam = React.useMemo(
    () => findTeam((x) => x.qualifier === 'home'),
    [findTeam]
  )

  const awayTeam = React.useMemo(
    () => findTeam((x) => x.qualifier === 'away'),
    [findTeam]
  )

  const activeLeague = React.useMemo(
    () => data?.sport_event?.sport_event_context?.competition,
    [data?.sport_event?.sport_event_context?.competition]
  )

  const isLoadingGameContext = React.useMemo(
    () => isValidatingGameContext,
    [isValidatingGameContext]
  )

  return (
    <ClassificationContextProvider>
      <GameContext.Provider
        value={{
          gameSummary: data,
          isLoadingGameContext,
          season,
          homeTeam,
          awayTeam,
          category,
          competition,
        }}
      >
        {children}
      </GameContext.Provider>
    </ClassificationContextProvider>
  )
}
