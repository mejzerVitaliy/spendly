'use client'

import { AccountPopover } from "@/features/account";
import { CalendarIcon, NotificationsIcon } from "@/shared/icons";

const Header = () => {
  return (
    <header className='w-full h-[60px] px-8 flex border-b border-border-card justify-between items-center sticky top-0 bg-branding-primary-default shadow-2xl'>
      <h1 className="text-h1">
        <b>Spendly</b>
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