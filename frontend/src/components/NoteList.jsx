import React from 'react'
import { cn } from '~/lib/utils'
import NoteCard from './NoteCard'

const NoteList = ({ className, type }) => {
  return (
    <div className={cn('grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4', className)}>
      <NoteCard type={type} />
      <NoteCard type={type} />
      <NoteCard type={type} />
      <NoteCard type={type} />
      <NoteCard type={type} />
      <NoteCard type={type} />
      <NoteCard type={type} />
      <NoteCard type={type} />
      <NoteCard type={type} />
      <NoteCard type={type} />
      <NoteCard type={type} />
      <NoteCard type={type} />
      <NoteCard type={type} />
      <NoteCard type={type} />
      <NoteCard type={type} />
      <NoteCard type={type} />
    </div>
  )
}

export default NoteList
