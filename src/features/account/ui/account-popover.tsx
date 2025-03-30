'use client'

import { ROUTES } from "@/shared/consts"
import { useAuth } from "@/shared/hooks"
import { PersonIcon } from "@/shared/icons"
import { Button, Popover, PopoverContent, PopoverTrigger } from "@/shared/ui"
import Link from "next/link"
import { useToggle } from "usehooks-ts"

const AccountPopover = () => {
  const {getMeQuery, logoutMutation} = useAuth()
  const [open, toggleOpen] = useToggle()

  const {data: user} = getMeQuery.data || {data: null};

  if (!user) {
    return null;
  }

  const handleLogout = async () => {
    toggleOpen();
    await logoutMutation.mutateAsync();
  }

  return (
    <Popover open={open} onOpenChange={toggleOpen}>
      <PopoverTrigger asChild>
        <PersonIcon className="cursor-pointer" />
      </PopoverTrigger>

      <PopoverContent className="mr-3 p-0">
        <div className="p-0">
          <div className="p-2 border-b rounded-t-xl text-p1-bold hover:bg-branding-primary-hover">
            <Link onClick={toggleOpen} href={ROUTES.PROFILE}>
              <p>{user.firstName} {user.lastName}</p>
              <p className="text-c2-medium">{user.email}</p>
            </Link>
          </div>

          <Button onClick={handleLogout} className="w-full rounded-t-none rounded-b-xl bg-transparent">
            Log out
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export {AccountPopover}