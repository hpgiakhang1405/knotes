import React from 'react'
import { NotebookPen } from 'lucide-react'
import { Link } from 'react-router-dom'
import { routesPath } from '~/routes'

const LogoTitle = () => {
  return (
    <Link to={routesPath.home} className="flex items-center gap-2 font-medium text-xl">
      <div className="bg-primary text-primary-foreground flex items-center justify-center rounded-md p-2">
        <NotebookPen className="size-6" />
      </div>
      KNotes
    </Link>
  )
}

export default LogoTitle
