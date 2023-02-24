import type { NextApiRequest, NextApiResponse } from 'next'
import { SeasonRepository } from 'src/repositories/season-repository'
import { withCachedApiHandler } from 'src/utils/api/response'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { sport, season_id } = req.query

  // Create season repository instance
  const seasonRepo = new SeasonRepository()

  // Parse season standings
  return seasonRepo.seasonStandingsSummary(sport as any, season_id as any)
}

export default withCachedApiHandler(handler)
