import React, { useEffect, useRef, useState } from 'react'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Search } from 'lucide-react'
import { useDebounce } from '~/hooks/useDebounce'
import { useSearchParams } from 'react-router-dom'

const SearchInput = ({ placeholder }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchValue, setSearchValue] = useState('')
  const debouncedSearchValue = useDebounce(searchValue)

  const isFirstRender = useRef(true)

  const handleSearchSubmit = (value) => {
    searchParams.set('search', value)
    setSearchParams(searchParams)
  }

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    handleSearchSubmit(debouncedSearchValue)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchValue])

  return (
    <div className="relative w-full max-w-56 md:max-w-xs">
      <Label htmlFor="search" className="sr-only">
        Search
      </Label>
      <Input
        id="search"
        placeholder={placeholder}
        className="pl-8"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearchSubmit(searchValue)
          }
        }}
      />
      <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
    </div>
  )
}

export default SearchInput
