import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { Toaster } from 'sonner'
import AppRoutes from './router/AppRoutes'
import ErrorPage from './pages/ErrorPage'

import ThemeProvider from './providers/ThemeProvider'
import QueryProvider from './providers/QueryProvider'
import AuthProvider from './providers/AuthProvider'

const App = () => {
  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <BrowserRouter>
        <ThemeProvider>
          <QueryProvider>
            <AuthProvider>
              <AppRoutes />
              <Toaster position="top-center" richColors />
            </AuthProvider>
          </QueryProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
