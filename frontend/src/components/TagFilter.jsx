import React from 'react'
import { cn } from '~/lib/utils'
import { Toggle } from './ui/toggle'

const tags = [
  'Shopping',
  'Work',
  'Personal',
  'Travel',
  'Health',
  'Finance',
  'Education',
  'Hobbies',
  'Technology',
  'Other',
  'Education',
  'Hobbies',
  'Technology',
  'Other'
]

const TagFilter = ({ className }) => {
  return (
    <div className={cn('flex flex-wrap items-center gap-2 max-w-4xl', className)}>
      <h4 className="font-semibold">Filter by Tags:</h4>
      {tags.map((tag, index) => (
        <Toggle key={index} variant="outline" className="font-normal transition-all">
          #{tag}
        </Toggle>
      ))}
    </div>
  )
}

export default TagFilter
