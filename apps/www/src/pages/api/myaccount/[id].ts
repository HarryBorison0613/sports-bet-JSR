import type { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from 'src/lib/prisma'

const handleGetMyAccount = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === 'GET') {
    const { id } = req.query

    let myInfo = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        name: true,
        phonenumber: true,
        username: true,
        type: true,
        mail: true,
      },
    })

    const FavoriteTeam = await prisma.myFavoriteTeam.findMany({
      where: {
        userId: Number(id),
      },
    })
    const FavoritesLeagues = await prisma.myFavoriteLeagues.findMany({
      where: {
        userId: Number(id),
      },
    })

    if (!myInfo) {
      return res.status(400).json({ errors: 'Not found' })
    } else {
      if (myInfo.type === 'customer') {
        return res.status(200).json({
          data: myInfo,
          favoriteTeams: FavoriteTeam,
          favoriteLeagues: FavoritesLeagues,
        })
      } else {
        const allInfo = await prisma.user.findMany({
          where: {
            referral: myInfo.name,
          },
          select: {
            createdAt: true,
            username: true,
          },
          orderBy: {
            createdAt: 'asc',
          },
        })
        if (allInfo) {
          return res.status(200).json({
            data: myInfo,
            allUser: allInfo,
            favoriteTeams: FavoriteTeam,
            favoriteLeagues: FavoritesLeagues,
          })
        } else {
          return res.status(500).json({ error: 'Not found' })
        }
      }
    }
  }
}

export default handleGetMyAccount
