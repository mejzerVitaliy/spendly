'use client'

import { useState } from 'react'
import { 
  SettingsNavigation, 
  ProfileSettings, 
  SecuritySettings, 
  NotificationSettings,
  PreferencesSettings 
} from './ui'
import { useTranslations } from 'next-intl'

const SettingsContent = () => {
  const [activeTab, setActiveTab] = useState('profile')
  const t = useTranslations('settings')

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileSettings />
      case 'security':
        return <SecuritySettings />
      case 'notifications':
        return <NotificationSettings />
      case 'appearance':
        return (
          <div className="space-y-4">
            <div className="border-b border-border pb-4">
              <h3 className="text-h3 font-medium">{t('navigation.appearance')}</h3>
              <p className="text-p2-regular text-text-secondary mt-1">
                {t('navigation.appearanceDescription')}
              </p>
            </div>
            <div className="bg-background-card border border-border rounded-card p-4">
              <p className="text-p2-regular text-text-secondary">
                Theme and appearance settings coming soon...
              </p>
            </div>
          </div>
        )
      case 'preferences':
        return <PreferencesSettings />
      default:
        return <ProfileSettings />
    }
  }

  return (
    <div className="h-[calc(100vh-60px)] flex p-6 gap-6">
      <SettingsNavigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />
      
      <main className="flex-1 flex justify-center overflow-y-auto custom-scrollbar-primary">
        <div className="max-w-lg w-full">
          {renderContent()}
        </div>
      </main>
    </div>
  )
}

export { SettingsContent } 