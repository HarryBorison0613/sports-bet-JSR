import type { ISeasonStandingSummary } from 'src/interface'
import useSWR from 'swr'

const useSeasonStandings = (sport: string, season_id: string) => {
  return useSWR<ISeasonStandingSummary>(
    sport && season_id ? `/api/${sport}/seasons/${season_id}/standings` : null
  )
}

export default useSeasonStandings
