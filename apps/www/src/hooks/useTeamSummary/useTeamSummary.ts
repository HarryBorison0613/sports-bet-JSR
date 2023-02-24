import { ITeamSummary } from 'src/interface'
import useSWR from 'swr'

const useTeamSummary = (sport: string, team_id: string) => {
  return useSWR<ITeamSummary>(
    sport && team_id ? `/api/${sport}/teams/${team_id}` : null
  )
}

export default useTeamSummary
