import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { formatDistanceToNow, format } from 'date-fns'

export const cn = (...inputs) => {
  return twMerge(clsx(inputs))
}

export const getErrorMessage = (error, fallback = 'Something went wrong. Please try again later.') => {
  return error?.response?.data?.message || error?.message || fallback
}

export const timeAgo = (date) => {
  return formatDistanceToNow(new Date(date), { addSuffix: true })
}

export const parseJsonSafe = (jsonString) => {
  try {
    return JSON.parse(jsonString)
  } catch (error) {
    return null
  }
}

export const formatDate = (date, dateFormat = 'd MMMM yyyy, HH:mm') => {
  return format(new Date(date), dateFormat)
}
