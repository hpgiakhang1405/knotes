import { createBrowserRouter } from 'react-router-dom'

import MainLayout from '~/layouts/MainLayout'

import ErrorPage from '~/pages/ErrorPage'
import HomePage from '~/pages/HomePage'
import NotesPage from '~/pages/NotesPage'
import AuthPage from '~/pages/AuthPage'
import AuthLayout from '~/layouts/AuthLayout'

export const routesPath = {
  home: '/',
  auth: '/auth',
  notes: '/notes'
}

const router = createBrowserRouter([
  {
    path: routesPath.home,
    element: <HomePage />,
    errorElement: <ErrorPage />
  },
  {
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [{ path: routesPath.auth, element: <AuthPage /> }]
  },
  {
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [{ path: routesPath.notes, element: <NotesPage /> }]
  }
])

export default router
