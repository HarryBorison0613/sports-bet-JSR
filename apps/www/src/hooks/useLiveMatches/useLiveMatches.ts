import { useRouter } from 'next/router'
import React from 'react'
import { IGameSummary } from 'src/interface'
import { formatDateToAPIQuery } from 'src/utils/date'
import useSWR from 'swr'

export const useLiveMatches = () => {
  const router = useRouter()

  const { data, isValidating } = useSWR<IGameSummary[]>(
    router?.query?.sport
      ? `/api/${router?.query?.sport}/match-list/${formatDateToAPIQuery(
          new Date()
        )}`
      : null
  )

  const getLiveGamesBySeasonId = React.useCallback(
    (season_id: string) => {
      return (
        data?.filter(
          (x) =>
            x?.sport_event_status?.status === 'live' &&
            x?.sport_event?.sport_event_context?.season?.season_id === season_id
        ) ?? []
      )
    },
    [data]
  )

  const getLiveGamesByTeamId = React.useCallback(
    (team_id: string) => {
      return (
        data?.filter(
          (x) =>
            x?.sport_event_status?.status === 'live' &&
            x?.sport_event?.competitors.some((team) => team.team_id === team_id)
        ) ?? []
      )
    },
    [data]
  )

  const loading = React.useMemo(
    () => !data && isValidating,
    [data, isValidating]
  )

  return {
    games: data ?? [],
    loading,
    getLiveGamesBySeasonId,
    getLiveGamesByTeamId,
    query: router?.query,
  }
}
