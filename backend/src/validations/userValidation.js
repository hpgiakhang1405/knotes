import { z } from 'zod'
import { nameSchema, passwordSchema, confirmPasswordSchema } from './schemas.js'

const changeNameSchema = z.object({
  name: nameSchema
})

const changePasswordSchema = z
  .object({
    currentPassword: passwordSchema,
    newPassword: passwordSchema,
    confirmNewPassword: confirmPasswordSchema
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    path: ['confirmNewPassword'],
    message: 'New passwords do not match'
  })

export const userValidation = {
  changeNameSchema,
  changePasswordSchema
}
