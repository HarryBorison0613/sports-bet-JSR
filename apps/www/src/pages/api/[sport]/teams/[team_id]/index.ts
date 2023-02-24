import type { NextApiRequest, NextApiResponse } from 'next'
import { TeamRepository } from 'src/repositories/team-repository'
import { withCachedApiHandler } from 'src/utils/api/response'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req

  // Team repo instance
  const teamRepo = new TeamRepository()

  // Get team summary
  return teamRepo.teamSummary(query?.sport as string, query?.team_id as string)
}

export default withCachedApiHandler(handler)
