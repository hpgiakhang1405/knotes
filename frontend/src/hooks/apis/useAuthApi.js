import { useMutation, useQueryClient } from '@tanstack/react-query'
import authApi from '~/apis/authApi'

export const useAuthApi = () => {
  const queryClient = useQueryClient()

  const signupMutation = useMutation({
    mutationFn: authApi.signup
  })

  const verifyOTPMutation = useMutation({
    mutationFn: authApi.verifyOTP
  })

  const resendOtpMutation = useMutation({
    mutationFn: authApi.resendOtp
  })

  const loginMutation = useMutation({
    mutationFn: authApi.login
  })

  const refreshTokenMutation = useMutation({
    mutationFn: authApi.refreshToken
  })

  const logoutMutation = useMutation({
    mutationFn: authApi.logout
  })

  const forgotPasswordMutation = useMutation({
    mutationFn: authApi.forgotPassword
  })

  const resetPasswordMutation = useMutation({
    mutationFn: authApi.resetPassword
  })

  return {
    queryClient,
    signupMutation,
    loginMutation,
    verifyOTPMutation,
    resendOtpMutation,
    refreshTokenMutation,
    logoutMutation,
    forgotPasswordMutation,
    resetPasswordMutation
  }
}
