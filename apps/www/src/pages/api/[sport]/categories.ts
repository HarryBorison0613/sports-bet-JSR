import type { NextApiRequest, NextApiResponse } from 'next'
import { LeagueRepository } from 'src/repositories/league-repository'
import { withCachedApiHandler } from 'src/utils/api/response'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Extract sport from query
  const { sport } = req.query

  // League repo
  const leagueRepo = new LeagueRepository()

  // Find competitions
  return leagueRepo.competitionCategories(sport as string)
}

export default withCachedApiHandler(handler)
