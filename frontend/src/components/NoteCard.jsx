import React from 'react'
import { cn } from '~/lib/utils'
import { ArchiveRestore, Ellipsis, RotateCcw, Trash2, X } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import TagList from './TagList'

const MyNotesDropdownMenuItem = () => (
  <>
    <DropdownMenuItem>
      <ArchiveRestore />
      Archive
    </DropdownMenuItem>
    <DropdownMenuItem>
      <Trash2 />
      Move to Trash
    </DropdownMenuItem>
  </>
)

const ArchivedDropdownMenuItem = () => (
  <>
    <DropdownMenuItem>
      <RotateCcw />
      Restore
    </DropdownMenuItem>
    <DropdownMenuItem>
      <Trash2 />
      Move to Trash
    </DropdownMenuItem>
  </>
)

const TrashedDropdownMenuItem = () => (
  <>
    <DropdownMenuItem>
      <RotateCcw />
      Restore
    </DropdownMenuItem>
    <DropdownMenuItem>
      <X />
      Delete Permanently
    </DropdownMenuItem>
  </>
)

const NoteCard = ({ id, title, content, tags, createdAt, updatedAt, className, type }) => {
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
            <ArchivedDropdownMenuItem />
          ) : type === 'trash' ? (
            <TrashedDropdownMenuItem />
          ) : (
            <MyNotesDropdownMenuItem />
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <CardHeader>
        <CardTitle className="flex flex-col gap-2 leading-normal">
          <div className="text-muted-foreground text-sm font-normal">Last edited: 7 days ago</div>
          <div className="truncate-2">{title}</div>
        </CardTitle>
      </CardHeader>
      <CardContent className="truncate-2 text-muted-foreground mb-4">
        <p>{content}</p>
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
