import { ITweet } from 'src/interface'
import useSWR from 'swr'

const useTweets = () => {
  return useSWR<ITweet[]>('/api/tweets')
}

export default useTweets
