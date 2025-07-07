'use client'

import { AccountPopover } from "@/features/account-popover";
import { ROUTES } from "@/shared/consts";
import { CalendarIcon, NotificationsIcon } from "@/shared/icons";
import { useAuth } from "@/shared/hooks";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { Currency } from "@/shared/types";

const Header = () => {
  const currentPage = usePathname()
  const locale = useLocale()
  const t = useTranslations('header')

  const { getMeQuery } = useAuth()
  const user = getMeQuery.data?.data

  const routesMap = {
    [`/${locale}`]: t('dashboard'),
    [`/${locale}${ROUTES.TRANSACTIONS}`]: t('transactions'),
    [`/${locale}${ROUTES.REPORTS}`]: t('reports'),
    [`/${locale}${ROUTES.INSIGHTS}`]: t('insights'),
    [`/${locale}${ROUTES.SETTINGS}`]: t('settings'),
  }

  const currencySymbols = {
    [Currency.USD]: '$',
    [Currency.EUR]: '€',
    [Currency.UAH]: '₴'
  }
  
  return (
    <header className='w-full h-[60px] px-8 flex justify-between border-b border-border items-center sticky top-0 bg-background-white'>
      <h1 className="text-2xl font-medium">
        {routesMap[currentPage as keyof typeof routesMap]}
        {' | '} 
        {t('totalBalance')}{': '}
        {user?.totalBalance.toFixed(2)} 
        {currencySymbols[user?.mainCurrency as keyof typeof currencySymbols]}
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