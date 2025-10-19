import React from 'react'
import { Plus } from 'lucide-react'
import NoteList from '~/components/NoteList'
import SortBy from '~/components/SortBy'
import { Button } from '~/components/ui/button'
import { useNoteApi } from '~/hooks/apis/useNoteApi'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getErrorMessage } from '~/lib/utils'
import { toast } from 'sonner'

const NotesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { sortBy, tags, search, state = 'active' } = Object.fromEntries(searchParams)
  const paramsObj = { sortBy, tags, search, state }

  const navigate = useNavigate()

  const { queryClient, getAllNotesQuery, createNoteMutation } = useNoteApi({ params: paramsObj })
  const { data, isLoading } = getAllNotesQuery

  const handleSortByChange = (newSortBy) => {
    searchParams.set('sortBy', newSortBy)
    setSearchParams(searchParams)
  }

  const handleAddNewNote = async (data = {}) => {
    try {
      const res = await createNoteMutation.mutateAsync(data)
      toast.success(res.data.message)
      navigate(`/notes/${res.data.noteId}`)
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">My Notes</h3>
        <div className="flex flex-wrap items-center gap-2">
          {data?.data.notes.length > 1 && <SortBy onChange={handleSortByChange} value={sortBy} />}
          <Button type="button" onClick={() => handleAddNewNote()} disabled={createNoteMutation.isPending}>
            <Plus /> Add New Note
          </Button>
        </div>
      </div>
      <NoteList data={data?.data.notes} isLoading={isLoading} />
    </div>
  )
}

export default NotesPage
