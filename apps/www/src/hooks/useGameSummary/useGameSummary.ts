import type { IGameSummary } from 'src/interface'
import useSWR from 'swr'

const useGameSummary = (sport: string, game_id: string) => {
  return useSWR<IGameSummary>(
    sport && game_id ? `/api/${sport}/games/${game_id}` : null
  )
}

export default useGameSummary
