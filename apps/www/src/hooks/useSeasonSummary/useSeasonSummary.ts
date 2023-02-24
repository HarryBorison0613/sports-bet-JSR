import type { ISeasonSummary } from 'src/interface'
import useSWR, { SWRConfiguration } from 'swr'

const useSeasonSummary = (
  sport?: string,
  season_id?: string,
  config: SWRConfiguration = {}
) => {
  return useSWR<ISeasonSummary>(
    sport && season_id ? `/api/${sport}/seasons/${season_id}` : null,
    config
  )
}

export default useSeasonSummary
