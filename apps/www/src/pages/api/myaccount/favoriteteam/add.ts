import type { NextApiRequest, NextApiResponse } from 'next/types'
import prisma from 'src/lib/prisma'
import jwt_decode from 'jwt-decode'

const handleAddFavoriteTeam = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { currentURL, token } = req.body

  const teamURL = currentURL?.split('/')
  const ID = teamURL[teamURL.length - 1]

  const teamName = teamURL[teamURL.length - 2]

  const updateteamName = teamName?.replaceAll('-', ' ')
  const decoded: any = jwt_decode(token)

  let findfavoriteteam = await prisma.myFavoriteTeam.findMany({
    where: {
      userId: Number(decoded.sub),
      OR: { favoriteteamID: ID },
    },
  })

  if (findfavoriteteam.length !== 0) {
    return res.status(208).json({ msg: 'This team has already been added.' })
  }
  let favoriteteam = await prisma.myFavoriteTeam.create({
    data: {
      userId: Number(decoded.sub),
      favoriteteamID: ID,
      favoriteteamURL: currentURL,
      favoriteteamName: updateteamName,
    },
  })

  if (favoriteteam) {
    return res
      .status(200)
      .json({ success: 'Successfully your favorite team add.' })
  }
}

export default handleAddFavoriteTeam
