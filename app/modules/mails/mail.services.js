import nodemailer from 'nodemailer'
import { envs } from '../../../utils/constants.js'

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: envs.EMAIL_USER,
    pass: envs.EMAIL_PASSWORD
  }
})

export async function sendEmail (to, subject, text, type) {
  const info = await transporter.sendMail({
    from: envs.EMAIL_USER,
    to,
    subject,
    [type]: text
  })

  return info
}
