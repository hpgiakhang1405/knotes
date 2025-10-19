import mongoose from 'mongoose'

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      default: 'Untitled',
      trim: true
    },
    content: {
      type: String,
      default: ''
    },
    textContent: {
      type: String,
      default: ''
    },
    tags: {
      type: [String],
      default: []
    },
    isPinned: {
      type: Boolean,
      default: false
    },
    state: {
      type: String,
      enum: ['active', 'archived', 'trashed'],
      default: 'active'
    },
    color: {
      type: String,
      default: '#FFFFFF'
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
)

const Note = mongoose.model('Note', noteSchema)
export default Note
