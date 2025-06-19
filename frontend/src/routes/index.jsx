import { createBrowserRouter } from 'react-router-dom'

import MainLayout from '~/layouts/MainLayout'
import AuthLayout from '~/layouts/AuthLayout'

import ErrorPage from '~/pages/ErrorPage'
import HomePage from '~/pages/HomePage'
import LoginPage from '~/pages/LoginPage'
import SignUpPage from '~/pages/SignUpPage'
import NotesPage from '~/pages/NotesPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorPage />
  },
  {
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/signup', element: <SignUpPage /> }
    ]
  },
  {
    path: '/notes',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [{ path: '', element: <NotesPage /> }]
  }
])

export default router
