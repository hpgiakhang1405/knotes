import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import { ENV } from '../config/environment.js'

export const generateAccessToken = (payload) => {
  return jwt.sign(payload, ENV.JWT_ACCESS_SECRET, { expiresIn: '15m' })
}

export const generateRefreshToken = (payload) => {
  return jwt.sign(payload, ENV.JWT_REFRESH_SECRET, { expiresIn: '15d' })
}

export const hashPassword = async (password) => {
  const saltRounds = 10
  return await bcrypt.hash(password, saltRounds)
}

export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword)
}

export const generateAndHashOTP = () => {
  const otp = crypto.randomInt(0, 1000000).toString().padStart(6, '0')
  const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex')
  return { otp, hashedOtp }
}

export const compareOtp = (inputOtp, storedOtp) => {
  const hashedInputOtp = crypto.createHash('sha256').update(inputOtp).digest('hex')
  return hashedInputOtp === storedOtp
}

export const generateResetToken = (token) => {
  const rawToken = token || crypto.randomBytes(32).toString('hex')
  const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex')
  return { rawToken, hashedToken }
}

export const getResetPasswordLink = (rawToken) => {
  return `${ENV.CLIENT_URL}/auth/reset/${rawToken}`
}

export const getExpireTime = (minutes) => {
  return new Date(Date.now() + minutes * 60 * 1000)
}
