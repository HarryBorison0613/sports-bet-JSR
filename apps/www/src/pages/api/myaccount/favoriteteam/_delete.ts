import type { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from 'src/lib/prisma'

const handleDeleteFavoriteTeam = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { id, userId } = req.body

  const deleteData = await prisma.myFavoriteTeam.delete({
    where: {
      id: Number(id),
    },
  })
  if (deleteData) {
    const teamData = await prisma.myFavoriteTeam.findMany({
      where: {
        userId: userId,
      },
    })
    return res
      .status(200)
      .json({ message: 'Successfully delete this!', teamData })
  } else {
    return res.status(500).json({ err: 'Not Found' })
  }
}

export default handleDeleteFavoriteTeam
