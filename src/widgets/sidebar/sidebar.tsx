'use client'

import { ROUTES } from "@/shared/consts";
import { CardIcon, ChevronLeftIcon, DashboardIcon, ReportsIcon, SettingsIcon } from "@/shared/icons";
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
      label: 'Reports',
      Icon: ReportsIcon,
      href: ROUTES.REPORTS
    },
    {
      label: 'Insights',
      Icon: CardIcon,
      href: ROUTES.INSIGHTS
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
        "sticky top-[60px] flex flex-col justify-between h-[calc(100vh-60px)] bg-branding-primary-default border-r border-border w-14 duration-300",
        isOpen && "w-[236px]"
      )}>
        <ul className="transition-width flex flex-col duration-300">
          {pages.map(({label, Icon, href}) => (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  'w-full h-[50px] flex items-center gap-3 px-6 text-[20px] font-medium transition-colors duration-500 hover:bg-branding-primary-hover',
                  !isOpen && 'justify-center p-0'
                )}
              >
                <span className="min-w-[30px] flex justify-center">
                  <Icon />
                </span>
                {isOpen && label}
              </Link>
            </li>
          ))}
        </ul>

        <CollapsibleTrigger asChild>
          <button
            className="flex items-center justify-end bg-background-input w-full p-2 pr-4"
            type="button"
          >
            <ChevronLeftIcon
              className={cn(
                'transform transition-transform',
                isOpen ? 'rotate-0' : 'rotate-180',
              )}
              height={24}
              width={24}
            />
          </button>
        </CollapsibleTrigger>
      </aside>
    </Collapsible>
  )
}

export { Sidebar }

