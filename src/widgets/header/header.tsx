'use client'

import { AccountPopover } from "@/features/account";
import { ROUTES } from "@/shared/consts";
import { CalendarIcon, NotificationsIcon } from "@/shared/icons";
import { usePathname } from "next/navigation";

const routesMap = {
  [ROUTES.DASHBOARD]: 'Dashboard',
  [ROUTES.TRANSACTIONS]: 'Transactions',
  [ROUTES.REPORTS]: 'Reports',
  [ROUTES.INSIGHTS]: 'Insights',
  [ROUTES.SETTINGS]: 'Settings',
}

const Header = () => {
  const currentPage = usePathname()
  
  return (
    <header className='w-full h-[60px] px-8 flex justify-between border-b border-border items-center sticky top-0 bg-background-white'>
      <h1 className="text-h1 font-medium">
        {routesMap[currentPage as keyof typeof routesMap]}
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