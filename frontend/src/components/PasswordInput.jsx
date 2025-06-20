import React, { useState } from 'react'
import { Input } from './ui/input'
import { Eye, EyeOff } from 'lucide-react'
import { cn } from '~/lib/utils'

const PasswordInput = ({ className, ...props }) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="relative">
      <Input className={cn('pr-10', className)} type={showPassword ? 'text' : 'password'} {...props} />
      <button
        type="button"
        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
      </button>
    </div>
  )
}

export default PasswordInput
