import React from 'react'

const ErrorPage = ({ isPageNotFound }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">{isPageNotFound ? '404 - Page Not Found' : 'An Error Occurred'}</h1>
      <p className="text-lg text-gray-600">
        {isPageNotFound
          ? 'The page you are looking for does not exist.'
          : 'Something went wrong. Please try again later.'}
      </p>
    </div>
  )
}

export default ErrorPage
