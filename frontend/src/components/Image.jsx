import React, { useState } from 'react'
import { cn } from '~/lib/utils'
import Fallback from '~/assets/images/fallback-img.png'

const Image = ({ src, alt = 'image', fallback = Fallback, className = '', ...props }) => {
  const [imgSrc, setImgSrc] = useState(src)

  return (
    <img
      src={imgSrc}
      alt={alt}
      loading="lazy"
      onError={() => setImgSrc(fallback)}
      className={cn('w-full h-auto object-cover dark:brightness-80', className)}
      {...props}
    />
  )
}

export default Image
