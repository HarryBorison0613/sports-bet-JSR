import type { NextApiRequest, NextApiResponse } from 'next'
import { LeagueRepository } from 'src/repositories/league-repository'
import { withCachedApiHandler } from 'src/utils/api/response'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { sport, category, league_id } = req.query as any

  // Init competition repo
  const leagueRepo = new LeagueRepository()

  // Fetch league summary
  return leagueRepo.leagueSummary(sport, category, league_id)
}

export default withCachedApiHandler(handler)
