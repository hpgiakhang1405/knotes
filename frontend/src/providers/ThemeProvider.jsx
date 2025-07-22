import { useEffect, useState } from 'react'
import useThemeStore from '~/stores/themeStore'

const THEME_STORAGE_KEY = 'theme'

const ThemeProvider = ({ children }) => {
  const { theme, setTheme } = useThemeStore()
  const [isHydrated, setHydrated] = useState(false)

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

    if (!isHydrated) setHydrated(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme])

  if (!isHydrated) return <></>

  return children
}

export default ThemeProvider
