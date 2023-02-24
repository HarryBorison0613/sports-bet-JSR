import type { IGhostPost } from 'src/interface'
import { fetcher } from 'src/utils/fetcher'
import useSWR from 'swr'

const useBlog = (endpoint: string | null) => {
  return useSWR<IGhostPost[]>(endpoint ? endpoint : null, fetcher, {
    refreshInterval: 60 * 2000,
  })
}

export default useBlog
