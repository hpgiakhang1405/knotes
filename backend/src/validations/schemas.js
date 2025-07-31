import { z } from 'zod'

export const nameSchema = z.string().trim().min(1, 'Name is required')

export const emailSchema = z.string().trim().toLowerCase().min(1, 'Email is required').email('Invalid email address')

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters long')
  .max(64, 'Password must not exceed 64 characters')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^a-zA-Z0-9]/, 'Password must contain at least one special character')

export const confirmPasswordSchema = z.string().min(1, 'Please confirm your password')

export const acceptTermsSchema = z.boolean().refine((val) => val === true, {
  message: 'You must accept the terms and conditions'
})

export const otpSchema = z.string().trim().length(6, 'OTP must be exactly 6 characters long')
