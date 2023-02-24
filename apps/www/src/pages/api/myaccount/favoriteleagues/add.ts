import type { NextApiRequest, NextApiResponse } from 'next/types'
import prisma from 'src/lib/prisma'
import jwt_decode from 'jwt-decode'

const handleAddFavoriteLeagues = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { currentURL, token } = req.body

  const leagueURL = currentURL?.split('/')
  const ID = leagueURL[leagueURL.length - 3]

  const leagueName = leagueURL[leagueURL.length - 2]

  const updateLeagueName = leagueName?.replaceAll('-', ' ')
  const decoded: any = jwt_decode(token)

  let findfavoriteleague = await prisma.myFavoriteLeagues.findMany({
    where: {
      userId: Number(decoded.sub),
      OR: { favoriteleaguesID: ID },
    },
  })

  if (findfavoriteleague.length !== 0) {
    return res.status(208).json({ msg: 'This league has already been added.' })
  }
  let favoriteleague = await prisma.myFavoriteLeagues.create({
    data: {
      userId: Number(decoded.sub),
      favoriteleaguesID: ID,
      favoriteleaguesURL: currentURL,
      favoriteleaguesName: updateLeagueName,
    },
  })

  if (favoriteleague) {
    return res
      .status(200)
      .json({ success: 'Successfully your favorite league add.' })
  }
}

export default handleAddFavoriteLeagues
