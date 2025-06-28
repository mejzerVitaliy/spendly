'use client'

import { useState } from 'react'
import { 
  SettingsNavigation, 
  ProfileSettings, 
  SecuritySettings, 
  NotificationSettings 
} from './ui'

const SettingsContent = () => {
  const [activeTab, setActiveTab] = useState('profile')

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
              <h3 className="text-h3 font-medium">Appearance Settings</h3>
              <p className="text-p2-regular text-text-secondary mt-1">
                Customize how the app looks and feels
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
        return (
          <div className="space-y-4">
            <div className="border-b border-border pb-4">
              <h3 className="text-h3 font-medium">App Preferences</h3>
              <p className="text-p2-regular text-text-secondary mt-1">
                Configure default app behavior and settings
              </p>
            </div>
            <div className="bg-background-card border border-border rounded-card p-4">
              <p className="text-p2-regular text-text-secondary">
                Preference settings coming soon...
              </p>
            </div>
          </div>
        )
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