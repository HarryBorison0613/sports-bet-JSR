import type { NextApiRequest, NextApiResponse } from 'next'

const contact = async (req: NextApiRequest, res: NextApiResponse) => {
  const mail = require('@sendgrid/mail')
  const key = process.env.EMAIL_KEY
  mail.setApiKey(key)

  const name = `${req.body.name}`
  const username = `${req.body.username}`
  const phone = `${req.body.phone}`
  const message = ` A new user registered\r\n
                    Name: ${name} \r\n
                    Username: ${username}\r\n
                    Phone: ${phone}`
  const initiator = {
    to: 'suporte@bets.com.br',
    from: 'suporte@bets.com.br',
    subject: 'O usuário foi cadastrado no site www.Bets.com.br!',
    text: message,
    html: message.replace(/\r\n/g, '<br>'),
  }

  try {
    await mail.send(initiator)
    res.status(200).json({ error: '' })
  } catch (error) {
    console.error(error)
  }
}

export default contact
