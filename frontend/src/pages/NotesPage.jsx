import React from 'react'
import { Plus } from 'lucide-react'
import NoteList from '~/components/NoteList'
import SortBy from '~/components/SortBy'
import TagFilter from '~/components/TagFilter'
import { Button } from '~/components/ui/button'

const NotesPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">My Notes</h3>
        <Button type="button">
          <Plus /> Add new note
        </Button>
      </div>
      <div className="flex items-start flex-wrap gap-4 justify-between">
        <TagFilter />
        <SortBy />
      </div>
      <NoteList />
    </div>
  )
}

export default NotesPage
