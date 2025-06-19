import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div>
      <span>AuthLayout</span>
      <Outlet />
    </div>
  )
}

export default AuthLayout
