import { z } from 'zod'
import { titleSchema, contentSchema, tagsSchema, colorSchema, isArchivedSchema, isPinnedSchema } from './schemas.js'

const createNoteSchema = z.object({
  title: titleSchema,
  content: contentSchema,
  tags: tagsSchema,
  color: colorSchema,
  isArchived: isArchivedSchema,
  isPinned: isPinnedSchema
})

const pinNoteSchema = z.object({
  isPinned: isPinnedSchema
})

const archiveNoteSchema = z.object({
  isArchived: isArchivedSchema
})

const updateTitleSchema = z.object({
  title: titleSchema
})

const updateContentSchema = z.object({
  content: contentSchema
})

const updateColorSchema = z.object({
  color: colorSchema
})

const updateTagsSchema = z.object({
  tags: tagsSchema
})

export const noteValidation = {
  createNoteSchema,
  pinNoteSchema,
  archiveNoteSchema,
  updateTitleSchema,
  updateContentSchema,
  updateColorSchema,
  updateTagsSchema
}
