import type { NextApiRequest, NextApiResponse } from 'next'
import { GameRepository } from 'src/repositories/game-repository'
import { withCachedApiHandler } from 'src/utils/api/response'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Request params
  const { query } = req

  // Create game repository
  const gameRepo = new GameRepository()

  // Parse game summary
  return gameRepo.gameSummary(query.sport as string, query?.game_id as string)
}

export default withCachedApiHandler(handler)
