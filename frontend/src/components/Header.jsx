import React from 'react'
import LogoTitle from './LogoTitle'
import { Link } from 'react-router-dom'
import { routes } from '~/router/routes'
import { Button } from './ui/button'
import ThemeToggle from './ThemeToggle'
import { SidebarTrigger } from './ui/sidebar'
import SearchInput from './SearchInput'
import { cn } from '~/lib/utils'

const Header = ({ inMainLayout = false, onlyLogo = false, noSearchBox = false, className }) => {
  if (inMainLayout)
    return (
      <header className={cn('relative flex shrink-0 items-center gap-2 p-4 border-b', className)}>
        <div className="flex items-center justify-between w-full">
          <SidebarTrigger />
          {!noSearchBox && <SearchInput placeholder="Search notes..." />}
          <ThemeToggle />
        </div>
      </header>
    )

  return (
    <header className={cn('p-4 md:p-6 shadow-xs', className)}>
      <div className="container mx-auto flex justify-between items-center">
        <LogoTitle />
        <nav>
          <ul className="flex items-center gap-3 md:gap-4">
            {!onlyLogo && (
              <>
                <li className="hidden md:inline-block">
                  <Link to={`${routes.auth}?mode=login`}>
                    <Button variant="secondary" size="lg">
                      Login
                    </Button>
                  </Link>
                </li>
                <li className="hidden sm:inline-block">
                  <Link to={`${routes.auth}?mode=signup`}>
                    <Button size="lg">Get KNotes free</Button>
                  </Link>
                </li>
              </>
            )}
            <li>
              <ThemeToggle />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
