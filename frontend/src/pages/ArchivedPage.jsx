import React from 'react'
import NoteList from '~/components/NoteList'

const ArchivedPage = () => {
  return (
    <div className="space-y-6">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Archived</h3>
      <NoteList />
    </div>
  )
}

export default ArchivedPage
