import React, { useState } from 'react'
import { z } from 'zod'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Plus, X } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Input } from './ui/input'
import { nameSchema as znameSchema } from '~/lib/schemas'
import { cn } from '~/lib/utils'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form'
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

const nameSchema = z.object({
  name: znameSchema
})

const TagList = ({ list, className, canEdit, onSubmit }) => {
  const [newTagOpen, setNewTagOpen] = useState(false)

  const form = useForm({
    resolver: zodResolver(nameSchema),
    defaultValues: {
      name: ''
    }
  })

  const handleAddTag = async (data) => {
    const isIncluded = list.includes(data.name)
    if (!isIncluded) {
      const newTagList = [...list, data.name]
      await onSubmit(newTagList)
    }
    setNewTagOpen(false)
    form.reset()
  }

  const handleRemoveTag = async (tagToRemove) => {
    const newTagList = list.filter((tag) => tag !== tagToRemove)
    await onSubmit(newTagList)
  }

  if (canEdit)
    return (
      <div className={cn('flex flex-wrap gap-2 items-center', className)}>
        {list.map((tag) => (
          <Button key={tag} type="button" variant="secondary" size="sm" className="relative group">
            {tag}

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <div className="absolute -top-2 -right-2 rounded-full bg-accent cursor-pointer p-0.5 lg:opacity-0 group-hover:opacity-100 transition-all">
                  <X />
                </div>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. It will remove the tag <strong>{tag}</strong> from this note.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleRemoveTag(tag)}>Yes, remove tag</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </Button>
        ))}

        <Popover open={newTagOpen} onOpenChange={setNewTagOpen}>
          <PopoverTrigger asChild>
            <Button type="button" variant="secondary" size="sm">
              <Plus />
              Add new tag
            </Button>
          </PopoverTrigger>
          <PopoverContent sideOffset={8}>
            <Form {...form}>
              <form noValidate onSubmit={form.handleSubmit(handleAddTag)} className="w-full space-y-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} type="text" placeholder="New tag name..." autoComplete="name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Add tag
                </Button>
              </form>
            </Form>
          </PopoverContent>
        </Popover>
      </div>
    )

  return (
    <div className={cn('flex items-center flex-wrap gap-2', className)}>
      {list.map((tag) => (
        <Badge key={tag} variant="secondary" className="text-muted-foreground">
          {tag}
        </Badge>
      ))}
    </div>
  )
}

export default TagList
