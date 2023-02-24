import type { NextApiRequest, NextApiResponse } from 'next'
import { SeasonRepository } from 'src/repositories/season-repository'
import { withCachedApiHandler } from 'src/utils/api/response'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Extract params
  const { sport, season_id } = req.query as any

  // Season repository
  const seasonRepo = new SeasonRepository()

  // Find leaders
  return seasonRepo.seasonLeaders(sport, season_id)
}

export default withCachedApiHandler(handler)
