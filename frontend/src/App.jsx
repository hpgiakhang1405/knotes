import React from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './routes'
import { Toaster } from 'sonner'

const App = () => {
  return (
    <>
      <div className="container mx-auto">
        <RouterProvider router={router} />
      </div>
      <Toaster position="top-center" richColors />
    </>
  )
}

export default App
