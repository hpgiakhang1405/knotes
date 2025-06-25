import React from 'react'
import { NotebookPen } from 'lucide-react'
import { Link } from 'react-router-dom'
import { routes } from '~/router/routes'
import { cn } from '~/lib/utils'

const LogoTitle = ({ isSmall, ...props }) => {
  return (
    <Link to={routes.home} {...props}>
      <div className={cn('flex items-center gap-2 font-medium', isSmall ? 'text-lg' : 'text-xl')}>
        <div className="bg-primary text-primary-foreground flex items-center justify-center rounded-md p-2">
          <NotebookPen className={cn(isSmall ? 'size-5' : 'size-6')} />
        </div>
        KNotes
      </div>
    </Link>
  )
}

export default LogoTitle
