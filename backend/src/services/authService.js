import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import ApiError from '../utils/ApiError.js'
import {
  compareOtp,
  comparePassword,
  generateAndHashOTP,
  getExpireTime,
  hashPassword,
  generateAccessToken,
  generateRefreshToken,
  generateResetToken,
  getResetPasswordLink
} from '../utils/helpers.js'

const register = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email })

  if (existingUser) {
    throw new ApiError(StatusCodes.CONFLICT, 'Email is already registered')
  }

  const hashedPassword = await hashPassword(password)
  const hashedOtp = generateAndHashOTP()
  const otpExpires = getExpireTime(5)

  const user = new User({
    name,
    email,
    password: hashedPassword,
    otp: hashedOtp,
    otpExpires
  })

  await user.save()
}

const verifyOtp = async ({ email, otp }) => {
  const user = await User.findOne({ email })

  if (!user) throw new ApiError(StatusCodes.NOT_FOUND, 'User not found')

  if (user.isVerified) throw new ApiError(StatusCodes.BAD_REQUEST, 'User is already verified')

  if (!user.otp || !user.otpExpires || user.otpExpires < new Date()) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid or expired OTP')
  }

  const isOtpValid = compareOtp(otp, user.otp)
  if (!isOtpValid) throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid OTP')

  user.isVerified = true
  user.otp = undefined
  user.otpExpires = undefined

  await user.save()
}

const resendOtp = async ({ email }) => {
  const user = await User.findOne({ email })

  if (!user) throw new ApiError(StatusCodes.NOT_FOUND, 'User not found')

  if (user.isVerified) throw new ApiError(StatusCodes.BAD_REQUEST, 'User is already verified')

  const hashedOtp = generateAndHashOTP()
  const otpExpires = getExpireTime(5)

  user.otp = hashedOtp
  user.otpExpires = otpExpires

  await user.save()
}

const login = async ({ email, password }) => {
  const user = await User.findOne({ email })
  if (!user) throw new ApiError(StatusCodes.UNAUTHORIZED, 'Email or password is incorrect')

  const isPasswordValid = await comparePassword(password, user.password)
  if (!isPasswordValid) throw new ApiError(StatusCodes.UNAUTHORIZED, 'Email or password is incorrect')

  if (!user.isVerified) {
    if (!user.otp || !user.otpExpires || user.otpExpires < new Date()) {
      const hashedOtp = generateAndHashOTP()
      const otpExpires = getExpireTime(5)

      user.otp = hashedOtp
      user.otpExpires = otpExpires

      await user.save()
    }

    return {
      requiresVerification: true
    }
  }

  const accessToken = generateAccessToken({ userId: user._id })
  const refreshToken = generateRefreshToken({ userId: user._id })

  return { accessToken, refreshToken }
}

export const refreshAccessToken = async (refreshToken) => {
  if (!refreshToken) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Refresh token is required')
  }

  const { userId } = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
    if (err) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid refresh token')
    }
    return decoded
  })

  const user = await User.findById(userId)
  if (!user) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'User not found')
  }

  const newAccessToken = generateAccessToken({ userId: user._id })
  return { accessToken: newAccessToken }
}

const forgotPassword = async (email) => {
  const user = await User.findOne({ email })

  if (!user) return

  const { rawToken, hashedToken } = generateResetToken()
  const resetPasswordExpires = getExpireTime(10)

  user.resetPasswordToken = hashedToken
  user.resetPasswordExpires = resetPasswordExpires

  await user.save()

  const resetLink = getResetPasswordLink(rawToken)
  console.log(resetLink)
}

const resetPassword = async (rawToken, { newPassword }) => {
  const { hashedToken } = generateResetToken(rawToken)
  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: new Date() }
  })

  if (!user) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid or expired password reset token')
  }

  user.password = await hashPassword(newPassword)
  user.resetPasswordToken = undefined
  user.resetPasswordExpires = undefined

  await user.save()
}

export const authService = {
  register,
  verifyOtp,
  resendOtp,
  login,
  refreshAccessToken,
  forgotPassword,
  resetPassword
}
