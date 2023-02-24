/** @format */
import twilio from 'twilio'
import type { NextApiRequest, NextApiResponse } from 'next'

const sendMessage = async (req: NextApiRequest, res: NextApiResponse) => {
  const accoundSid = process.env.TWILIO_ACCOUNT_SID
  const token = process.env.TWILIO_AUTH_TOKEN
  const client = twilio(accoundSid, token)

  const recipientPhoneNumber = req.body.phone

  client.verify.v2.services
    .create({ friendlyName: 'BETS', codeLength: 6 })
    .then((service: any) => {
      client.verify.v2
        .services(service.sid)
        .verifications.create({ to: recipientPhoneNumber, channel: 'sms' })
        .then((verification: any) =>
          res.json({
            messageSuccess: true,
            serviceId: verification.serviceSid,
            recipientPhoneNumber: recipientPhoneNumber,
          })
        )
    })
    .catch((err: any) =>
      res.json({ messageSuccess: false, error: 'Server Error' })
    )
}

export default sendMessage
