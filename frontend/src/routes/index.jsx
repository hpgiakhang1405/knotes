import { createBrowserRouter } from 'react-router-dom'

import MainLayout from '~/layouts/MainLayout'

import ErrorPage from '~/pages/ErrorPage'
import HomePage from '~/pages/HomePage'
import NotesPage from '~/pages/NotesPage'
import AuthPage from '~/pages/AuthPage'

const routesPath = {
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
    path: routesPath.auth,
    element: <AuthPage />,
    errorElement: <ErrorPage />
  },
  {
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [{ path: routesPath.notes, element: <NotesPage /> }]
  }
])

export default router
