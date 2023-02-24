import type { NextApiRequest, NextApiResponse } from 'next'
import {
  cachedSuccessResponse,
  errorResponse,
  withCachedApiHandler,
} from 'src/utils/api/response'
import { LeagueRepository } from 'src/repositories/league-repository'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Extract sport from query
  const { sport } = req.query

  // League Repository instance
  const leagueRepo = new LeagueRepository()

  // Load most popular leagues
  return leagueRepo.mostPopularLeagues(sport as string)
}

export default withCachedApiHandler(handler)
