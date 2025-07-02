import React from 'react'
import { Outlet } from 'react-router-dom'
import { SidebarInset, SidebarProvider } from '~/components/ui/sidebar'
import Sidebar from '~/components/Sidebar'
import Header from '~/components/Header'

const MainLayout = ({ noSearchBox }) => {
  return (
    <SidebarProvider className="max-h-screen overflow-hidden">
      <Sidebar />
      <SidebarInset>
        <Header inMainLayout noSearchBox={noSearchBox} className="z-20" />
        <div className="flex-1 p-4 sm:p-8 overflow-auto">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default MainLayout
