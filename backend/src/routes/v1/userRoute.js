import express from 'express'
import { userController } from '../../controllers/userController.js'
import { validateDataMiddleware } from '../../middlewares/validateDataMiddleware.js'
import { userValidation } from '../../validations/userValidation.js'
import { verifyUserMiddleware } from '../../middlewares/verifyUserMiddleware.js'
import { uploadImageMiddleware } from '../../middlewares/uploadImageMiddleware.js'

const Router = express.Router()

Router.route('/me')
  .get(verifyUserMiddleware, userController.getMe)
  .delete(verifyUserMiddleware, userController.deleteAccount)

Router.patch(
  '/me/name',
  verifyUserMiddleware,
  validateDataMiddleware(userValidation.changeNameSchema),
  userController.changeName
)

Router.patch(
  '/me/password',
  verifyUserMiddleware,
  validateDataMiddleware(userValidation.changePasswordSchema),
  userController.changePassword
)

Router.patch('/me/avatar', verifyUserMiddleware, uploadImageMiddleware, userController.changeAvatar)

export const userRoute = Router
