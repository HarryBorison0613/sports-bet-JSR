import { useRouter } from 'next/router'
import React from 'react'
import useGlobalContext from 'src/hooks/useGlobalContext/useGlobalContext'
import useLeagueSummary from 'src/hooks/useLeagueSummary/useLeagueSummary'
import type { ILeagueSummary, ISeason } from 'src/interface'

export interface ISportCategoryContext {
  isLoadingSportCategoryContext?: boolean
  pastSeasons?: ISeason[]
  leagueSummary?: ILeagueSummary
  initLeagueSummary?: ILeagueSummary
  query: any
}

export const SportCategoryContext = React.createContext<ISportCategoryContext>(
  {} as any
)

export const SportCategoryContextProvider: React.FC<
  React.PropsWithChildren<ISportCategoryContext>
> = ({ children }) => {
  const { query } = useRouter()

  const { isLoadingGlobalContext } = useGlobalContext()

  const { data: leagueSummary, isValidating: loadingSummary } =
    useLeagueSummary(
      query?.sport as any,
      query?.category as any,
      query?.league_id as any,
      {
        // fallbackData: initLeagueSummary,
        // revalidateOnMount: false,
        // revalidateIfStale: false,
      }
    )

  const pastSeasons = React.useMemo(
    () =>
      leagueSummary?.seasons?.filter(
        (x) => x?.season_id !== leagueSummary?.current_season?.season_id
      ),
    [leagueSummary?.current_season?.season_id, leagueSummary?.seasons]
  )

  const isLoadingSportCategoryContext = React.useMemo(
    () => isLoadingGlobalContext || loadingSummary,
    [isLoadingGlobalContext, loadingSummary]
  )

  return (
    <SportCategoryContext.Provider
      value={{
        isLoadingSportCategoryContext,
        pastSeasons,
        leagueSummary,
        query,
      }}
    >
      {children}
    </SportCategoryContext.Provider>
  )
}
