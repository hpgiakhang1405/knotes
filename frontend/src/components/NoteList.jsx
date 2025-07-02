import React from 'react'
import { Link } from 'react-router-dom'
import { cn } from '~/lib/utils'
import NoteCard from './NoteCard'

const NoteList = ({ data, className, type }) => {
  return (
    <div className={cn('grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4', className)}>
      {data && data.length > 0 ? (
        data.map((note) => (
          <Link key={note.id} to={`${note.id}`}>
            <NoteCard
              id={note.id}
              title={note.title}
              content={note.content}
              tags={note.tags}
              createdAt={note.createdAt}
              updatedAt={note.updatedAt}
              type={type}
              className="w-full h-full"
            />
          </Link>
        ))
      ) : (
        <div className="col-span-full text-center text-muted-foreground">No notes available.</div>
      )}
    </div>
  )
}

export default NoteList
