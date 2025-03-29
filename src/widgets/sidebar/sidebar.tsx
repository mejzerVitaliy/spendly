'use client'

import { ROUTES } from "@/shared/consts";
import { cn } from "@/shared/lib";
import { useSidebarStore } from "@/shared/stores"
import { Collapsible, CollapsibleTrigger } from "@/shared/ui"
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const Sidebar = () => {
  const { isOpen, toggleOpen } = useSidebarStore();

  const pages = [
    {
      label: 'Dashboard',
      href: ROUTES.DASHBOARD
    },
    {
      label: 'Transactions',
      href: ROUTES.TRANSACTIONS
    },
    {
      label: 'Incomes',
      href: ROUTES.INCOMES
    },
    {
      label: 'Expenses',
      href: ROUTES.EXPENSES
    },
    {
      label: 'Categories',
      href: ROUTES.CATEGORIES
    },
    {
      label: 'Reports',
      href: ROUTES.REPORTS
    },
    {
      label: 'Settings',
      href: ROUTES.SETTINGS
    }
  ]

  return (
    <Collapsible open={isOpen} onOpenChange={toggleOpen}>
      <aside className={cn(
        "sticky top-[60px] flex flex-col justify-between h-[calc(100vh-60px)] border-r border-border-card bg-branding-primary-default w-12 duration-300",
        isOpen && "w-60"
      )}>
        <ul className="transition-width flex flex-col duration-200">
          {pages.map(({label, href}) => (
            <li key={href}>
              <Link
                href={href}
                className="flex items-center gap-3 p-2 py-4 text-h3 hover:bg-fuchsia-900"
              >
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
            <ArrowLeft
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

