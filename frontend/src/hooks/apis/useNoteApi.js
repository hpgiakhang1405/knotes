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

  return {
    queryClient,
    getAllNotesQuery,
    createNoteMutation,
    getOneNoteQuery,
    updateNoteTitleMutation,
    updateNoteContentMutation,
    updateNoteTagsMutation
  }
}
