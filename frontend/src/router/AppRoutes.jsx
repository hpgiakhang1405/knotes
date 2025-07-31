import React from 'react'
import { Routes, Route } from 'react-router-dom'

import GuestGuard from './GuestGuard'
import AuthGuard from './AuthGuard'

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

const guestRoutes = [
  {
    path: routes.home,
    layout: null,
    layoutProps: {},
    element: HomePage
  },
  {
    path: routes.auth,
    layout: AuthLayout,
    layoutProps: {},
    element: AuthPage
  }
]

const authRoutes = [
  {
    path: routes.notes,
    layout: MainLayout,
    layoutProps: {},
    element: NotesPage
  },
  {
    path: routes.archived,
    layout: MainLayout,
    layoutProps: {},
    element: ArchivedPage
  },
  {
    path: routes.trash,
    layout: MainLayout,
    layoutProps: {},
    element: TrashPage
  },
  {
    path: routes.noteDetail,
    layout: MainLayout,
    layoutProps: { noSearchBox: true },
    element: NoteDetailPage
  },
  {
    path: routes.noteArchivedDetail,
    layout: MainLayout,
    layoutProps: { noSearchBox: true },
    element: NoteDetailPage
  },
  {
    path: routes.noteTrashDetail,
    layout: MainLayout,
    layoutProps: { noSearchBox: true },
    element: NoteDetailPage
  }
]

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<GuestGuard />}>
        {guestRoutes.map((route) => {
          const Layout = route.layout || React.Fragment
          const Child = route.element
          const element = (
            <Layout {...route.layoutProps}>
              <Child />
            </Layout>
          )

          return <Route key={route.path} path={route.path} element={element} />
        })}
      </Route>

      <Route element={<AuthGuard />}>
        {authRoutes.map((route) => {
          const Layout = route.layout || React.Fragment
          const Child = route.element
          const element = (
            <Layout {...route.layoutProps}>
              <Child />
            </Layout>
          )

          return <Route key={route.path} path={route.path} element={element} />
        })}
      </Route>

      <Route path="*" element={<ErrorPage isPageNotFound />} />
    </Routes>
  )
}

export default AppRoutes
