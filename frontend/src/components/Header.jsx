import React from 'react'
import LogoTitle from './LogoTitle'
import { Link } from 'react-router-dom'
import { routesPath } from '~/routes'
import { Button } from './ui/button'

const Header = ({ onlyLogo = false }) => {
  return (
    <header className="p-4 md:p-6 shadow-xs">
      <div className="container mx-auto flex justify-between items-center">
        <LogoTitle />
        {!onlyLogo && (
          <nav>
            <ul className="flex items-center gap-4">
              <li className="hidden md:inline-block">
                <Link to={`${routesPath.auth}?mode=login`}>
                  <Button variant="secondary" size="lg">
                    Login
                  </Button>
                </Link>
              </li>
              <li>
                <Link to={`${routesPath.auth}?mode=signup`}>
                  <Button size="lg">Get KNotes free</Button>
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header
