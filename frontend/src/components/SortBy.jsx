import React from 'react'
import { cn } from '~/lib/utils'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select'

const sortByOptions = [
  {
    value: 'newest',
    label: 'Newest First'
  },
  {
    value: 'oldest',
    label: 'Oldest First'
  },
  {
    value: 'title-asc',
    label: 'Title A-Z'
  },
  {
    value: 'title-desc',
    label: 'Title Z-A'
  }
]

const SortBy = ({ className, onChange, value }) => {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <h4 className="font-semibold">Sort by:</h4>
      <Select defaultValue={value || sortByOptions[0].value} onValueChange={onChange}>
        <SelectTrigger className="w-40 md:w-50">
          <SelectValue placeholder="Sort notes by..." />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {sortByOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

export default SortBy
