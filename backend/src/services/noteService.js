import { StatusCodes } from 'http-status-codes'
import Note from '../models/noteModel.js'
import User from '../models/userModel.js'
import ApiError from '../utils/ApiError.js'
import mongoose from 'mongoose'

const getAll = async (userId, sortBy, tags, search, state) => {
  const validSortValues = ['newest', 'oldest', 'title-asc', 'title-desc']
  const sortValue = validSortValues.includes(sortBy) ? sortBy : 'newest'
  let sortField
  let sortOrder
  switch (sortValue) {
    case 'newest':
      sortField = 'createdAt'
      sortOrder = -1
      break
    case 'oldest':
      sortField = 'createdAt'
      sortOrder = 1
      break
    case 'title-asc':
      sortField = 'title'
      sortOrder = 1
      break
    case 'title-desc':
      sortField = 'title'
      sortOrder = -1
      break
    default:
      break
  }

  const filter = { userId }

  if (tags && tags.length > 0) {
    const tagArray = Array.isArray(tags) ? tags : tags.split(',').map((tag) => tag.trim())
    const regexTags = tagArray.map((tag) => new RegExp(`^${tag}$`, 'i'))

    filter.tags = { $in: regexTags }
  }

  if (search) {
    const regex = new RegExp(search, 'i')
    filter.$or = [{ title: regex }, { content: regex }, { tags: regex }]
  }

  const validStates = ['active', 'archived', 'trashed']
  const noteState = validStates.includes(state) ? state : 'active'
  filter.state = noteState

  const notes = await Note.find(filter).sort({ isPinned: -1, [sortField]: sortOrder })
  return notes
}

const create = async (userId, noteData) => {
  const user = await User.findById(userId)
  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'User not found')
  }

  const note = new Note({
    ...noteData,
    userId: user._id
  })

  await note.save()
  return note._id
}

const getOne = async (userId, noteId) => {
  if (!mongoose.Types.ObjectId.isValid(noteId)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid note ID')
  }

  const note = await Note.findOne({ _id: noteId, userId })
  if (!note) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Note not found')
  }

  return note
}

const deleteOne = async (userId, noteId) => {
  if (!mongoose.Types.ObjectId.isValid(noteId)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid note ID')
  }

  const note = await Note.findOneAndDelete({ _id: noteId, userId })
  if (!note) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Note not found')
  }
}

const deleteAll = async (userId, session) => {
  await Note.deleteMany({ userId }, { session })
}

const pinNote = async (userId, noteId, isPinned) => {
  if (!mongoose.Types.ObjectId.isValid(noteId)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid note ID')
  }

  const note = await Note.findOne({ _id: noteId, userId })
  if (!note) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Note not found')
  }

  note.isPinned = isPinned
  await note.save()
  return note.isPinned
}

const updateState = async (userId, noteId, state) => {
  if (!mongoose.Types.ObjectId.isValid(noteId)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid note ID')
  }

  const note = await Note.findOne({ _id: noteId, userId })
  if (!note) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Note not found')
  }

  note.state = state
  await note.save()
}

const updateTitle = async (userId, noteId, title) => {
  if (!mongoose.Types.ObjectId.isValid(noteId)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid note ID')
  }

  const note = await Note.findOne({ _id: noteId, userId })
  if (!note) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Note not found')
  }

  note.title = title
  await note.save()
}

const updateContent = async (userId, noteId, content, textContent) => {
  if (!mongoose.Types.ObjectId.isValid(noteId)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid note ID')
  }

  const note = await Note.findOne({ _id: noteId, userId })
  if (!note) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Note not found')
  }

  note.content = content
  note.textContent = textContent
  await note.save()
}

const updateColor = async (userId, noteId, color) => {
  if (!mongoose.Types.ObjectId.isValid(noteId)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid note ID')
  }

  const note = await Note.findOne({ _id: noteId, userId })
  if (!note) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Note not found')
  }

  note.color = color
  await note.save()
}

const updateTags = async (userId, noteId, tags) => {
  if (!mongoose.Types.ObjectId.isValid(noteId)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid note ID')
  }

  const note = await Note.findOne({ _id: noteId, userId })
  if (!note) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Note not found')
  }

  note.tags = tags
  await note.save()
}

const restoreNotesFromArchive = async (userId) => {
  const result = await Note.updateMany({ userId, state: 'archived' }, { $set: { state: 'active' } })
  return result.modifiedCount
}

const restoreNotesFromTrash = async (userId) => {
  const result = await Note.updateMany({ userId, state: 'trashed' }, { $set: { state: 'active' } })
  return result.modifiedCount
}

const emptyTrash = async (userId) => {
  const result = await Note.deleteMany({ userId, state: 'trashed' })
  return result.deletedCount
}

export const noteService = {
  getAll,
  create,
  getOne,
  deleteOne,
  deleteAll,
  pinNote,
  updateState,
  updateTitle,
  updateContent,
  updateColor,
  updateTags,
  restoreNotesFromArchive,
  restoreNotesFromTrash,
  emptyTrash
}
