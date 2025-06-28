'use client'

import { ROUTES } from "@/shared/consts";
import { DashboardIcon, ReportsIcon, SettingsIcon, TransactionsIcon } from "@/shared/icons";
import { cn } from "@/shared/lib";
import { useSidebarStore } from "@/shared/stores"
import { Collapsible, CollapsibleTrigger } from "@/shared/ui"
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const pages = [
  {
    label: 'Dashboard',
    Icon: DashboardIcon,
    href: ROUTES.DASHBOARD
  },
  {
    label: 'Transactions',
    Icon: TransactionsIcon,
    href: ROUTES.TRANSACTIONS
  },
  {
    label: 'Reports',
    Icon: ReportsIcon,
    href: ROUTES.REPORTS
  },
  {
    label: 'Insights',
    Icon: SettingsIcon,
    href: ROUTES.INSIGHTS
  },
  {
    label: 'Settings',
    Icon: SettingsIcon,
    href: ROUTES.SETTINGS
  }
]

const Sidebar = () => {
  const { isOpen, toggleOpen } = useSidebarStore();
  const currentPage = usePathname()

  const isCurrentPage = (href: string) => currentPage === href

  return (
    <Collapsible open={isOpen} onOpenChange={toggleOpen}>
      <aside className={cn(
        "sticky top-0 flex flex-col justify-between h-full bg-background-white border-r border-border w-14 duration-300",
        isOpen && "w-[236px]"
      )}>
        <ul className="transition-width flex flex-col duration-500">
          <li>
            <Link href={ROUTES.DASHBOARD} className="w-full h-[60px] flex items-center px-6 font-bold text-[24px]">
              Spendly
            </Link>
          </li>
          {pages.map(({label, Icon, href}) => (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  'w-full h-[50px] flex items-center gap-3 px-6 text-lg transition-colors duration-500',
                  !isOpen && 'justify-center p-0',
                  isCurrentPage(href) && 'bg-background-checked text-text-checked',
                  !isCurrentPage(href) && 'hover:bg-branding-secondary-default'
                )}
              >
                <span className="min-w-[30px] flex justify-center">
                  <Icon className="fill-current !w-6 !h-6" />
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

