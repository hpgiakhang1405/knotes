import express from 'express'
import { authController } from '../../controllers/authController.js'
import { validateDataMiddleware } from '../../middlewares/validateDataMiddleware.js'
import { authValidation } from '../../validations/authValidation.js'

const Router = express.Router()

Router.post('/register', validateDataMiddleware(authValidation.registerSchema), authController.register)
Router.post('/verify-otp', validateDataMiddleware(authValidation.verifyOtpSchema), authController.verifyOtp)
Router.post('/resend-otp', validateDataMiddleware(authValidation.resendOtpSchema), authController.resendOtp)
Router.post('/login', validateDataMiddleware(authValidation.loginSchema), authController.login)
Router.post('/logout', authController.logout)
Router.post('/refresh-token', authController.refreshAccessToken)
Router.post(
  '/forgot-password',
  validateDataMiddleware(authValidation.forgotPasswordSchema),
  authController.forgotPassword
)
Router.post(
  '/reset-password/:token',
  validateDataMiddleware(authValidation.resetPasswordSchema),
  authController.resetPassword
)

export const authRoute = Router
