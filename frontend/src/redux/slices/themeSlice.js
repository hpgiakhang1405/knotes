import { createSlice } from '@reduxjs/toolkit'

const STORAGE_KEY = 'theme'

const initialState = {
  theme: localStorage.getItem(STORAGE_KEY) || 'light'
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload
      document.documentElement.className = action.payload
      localStorage.setItem(STORAGE_KEY, action.payload)
    }
  }
})

export const { setTheme } = themeSlice.actions

export const selectCurrentTheme = (state) => state.theme.theme

export default themeSlice.reducer
