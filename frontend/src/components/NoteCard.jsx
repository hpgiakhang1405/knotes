import React from 'react'
import { cn } from '~/lib/utils'
import { ArchiveRestore, Ellipsis, RotateCcw, Trash2, X } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'

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

const NoteCard = ({ className, type }) => {
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
        <CardTitle className="flex flex-col gap-2">
          <div className="text-muted-foreground text-sm font-normal">Last edited: 7 days ago</div>
          <div className="truncate-2">Note Title</div>
        </CardTitle>
      </CardHeader>
      <CardContent className="truncate-2 text-muted-foreground mb-4">
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita molestiae iure cum, dolor inventore
          reiciendis! Ut, ipsa numquam? Nam provident cupiditate sequi cum! Iusto rem eaque alias laboriosam voluptates
          ex!
        </p>
      </CardContent>
      <CardFooter>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary" className="text-muted-foreground">
            Shopping
          </Badge>
          <Badge variant="secondary" className="text-muted-foreground">
            Travel
          </Badge>
          <Badge variant="secondary" className="text-muted-foreground">
            Education
          </Badge>
        </div>
      </CardFooter>
    </Card>
  )
}

export default NoteCard
