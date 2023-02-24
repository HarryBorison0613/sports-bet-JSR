export default async function handler(req, res) {

  const mail = require('@sendgrid/mail');
  const key = process.env.EMAIL_KEY;
  mail.setApiKey(key);
    
    const name = `${req.body.name}`;
    const   amount = `${req.body.amount}`;
    const   currency = `${req.body.value}`;
    const   email = `${req.body.email}`;
    const   pix = `${req.body.pix}`;
    const   message = ` A new windrow request: ${name} \r\n
                    Requested amount: ${amount} ${currency}.\r\n
                    PIX: ${pix}\r\n
                    User email: ${email}`;
  const initiator = {
    to: 'suporte@bets.com.br',
    from: 'suporte@bets.com.br', 
    subject: `Withdraw request from ${name}`,
    text: message,
    html: message.replace(/\r\n/g, '<br>'),
  }

  try {
    await mail.send(initiator)
    res.status(200).json({ error: '' })
  } catch (error) {
    console.error(error);
   
  }

}

// export default async (req, res) => {
//     const PASSWORD = process.env.password
//     const USER = process.env.user
//     let nodemailer = require('nodemailer')
//     const transporter = nodemailer.createTransport({
//         service: "hotmail",
//         auth: {
//             user: USER,
//             pass: PASSWORD
//         }
//     });

//       const mailData = {
//         from: 'bets.com.br@hotmail.com',
//         to: 'bets.com.br@gmail.com',
//         subject: `Message From ${req.body.name}`,
//         text: req.body.message + " | Sent from: " + req.body.email,
//         html: `<div>A new windrow request: ${req.body.name} </br> Requested amount: ${req.body.amount} ${req.body.value}. </br> PIX: ${req.body.pix}</div><p>User email:
//         ${req.body.email}</p>`
//        }

//        try {
//             await transporter.sendMail(mailData, function (err, info) {
//                 if(err)
//                 console.log(err)
//                 else
//                 console.log(info)
//             });
//         } catch (error) {
//             return res.status(error.statusCode || 500).json({ error: error.message });
//         }
//         return res.status(200).json({ error: '' });
//     console.log(req.body)
//   }

