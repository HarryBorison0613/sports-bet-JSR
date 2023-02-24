import type { NextApiRequest, NextApiResponse } from 'next/types'
import Axios from 'axios'
import prisma from 'src/lib/prisma'
import jwt from 'jsonwebtoken'

const handleEditProfile = async (req: NextApiRequest, res: NextApiResponse) => {
  const { phonenumber, editName, userName, email, newPassword } = req.body

  const secret_key = process.env.JWT_SECRET_KEY || 'Secret#bets.com.br'

  const myToken = req?.headers?.authorization || ''

  let session_id = ''
  jwt.verify(myToken, secret_key, (err, decoded) => {
    if (err) {
      return res.status(401).json({ msg: 'Token is not valid' })
    } else {
      if (decoded && typeof decoded === 'object') {
        session_id = decoded.session_id
      }
    }
  })

  let updateData = {}
  if (newPassword) {
    updateData = await prisma.user.update({
      where: {
        phonenumber,
      },
      data: {
        name: editName,
        mail: email,
        password: newPassword,
      },
      select: {
        name: true,
        phonenumber: true,
        username: true,
        mail: true,
        type: true,
      },
    })

    if (updateData) {
      const url = `https://api.mollybet.com/v1/customers/${userName}`
      const updateData = JSON.stringify({
        name: `${editName}`,
        password: `${newPassword}`,
      })
      const update_data_config = {
        method: 'patch',
        url: `${url}`,
        headers: {
          'Content-Type': 'application/json',
          Session: `${session_id}`,
        },
        data: updateData,
      }
      const updateUserAccount = await Axios(update_data_config)
      if (updateUserAccount.status === 200) {
        return res.status(200).json({ updateData: updateData })
      } else {
        return res.status(400).json({ error: 'Not Found' })
      }
    } else {
      return res.status(500).json({ error: 'Server Error!' })
    }
  } else {
    updateData = await prisma.user.update({
      where: {
        phonenumber,
      },
      data: {
        name: editName,
        mail: email,
      },
      select: {
        name: true,
        phonenumber: true,
        username: true,
        mail: true,
        type: true,
      },
    })
    if (updateData) {
      const url = `https://api.mollybet.com/v1/customers/${userName}`
      const updateData = JSON.stringify({
        name: `${editName}`,
      })
      const update_data_config = {
        method: 'patch',
        url: `${url}`,
        headers: {
          'Content-Type': 'application/json',
          Session: `${session_id}`,
        },
        data: updateData,
      }
      const updateUserAccount = await Axios(update_data_config)
      if (updateUserAccount.status === 200) {
        return res.status(200).json({ updateData: updateData })
      } else {
        return res.status(400).json({ error: 'Not Found' })
      }
    } else {
      return res.status(500).json({ error: 'Server Error!' })
    }
  }
}

export default handleEditProfile
