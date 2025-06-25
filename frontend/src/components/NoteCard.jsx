import React from 'react'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'

const NoteCard = ({ className }) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos dolor asperiores libero soluta incidunt vero
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <div className="flex items-center gap-2">
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
