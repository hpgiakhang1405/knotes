import express from 'express'
import { StatusCodes } from 'http-status-codes'

import { authRoute } from './authRoute.js'
import { userRoute } from './userRoute.js'
import { uploadRoute } from './uploadRoute.js'
import { noteRoute } from './noteRoute.js'
import { statsRoute } from './statsRoute.js'

const Router = express.Router()

Router.get('/', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'Welcome to Knotes API' })
})

Router.use('/auth', authRoute)
Router.use('/user', userRoute)
Router.use('/upload', uploadRoute)
Router.use('/note', noteRoute)
Router.use('/stats', statsRoute)

export const APIs_V1 = Router
