import React, { useState } from 'react'
import { useIsMobile } from '~/hooks/use-mobile'
import { cn } from '~/lib/utils'
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

const AccountForm = ({ className }) => {
  const handleAvatarSubmit = async (data) => {
    console.log('Avatar submitted:', data.avatar)
  }

  const handleNameSubmit = async (data) => {
    console.log('Name submitted:', data.name)
  }

  const handleDeleteAccount = async () => {
    console.log('Account deleted')
  }

  const handleChangePassword = async (data) => {
    console.log('Password changed:', data)
  }

  return (
    <div className={cn('space-y-4', className)}>
      <div className={cn('flex flex-wrap items-start gap-4 my-4')}>
        <AvatarForm
          currentAvatar="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4XPQB-JL3CFyJrgdNrmGbvwR_QymtV3xv-g&s"
          currentAlt="Gia Khang"
          onSubmit={handleAvatarSubmit}
        />
        <NameForm onSubmit={handleNameSubmit} className="flex-1" />
      </div>

      <Separator />

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input disabled id="email" type="email" placeholder="Enter your email" value="giakhang@gmail.com" />
      </div>
      <div className="space-y-2">
        <Label>Password</Label>
        <div className="text-muted-foreground text-sm">Change your password to login to your account.</div>
        <Dialog>
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
            <ChangePasswordForm onSubmit={handleChangePassword} />
          </DialogContent>
        </Dialog>
      </div>

      <Separator />

      <div className="space-y-2">
        <Label>Delete my account</Label>
        <div className="text-muted-foreground text-sm">Permanently delete the account.</div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button type="button" variant="destructive">
              Delete Account
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
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
