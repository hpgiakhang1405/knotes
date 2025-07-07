import { useEffect, useState } from 'react'
import { useTheme } from '~/hooks/useTheme'

const THEME_STORAGE_KEY = 'theme'

const ThemeProvider = ({ children }) => {
  const { theme, setTheme } = useTheme()
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY) || 'light'
    setTheme(saved)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!theme) return

    const root = document.documentElement
    root.className = theme
    localStorage.setItem(THEME_STORAGE_KEY, theme)
    setIsHydrated(true)
  }, [theme])

  if (!isHydrated) return <></>

  return children
}

export default ThemeProvider
