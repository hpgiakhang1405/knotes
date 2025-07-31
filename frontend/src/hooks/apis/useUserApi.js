import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import userApi from '~/apis/userApi'

export const useUserApi = () => {
  const queryClient = useQueryClient()

  const getMeQuery = useQuery({
    queryKey: ['me'],
    queryFn: userApi.getMe
  })

  const changeNameMutation = useMutation({
    mutationFn: userApi.changeName
  })

  const changePasswordMutation = useMutation({
    mutationFn: userApi.changePassword
  })

  const deleteAccountMutation = useMutation({
    mutationFn: userApi.deleteAccount
  })

  return {
    queryClient,
    getMeQuery,
    changeNameMutation,
    changePasswordMutation,
    deleteAccountMutation
  }
}
