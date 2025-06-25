import React from 'react'
import LogoTitle from './LogoTitle'
import { Link } from 'react-router-dom'
import { routes } from '~/router/routes'
import { Button } from './ui/button'
import ThemeToggle from './ThemeToggle'

const Header = ({ onlyLogo = false }) => {
  return (
    <header className="p-4 md:p-6 shadow-xs">
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
                <li>
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
