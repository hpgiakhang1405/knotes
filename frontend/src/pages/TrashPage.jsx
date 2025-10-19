import React from 'react'
import { RotateCcw, Trash } from 'lucide-react'
import NoteList from '~/components/NoteList'
import { Button } from '~/components/ui/button'
import { useSearchParams } from 'react-router-dom'
import { useNoteApi } from '~/hooks/apis/useNoteApi'

const TrashPage = () => {
  const [params] = useSearchParams()
  const { sortBy, tags, search, state = 'trashed' } = Object.fromEntries(params)
  const paramsObj = { sortBy, tags, search, state }

  const { getAllNotesQuery } = useNoteApi({ params: paramsObj })
  const { data, isLoading } = getAllNotesQuery

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Trash</h3>
        <div className="flex flex-wrap items-center gap-2">
          <Button type="button" variant="outline">
            <RotateCcw /> Restore All
          </Button>
          <Button type="button" variant="destructive">
            <Trash /> Empty Trash
          </Button>
        </div>
      </div>
      <NoteList type="trash" data={data?.data.notes} isLoading={isLoading} />
    </div>
  )
}

export default TrashPage
