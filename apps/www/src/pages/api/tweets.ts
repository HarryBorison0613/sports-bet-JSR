import type { NextApiRequest, NextApiResponse } from 'next'
import { TwitterRepository } from 'src/repositories/twitter-repository'
import { cachedSuccessResponse, errorResponse } from 'src/utils/api/response'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Create twitter repo instance
  const twitterRepo = new TwitterRepository()

  // Parse all tweets
  const tweets = await twitterRepo.getAllTweets()

  if (!tweets) {
    return errorResponse(res)
  }

  // 1 hour
  return cachedSuccessResponse(res, tweets, 60 * 60)
}

export default handler
