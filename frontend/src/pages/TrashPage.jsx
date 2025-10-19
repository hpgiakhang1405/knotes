import React from 'react'
import { RotateCcw, Trash } from 'lucide-react'
import NoteList from '~/components/NoteList'
import { Button } from '~/components/ui/button'
import { useSearchParams } from 'react-router-dom'
import { useNoteApi } from '~/hooks/apis/useNoteApi'
import { toast } from 'sonner'
import { getErrorMessage } from '~/lib/utils'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '~/components/ui/alert-dialog'

const TrashPage = () => {
  const [params] = useSearchParams()
  const { sortBy, tags, search, state = 'trashed' } = Object.fromEntries(params)
  const paramsObj = { sortBy, tags, search, state }

  const { queryClient, restoreFromTrashMutation, emptyTrashMutation, getAllNotesQuery } = useNoteApi({
    params: paramsObj
  })
  const { data, isLoading } = getAllNotesQuery

  const handleRestoreAll = async () => {
    try {
      const res = await restoreFromTrashMutation.mutateAsync()
      toast.success(res.data.message)
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  const handleEmptyTrash = async () => {
    try {
      const res = await emptyTrashMutation.mutateAsync()
      toast.success(res.data.message)
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Trash</h3>
        {data?.data.notes.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleRestoreAll}
              disabled={restoreFromTrashMutation.isPending}
            >
              <RotateCcw /> Restore All
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button type="button" variant="destructive" disabled={emptyTrashMutation.isPending}>
                  <Trash /> Empty Trash
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete all notes in your trash.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleEmptyTrash}>Yes, empty trash</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </div>
      <NoteList type="trash" data={data?.data.notes} isLoading={isLoading} />
    </div>
  )
}

export default TrashPage
