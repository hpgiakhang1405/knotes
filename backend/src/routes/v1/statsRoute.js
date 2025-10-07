import express from 'express'
import { statsController } from '../../controllers/statsController.js'
import { verifyUserMiddleware } from '../../middlewares/verifyUserMiddleware.js'

const Router = express.Router()

Router.get('/overview', verifyUserMiddleware, statsController.getOverviewStats)
Router.get('/time-series', verifyUserMiddleware, statsController.getTimeSeriesStats)
Router.get('/distribution', verifyUserMiddleware, statsController.getDistributionStats)
Router.get('/most-active-day', verifyUserMiddleware, statsController.getMostActiveDayStats)

export const statsRoute = Router
