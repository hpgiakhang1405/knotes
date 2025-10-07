import { StatusCodes } from 'http-status-codes'
import { statsService } from '../services/statsService.js'

const getOverviewStats = async (req, res, next) => {
  try {
    const data = await statsService.getOverviewStats(req.user.userId)
    res.status(StatusCodes.OK).json({
      message: 'Overview stats fetched successfully',
      stats: data
    })
  } catch (error) {
    next(error)
  }
}

const getTimeSeriesStats = async (req, res, next) => {
  try {
    const { from, to } = req.query
    const data = await statsService.getTimeSeriesStats(req.user.userId, from, to)
    res.status(StatusCodes.OK).json({
      message: 'Time series stats fetched successfully',
      stats: data
    })
  } catch (error) {
    next(error)
  }
}

const getDistributionStats = async (req, res, next) => {
  try {
    const data = await statsService.getDistributionStats(req.user.userId)
    res.status(StatusCodes.OK).json({
      message: 'Distribution stats fetched successfully',
      stats: data
    })
  } catch (error) {
    next(error)
  }
}

const getMostActiveDayStats = async (req, res, next) => {
  try {
    const data = await statsService.getMostActiveDayStats(req.user.userId)
    res.status(StatusCodes.OK).json({
      message: 'Most active day stats fetched successfully',
      stats: data
    })
  } catch (error) {
    next(error)
  }
}

export const statsController = {
  getOverviewStats,
  getTimeSeriesStats,
  getDistributionStats,
  getMostActiveDayStats
}
