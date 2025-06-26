import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'
import router from './router'

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-center" richColors />
    </>
  )
}

export default App
