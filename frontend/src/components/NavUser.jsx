import { ChevronsUpDown, LogOut, UserRound } from 'lucide-react'
import Avatar from './Avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '~/components/ui/dropdown-menu'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '~/components/ui/sidebar'
import AccountDialog from './AccountDialog'

const NavUser = ({ user }) => {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4XPQB-JL3CFyJrgdNrmGbvwR_QymtV3xv-g&s"
                alt="Gia Khang"
              />
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56"
            side="top"
            align="center"
            sideOffset={8}
          >
            <DropdownMenuGroup>
              <AccountDialog>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <UserRound />
                  My Account
                </DropdownMenuItem>
              </AccountDialog>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

export default NavUser
