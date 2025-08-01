import React from 'react'
import Image from '~/components/Image'
import AuthIllustration from '~/assets/images/auth-illustration.svg'
import Header from '~/components/Header'
import { cn } from '~/lib/utils'

const AuthLayout = ({ children, noIllustration }) => {
  return (
    <div className="min-h-svh flex flex-col">
      <Header onlyLogo />
      <div className={cn('grid lg:grid-cols-2 flex-1 container mx-auto', noIllustration && 'lg:grid-cols-1')}>
        <div className="p-4 md:p-6 content-center">{children}</div>

        {!noIllustration && (
          <div className="relative hidden lg:block">
            <Image
              src={AuthIllustration}
              alt="auth-illustration"
              className="absolute inset-0 m-auto w-3/4 object-contain"
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default AuthLayout
