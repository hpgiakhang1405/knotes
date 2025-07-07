import React from 'react'
import { cn } from '~/lib/utils'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select'

const SortBy = ({ className }) => {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <h4 className="font-semibold">Sort by:</h4>
      <Select defaultValue="default">
        <SelectTrigger className="w-40 md:w-50">
          <SelectValue placeholder="Sort notes by..." />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="title-asc">Title A-Z</SelectItem>
            <SelectItem value="title-desc">Title Z-A</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

export default SortBy
