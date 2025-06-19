import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { Button } from '~/components/ui/button'
import router from './routes'

const App = () => {
  return <RouterProvider router={router} />
}

export default App
