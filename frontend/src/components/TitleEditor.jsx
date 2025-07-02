import React from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import Document from '@tiptap/extension-document'
import Heading from '@tiptap/extension-heading'
import Text from '@tiptap/extension-text'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'

const TitleEditor = ({ title, className }) => {
  const titleEditor = useEditor({
    editorProps: {
      attributes: {
        'autocomplete': 'off',
        'autocorrect': 'off',
        'autocapitalize': 'off',
        'aria-label': 'Note title'
      },
      handleKeyDown(view, event) {
        if (event.key === 'Enter') {
          event.preventDefault()
          return true
        }
      }
    },
    extensions: [
      StarterKit,
      Document.extend({
        content: 'heading'
      }),
      Text,
      Heading.configure({
        levels: [1]
      }),
      Placeholder.configure({
        placeholder: 'Untitled note...'
      })
    ],
    content: title,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      console.log('Title updated:', html)
    }
  })

  return <EditorContent editor={titleEditor} className={className} />
}

export default TitleEditor
