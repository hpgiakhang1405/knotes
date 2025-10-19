import { useMutation, useQueryClient } from '@tanstack/react-query'
import uploadApi from '~/apis/uploadApi'

export const useUploadApi = () => {
  const queryClient = useQueryClient()

  const uploadImageMutation = useMutation({
    mutationFn: ({ data, config }) => uploadApi.uploadImage(data, config)
  })

  return {
    queryClient,
    uploadImageMutation
  }
}
