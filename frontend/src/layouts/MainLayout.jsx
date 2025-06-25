import React from 'react'
import { Outlet } from 'react-router-dom'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '~/components/ui/sidebar'
import Sidebar from '~/components/Sidebar'
import ThemeToggle from '~/components/ThemeToggle'
import SearchInput from '~/components/SearchInput'

const MainLayout = () => {
  return (
    <SidebarProvider>
      <Sidebar />
      <SidebarInset>
        <header className="flex shrink-0 items-center gap-2 p-4">
          <div className="flex items-center justify-between w-full">
            <SidebarTrigger />
            <SearchInput placeholder="Search notes..." />
            <ThemeToggle />
          </div>
        </header>
        <div className="flex-1 p-4 md:px-8">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default MainLayout
