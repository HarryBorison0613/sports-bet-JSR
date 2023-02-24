import React from 'react'
import useClassificationContext from 'src/hooks/useClassificationContext/useClassificationContext'
import useSeasonContext from 'src/hooks/useSeasonContext/useSeasonContext'
import { SeasonInformationContent } from './SeasonInformationContent'
import { SeasonInfoSkeleton } from './SeasonInfoSkeleton'

const SeasonInfo: React.FC = () => {
  const { isLoading, seasonStandingStat } = useClassificationContext()

  const { isLoadingSeasonContext, season, teams } = useSeasonContext()

  const topCompetitors = React.useMemo(
    () =>
      [...(seasonStandingStat?.top_competitors ?? []), ...(teams ?? [])].slice(
        0,
        2
      ),
    [seasonStandingStat?.top_competitors, teams]
  )

  if (isLoading || isLoadingSeasonContext) {
    return <SeasonInfoSkeleton />
  }

  return (
    <SeasonInformationContent
      season={season}
      seasonStandingStat={seasonStandingStat}
      topCompetitors={topCompetitors ?? []}
    />
  )
}

export default SeasonInfo
