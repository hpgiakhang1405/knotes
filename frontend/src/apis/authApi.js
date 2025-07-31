import axiosClient from './axiosClient'

const authApi = {
  signup: (data) => {
    const url = '/auth/register'
    return axiosClient.post(url, data)
  },
  verifyOTP: (data) => {
    const url = '/auth/verify-otp'
    return axiosClient.post(url, data)
  },
  resendOtp: (data) => {
    const url = '/auth/resend-otp'
    return axiosClient.post(url, data)
  },
  login: (data) => {
    const url = '/auth/login'
    return axiosClient.post(url, data, { withCredentials: true })
  },
  refreshToken: () => {
    const url = '/auth/refresh-token'
    return axiosClient.post(url, {}, { withCredentials: true })
  },
  logout: () => {
    const url = '/auth/logout'
    return axiosClient.post(url, {}, { withCredentials: true })
  }
}

export default authApi
