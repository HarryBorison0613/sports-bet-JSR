import useTweets from 'src/hooks/useTweets/useTweets'
import { Tweets } from './Tweets'

const RealtimeTweets: React.FC = () => {
  const { data } = useTweets()

  if (!data) {
    return <></>
  }

  if (data?.length === 0) {
    return <></>
  }

  return <Tweets tweets={data} />
}

export default RealtimeTweets
