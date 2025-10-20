import React from 'react'
import { useParams } from 'react-router-dom'
import { SimpleEditor } from '~/components/tiptap-templates/simple/simple-editor'
import Avatar from '~/components/Avatar'
import TitleEditor from '~/components/TitleEditor'

import TagList from '~/components/TagList'
import { useNoteApi } from '~/hooks/apis/useNoteApi'
import { useUploadApi } from '~/hooks/apis/useUploadApi'
import useUserStore from '~/stores/userStore'
import { formatDate, getErrorMessage, parseJsonSafe } from '~/lib/utils'
import { toast } from 'sonner'

const NoteDetailPage = () => {
  const { id } = useParams()

  const { queryClient, getOneNoteQuery, updateNoteTitleMutation, updateNoteContentMutation, updateNoteTagsMutation } =
    useNoteApi({
      noteId: id
    })
  const { data, isLoading } = getOneNoteQuery

  const { uploadImageMutation } = useUploadApi()

  const { user } = useUserStore()

  const handleAddTag = async (data) => {
    try {
      await updateNoteTagsMutation.mutateAsync({ noteId: id, data: { tags: data } })
      queryClient.invalidateQueries({ queryKey: ['note', id] })
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  const handleTitleEdit = async (newTitle) => {
    try {
      await updateNoteTitleMutation.mutateAsync({ noteId: id, data: { title: newTitle } })
      queryClient.invalidateQueries({ queryKey: ['note', id] })
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  const handleContentEdit = async (newContent, newTextContent) => {
    try {
      await updateNoteContentMutation.mutateAsync({
        noteId: id,
        data: { content: newContent, textContent: newTextContent }
      })
      queryClient.invalidateQueries({ queryKey: ['note', id] })
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  const handleUploadImage = async (file, onProgress, abortSignal) => {
    const formData = new FormData()
    formData.append('image', file)

    try {
      const res = await uploadImageMutation.mutateAsync({
        data: formData,
        config: {
          signal: abortSignal,
          onUploadProgress: (e) => {
            const progress = Math.round((e.loaded * 100) / e.total)
            onProgress?.({ progress })
          }
        }
      })
      toast.success(res.data.message)
      queryClient.invalidateQueries({ queryKey: ['note', id] })
      queryClient.invalidateQueries({ queryKey: ['notes'] })
      return res.data.url
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  const handleUploadImageError = (error) => {
    toast.error(getErrorMessage(error))
  }

  if (isLoading) return <></>

  return (
    <>
      <div className="max-w-xl mx-auto">
        <TitleEditor
          className="text-xl md:text-2xl font-bold mb-8"
          title={data?.data.note.title}
          onEdit={handleTitleEdit}
          editable={data?.data.note.state !== 'trashed'}
        />
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-4">
            <div className="text-muted-foreground">Created by</div>
          </div>
          <div className="col-span-8">
            <div className="font-medium flex items-center gap-2">
              <Avatar src={user?.avatarUrl} alt={user?.name} size="sm" />
              <span>{user?.name}</span>
            </div>
          </div>
          <div className="col-span-4">
            <div className="text-muted-foreground">Last edited</div>
          </div>
          <div className="col-span-8">
            <div className="font-medium">{formatDate(data?.data.note.updatedAt)}</div>
          </div>
          <div className="col-span-4">
            <div className="text-muted-foreground">Tags</div>
          </div>
          <div className="col-span-8">
            <TagList
              list={data?.data.note.tags}
              canEdit={data?.data.note.state !== 'trashed'}
              onSubmit={handleAddTag}
            />
          </div>
        </div>
      </div>
      <SimpleEditor
        content={parseJsonSafe(data?.data.note.content)}
        text={data?.data.note.textContent}
        onEdit={handleContentEdit}
        onUploadImage={handleUploadImage}
        onUploadImageError={handleUploadImageError}
        editable={data?.data.note.state !== 'trashed'}
      />
    </>
  )
}

export default NoteDetailPage
