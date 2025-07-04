'use client'

import { cn } from "@/shared/lib"
import { UserIcon, ShieldIcon, BellIcon, PaletteIcon, CogIcon } from "lucide-react"
import { useTranslations } from 'next-intl'

interface SettingsNavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const SettingsNavigation = ({ activeTab, onTabChange }: SettingsNavigationProps) => {
  const t = useTranslations('settings.navigation')
  
  const navigationItems = [
    {
      id: 'profile',
      label: t('profile'),
      icon: UserIcon,
      description: t('profileDescription')
    },
    {
      id: 'security',
      label: t('security'),
      icon: ShieldIcon,
      description: t('securityDescription')
    },
    {
      id: 'notifications',
      label: t('notifications'),
      icon: BellIcon,
      description: t('notificationsDescription')
    },
    {
      id: 'appearance',
      label: t('appearance'),
      icon: PaletteIcon,
      description: t('appearanceDescription')
    },
    {
      id: 'preferences',
      label: t('preferences'),
      icon: CogIcon,
      description: t('preferencesDescription')
    }
  ]
  return (
    <aside className="w-[280px] rounded-card h-full bg-background-white shadow-lg p-6">
      <div className="mb-6">
        <p className="text-p1-medium text-text-secondary">
          {t('description')}
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