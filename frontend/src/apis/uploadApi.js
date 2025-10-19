import axiosClient from './axiosClient'

const uploadApi = {
  uploadImage: (data, config = {}) => {
    const url = '/upload/image'
    return axiosClient.post(url, data, config)
  }
}

export default uploadApi
