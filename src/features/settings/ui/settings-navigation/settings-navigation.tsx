'use client'

import { cn } from "@/shared/lib"
import { UserIcon, ShieldIcon, BellIcon, PaletteIcon, CogIcon } from "lucide-react"

interface SettingsNavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const navigationItems = [
  {
    id: 'profile',
    label: 'Profile',
    icon: UserIcon,
    description: 'Personal information and account details'
  },
  {
    id: 'security',
    label: 'Security',
    icon: ShieldIcon,
    description: 'Password and authentication settings'
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: BellIcon,
    description: 'Email and push notification preferences'
  },
  {
    id: 'appearance',
    label: 'Appearance',
    icon: PaletteIcon,
    description: 'Theme and display settings'
  },
  {
    id: 'preferences',
    label: 'Preferences',
    icon: CogIcon,
    description: 'App behavior and default settings'
  }
]

const SettingsNavigation = ({ activeTab, onTabChange }: SettingsNavigationProps) => {
  return (
    <aside className="w-[280px] rounded-card h-full bg-background-white shadow-lg p-6">
      <div className="mb-6">
        <p className="text-p1-medium text-text-secondary">
          Manage your account and application preferences
        </p>
      </div>

      <nav className="space-y-2 max-h-[85%] overflow-y-auto custom-scrollbar-secondary">
        {navigationItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "w-full p-3 rounded-card text-left transition-all duration-300 hover:bg-background group",
                isActive && "bg-background"
              )}
            >
              <div className="flex items-start gap-2">
                <Icon 
                  className={cn(
                    "w-5 h-5 mt-0.5 transition-colors duration-300",
                    isActive ? "text-black " : "text-text-checked group-hover:text-black"
                  )} 
                />
                
                <div className="flex-1">
                  <h3 className={cn(
                    "text-p1-medium text-black",
                  )}>
                    {item.label}
                  </h3>
                  
                  <p className="text-p2-regular text-text-tertiary mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </button>
          )
        })}
      </nav>
    </aside>
  )
}

export { SettingsNavigation } 