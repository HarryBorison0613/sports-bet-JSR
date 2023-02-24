import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import Axios from 'axios'
import prisma from 'src/lib/prisma'
const jwtSecretKey = process.env.JWT_SECRET_KEY || '123SecreteKEY!@#'

const handleLogin = async (req: NextApiRequest, res: NextApiResponse) => {
  const { username, password } = req.body

  let data: object = {}
  let userInfo = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!userInfo) {
    return res
      .status(400)
      .json({ errors: 'Username or Password is incorrect!' })
  } else {
    if (userInfo.password !== password) {
      return res
        .status(400)
        .json({ errors: 'Username or Password is incorrect!' })
    } else {
      const loginJSON = JSON.stringify({
        username: `${process.env.MOLLYBET_USERNAME}`,
        password: `${process.env.MOLLYBET_PASSWORD}`,
      })

      const loginConfig = {
        method: 'post',
        url: 'https://api.mollybet.com/v1/sessions/',
        headers: {
          'Content-Type': 'application/json',
        },
        data: loginJSON,
      }

      const session_id_data = await Axios(loginConfig)

      const session_id = session_id_data?.data?.data

      const favoriteTeam = await prisma.myFavoriteTeam.findMany({
        where: {
          userId: userInfo.id,
        },
      })
      const favoriteLeagues = await prisma.myFavoriteLeagues.findMany({
        where: {
          userId: userInfo.id,
        },
      })
      if (userInfo.type === 'customer') {
        data = {
          id: userInfo.id,
          name: userInfo.name,
          phonenumber: userInfo.phonenumber,
          type: userInfo.type,
          mail: userInfo.mail,
          username: userInfo.username,
        }
        const token = jwt.sign(
          { sub: userInfo.id, session_id: session_id },
          jwtSecretKey,
          {
            expiresIn: '24h',
          }
        )
        return res.status(200).json({
          token: token,
          data: data,
          allUser: undefined,
          FavoriteTeam: favoriteTeam,
          FavoriteLeagues: favoriteLeagues,
        })
      } else {
        data = {
          id: userInfo.id,
          name: userInfo.name,
          username: userInfo.username,
          phonenumber: userInfo.phonenumber,
          type: userInfo.type,
          date: userInfo.createdAt,
          mail: userInfo.mail,
        }
        const allUserInfo = await prisma.user.findMany({
          where: {
            referral: userInfo.name,
          },
          select: {
            createdAt: true,
            username: true,
          },
          orderBy: {
            createdAt: 'asc',
          },
        })
        const token = jwt.sign(
          { sub: userInfo.id, session_id: session_id },
          jwtSecretKey,
          {
            expiresIn: '24h',
          }
        )
        return res.status(200).json({
          token: token,
          data: data,
          allUser: allUserInfo,
          FavoriteTeam: favoriteTeam,
          FavoriteLeagues: favoriteLeagues,
        })
      }
    }
  }
}

export default handleLogin
