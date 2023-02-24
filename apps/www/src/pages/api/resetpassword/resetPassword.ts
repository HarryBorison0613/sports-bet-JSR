import type { NextApiRequest, NextApiResponse } from 'next/types'
import twilio from 'twilio'
import Axios from 'axios'

import prisma from 'src/lib/prisma'
import { generateRandomPassword } from 'src/config/random'

const handleResetPassword = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const accoundSid = process.env.TWILIO_ACCOUNT_SID
  const token = process.env.TWILIO_AUTH_TOKEN
  const serviceId = process.env.TWILIO_SERVICE_ID
  const client = twilio(accoundSid, token)

  const { username, phonenumber } = req.body

  let message = ''

  let resetPasswordMessage = false
  const password = generateRandomPassword(12)

  const resetpassword = await prisma.user.update({
    where: {
      username,
    },
    data: {
      password: password,
    },
  })
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
  const session_id = await Axios(loginConfig)

  if (resetpassword) {
    message = `Sua senha de redefinição de conta:
    ${password}`

    await client.messages
      .create({
        body: message,
        from: '+18125944536',
        to: phonenumber,
      })
      .then((message) => {
        resetPasswordMessage = true
      })
      .catch((err) => (resetPasswordMessage = false))

    if (session_id.data.data) {
      const url = `https://api.mollybet.com/v1/customers/${username}`
      const resetPasswordJSON = JSON.stringify({
        password: `${password}`,
      })
      const reset_password_config = {
        method: 'patch',
        url: `${url}`,
        headers: {
          'Content-Type': 'application/json',
          Session: `${session_id.data.data}`,
        },
        data: resetPasswordJSON,
      }

      const resetPasswordMollyBet = await Axios(reset_password_config)

      if (resetPasswordMessage && resetPasswordMollyBet.status === 200) {
        return res.status(200).json({ message: 'Successfully reset password!' })
      } else if (resetPasswordMollyBet.status === 400) {
        return res.status(400).json({ error: 'Not Found your account!' })
      } else {
        return res.status(500).json({ error: 'Server Error!' })
      }
    }
  } else {
    return res.status(500).json({ error: 'Server error!' })
  }
}

export default handleResetPassword
