import React, { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'
import router from './router'
import { useTheme } from './hooks/useTheme'

const App = () => {
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setTheme(theme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-center" richColors />
    </>
  )
}

export default App
