'use client'

import { useAuth } from "@/shared/hooks"
import { PersonIcon } from "@/shared/icons"
import { Button, Popover, PopoverContent, PopoverTrigger } from "@/shared/ui"

const AccountPopover = () => {
  const {getMeQuery, logoutMutation} = useAuth()

  const {data: user} = getMeQuery.data || {data: null};

  if (!user) {
    return null;
  }

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="w-10 h-10 border-2 border-white rounded-full bg-gray-700">
          <PersonIcon width={24} height={24} />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="mr-3 p-0">
        <div className="p-0">
          <div className="p-2 border-b text-p1-bold">
            <p>{user.firstName} {user.lastName}</p>
            <p className="text-c2-medium">{user.email}</p>
          </div>

          <Button onClick={handleLogout} className="w-full rounded-t-none bg-transparent">
            Log out
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export {AccountPopover}