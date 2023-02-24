import type { NextApiRequest, NextApiResponse } from 'next'
import { GhostRepository } from 'src/repositories/ghost-repostiory'
import { cachedSuccessResponse, errorResponse } from 'src/utils/api/response'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { type, sport } = req.query

  // Ghost repo instance
  const ghostRepo = new GhostRepository()

  // Parse top posts
  const latestPosts = await ghostRepo.findPosts(sport as string, type as string)

  // No posts. Return error response
  if (!latestPosts) {
    return errorResponse(res)
  }

  // 1 hour
  return cachedSuccessResponse(res, latestPosts, 60 * 60)
}

export default handler
