'use client'

import {AccountPopover} from "@/features/account";

const Header = () => {
  return (
    <header className='w-full h-[60px] px-4 flex justify-between items-center sticky top-0 bg-branding-primary-default shadow-2xl'>
      <h1 className="text-2xl">
        <b>Spendly</b> - the most simple way to track your finances
      </h1>
      
      <AccountPopover />
    </header>
  )
}

export {Header};