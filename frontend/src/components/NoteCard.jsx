import React from 'react'
import { cn, getErrorMessage, timeAgo } from '~/lib/utils'
import { ArchiveRestore, Ellipsis, Pin, PinOff, RotateCcw, Trash2, X } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import TagList from './TagList'
import { useNoteApi } from '~/hooks/apis/useNoteApi'
import { toast } from 'sonner'

const MyNotesDropdownMenuItem = ({ isPin, onPin, onState }) => (
  <>
    <DropdownMenuItem
      onClick={(e) => {
        e.stopPropagation()
        onPin()
      }}
    >
      {isPin ? (
        <>
          <PinOff />
          Unpin
        </>
      ) : (
        <>
          <Pin />
          Pin
        </>
      )}
    </DropdownMenuItem>
    <DropdownMenuItem
      onClick={(e) => {
        e.stopPropagation()
        onState('archived')
      }}
    >
      <ArchiveRestore />
      Archive
    </DropdownMenuItem>
    <DropdownMenuItem
      onClick={(e) => {
        e.stopPropagation()
        onState('trashed')
      }}
    >
      <Trash2 />
      Move to Trash
    </DropdownMenuItem>
  </>
)

const ArchivedDropdownMenuItem = ({ isPin, onPin, onState }) => (
  <>
    <DropdownMenuItem
      onClick={(e) => {
        e.stopPropagation()
        onPin()
      }}
    >
      {isPin ? (
        <>
          <PinOff />
          Unpin
        </>
      ) : (
        <>
          <Pin />
          Pin
        </>
      )}
    </DropdownMenuItem>
    <DropdownMenuItem
      onClick={(e) => {
        e.stopPropagation()
        onState('active')
      }}
    >
      <RotateCcw />
      Restore
    </DropdownMenuItem>
    <DropdownMenuItem
      onClick={(e) => {
        e.stopPropagation()
        onState('trashed')
      }}
    >
      <Trash2 />
      Move to Trash
    </DropdownMenuItem>
  </>
)

const TrashedDropdownMenuItem = ({ isPin, onPin, onState, onDelete }) => (
  <>
    <DropdownMenuItem
      onClick={(e) => {
        e.stopPropagation()
        onPin()
      }}
    >
      {isPin ? (
        <>
          <PinOff />
          Unpin
        </>
      ) : (
        <>
          <Pin />
          Pin
        </>
      )}
    </DropdownMenuItem>
    <DropdownMenuItem
      onClick={(e) => {
        e.stopPropagation()
        onState('active')
      }}
    >
      <RotateCcw />
      Restore
    </DropdownMenuItem>
    <DropdownMenuItem
      onClick={(e) => {
        e.stopPropagation()
        onDelete()
      }}
    >
      <X />
      Delete Permanently
    </DropdownMenuItem>
  </>
)

const NoteCard = ({ id, title, content, textContent, tags, updatedAt, isPin, className, type }) => {
  const { queryClient, pinNoteMutation, changeNoteStateMutation, deleteOneNoteMutation } = useNoteApi({})

  const handlePinNote = async () => {
    try {
      const res = await pinNoteMutation.mutateAsync({ noteId: id, data: { isPinned: !isPin } })
      toast.success(res.data.message)
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  const handleChangeNoteState = async (state) => {
    try {
      const res = await changeNoteStateMutation.mutateAsync({ noteId: id, data: { state } })
      toast.success(res.data.message)
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  const handleDeleteNote = async () => {
    try {
      const res = await deleteOneNoteMutation.mutateAsync(id)
      toast.success(res.data.message)
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  return (
    <Card className={cn('relative hover:bg-primary-foreground transition-all gap-0 group select-none', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="absolute top-2 right-2 lg:opacity-0 lg:group-hover:opacity-100 transition-all"
          >
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" align="center" sideOffset={8}>
          {type === 'archive' ? (
            <ArchivedDropdownMenuItem isPin={isPin} onPin={handlePinNote} onState={handleChangeNoteState} />
          ) : type === 'trash' ? (
            <TrashedDropdownMenuItem
              isPin={isPin}
              onPin={handlePinNote}
              onState={handleChangeNoteState}
              onDelete={handleDeleteNote}
            />
          ) : (
            <MyNotesDropdownMenuItem isPin={isPin} onPin={handlePinNote} onState={handleChangeNoteState} />
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {isPin && <Pin size={20} className="absolute -top-2 -left-2 -rotate-45 text-muted-foreground" />}

      <CardHeader>
        <CardTitle className="flex flex-col gap-2 leading-normal">
          <div className="text-muted-foreground text-sm font-normal">Last edited: {timeAgo(updatedAt)}</div>
          <div className="truncate-2">{title}</div>
        </CardTitle>
      </CardHeader>
      <CardContent className="truncate-2 text-muted-foreground mb-4">
        <p>{textContent}</p>
      </CardContent>
      {tags && tags.length > 0 && (
        <CardFooter>
          <TagList list={tags} />
        </CardFooter>
      )}
    </Card>
  )
}

export default NoteCard
