import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs) => {
  return twMerge(clsx(inputs))
}

export const getErrorMessage = (error, fallback = 'Something went wrong. Please try again later.') => {
  return error?.response?.data?.message || error?.message || fallback
}
