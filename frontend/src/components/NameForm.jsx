import React, { useEffect, useRef } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { nameSchema as znameSchema } from '~/lib/schemas'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { cn } from '~/lib/utils'
import { useDebounce } from '~/hooks/useDebounce'

const nameSchema = z.object({
  name: znameSchema
})

const NameForm = ({ className, onSubmit }) => {
  const form = useForm({
    resolver: zodResolver(nameSchema),
    defaultValues: {
      name: 'Gia Khang'
    }
  })

  const name = form.watch('name')
  const debouncedName = useDebounce(name)

  const handleSubmit = async () => {
    const isValid = await form.trigger('name')
    if (isValid) {
      await form.handleSubmit(onSubmit)()
    }
  }

  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    handleSubmit()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedName])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('w-full', className)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} type="text" placeholder="Enter your name" autoComplete="name" />
              </FormControl>
              <FormDescription>Your public name shown across the app.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

export default NameForm
