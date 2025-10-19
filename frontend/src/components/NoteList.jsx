import React from 'react'
import { Link } from 'react-router-dom'
import { cn } from '~/lib/utils'
import NoteCard from './NoteCard'

const NoteList = ({ data, className, type, isLoading }) => {
  if (isLoading) return <></>

  return (
    <div className={cn('grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4', className)}>
      {data && data.length > 0 ? (
        data.map((note) => (
          <Link key={note._id} to={`${note._id}`}>
            <NoteCard
              id={note._id}
              title={note.title}
              content={note.content}
              textContent={note.textContent}
              tags={note.tags}
              updatedAt={note.updatedAt}
              isPin={note.isPinned}
              className="w-full h-full"
              type={type}
            />
          </Link>
        ))
      ) : (
        <div className="col-span-full text-center text-muted-foreground my-10">No notes available.</div>
      )}
    </div>
  )
}

export default NoteList
