const nodemailer = require('nodemailer')
const mg = require('nodemailer-mailgun-transport')

const mailSender = async (data) => {
  const auth = {
    auth: {
      api_key: '4ba8a8f14fbb741a2de9715a06415380-9ad3eb61-7d73672f',
      domain: 'sandbox99c926a97cf24783a68d6ca217260884.mailgun.org',
    },
  }
  const transporter = nodemailer.createTransport(mg(auth))
  return await transporter.sendMail(data)

}
module.exports = mailSender
