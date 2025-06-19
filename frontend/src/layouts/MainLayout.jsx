import React from 'react'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div>
      <span>MainLayout</span>
      <Outlet />
    </div>
  )
}

export default MainLayout
