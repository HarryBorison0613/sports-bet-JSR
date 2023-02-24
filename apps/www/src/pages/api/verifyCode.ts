/** @format */

import twilio from 'twilio'
import type { NextApiRequest, NextApiResponse } from 'next'

const verifyCode = async (req: NextApiRequest, res: NextApiResponse) => {
  const { verifyCode, recipientPhoneNumber, serviceId } = req.body

  const accoundSid = process.env.TWILIO_ACCOUNT_SID
  const token = process.env.TWILIO_AUTH_TOKEN
  const client = twilio(accoundSid, token)

  client.verify.v2
    .services(serviceId)
    .verificationChecks.create({ to: recipientPhoneNumber, code: verifyCode })
    .then((verification_code: any) => {
      return res.json({ verifyStatus: verification_code.valid })
    })
    .catch((err: any) => {
      return res.json({ error: 'verification is incorrect' })
    })
}

export default verifyCode
