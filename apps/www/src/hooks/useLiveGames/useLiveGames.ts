import type { IGameSummary } from 'src/interface'
import useSWR from 'swr'

const useLiveGames = (sport: string) => {
  return useSWR<IGameSummary[]>(sport ? `/api/${sport}/live` : null)
}

export default useLiveGames
