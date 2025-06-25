import React from 'react'
import { Link } from 'react-router-dom'
import Header from '~/components/Header'
import Image from '~/components/Image'
import { Button } from '~/components/ui/button'
import { routes } from '~/router/routes'
import HomeIllustration from '~/assets/images/home-illustration.svg'

const HomePage = () => {
  return (
    <div className="min-h-svh flex flex-col">
      <Header />
      <div className="grid lg:grid-cols-2 flex-1 container mx-auto">
        <div className="max-w-lg mx-auto p-4 content-center space-y-4">
          <h1 className="scroll-m-20 text-left text-4xl md:text-5xl font-semibold tracking-tight text-balance">
            Your notes. Organized. Always within reach.
          </h1>
          <p className="text-muted-foreground text-xl md:text-2xl font-medium">
            Capture everything in one clean space - from quick thoughts to detailed plans.
          </p>
          <div className="flex items-center gap-2 mt-8">
            <Link to={routes.auth}>
              <Button size="lg" className="text-xl p-6">
                Get Started
              </Button>
            </Link>
          </div>
        </div>

        <div className="relative hidden lg:block">
          <Image
            src={HomeIllustration}
            alt="auth-illustration"
            className="absolute inset-0 m-auto w-4/5 object-contain"
          />
        </div>
      </div>
    </div>
  )
}

export default HomePage
