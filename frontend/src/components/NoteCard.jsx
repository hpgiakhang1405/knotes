import React from 'react'
import { cn } from '~/lib/utils'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'

const NoteCard = ({ className }) => {
  return (
    <Card className={cn('hover:bg-muted transition-all', className)}>
      <CardHeader>
        <CardTitle className="truncate-2">Card Title</CardTitle>
        <CardDescription className="truncate-2">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos dolor asperiores libero soluta incidunt vero
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">Your tag</Badge>
          <Badge variant="secondary">Your tag</Badge>
          <Badge variant="secondary">Your tag</Badge>
          <Badge variant="secondary">Your tag</Badge>
        </div>
      </CardFooter>
    </Card>
  )
}

export default NoteCard
