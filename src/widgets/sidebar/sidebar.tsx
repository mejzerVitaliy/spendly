'use client'

import { ROUTES } from "@/shared/consts";
import { CardIcon, CategoriesIcon, ChevronLeftIcon, DashboardIcon, ExpensesIcon, IncomesIcon, ReportsIcon, SettingsIcon } from "@/shared/icons";
import { cn } from "@/shared/lib";
import { useSidebarStore } from "@/shared/stores"
import { Collapsible, CollapsibleTrigger } from "@/shared/ui"
import Link from "next/link";

const Sidebar = () => {
  const { isOpen, toggleOpen } = useSidebarStore();

  const pages = [
    {
      label: 'Dashboard',
      Icon: DashboardIcon,
      href: ROUTES.DASHBOARD
    },
    {
      label: 'Transactions',
      Icon: CardIcon,
      href: ROUTES.TRANSACTIONS
    },
    {
      label: 'Incomes',
      Icon: IncomesIcon,
      href: ROUTES.INCOMES
    },
    {
      label: 'Expenses',
      Icon: ExpensesIcon,
      href: ROUTES.EXPENSES
    },
    {
      label: 'Categories',
      Icon: CategoriesIcon,
      href: ROUTES.CATEGORIES
    },
    {
      label: 'Reports',
      Icon: ReportsIcon,
      href: ROUTES.REPORTS
    },
    {
      label: 'Settings',
      Icon: SettingsIcon,
      href: ROUTES.SETTINGS
    }
  ]

  return (
    <Collapsible open={isOpen} onOpenChange={toggleOpen}>
      <aside className={cn(
        "sticky top-[60px] flex flex-col justify-between h-[calc(100vh-60px)] border-r border-border-card bg-branding-primary-default w-14 duration-300",
        isOpen && "w-60"
      )}>
        <ul className="transition-width flex flex-col duration-200">
          {pages.map(({label, Icon, href}) => (
            <li key={href}>
              <Link
                href={href}
                className={`flex justify-start ${!isOpen && 'justify-center'} items-center gap-3 p-2 py-4 text-h3 hover:bg-branding-primary-hover`}
              >
                <Icon />
                {isOpen && label}
              </Link>
            </li>
          ))}
        </ul>


        <CollapsibleTrigger asChild>
          <button
            className="flex items-center justify-end border-t border-border-card bg-background-input w-full p-2 pr-4"
            type="button"
          >
            <ChevronLeftIcon
              className={cn(
                'transform transition-transform',
                isOpen ? 'rotate-0' : 'rotate-180',
              )}
              height={24}
              width={24}
              fill="#FFFFFF"
            />
          </button>
        </CollapsibleTrigger>
      </aside>
    </Collapsible>
  )
}

export { Sidebar }

