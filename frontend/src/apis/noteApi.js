import axiosClient from './axiosClient'

const noteApi = {
  getAll: (params) => {
    const url = '/note'
    return axiosClient.get(url, { params })
  },

  create: (data) => {
    const url = '/note'
    return axiosClient.post(url, data)
  },

  getOne: (noteId) => {
    const url = `/note/${noteId}`
    return axiosClient.get(url)
  },

  updateTitle: (noteId, data) => {
    const url = `/note/${noteId}/title`
    return axiosClient.patch(url, data)
  },

  updateContent: (noteId, data) => {
    const url = `/note/${noteId}/content`
    return axiosClient.patch(url, data)
  },

  updateTags: (noteId, data) => {
    const url = `/note/${noteId}/tags`
    return axiosClient.patch(url, data)
  },

  pin: (noteId, data) => {
    const url = `/note/${noteId}/pin`
    return axiosClient.patch(url, data)
  },

  changeState: (noteId, data) => {
    const url = `/note/${noteId}/state`
    return axiosClient.patch(url, data)
  },

  deleteOne: (noteId) => {
    const url = `/note/${noteId}`
    return axiosClient.delete(url)
  },

  restoreFromArchive: () => {
    const url = `/note/archive/restore`
    return axiosClient.patch(url)
  },

  restoreFromTrash: () => {
    const url = `/note/trash/restore`
    return axiosClient.patch(url)
  },

  emptyTrash: () => {
    const url = `/note/trash/empty`
    return axiosClient.delete(url)
  }
}

export default noteApi
