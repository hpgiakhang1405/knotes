import { StatusCodes } from 'http-status-codes'
import { noteService } from '../services/noteService.js'

const getAll = async (req, res, next) => {
  try {
    const userId = req.user.userId
    const { sortBy, order, tags, search, state } = req.query
    const notes = await noteService.getAll(userId, sortBy, order, tags, search, state)

    res.status(StatusCodes.OK).json({
      message: 'Notes fetched successfully',
      notes
    })
  } catch (error) {
    next(error)
  }
}

const create = async (req, res, next) => {
  try {
    const userId = req.user.userId
    const noteData = req.body
    const noteId = await noteService.create(userId, noteData)

    res.status(StatusCodes.CREATED).json({
      message: 'Note created successfully',
      noteId
    })
  } catch (error) {
    next(error)
  }
}

const getOne = async (req, res, next) => {
  try {
    const userId = req.user.userId
    const noteId = req.params.id
    const note = await noteService.getOne(userId, noteId)

    res.status(StatusCodes.OK).json({
      message: 'Note fetched successfully',
      note
    })
  } catch (error) {
    next(error)
  }
}

const deleteOne = async (req, res, next) => {
  try {
    const userId = req.user.userId
    const noteId = req.params.id
    await noteService.deleteOne(userId, noteId)

    res.status(StatusCodes.OK).json({
      message: 'Note deleted successfully'
    })
  } catch (error) {
    next(error)
  }
}

const pinNote = async (req, res, next) => {
  try {
    const userId = req.user.userId
    const noteId = req.params.id
    const { isPinned } = req.body
    const result = await noteService.pinNote(userId, noteId, isPinned)

    res.status(StatusCodes.OK).json({
      message: result ? 'Note pinned successfully' : 'Note unpinned successfully'
    })
  } catch (error) {
    next(error)
  }
}

const updateState = async (req, res, next) => {
  try {
    const userId = req.user.userId
    const noteId = req.params.id
    const { state } = req.body
    await noteService.updateState(userId, noteId, state)

    res.status(StatusCodes.OK).json({
      message: 'Note state updated successfully'
    })
  } catch (error) {
    next(error)
  }
}

const updateTitle = async (req, res, next) => {
  try {
    const userId = req.user.userId
    const noteId = req.params.id
    const { title } = req.body
    await noteService.updateTitle(userId, noteId, title)

    res.status(StatusCodes.OK).json({
      message: 'Note title updated successfully'
    })
  } catch (error) {
    next(error)
  }
}

const updateContent = async (req, res, next) => {
  try {
    const userId = req.user.userId
    const noteId = req.params.id
    const { content } = req.body
    await noteService.updateContent(userId, noteId, content)

    res.status(StatusCodes.OK).json({
      message: 'Note content updated successfully'
    })
  } catch (error) {
    next(error)
  }
}

const updateColor = async (req, res, next) => {
  try {
    const userId = req.user.userId
    const noteId = req.params.id
    const { color } = req.body
    await noteService.updateColor(userId, noteId, color)

    res.status(StatusCodes.OK).json({
      message: 'Note color updated successfully'
    })
  } catch (error) {
    next(error)
  }
}

const updateTags = async (req, res, next) => {
  try {
    const userId = req.user.userId
    const noteId = req.params.id
    const { tags } = req.body
    await noteService.updateTags(userId, noteId, tags)

    res.status(StatusCodes.OK).json({
      message: 'Note tags updated successfully'
    })
  } catch (error) {
    next(error)
  }
}

const restoreNotesFromTrash = async (req, res, next) => {
  try {
    const userId = req.user.userId
    const count = await noteService.restoreNotesFromTrash(userId)

    res.status(StatusCodes.OK).json({
      message: `${count} notes restored from trash successfully`
    })
  } catch (error) {
    next(error)
  }
}

const emptyTrash = async (req, res, next) => {
  try {
    const userId = req.user.userId
    const count = await noteService.emptyTrash(userId)

    res.status(StatusCodes.OK).json({
      message: `${count} notes deleted from trash successfully`
    })
  } catch (error) {
    next(error)
  }
}

export const noteController = {
  getAll,
  create,
  getOne,
  deleteOne,
  pinNote,
  updateState,
  updateTitle,
  updateContent,
  updateColor,
  updateTags,
  restoreNotesFromTrash,
  emptyTrash
}
