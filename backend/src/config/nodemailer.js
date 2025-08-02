import nodemailer from 'nodemailer'
import { ENV } from './environment.js'

export const emailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: ENV.EMAIL_USERNAME,
    pass: ENV.EMAIL_PASSWORD
  }
})
