import type { NextApiRequest, NextApiResponse } from 'next'
import { GameRepository } from 'src/repositories/game-repository'
import { errorResponse } from 'src/utils/api/response'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { sport } = req?.query

  // Create game repository instance
  const gameRepo = new GameRepository()

  // Parse live games
  const liveGames = await gameRepo.liveGames(sport as any)

  if (!liveGames) {
    return errorResponse(res)
  }

  return res.status(200).send(liveGames)
}

export default handler
