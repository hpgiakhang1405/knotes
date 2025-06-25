import React from 'react'
import { NavLink } from 'react-router-dom'
import { Archive, NotebookText, Trash2 } from 'lucide-react'
import {
  Sidebar as ShadSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from './ui/sidebar'
import NavUser from './NavUser'
import LogoTitle from './LogoTitle'
import { routes } from '~/router/routes'

const user = {
  name: 'Gia Khang',
  email: 'giakhang@gmail.com'
}

const sidebarItems = [
  {
    title: 'My Notes',
    url: routes.notes,
    icon: NotebookText
  },
  {
    title: 'Archived',
    url: routes.archived,
    icon: Archive
  },
  {
    title: 'Trash',
    url: routes.trash,
    icon: Trash2
  }
]

const Sidebar = ({ ...props }) => {
  return (
    <ShadSidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <LogoTitle isSmall />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <NavLink to={item.url}>
                    {({ isActive }) => (
                      <SidebarMenuButton size="lg" isActive={isActive} asChild>
                        <div>
                          <item.icon />
                          <span>{item.title}</span>
                        </div>
                      </SidebarMenuButton>
                    )}
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </ShadSidebar>
  )
}

export default Sidebar
