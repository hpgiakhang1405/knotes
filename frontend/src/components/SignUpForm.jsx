import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Button } from './ui/button'
import PasswordInput from './PasswordInput'
import { Checkbox } from './ui/checkbox'
import { Label } from './ui/label'

const signUpSchema = z
  .object({
    name: z.string().trim().min(1, 'Name is required'),

    email: z.string().trim().toLowerCase().min(1, 'Email is required').email('Invalid email address'),

    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .max(64, 'Password must not exceed 64 characters')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(/[^a-zA-Z0-9]/, 'Password must contain at least one special character'),

    confirmPassword: z.string().min(1, 'Please confirm your password'),

    acceptTerms: z.literal(true, {
      errorMap: () => ({ message: 'You must accept the terms and conditions' })
    })
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match'
  })

const SignUpForm = ({ onSubmit }) => {
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false
    }
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} type="text" placeholder="Enter your name" />
              </FormControl>
              <FormDescription>Your public name shown across the app.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} type="email" placeholder="Enter your email" />
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
                <PasswordInput {...field} placeholder="Enter your password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <PasswordInput {...field} placeholder="Confirm your password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="acceptTerms"
          render={({ field }) => (
            <div className="flex items-start gap-3">
              <Checkbox id="terms" checked={field.value} onCheckedChange={(checked) => field.onChange(!!checked)} />
              <div className="grid gap-2">
                <Label htmlFor="terms">Accept terms and conditions</Label>
                <p className="text-muted-foreground text-sm">
                  By clicking this checkbox, you agree to the terms and conditions.
                </p>
                <FormMessage />
              </div>
            </div>
          )}
        />
        <Button type="submit" size="lg" className="w-full">
          Sign Up
        </Button>
      </form>
    </Form>
  )
}

export default SignUpForm
