/** @format */

import twilio from 'twilio'
import { generateRandomPassword } from '../../config/random'
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import prisma from '../../lib/prisma'

const userCreate = async (req: NextApiRequest, res: NextApiResponse) => {
  const accoundSid = process.env.TWILIO_ACCOUNT_SID
  const token = process.env.TWILIO_AUTH_TOKEN
  const serviceId = process.env.TWILIO_SERVICE_ID
  const client = twilio(accoundSid, token)

  let createsuccess_digital = false
  let createsuccess_mollybet = false
  let error = ''

  let message = ''
  const { recipientPhoneNumber, data, ref } = req.body

  let userName = ''
  let referral = ''
  const realname = data.name.trim()
  const password = generateRandomPassword(12)
  const ccy_code = 'BRL'
  const usertype = 'customer'

  if (ref) {
    referral = '' + ref
  } else {
    referral = 'none'
  }

  // if (data.username) {
  //   userName = `BETS_${data.username.trim()}`
  // } else {
  //   userName = `BETS_${recipientPhoneNumber.slice(
  //     1,
  //     recipientPhoneNumber.length
  //   )}`
  // }

  let currentDate = new Date()
  let currentTime =
    currentDate.getFullYear() +
    '' +
    (currentDate.getMonth() + 1) +
    '' +
    currentDate.getDate() +
    '' +
    currentDate.getHours() +
    '' +
    currentDate.getMinutes() +
    '' +
    currentDate.getSeconds()

  if (realname === 'BETS_TEST') {
    userName = `BETS_${currentTime}`
  } else {
    userName = `BETS${recipientPhoneNumber.slice(
      1,
      recipientPhoneNumber.length
    )}`
  }

  message = `Obrigado por se inscrever com Bets!
    Assista nosso video sobre como comecar a apostar aqui:
    https://stats.bets.com.br/success/
    Seu nome de usuario e:
    ${userName}
    Sua senha e:
    ${password}`

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

  await axios(loginConfig)
    .then(async (response: any) => {
      const session_id = response.data.data

      if (session_id) {
        const myJSON = JSON.stringify({
          username: `${userName}`,
          password: `${password}`,
          group_id: '1761',
          name: `${realname}`,
          ccy_code: 'BRL',
          roles: {
            bet_placer: true,
            trade_page_viewer: true,
            customer: true,
          },
        })

        const create_account_config = {
          method: 'post',
          url: 'https://api.mollybet.com/v1/customers/',
          headers: {
            'Content-Type': 'application/json',
            Session: `${session_id}`,
          },
          data: myJSON,
        }

        await axios(create_account_config)
          .then((response: any) => {
            if (response.status === 200) {
              createsuccess_mollybet = true
            }
          })
          .catch((err: any) => {
            if (err.response?.data?.data?.validation_errors?.username[0]) {
              error = 'Nome de usuário já utilizado'
            } else {
              error = 'Insira o código de verificação.'
            }
            createsuccess_digital = false
          })
      }
    })
    .catch((err) => {
      createsuccess_mollybet = false
    })

  await prisma.user
    .upsert({
      where: {
        phonenumber: recipientPhoneNumber,
      },
      update: {
        name: realname,
        username: userName,
        password: password,
      },
      create: {
        name: realname,
        username: userName,
        phonenumber: recipientPhoneNumber,
        password: password,
        ccy_code: ccy_code,
        referral: referral,
        type: usertype,
      },
    })
    .then((result: any) => {
      createsuccess_digital = true
    })
    .catch((err: any) => {
      createsuccess_digital = false
      error = 'Database disconnect'
    })

  if (createsuccess_mollybet && createsuccess_digital) {
    client.messages
      .create({
        body: message,
        from: '+18125944536',
        to: recipientPhoneNumber,
      })
      .then((message) => {
        res.json({
          registermessage: true,
          name: realname,
          username: userName,
          phonenumber: recipientPhoneNumber,
        })
      })
      .catch((err) => {
        res.json({ registermessage: false, error: err })
      })
  } else {
    return res.json({ registermessage: false, error: error })
  }
}

export default userCreate
