import React from 'react'
import { NotebookPen } from 'lucide-react'

const LogoTitle = () => {
  return (
    <a href="/" className="flex items-center gap-2 font-medium text-xl">
      <div className="bg-primary text-primary-foreground flex items-center justify-center rounded-md p-2">
        <NotebookPen className="size-6" />
      </div>
      KNotes
    </a>
  )
}

export default LogoTitle
