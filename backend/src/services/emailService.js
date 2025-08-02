import { StatusCodes } from 'http-status-codes'
import ApiError from '../utils/ApiError.js'
import { ENV } from '../config/environment.js'
import { resetPasswordEmailTemplate, verificationEmailTemplate } from '../utils/emailTemplates.js'
import { emailTransporter } from '../config/nodemailer.js'

const sendVerificationEmail = async (email, name, otp) => {
  if (!email || !name || !otp) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Missing required fields')
  }

  const emailOptions = {
    from: `KNotes <${ENV.EMAIL_USERNAME}>`,
    to: email,
    subject: 'Verify Your Email Address',
    html: verificationEmailTemplate(name, otp)
  }

  await emailTransporter.sendMail(emailOptions)
}

const sendResetPasswordEmail = async (email, name, resetLink) => {
  if (!email || !name || !resetLink) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Missing required fields')
  }

  const emailOptions = {
    from: `KNotes <${ENV.EMAIL_USERNAME}>`,
    to: email,
    subject: 'Reset Your Password',
    html: resetPasswordEmailTemplate(name, resetLink)
  }

  await emailTransporter.sendMail(emailOptions)
}

export const emailService = {
  sendVerificationEmail,
  sendResetPasswordEmail
}
