import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import noteApi from '~/apis/noteApi'

export const useNoteApi = ({ params, noteId }) => {
  const queryClient = useQueryClient()

  const getAllNotesQuery = useQuery({
    queryKey: ['notes', params],
    queryFn: ({ queryKey }) => {
      const [_key, params] = queryKey
      return noteApi.getAll(params)
    },
    enabled: !!params
  })

  const createNoteMutation = useMutation({
    mutationFn: noteApi.create
  })

  const getOneNoteQuery = useQuery({
    queryKey: ['note', noteId],
    queryFn: ({ queryKey }) => {
      const [_key, noteId] = queryKey
      return noteApi.getOne(noteId)
    },
    enabled: !!noteId
  })

  const updateNoteTitleMutation = useMutation({
    mutationFn: ({ noteId, data }) => noteApi.updateTitle(noteId, data)
  })

  const updateNoteContentMutation = useMutation({
    mutationFn: ({ noteId, data }) => noteApi.updateContent(noteId, data)
  })

  const updateNoteTagsMutation = useMutation({
    mutationFn: ({ noteId, data }) => noteApi.updateTags(noteId, data)
  })

  const pinNoteMutation = useMutation({
    mutationFn: ({ noteId, data }) => noteApi.pin(noteId, data)
  })

  const changeNoteStateMutation = useMutation({
    mutationFn: ({ noteId, data }) => noteApi.changeState(noteId, data)
  })

  const deleteOneNoteMutation = useMutation({
    mutationFn: noteApi.deleteOne
  })

  const restoreFromArchiveMutation = useMutation({
    mutationFn: noteApi.restoreFromArchive
  })

  const restoreFromTrashMutation = useMutation({
    mutationFn: noteApi.restoreFromTrash
  })

  const emptyTrashMutation = useMutation({
    mutationFn: noteApi.emptyTrash
  })

  return {
    queryClient,
    getAllNotesQuery,
    createNoteMutation,
    getOneNoteQuery,
    updateNoteTitleMutation,
    updateNoteContentMutation,
    updateNoteTagsMutation,
    pinNoteMutation,
    changeNoteStateMutation,
    deleteOneNoteMutation,
    restoreFromArchiveMutation,
    restoreFromTrashMutation,
    emptyTrashMutation
  }
}
