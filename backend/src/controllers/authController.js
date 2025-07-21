import { StatusCodes } from 'http-status-codes'
import { authService } from '../services/authService.js'
import { ENV } from '../config/environment.js'

const register = async (req, res, next) => {
  try {
    await authService.register(req.body)

    res.status(StatusCodes.CREATED).json({
      message: 'User registered successfully. Please check your email for the OTP to verify your account.'
    })
  } catch (error) {
    next(error)
  }
}

const verifyOtp = async (req, res, next) => {
  try {
    await authService.verifyOtp(req.body)

    res.status(StatusCodes.OK).json({
      message: 'OTP verified successfully'
    })
  } catch (error) {
    next(error)
  }
}

const resendOtp = async (req, res, next) => {
  try {
    await authService.resendOtp(req.body)

    res.status(StatusCodes.OK).json({
      message: 'OTP resent successfully. Please check your email.'
    })
  } catch (error) {
    next(error)
  }
}

const login = async (req, res, next) => {
  try {
    const result = await authService.login(req.body)

    if (result.requiresVerification) {
      return res.status(StatusCodes.OK).json({
        ...result,
        message: 'User is not verified. Please verify your account using the OTP sent to your email.'
      })
    }

    const { accessToken, refreshToken } = result

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: ENV.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 15 * 24 * 60 * 60 * 1000 // 15 days
    })

    res.status(StatusCodes.OK).json({
      message: 'Login successful',
      accessToken
    })
  } catch (error) {
    next(error)
  }
}

const logout = async (req, res, next) => {
  try {
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: ENV.NODE_ENV === 'production',
      sameSite: 'Strict'
    })

    res.status(StatusCodes.OK).json({
      message: 'Logged out successfully'
    })
  } catch (error) {
    next(error)
  }
}

const refreshAccessToken = async (req, res, next) => {
  try {
    const { accessToken } = await authService.refreshAccessToken(req.cookies?.refreshToken)

    res.status(StatusCodes.OK).json({
      message: 'Token refreshed successfully',
      accessToken
    })
  } catch (error) {
    next(error)
  }
}

const forgotPassword = async (req, res, next) => {
  try {
    await authService.forgotPassword(req.body.email)

    res.status(StatusCodes.OK).json({
      message: 'If the email is registered, a password reset link has been sent to your email.'
    })
  } catch (error) {
    next(error)
  }
}

const resetPassword = async (req, res, next) => {
  try {
    await authService.resetPassword(req.params.token, req.body)

    res.status(StatusCodes.OK).json({
      message: 'Password reset successfully'
    })
  } catch (error) {
    next(error)
  }
}

export const authController = {
  register,
  verifyOtp,
  resendOtp,
  login,
  logout,
  refreshAccessToken,
  forgotPassword,
  resetPassword
}
