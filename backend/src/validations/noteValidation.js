import { z } from 'zod'
import { titleSchema, contentSchema, tagsSchema, colorSchema, isPinnedSchema, stateSchema } from './schemas.js'

const createNoteSchema = z.object({
  title: titleSchema,
  content: contentSchema,
  textContent: contentSchema,
  tags: tagsSchema,
  color: colorSchema,
  isPinned: isPinnedSchema,
  state: stateSchema
})

const pinNoteSchema = z.object({
  isPinned: isPinnedSchema
})

const updateStateSchema = z.object({
  state: stateSchema
})

const updateTitleSchema = z.object({
  title: titleSchema
})

const updateContentSchema = z.object({
  content: contentSchema,
  textContent: contentSchema
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
  updateStateSchema,
  updateTitleSchema,
  updateContentSchema,
  updateColorSchema,
  updateTagsSchema
}
