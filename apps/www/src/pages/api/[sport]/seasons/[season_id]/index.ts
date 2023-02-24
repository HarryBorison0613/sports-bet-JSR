import { NextApiRequest, NextApiResponse } from 'next'
import { SeasonRepository } from 'src/repositories/season-repository'
import { withCachedApiHandler } from 'src/utils/api/response'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { sport, season_id } = req.query

  // Season repo
  const seasonRepo = new SeasonRepository()

  // Season summary result
  return seasonRepo.seasonSummary(sport as string, season_id as string)
}

export default withCachedApiHandler(handler)
