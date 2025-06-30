import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Button } from './ui/button'
import PasswordInput from './PasswordInput'
import { emailSchema, passwordSchema } from '~/lib/schemas'

const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema
})

const LoginForm = ({ onSubmit }) => {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-5">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} type="email" placeholder="Enter your email" autoComplete="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput {...field} placeholder="Enter your password" autoComplete="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="text-right mt-[-1rem]">
          <Button type="button" variant="link" className="p-0 cursor-pointer">
            Forgot your password?
          </Button>
        </div>

        <Button type="submit" size="lg" className="w-full">
          Login
        </Button>
      </form>
    </Form>
  )
}

export default LoginForm
