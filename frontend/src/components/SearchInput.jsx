import React from 'react'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Search } from 'lucide-react'

const SearchInput = ({ placeholder }) => {
  return (
    <div className="relative w-full max-w-56 md:max-w-xs">
      <Label htmlFor="search" className="sr-only">
        Search
      </Label>
      <Input id="search" placeholder={placeholder} className="pl-8" />
      <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
    </div>
  )
}

export default SearchInput
