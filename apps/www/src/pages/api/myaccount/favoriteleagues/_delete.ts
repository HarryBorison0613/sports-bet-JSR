import type { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from 'src/lib/prisma'

const handleDeleteFavoriteLeagues = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { id, userId } = req.body

  const deleteData = await prisma.myFavoriteLeagues.delete({
    where: {
      id: Number(id),
    },
  })
  if (deleteData) {
    const leaguesData = await prisma.myFavoriteLeagues.findMany({
      where: {
        userId: userId,
      },
    })
    return res
      .status(200)
      .json({ message: 'Successfully delete this!', leaguesData })
  } else {
    return res.status(500).json({ err: 'Not Found' })
  }
}

export default handleDeleteFavoriteLeagues
