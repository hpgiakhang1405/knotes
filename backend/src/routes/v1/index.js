import express from 'express'
import { StatusCodes } from 'http-status-codes'

import { authRoute } from './authRoute.js'
import { userRoute } from './userRoute.js'
import { uploadRoute } from './uploadRoute.js'

const Router = express.Router()

Router.get('/', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'Welcome to Knotes API' })
})

Router.use('/auth', authRoute)
Router.use('/user', userRoute)
Router.use('/upload', uploadRoute)

export const APIs_V1 = Router
