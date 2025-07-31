import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useUserStore from '~/stores/userStore'
import { routes } from './routes'

const AuthGuard = () => {
  const { isInitializing, isAuthenticated } = useUserStore()

  if (isInitializing) return <h1>Loading...</h1>

  if (!isAuthenticated) {
    return <Navigate to={routes.auth} replace />
  }

  return <Outlet />
}

export default AuthGuard
