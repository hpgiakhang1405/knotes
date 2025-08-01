import React from 'react'
import { z } from 'zod'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form'
import { OTPSchema } from '~/lib/schemas'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { InputOTP, InputOTPGroup, InputOTPSlot } from './ui/input-otp'
import { REGEXP_ONLY_DIGITS } from 'input-otp'
import { Button } from './ui/button'

const verifyOTPSchema = z.object({
  otp: OTPSchema
})

const OTPForm = ({ onSubmit, onResend, isPending }) => {
  const form = useForm({
    resolver: zodResolver(verifyOTPSchema),
    defaultValues: {
      otp: ''
    }
  })

  return (
    <Form {...form}>
      <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-5">
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2 items-center">
              <FormControl>
                <InputOTP maxLength={6} {...field} pattern={REGEXP_ONLY_DIGITS}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" size="lg" disabled={isPending}>
          Verify
        </Button>

        <div className="text-center text-sm -mt-4">
          <span className="text-muted-foreground">Didn't receive the OTP? </span>
          <Button
            type="button"
            variant="link"
            className="p-0 cursor-pointer"
            onClick={() => {
              form.reset()
              onResend()
            }}
            disabled={isPending}
          >
            Resend OTP
          </Button>
        </div>
      </form>
    </Form>
  )
}

const VerifyOTPDialog = ({ open, onOpenChange, email = 'abc@example.com', onSubmit, isPending, onResend }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="md:max-w-sm">
        <DialogHeader>
          <DialogTitle>Verify Your Account</DialogTitle>
          <DialogDescription>
            An OTP has been sent to <span className="font-semibold">{email}</span>. Please enter the OTP to verify your
            account.
          </DialogDescription>
        </DialogHeader>
        <OTPForm onSubmit={onSubmit} onResend={onResend} isPending={isPending} />
      </DialogContent>
    </Dialog>
  )
}

export default VerifyOTPDialog
