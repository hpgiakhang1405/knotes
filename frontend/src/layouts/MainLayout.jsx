import React from 'react'
import { Outlet } from 'react-router-dom'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '~/components/ui/sidebar'
import Sidebar from '~/components/Sidebar'
import Header from '~/components/Header'

const MainLayout = () => {
  return (
    <SidebarProvider className="max-h-svh overflow-hidden">
      <Sidebar />
      <SidebarInset>
        <Header inMainLayout />
        <div className="flex-1 p-4 md:p-8 overflow-auto">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default MainLayout
