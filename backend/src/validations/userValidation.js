import { z } from 'zod'
import { nameSchema, passwordSchema, confirmPasswordSchema, avatarUrlSchema } from './schemas.js'

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

const changeAvatarSchema = z.object({
  avatarUrl: avatarUrlSchema
})

export const userValidation = {
  changeNameSchema,
  changePasswordSchema,
  changeAvatarSchema
}
