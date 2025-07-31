import axiosClient from './axiosClient'

const userApi = {
  getMe: () => {
    const url = '/user/me'
    return axiosClient.get(url)
  },

  changeName: (data) => {
    const url = '/user/me/name'
    return axiosClient.patch(url, data)
  },

  changePassword: (data) => {
    const url = '/user/me/password'
    return axiosClient.patch(url, data)
  },

  changeAvatar: (data) => {
    const url = '/user/me/avatar'
    return axiosClient.patch(url, data)
  },

  deleteAccount: () => {
    const url = '/user/me'
    return axiosClient.delete(url, { withCredentials: true })
  }
}

export default userApi
