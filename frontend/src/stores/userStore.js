import { create } from 'zustand'

const useUserStore = create((set) => ({
  isInitializing: true,
  isAuthenticated: false,
  token: null,
  user: null,
  setToken: (token) => set({ token, isAuthenticated: !!token, isInitializing: false }),
  setUser: (user) => set({ user, isAuthenticated: !!user, isInitializing: false }),
  clearUser: () => set({ user: null, token: null, isAuthenticated: false, isInitializing: false })
}))

export default useUserStore
