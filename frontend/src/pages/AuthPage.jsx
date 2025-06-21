import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'
import LoginForm from '~/components/LoginForm'
import SignUpForm from '~/components/SignUpForm'

const tabValues = {
  login: 'login',
  signup: 'signup'
}

const AuthPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const mode = searchParams.get('mode') === tabValues.signup ? tabValues.signup : tabValues.login

  const handleTabChange = (value) => {
    setSearchParams({ mode: value })
  }

  const onSubmit = (data) => {
    toast('You submitted the following values', {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      )
    })
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

      <Tabs defaultValue={mode} className="w-full max-w-md space-y-8" onValueChange={handleTabChange}>
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

export default AuthPage
