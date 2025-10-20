import React, { useEffect, useRef, useState } from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import Document from '@tiptap/extension-document'
import Heading from '@tiptap/extension-heading'
import Text from '@tiptap/extension-text'
import History from '@tiptap/extension-history'
import Placeholder from '@tiptap/extension-placeholder'
import { useDebounce } from '~/hooks/useDebounce'

const TitleEditor = ({ title, className, onEdit, editable }) => {
  const [rawTitle, setRawTitle] = useState(title)
  const debouncedTitle = useDebounce(rawTitle, 1200)

  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    if (!debouncedTitle) return
    onEdit?.(debouncedTitle)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedTitle])

  const titleEditor = useEditor({
    editable,
    immediatelyRender: true,
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
      Document.extend({
        content: 'heading'
      }),
      Text,
      Heading.configure({
        levels: [1]
      }),
      History,
      Placeholder.configure({
        placeholder: 'Untitled note...'
      })
    ],
    content: title,
    onUpdate: ({ editor }) => {
      const text = editor.getText()
      setRawTitle(text)
    }
  })

  return <EditorContent editor={titleEditor} className={className} />
}

export default TitleEditor
