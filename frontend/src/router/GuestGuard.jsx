import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useUserStore from '~/stores/userStore'
import { routes } from './routes'

const GuestGuard = () => {
  const { isInitializing, isAuthenticated } = useUserStore()

  if (isInitializing) return <h1>Loading...</h1>

  if (isAuthenticated) {
    return <Navigate to={routes.notes} replace />
  }

  return <Outlet />
}

export default GuestGuard
