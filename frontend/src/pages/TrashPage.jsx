import { RotateCcw, Trash2 } from 'lucide-react'
import React from 'react'
import NoteList from '~/components/NoteList'
import { Button } from '~/components/ui/button'

const TrashPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Trash</h3>
        <div className="flex items-center gap-2">
          <Button type="button" variant="outline">
            <RotateCcw /> Restore All
          </Button>
          <Button type="button" variant="destructive">
            <Trash2 /> Empty Trash
          </Button>
        </div>
      </div>
      <NoteList />
    </div>
  )
}

export default TrashPage
