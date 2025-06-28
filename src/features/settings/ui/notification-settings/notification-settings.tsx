'use client'

import { Checkbox } from "@/shared/ui"
import { useState } from "react"

interface NotificationSettingsState {
  emailNotifications: boolean
  pushNotifications: boolean
  transactionAlerts: boolean
  weeklyReports: boolean
  securityAlerts: boolean
}

const NotificationSettings = () => {
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
        <h3 className="text-h3 font-medium">Notification Settings</h3>
        <p className="text-p2-regular text-text-secondary mt-1">
          Choose how you want to receive updates and alerts
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-background-card border border-border rounded-card p-4">
          <h4 className="text-p1-medium font-medium mb-4">Email Notifications</h4>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-p1-regular">Email Notifications</p>
                <p className="text-c1-regular text-text-tertiary">
                  Receive important updates via email
                </p>
              </div>
              <Checkbox
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked as boolean)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-p1-regular">Weekly Reports</p>
                <p className="text-c1-regular text-text-tertiary">
                  Get weekly spending summaries
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
          <h4 className="text-p1-medium font-medium mb-4">Push Notifications</h4>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-p1-regular">Push Notifications</p>
                <p className="text-c1-regular text-text-tertiary">
                  Receive notifications on your device
                </p>
              </div>
              <Checkbox
                checked={settings.pushNotifications}
                onCheckedChange={(checked) => handleSettingChange('pushNotifications', checked as boolean)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-p1-regular">Transaction Alerts</p>
                <p className="text-c1-regular text-text-tertiary">
                  Get notified about new transactions
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
          <h4 className="text-p1-medium font-medium mb-4">Security Alerts</h4>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-p1-regular">Security Alerts</p>
                <p className="text-c1-regular text-text-tertiary">
                  Critical security notifications (always enabled)
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