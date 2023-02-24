import type { NextApiRequest, NextApiResponse } from 'next'
import { GameRepository } from 'src/repositories/game-repository'
import { withCachedApiHandler } from 'src/utils/api/response'

/**
 * Match list API handler
 * @param req
 * @param res
 * @returns
 */
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Extract sport from query
  const { sport, date } = req.query

  // Create game repository instance
  const gameRepo = new GameRepository()

  // Find competitions
  return gameRepo.matchSchedules(sport as string, date as string)
}

export default withCachedApiHandler(handler) // 60 second cache
