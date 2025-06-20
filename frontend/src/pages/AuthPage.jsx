import React from 'react'
import Image from '~/components/Image'
import LogoTitle from '~/components/LogoTitle'
import AuthForm from '~/components/AuthForm'
import { toast } from 'sonner'
import AuthIllustration from '~/assets/images/auth-illustration.png'

const AuthPage = () => {
  const onSubmit = (data) => {
    toast('You submitted the following values', {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      )
    })
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-start">
          <LogoTitle />
        </div>
        <AuthForm onSubmit={onSubmit} />
      </div>

      <div className="relative hidden lg:block">
        <Image
          src={AuthIllustration}
          alt="auth-illustration"
          className="absolute inset-0 m-auto w-2/3 object-contain dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}

export default AuthPage
