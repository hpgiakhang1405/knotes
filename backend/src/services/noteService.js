import { StatusCodes } from 'http-status-codes'
import User from '../models/userModel.js'
import Note from '../models/noteModel.js'
import ApiError from '../utils/ApiError.js'
import mongoose from 'mongoose'

const getAll = async (userId) => {
  const notes = await Note.find({ userId: userId })
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

const archiveNote = async (userId, noteId, isArchived) => {
  if (!mongoose.Types.ObjectId.isValid(noteId)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid note ID')
  }

  const note = await Note.findOne({ _id: noteId, userId })
  if (!note) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Note not found')
  }

  note.isArchived = isArchived
  await note.save()
  return note.isArchived
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

const updateContent = async (userId, noteId, content) => {
  if (!mongoose.Types.ObjectId.isValid(noteId)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid note ID')
  }

  const note = await Note.findOne({ _id: noteId, userId })
  if (!note) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Note not found')
  }

  note.content = content
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

export const noteService = {
  getAll,
  create,
  getOne,
  deleteOne,
  deleteAll,
  pinNote,
  archiveNote,
  updateTitle,
  updateContent,
  updateColor,
  updateTags
}
