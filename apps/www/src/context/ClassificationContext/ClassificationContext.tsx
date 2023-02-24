import { useRouter } from 'next/router'
import React from 'react'
import useSeasonStandings from 'src/hooks/useSeasonStandings/useSeasonStandings'
import type {
  ISeasonStanding,
  ISeasonStandingGroup,
  ISeasonStandingStatistics,
  ISeasonStandingType,
} from 'src/interface'

export interface IClassificationContextProps {
  standingType?: ISeasonStandingType
  allSeasonStandings?: ISeasonStanding[]
  activeSeasonStanding?: ISeasonStanding
  activeSeasonStandingGroup?: ISeasonStandingGroup
  query?: any
  seasonStandingStat?: ISeasonStandingStatistics
  isLoading?: boolean
}

export const ClassificationContext =
  React.createContext<IClassificationContextProps>({})

export const ClassificationContextProvider: React.FC<
  React.PropsWithChildren<IClassificationContextProps>
> = ({ children }) => {
  const [standingType] = React.useState<ISeasonStandingType>('total')

  const { query } = useRouter()

  const { isValidating, data } = useSeasonStandings(
    query?.sport as string,
    query?.season_id as string
  )

  const activeSeasonStanding = React.useMemo(
    () => data?.standings?.find((x) => x?.type === standingType),
    [data?.standings, standingType]
  )

  const activeSeasonStandingGroup = React.useMemo(
    () => activeSeasonStanding?.groups[0],
    [activeSeasonStanding?.groups]
  )

  const isLoading = React.useMemo(() => isValidating, [isValidating])

  return (
    <ClassificationContext.Provider
      value={{
        allSeasonStandings: data?.standings,
        standingType,
        activeSeasonStanding,
        activeSeasonStandingGroup,
        seasonStandingStat: data?.statistics,
        query,
        isLoading,
      }}
    >
      {children}
    </ClassificationContext.Provider>
  )
}
