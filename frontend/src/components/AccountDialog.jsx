import React, { useState } from 'react'
import { useIsMobile } from '~/hooks/use-mobile'
import { cn, getErrorMessage } from '~/lib/utils'
import { Label } from './ui/label'
import { Separator } from './ui/separator'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from './ui/drawer'
import AvatarForm from './AvatarForm'
import NameForm from './NameForm'
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
} from './ui/alert-dialog'
import ChangePasswordForm from './ChangePasswordForm'
import useUserStore from '~/stores/userStore'
import { useUserApi } from '~/hooks/apis/useUserApi'
import { toast } from 'sonner'

const AccountForm = ({ className }) => {
  const [changePasswordOpen, setChangePasswordOpen] = useState(false)

  const { user, clearUser } = useUserStore()

  const { queryClient, changeNameMutation, changePasswordMutation, changeAvatarMutation, deleteAccountMutation } =
    useUserApi()

  const handleAvatarSubmit = async (data) => {
    const formData = new FormData()
    formData.append('image', data.avatar)

    toast.promise(changeAvatarMutation.mutateAsync(formData), {
      loading: 'Uploading avatar...',
      success: (res) => {
        queryClient.invalidateQueries(['me'])
        return res.data.message
      },
      error: getErrorMessage
    })
  }

  const handleNameSubmit = async (data) => {
    try {
      const res = await changeNameMutation.mutateAsync(data)
      toast.success(res.data.message)
      queryClient.invalidateQueries(['me'])
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  const handleDeleteAccount = async () => {
    try {
      const res = await deleteAccountMutation.mutateAsync()
      toast.success(res.data.message)
      clearUser()
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  const handleChangePassword = async (data) => {
    try {
      const res = await changePasswordMutation.mutateAsync(data)
      toast.success(res.data.message)
      setChangePasswordOpen(false)
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  return (
    <div className={cn('space-y-4', className)}>
      <div className={cn('flex flex-wrap items-start gap-4 my-4')}>
        <AvatarForm
          currentAvatar={user.avatarUrl}
          currentAlt={user.name}
          onSubmit={handleAvatarSubmit}
          isPending={changeAvatarMutation.isPending}
        />
        <NameForm currentName={user.name} onSubmit={handleNameSubmit} className="flex-1" />
      </div>

      <Separator />

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input disabled id="email" type="email" placeholder="Enter your email" value={user.email} />
      </div>
      <div className="space-y-2">
        <Label>Password</Label>
        <div className="text-muted-foreground text-sm">Change your password to login to your account.</div>
        <Dialog open={changePasswordOpen} onOpenChange={setChangePasswordOpen}>
          <DialogTrigger asChild>
            <Button type="button">Change password</Button>
          </DialogTrigger>
          <DialogContent className="md:max-w-sm">
            <DialogHeader>
              <DialogTitle>Change Password</DialogTitle>
              <DialogDescription>
                To update your password, please enter your current password and choose a strong new one.
              </DialogDescription>
            </DialogHeader>
            <ChangePasswordForm onSubmit={handleChangePassword} isPending={changePasswordMutation.isPending} />
          </DialogContent>
        </Dialog>
      </div>

      <Separator />

      <div className="space-y-2">
        <Label>Delete my account</Label>
        <div className="text-muted-foreground text-sm">Permanently delete the account.</div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button type="button" variant="destructive" disabled={deleteAccountMutation.isPending}>
              Delete Account
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="md:max-w-sm">
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your account and remove your data from our
                servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteAccount}>Yes, delete account</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}

const AccountDialog = ({ children }) => {
  const [open, setOpen] = useState(false)
  const isMobile = useIsMobile()

  if (!isMobile) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>My Account</DialogTitle>
            <DialogDescription>Update your personal information here.</DialogDescription>
          </DialogHeader>
          <AccountForm />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>My Account</DrawerTitle>
          <DrawerDescription>Update your personal information here.</DrawerDescription>
        </DrawerHeader>
        <AccountForm className="px-4" />
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default AccountDialog
