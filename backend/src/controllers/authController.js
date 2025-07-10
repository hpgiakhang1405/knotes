import express from 'express'

const login = (req, res, next) => {
  try {
    res.status(200).json({ message: 'Login successful' })
  } catch (error) {
    next(error)
  }
}

export const authController = {
  login
}
