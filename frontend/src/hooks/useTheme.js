import { useSelector, useDispatch } from 'react-redux'
import { selectCurrentTheme, setTheme } from '~/redux/slices/themeSlice'

export const useTheme = () => {
  const theme = useSelector(selectCurrentTheme)
  const dispatch = useDispatch()

  return {
    theme,
    setTheme: (theme) => dispatch(setTheme(theme))
  }
}
