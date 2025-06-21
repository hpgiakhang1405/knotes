import React from 'react'
import { Outlet } from 'react-router-dom'
import Image from '~/components/Image'
import AuthIllustration from '~/assets/images/auth-illustration.svg'
import Header from '~/components/Header'

const AuthLayout = () => {
  return (
    <div className="min-h-svh flex flex-col">
      <Header onlyLogo />
      <div className="grid lg:grid-cols-2 flex-1 container mx-auto">
        <div className="p-4 md:p-6 content-center">
          <Outlet />
        </div>

        <div className="relative hidden lg:block">
          <Image
            src={AuthIllustration}
            alt="auth-illustration"
            className="absolute inset-0 m-auto w-3/4 object-contain"
          />
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
