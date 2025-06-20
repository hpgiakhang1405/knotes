import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'

const tabValues = {
  login: 'login',
  signup: 'signup'
}

const AuthForm = ({ onSubmit }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const mode = searchParams.get('mode') === tabValues.signup ? tabValues.signup : tabValues.login

  const handleTabChange = (value) => {
    setSearchParams({ mode: value })
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center space-y-4">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {mode === tabValues.login ? 'Welcome Back!' : "Let's Get Started!"}
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
          {mode === tabValues.login
            ? 'Log in to continue where you left off.'
            : "Just a few quick details and you're in!"}
        </p>
      </div>

      <Tabs defaultValue={mode} className="w-full max-w-sm space-y-8" onValueChange={handleTabChange}>
        <TabsList className="w-full">
          <TabsTrigger value={tabValues.login}>Login</TabsTrigger>
          <TabsTrigger value={tabValues.signup}>Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value={tabValues.login}>
          <LoginForm onSubmit={onSubmit} />
        </TabsContent>
        <TabsContent value={tabValues.signup}>
          <SignUpForm onSubmit={onSubmit} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AuthForm
