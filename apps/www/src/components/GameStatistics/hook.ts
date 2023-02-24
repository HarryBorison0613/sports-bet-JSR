import { useI18n } from '@corex/use-i18n'
import React from 'react'
import useGameContext from 'src/hooks/useGameContext/useGameContext'
import type { ITeam } from 'src/interface'

export const useGameStatistics = () => {
  const { t } = useI18n()

  const { isLoadingGameContext, gameSummary } = useGameContext()

  const getStats = React.useCallback(
    (predicate: (x: ITeam) => boolean) => {
      return (
        gameSummary?.statistics?.totals?.competitors?.find((x) => predicate(x))
          ?.statistics ?? ({} as any)
      )
    },
    [gameSummary?.statistics?.totals?.competitors]
  )

  const homeStats = React.useMemo(
    () => getStats((x) => x.qualifier === 'home'),
    [getStats]
  )

  const awayStats = React.useMemo(
    () => getStats((x) => x.qualifier === 'away'),
    [getStats]
  )

  return {
    t,
    homeStats,
    awayStats,
    isLoadingGameContext,
  }
}
