import type { NextApiRequest, NextApiResponse } from 'next'
import { TeamRepository } from 'src/repositories/team-repository'
import { withCachedApiHandler } from 'src/utils/api/response'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Extract params
  const { sport, season_id } = req.query as any

  // Create team repo instance
  const teamRepo = new TeamRepository()

  return teamRepo.seasonTeams(sport, season_id)
}

export default withCachedApiHandler(handler)
