import { createBrowserRouter } from 'react-router-dom'

import { routes } from './routes'

import AuthLayout from '~/layouts/AuthLayout'
import MainLayout from '~/layouts/MainLayout'

import ErrorPage from '~/pages/ErrorPage'
import HomePage from '~/pages/HomePage'
import NotesPage from '~/pages/NotesPage'
import AuthPage from '~/pages/AuthPage'
import ArchivedPage from '~/pages/ArchivedPage'
import TrashPage from '~/pages/TrashPage'
import NoteDetailPage from '~/pages/NoteDetailPage'

const router = createBrowserRouter([
  {
    path: routes.home,
    element: <HomePage />,
    errorElement: <ErrorPage />
  },
  {
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: routes.auth,
        element: <AuthPage />
      }
    ]
  },
  {
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: routes.notes,
        element: <NotesPage />
      },
      {
        path: routes.archived,
        element: <ArchivedPage />
      },

      {
        path: routes.trash,
        element: <TrashPage />
      }
    ]
  },
  {
    element: <MainLayout noSearchBox />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: routes.noteDetail,
        element: <NoteDetailPage />
      },

      {
        path: routes.noteArchivedDetail,
        element: <NoteDetailPage />
      },

      {
        path: routes.noteTrashDetail,
        element: <NoteDetailPage />
      }
    ]
  }
])

export default router
