'use client'

import { AccountPopover } from "@/features/account";
import { useAuth } from "@/shared/hooks";
import { CalendarIcon, NotificationsIcon } from "@/shared/icons";

const Header = () => {
  const {getMeQuery} = useAuth()
  const {data: user} = getMeQuery.data || {data: null};

  return (
    <header className='w-full h-[60px] px-8 flex justify-between border-b border-border items-center sticky top-0 bg-branding-primary-default'>
      <h1 className="text-h1 font-medium">
        Spendly {user && `| Hello, ${user.firstName} !`}
      </h1>
      
      <div className="flex items-center gap-8">
        <NotificationsIcon className="cursor-pointer" />
        
        <CalendarIcon className="cursor-pointer" />
        
        <AccountPopover />
      </div>
    </header>
  )
}

export {Header};