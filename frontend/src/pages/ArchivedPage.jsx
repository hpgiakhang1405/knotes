import React from 'react'
import { RotateCcw } from 'lucide-react'
import NoteList from '~/components/NoteList'
import { Button } from '~/components/ui/button'
import { useSearchParams } from 'react-router-dom'
import { useNoteApi } from '~/hooks/apis/useNoteApi'

const ArchivedPage = () => {
  const [params] = useSearchParams()
  const { sortBy, tags, search, state = 'archived' } = Object.fromEntries(params)
  const paramsObj = { sortBy, tags, search, state }

  const { getAllNotesQuery } = useNoteApi({ params: paramsObj })
  const { data, isLoading } = getAllNotesQuery

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Archived</h3>
        <Button type="button" variant="outline">
          <RotateCcw /> Restore All
        </Button>
      </div>
      <NoteList type="archive" data={data?.data.notes} isLoading={isLoading} />
    </div>
  )
}

export default ArchivedPage
