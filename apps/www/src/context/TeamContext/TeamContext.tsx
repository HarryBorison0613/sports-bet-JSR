import React from 'react'
import useCreateHref from 'src/hooks/useCreateHref/useCreateHref'
import useTeamSummary from 'src/hooks/useTeamSummary/useTeamSummary'
import type {
  ISportEventSummary,
  ITeam,
  ITeamProfile,
  ITeamSummary,
} from 'src/interface'
import { ClassificationContextProvider } from '../ClassificationContext/ClassificationContext'

export interface ITeamContextProps {
  summary?: ITeamSummary
  profile?: ITeamProfile
  isLoadingTeamContext?: boolean
  query?: any
  upcomingMatch?: ISportEventSummary
  createCustomTeamHref: (team: ITeam) => any
}

export const TeamContext = React.createContext<ITeamContextProps>({} as any)

const TeamContextProvider: React.FC<React.PropsWithChildren<any>> = ({
  children,
}) => {
  const { createTeamHref, query } = useCreateHref()

  const { isValidating: isLoadingTeamContext, data: summary } = useTeamSummary(
    query?.sport as string,
    query?.team_id as string
  )

  const profile = React.useMemo(() => summary?.profile, [summary?.profile])

  const upcomingMatch = React.useMemo(
    () =>
      summary && summary?.upcoming_events?.length > 0
        ? summary?.upcoming_events[0]
        : undefined,
    [summary]
  )

  const createCustomTeamHref = React.useCallback(
    (team: ITeam) =>
      createTeamHref(team, {
        season_id: query?.season_id,
        slug: query?.season_slug,
        league_id: query?.league_id,
      } as any),
    [createTeamHref, query?.league_id, query?.season_id, query?.season_slug]
  )

  return (
    <ClassificationContextProvider>
      <TeamContext.Provider
        value={{
          isLoadingTeamContext,
          summary,
          profile,
          query,
          upcomingMatch,
          createCustomTeamHref,
        }}
      >
        {children}
      </TeamContext.Provider>
    </ClassificationContextProvider>
  )
}

export default TeamContextProvider
