import { Avatar as ShadAvatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { cn } from '~/lib/utils'

const sizeMap = {
  'sm': 'h-8 w-8 text-sm',
  'md': 'h-10 w-10 text-base',
  'lg': 'h-14 w-14 text-lg',
  'xl': 'h-16 w-16 text-xl',
  '2xl': 'h-20 w-20 text-2xl'
}

const getFallback = (name = '', fallback = '?') => {
  const words = name.trim().split(' ')
  if (words.length === 1) return words[0].charAt(0).toUpperCase() || fallback
  return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase() || fallback
}

const Avatar = ({ src, alt = '', fallback = '?', className, size = 'md' }) => {
  return (
    <ShadAvatar className={cn(sizeMap[size], className)}>
      <AvatarImage src={src} alt={alt} className="object-cover" />
      <AvatarFallback>{getFallback(alt, fallback)}</AvatarFallback>
    </ShadAvatar>
  )
}

export default Avatar
