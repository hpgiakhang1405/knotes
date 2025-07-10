import express from 'express'
import { authController } from '../../controllers/authController.js'

const Router = express.Router()

Router.get('/login', authController.login)

export const authRoute = Router
