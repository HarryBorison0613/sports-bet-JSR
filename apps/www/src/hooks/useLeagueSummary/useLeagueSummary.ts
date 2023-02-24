import type { ILeagueSummary } from 'src/interface'
import useSWR, { SWRConfiguration } from 'swr'

const useLeagueSummary = (
  sport?: string,
  category?: string,
  league_id?: string,
  config: SWRConfiguration = {}
) => {
  return useSWR<ILeagueSummary>(
    sport && category && league_id
      ? `/api/${sport}/${category}/leagues/${league_id}`
      : null,
    config
  )
}

export default useLeagueSummary
