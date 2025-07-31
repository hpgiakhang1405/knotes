import React, { useLayoutEffect, useRef, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { SidebarInset, SidebarProvider } from '~/components/ui/sidebar'
import Sidebar from '~/components/Sidebar'
import Header from '~/components/Header'
import { ScrollArea } from '~/components/ui/scroll-area'

const MainLayout = ({ noSearchBox, children }) => {
  const headerRef = useRef(null)
  const [contentHeight, setContentHeight] = useState('calc(100dvh - var(--spacing) * 4)')

  useLayoutEffect(() => {
    const updateHeight = () => {
      if (headerRef.current) {
        const headerHeight = headerRef.current.offsetHeight
        setContentHeight(`calc(100dvh - var(--spacing) * 4 - ${headerHeight}px)`)
      }
    }

    updateHeight()
    window.addEventListener('resize', updateHeight)

    return () => window.removeEventListener('resize', updateHeight)
  }, [])

  return (
    <SidebarProvider>
      <Sidebar />
      <SidebarInset>
        <Header ref={headerRef} inMainLayout noSearchBox={noSearchBox} className="z-20" />
        <div className="flex-1 h-full" style={{ maxHeight: contentHeight }}>
          <ScrollArea className="h-full w-full">
            <div className="p-4 sm:p-8">{children}</div>
          </ScrollArea>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default MainLayout
