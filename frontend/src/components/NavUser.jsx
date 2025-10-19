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
import useUserStore from '~/stores/userStore'
import { useAuthApi } from '~/hooks/apis/useAuthApi'
import { toast } from 'sonner'
import { getErrorMessage } from '~/lib/utils'

const NavUser = () => {
  const { user, clearUser } = useUserStore()

  const { logoutMutation } = useAuthApi()

  const handleLogout = async () => {
    try {
      const res = await logoutMutation.mutateAsync()
      toast.success(res.data.message)
      clearUser()
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  if (!user) return <></>

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar src={user.avatarUrl} alt={user.name} />
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
            <DropdownMenuItem onSelect={handleLogout}>
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
