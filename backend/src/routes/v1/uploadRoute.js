import express from 'express'
import { uploadImageMiddleware } from '../../middlewares/uploadImageMiddleware.js'
import { verifyUserMiddleware } from '../../middlewares/verifyUserMiddleware.js'
import { uploadController } from '../../controllers/uploadController.js'

const Router = express.Router()

Router.post('/image', verifyUserMiddleware, uploadImageMiddleware, uploadController.uploadImage)

export const uploadRoute = Router
