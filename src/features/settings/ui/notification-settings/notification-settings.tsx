'use client'

import { Checkbox } from "@/shared/ui"
import { useState } from "react"
import { useTranslations } from 'next-intl'

interface NotificationSettingsState {
  emailNotifications: boolean
  pushNotifications: boolean
  transactionAlerts: boolean
  weeklyReports: boolean
  securityAlerts: boolean
}

const NotificationSettings = () => {
  const t = useTranslations('settings.notifications')
  const [settings, setSettings] = useState<NotificationSettingsState>({
    emailNotifications: true,
    pushNotifications: false,
    transactionAlerts: true,
    weeklyReports: true,
    securityAlerts: true,
  })

  const handleSettingChange = (key: keyof NotificationSettingsState, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h3 className="text-h3 font-medium">{t('title')}</h3>
        <p className="text-p2-regular text-text-secondary mt-1">
          {t('description')}
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-background-card border border-border rounded-card p-4">
          <h4 className="text-p1-medium font-medium mb-4">{t('emailNotifications')}</h4>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-p1-regular">{t('emailNotifications')}</p>
                <p className="text-c1-regular text-text-tertiary">
                  {t('emailNotificationsDescription')}
                </p>
              </div>
              <Checkbox
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked as boolean)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-p1-regular">{t('weeklyReports')}</p>
                <p className="text-c1-regular text-text-tertiary">
                  {t('weeklyReportsDescription')}
                </p>
              </div>
              <Checkbox
                checked={settings.weeklyReports}
                onCheckedChange={(checked) => handleSettingChange('weeklyReports', checked as boolean)}
              />
            </div>
          </div>
        </div>

        <div className="bg-background-card border border-border rounded-card p-4">
          <h4 className="text-p1-medium font-medium mb-4">{t('pushNotifications')}</h4>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-p1-regular">{t('pushNotifications')}</p>
                <p className="text-c1-regular text-text-tertiary">
                  {t('pushNotificationsDescription')}
                </p>
              </div>
              <Checkbox
                checked={settings.pushNotifications}
                onCheckedChange={(checked) => handleSettingChange('pushNotifications', checked as boolean)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-p1-regular">{t('transactionAlerts')}</p>
                <p className="text-c1-regular text-text-tertiary">
                  {t('transactionAlertsDescription')}
                </p>
              </div>
              <Checkbox
                checked={settings.transactionAlerts}
                onCheckedChange={(checked) => handleSettingChange('transactionAlerts', checked as boolean)}
              />
            </div>
          </div>
        </div>

        <div className="bg-background-card border border-border rounded-card p-4">
          <h4 className="text-p1-medium font-medium mb-4">{t('securityAlerts')}</h4>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-p1-regular">{t('securityAlerts')}</p>
                <p className="text-c1-regular text-text-tertiary">
                  {t('securityAlertsDescription')}
                </p>
              </div>
              <Checkbox
                checked={settings.securityAlerts}
                disabled
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { NotificationSettings } 