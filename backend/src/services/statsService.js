import Note from '../models/noteModel.js'
import mongoose from 'mongoose'

const getOverviewStats = async (userId) => {
  const total = await Note.countDocuments({ userId })
  const byStateAgg = await Note.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(userId) } },
    { $group: { _id: '$state', count: { $sum: 1 } } }
  ])
  const byState = byStateAgg.reduce((acc, curr) => {
    acc[curr._id] = curr.count
    return acc
  }, {})
  const pinned = await Note.countDocuments({ userId, isPinned: true })

  return {
    total,
    byState,
    pinned
  }
}

const getTimeSeriesStats = async (userId, from, to) => {
  const fromDate = from ? new Date(from) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  const toDate = to ? new Date(to) : new Date()
  fromDate.setHours(0, 0, 0, 0)
  toDate.setHours(23, 59, 59, 999)
  const agg = await Note.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(userId), createdAt: { $gte: fromDate, $lte: toDate } } },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
        count: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } },
    { $project: { _id: 0, date: '$_id', count: 1 } }
  ])
  return agg
}

const getDistributionStats = async (userId) => {
  const agg = await Note.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(userId) } },
    { $unwind: '$tags' },
    {
      $group: {
        _id: '$tags',
        count: { $sum: 1 }
      }
    },
    { $sort: { count: -1 } },
    { $project: { _id: 0, tag: '$_id', count: 1 } }
  ])
  return agg
}

const getMostActiveDayStats = async (userId) => {
  const agg = await Note.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(userId) } },
    {
      $group: {
        _id: { $dayOfWeek: { date: '$createdAt' } },
        count: { $sum: 1 }
      }
    },
    { $sort: { count: -1 } },
    { $project: { _id: 0, dateOfWeek: '$_id', count: 1 } }
  ])
  return agg
}

export const statsService = {
  getOverviewStats,
  getTimeSeriesStats,
  getDistributionStats,
  getMostActiveDayStats
}
