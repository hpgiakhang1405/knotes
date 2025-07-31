import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'
import LoginForm from '~/components/LoginForm'
import SignUpForm from '~/components/SignUpForm'
import VerifyOTPDialog from '~/components/VerifyOTPDialog'
import { useAuthApi } from '~/hooks/apis/useAuthApi'
import { getErrorMessage } from '~/lib/utils'
import useUserStore from '~/stores/userStore'

const tabValues = {
  login: 'login',
  signup: 'signup'
}

const AuthPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const mode = searchParams.get('mode') === tabValues.signup ? tabValues.signup : tabValues.login

  const [verifyEmail, setVerifyEmail] = useState('')
  const [verifyPassword, setVerifyPassword] = useState('')
  const [verifyOpen, setVerifyOpen] = useState(false)

  const { signupMutation, loginMutation, verifyOTPMutation, resendOtpMutation } = useAuthApi()

  const { setToken } = useUserStore()

  const handleTabChange = (value) => {
    setSearchParams({ mode: value })
  }

  const handleSignUp = async (data) => {
    try {
      const res = await signupMutation.mutateAsync(data)
      toast.success(res.data.message)
      setVerifyEmail(data.email)
      setVerifyPassword(data.password)
      setVerifyOpen(true)
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  const handleLogin = async (data) => {
    try {
      const res = await loginMutation.mutateAsync(data)

      if (!res.data.requiresVerification) {
        toast.success(res.data.message)
        setToken(res.data.accessToken)
        return
      }

      toast.warning(res.data.message)
      setVerifyEmail(data.email)
      setVerifyPassword(data.password)
      setVerifyOpen(true)
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  const handleVerifyOTP = async (data) => {
    try {
      const newData = {
        email: verifyEmail,
        ...data
      }
      const res = await verifyOTPMutation.mutateAsync(newData)
      toast.success(res.data.message)

      await handleLogin({
        email: verifyEmail,
        password: verifyPassword
      })

      setVerifyEmail('')
      setVerifyPassword('')
      setVerifyOpen(false)
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  const handleResendOTP = async () => {
    try {
      const res = await resendOtpMutation.mutateAsync({ email: verifyEmail })
      toast.success(res.data.message)
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  return (
    <>
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
            <LoginForm onSubmit={handleLogin} isPending={loginMutation.isPending} />
          </TabsContent>
          <TabsContent value={tabValues.signup}>
            <SignUpForm onSubmit={handleSignUp} isPending={signupMutation.isPending} />
          </TabsContent>
        </Tabs>
      </div>

      {verifyEmail && (
        <VerifyOTPDialog
          open={verifyOpen}
          onOpenChange={setVerifyOpen}
          email={verifyEmail}
          onSubmit={handleVerifyOTP}
          onResend={handleResendOTP}
          isPending={verifyOTPMutation.isPending || resendOtpMutation.isPending || loginMutation.isPending}
        />
      )}
    </>
  )
}

export default AuthPage
