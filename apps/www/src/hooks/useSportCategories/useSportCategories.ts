import type { ISportCategorySummary } from 'src/interface'
import useSWR from 'swr'

const useSportCategories = (sport?: string) => {
  return useSWR<ISportCategorySummary[]>(
    sport ? `/api/${sport}/categories` : null
  )
}

export default useSportCategories
