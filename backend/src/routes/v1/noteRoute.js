import express from 'express'
import { noteController } from '../../controllers/noteController.js'
import { verifyUserMiddleware } from '../../middlewares/verifyUserMiddleware.js'
import { validateDataMiddleware } from '../../middlewares/validateDataMiddleware.js'
import { noteValidation } from '../../validations/noteValidation.js'

const Router = express.Router()

Router.route('/')
  .get(verifyUserMiddleware, noteController.getAll)
  .post(validateDataMiddleware(noteValidation.createNoteSchema), verifyUserMiddleware, noteController.create)

Router.route('/:id')
  .get(verifyUserMiddleware, noteController.getOne)
  .delete(verifyUserMiddleware, noteController.deleteOne)

Router.patch(
  '/:id/pin',
  validateDataMiddleware(noteValidation.pinNoteSchema),
  verifyUserMiddleware,
  noteController.pinNote
)
Router.patch(
  '/:id/archive',
  validateDataMiddleware(noteValidation.archiveNoteSchema),
  verifyUserMiddleware,
  noteController.archiveNote
)
Router.patch(
  '/:id/title',
  validateDataMiddleware(noteValidation.updateTitleSchema),
  verifyUserMiddleware,
  noteController.updateTitle
)
Router.patch(
  '/:id/content',
  validateDataMiddleware(noteValidation.updateContentSchema),
  verifyUserMiddleware,
  noteController.updateContent
)
Router.patch(
  '/:id/color',
  validateDataMiddleware(noteValidation.updateColorSchema),
  verifyUserMiddleware,
  noteController.updateColor
)
Router.patch(
  '/:id/tags',
  validateDataMiddleware(noteValidation.updateTagsSchema),
  verifyUserMiddleware,
  noteController.updateTags
)

export const noteRoute = Router
