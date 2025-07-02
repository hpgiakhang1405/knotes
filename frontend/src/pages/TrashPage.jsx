import React from 'react'
import { RotateCcw, Trash } from 'lucide-react'
import NoteList from '~/components/NoteList'
import { Button } from '~/components/ui/button'

const mockTrashedNotes = [
  {
    id: 201,
    title: 'Temporary Draft',
    content: 'Just testing some layout here.',
    tags: ['draft'],
    createdAt: '2023-09-15',
    updatedAt: '2023-09-15'
  },
  {
    id: 202,
    title: 'Unused Idea',
    content: 'Mobile app to log study time via voice.',
    tags: ['ideas'],
    createdAt: '2023-06-10',
    updatedAt: '2023-06-11'
  },
  {
    id: 203,
    title: 'KNotes Schema',
    content: 'User, Note, Tag — relations and indexes.',
    tags: ['backend'],
    createdAt: '2023-07-20',
    updatedAt: '2023-07-21'
  },
  {
    id: 204,
    title: 'Placeholder Note',
    content: 'Content not finalized.',
    tags: [],
    createdAt: '2023-05-05',
    updatedAt: '2023-05-06'
  },
  {
    id: 205,
    title: 'Old Quote Collection',
    content: '“Do or do not. There is no try.” – Yoda',
    tags: ['quotes'],
    createdAt: '2023-01-05',
    updatedAt: '2023-01-07'
  },
  {
    id: 206,
    title: 'Meeting Reminder',
    content: 'Friday 3PM with product team.',
    tags: ['reminder'],
    createdAt: '2023-06-01',
    updatedAt: '2023-06-02'
  },
  {
    id: 207,
    title: 'Bug Checklist',
    content: 'Fix tag deletion bug, note duplication issue.',
    tags: ['dev', 'bug'],
    createdAt: '2023-04-01',
    updatedAt: '2023-04-02'
  }
]

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
            <Trash /> Empty Trash
          </Button>
        </div>
      </div>
      <NoteList type="trash" data={mockTrashedNotes} />
    </div>
  )
}

export default TrashPage
