import { useEffect, useLayoutEffect } from 'react'
import axiosClient from '~/apis/axiosClient'
import { useAuthApi } from '~/hooks/apis/useAuthApi'
import { useUserApi } from '~/hooks/apis/useUserApi'
import useUserStore from '~/stores/userStore'

const AuthProvider = ({ children }) => {
  const { isAuthenticated, token, setToken, setUser, clearUser } = useUserStore()
  const { refreshTokenMutation, logoutMutation } = useAuthApi()

  const { queryClient, getMeQuery } = useUserApi()
  const { data } = getMeQuery

  useEffect(() => {
    if (data) setUser(data.data)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  useEffect(() => {
    if (isAuthenticated) queryClient.invalidateQueries(['me'])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated])

  useLayoutEffect(() => {
    const authInterceptor = axiosClient.interceptors.request.use((config) => {
      config.headers.Authorization = !config._retry && token ? `Bearer ${token}` : config.headers.Authorization
      return config
    })
    return () => {
      axiosClient.interceptors.request.eject(authInterceptor)
    }
  }, [token])

  useLayoutEffect(() => {
    const refreshInterceptor = axiosClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config
        if (error.response.status === 403 && error.response.data.message === 'Invalid or expired access token') {
          try {
            const res = await refreshTokenMutation.mutateAsync()

            setToken(res.data.accessToken)

            originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`
            originalRequest._retry = true

            return axiosClient(originalRequest)
          } catch (error) {
            try {
              await logoutMutation.mutateAsync()
              clearUser()
            } catch (err) {
              return Promise.reject(err)
            }
            return Promise.reject(error)
          }
        }
        return Promise.reject(error)
      }
    )
    return () => {
      axiosClient.interceptors.response.eject(refreshInterceptor)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return children
}

export default AuthProvider
