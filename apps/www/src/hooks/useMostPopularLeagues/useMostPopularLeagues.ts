import type { ILeague } from 'src/interface'
import useSWR from 'swr'

const useMostPopularLeagues = (sport: string) => {
  return useSWR<ILeague[]>(sport ? `/api/${sport}/most-popular-leagues` : null)
}

export default useMostPopularLeagues
