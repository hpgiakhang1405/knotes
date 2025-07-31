import React from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { ImageUp } from 'lucide-react'
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form'
import { Input } from './ui/input'
import Avatar from './Avatar'
import { avatarFileSchema } from '~/lib/schemas'
import { getErrorMessage } from '~/lib/utils'

const avatarSchema = z.object({
  avatar: avatarFileSchema.optional()
})

const AvatarForm = ({ currentAvatar = '', currentAlt = '', size = '2xl', className, onSubmit, isPending }) => {
  const form = useForm({
    resolver: zodResolver(avatarSchema),
    defaultValues: {
      avatar: null
    }
  })

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (file) {
      form.setValue('avatar', file)
      const isValid = await form.trigger('avatar')
      if (isValid) {
        await form.handleSubmit(onSubmit)()
      } else {
        const errorMsg = getErrorMessage(form.getFieldState('avatar').error)
        toast.error(errorMsg)
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={className}>
        <FormField
          control={form.control}
          name="avatar"
          render={() => (
            <FormItem>
              <FormControl>
                <div className="relative group rounded-full">
                  <Avatar src={currentAvatar} alt={currentAlt} size={size} />
                  {isPending ? (
                    <div className="absolute inset-0 rounded-full bg-muted/60 transition-all" />
                  ) : (
                    <FormLabel
                      htmlFor="avatar-upload"
                      className="absolute inset-0 cursor-pointer flex items-center justify-center group-hover:bg-muted/60 rounded-full transition-all"
                    >
                      <ImageUp className="opacity-0 group-hover:opacity-100 transition-all text-foreground" size={32} />
                      <Input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </FormLabel>
                  )}
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

export default AvatarForm
