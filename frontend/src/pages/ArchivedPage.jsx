import React from 'react'
import { RotateCcw } from 'lucide-react'
import NoteList from '~/components/NoteList'
import { Button } from '~/components/ui/button'

const mockArchivedNotes = [
  {
    id: 101,
    title: 'Old Goals',
    content: 'Run 5km every week, eat healthy.',
    tags: ['fitness'],
    createdAt: '2023-09-01',
    updatedAt: '2023-09-15'
  },
  {
    id: 102,
    title: '2022 Review',
    content: 'A look back at achievements and struggles.',
    tags: ['reflection'],
    createdAt: '2023-01-01',
    updatedAt: '2023-01-10'
  },
  {
    id: 103,
    title: 'Budget Plan',
    content: 'Track spending using Excel sheets.',
    tags: ['finance'],
    createdAt: '2023-08-20',
    updatedAt: '2023-08-25'
  },
  {
    id: 104,
    title: 'Workshop Notes',
    content: 'State management in modern React apps.',
    tags: ['react', 'learning'],
    createdAt: '2023-07-12',
    updatedAt: '2023-07-13'
  },
  {
    id: 105,
    title: 'UI Patterns',
    content: 'Modal vs Drawer usage guidelines.',
    tags: ['ui'],
    createdAt: '2023-05-30',
    updatedAt: '2023-06-01'
  },
  {
    id: 106,
    title: 'Travel Memories',
    content: 'Da Lat trip with friends - amazing views!',
    tags: ['travel', 'personal'],
    createdAt: '2022-12-18',
    updatedAt: '2022-12-20'
  }
]

const ArchivedPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Archived</h3>
        <Button type="button" variant="outline">
          <RotateCcw /> Restore All
        </Button>
      </div>
      <NoteList type="archive" data={mockArchivedNotes} />
    </div>
  )
}

export default ArchivedPage
