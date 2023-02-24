import { useI18n } from '@corex/use-i18n'
import React from 'react'
import type { IGameSummary } from 'src/interface'

const useGameSummaryItem = (summary: IGameSummary) => {
  const { t } = useI18n()

  const homeTeam = React.useMemo(
    () => summary?.sport_event?.competitors[0],
    [summary?.sport_event?.competitors]
  )

  const awayTeam = React.useMemo(
    () => summary?.sport_event?.competitors[1],
    [summary?.sport_event?.competitors]
  )

  const live = React.useMemo(
    () => summary?.sport_event_status?.status === 'live',
    [summary?.sport_event_status?.status]
  )

  const ended = React.useMemo(
    () => summary?.sport_event_status?.status === 'closed',
    [summary?.sport_event_status?.status]
  )

  const timestamp = React.useMemo(
    () =>
      summary?.sport_event_status?.clock?.played ??
      t(summary?.sport_event_status?.match_status) ??
      summary?.sport_event_status?.match_status,
    [
      summary?.sport_event_status?.clock?.played,
      summary?.sport_event_status?.match_status,
      t,
    ]
  )

  return {
    homeTeam,
    awayTeam,
    live,
    ended,
    timestamp,
  }
}

export default useGameSummaryItem
