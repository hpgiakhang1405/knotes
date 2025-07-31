import { StatusCodes } from 'http-status-codes'
import { userService } from '../services/userService.js'
import { ENV } from '../config/environment.js'

const getMe = async (req, res, next) => {
  try {
    const user = await userService.getMe(req.user.userId)

    res.status(StatusCodes.OK).json(user)
  } catch (error) {
    next(error)
  }
}

const changeName = async (req, res, next) => {
  try {
    await userService.changeName(req.user.userId, req.body.name)

    res.status(StatusCodes.OK).json({
      message: 'Name changed successfully'
    })
  } catch (error) {
    next(error)
  }
}

const changePassword = async (req, res, next) => {
  try {
    await userService.changePassword(req.user.userId, req.body)

    res.status(StatusCodes.OK).json({
      message: 'Password changed successfully'
    })
  } catch (error) {
    next(error)
  }
}

const changeAvatar = async (req, res, next) => {
  try {
    await userService.changeAvatar(req.user.userId, req.file)

    res.status(StatusCodes.OK).json({
      message: 'Avatar changed successfully'
    })
  } catch (error) {
    next(error)
  }
}

const deleteAccount = async (req, res, next) => {
  try {
    await userService.deleteAccount(req.user.userId)

    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: ENV.NODE_ENV === 'production',
      sameSite: 'Strict'
    })

    res.status(StatusCodes.OK).json({
      message: 'Account deleted successfully'
    })
  } catch (error) {
    next(error)
  }
}

export const userController = {
  getMe,
  changeName,
  changePassword,
  deleteAccount,
  changeAvatar
}
