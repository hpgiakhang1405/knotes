import React from 'react'
import { useParams } from 'react-router-dom'
import { SimpleEditor } from '~/components/tiptap-templates/simple/simple-editor'
import Avatar from '~/components/Avatar'
import TitleEditor from '~/components/TitleEditor'

import content from '~/components/tiptap-templates/simple/data/content.json'
import TagList from '~/components/TagList'

const tags = ['Movie', 'Anime', 'Manga']

const NoteDetailPage = () => {
  const { id } = useParams()

  const handleAddTag = (data) => {
    console.log('Adding new tag:', data.name)
  }

  return (
    <>
      <div className="max-w-xl mx-auto">
        <TitleEditor className="text-2xl md:text-3xl font-bold mb-8" title="Demon Slayer: Infinity Castle Arc" />
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-4">
            <div className="text-muted-foreground">Created by</div>
          </div>
          <div className="col-span-8">
            <div className="font-medium flex items-center gap-2">
              <Avatar
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4XPQB-JL3CFyJrgdNrmGbvwR_QymtV3xv-g&s"
                alt="Gia Khang"
                size="sm"
              />
              <span>Gia Khang</span>
            </div>
          </div>
          <div className="col-span-4">
            <div className="text-muted-foreground">Last Modified</div>
          </div>
          <div className="col-span-8">
            <div className="font-medium">23 June 2025, 14:05</div>
          </div>
          <div className="col-span-4">
            <div className="text-muted-foreground">Tags</div>
          </div>
          <div className="col-span-8">
            <TagList list={tags} inDetailPage onSubmit={handleAddTag} />
          </div>
        </div>
      </div>
      <SimpleEditor content={content} />
    </>
  )
}

export default NoteDetailPage
