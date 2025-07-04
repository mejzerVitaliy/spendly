'use client'

import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from "@/shared/ui"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuth, useProfile } from "@/shared/hooks"
import { profileSchema, ProfileValues } from "@/features/settings"
import { useEffect } from "react"
import { toast } from "sonner"
import { useTranslations } from 'next-intl'
import { AvatarUpload } from "../avatar-upload"
import { DangerZone } from "../danger-zone"

const ProfileSettings = () => {
  const { getMeQuery } = useAuth()
  const { updateProfileMutation } = useProfile()
  const t = useTranslations('settings.profile')

  const userData = getMeQuery.data?.data

  const form = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: userData?.firstName || '',
      lastName: userData?.lastName || '',
      email: userData?.email || '',
    }
  })

  useEffect(() => {
    if (userData) {
      form.reset(userData)
    }
  }, [userData, form])

  const onSubmit = (data: ProfileValues) => {
    try {
      updateProfileMutation.mutate(data)

      toast.success("Profile updated successfully")
    } catch (error) {
      toast.error("Failed to update profile")
    }
  }

  return (
    <div className="space-y-4">
      <div className="border-b border-border pb-4">
        <h3 className="text-h3 font-medium">{t('title')}</h3>
        <p className="text-p2-regular text-text-secondary mt-1">
          {t('description')}
        </p>
      </div>

      <div className="bg-background-card border border-border rounded-card p-4">
        <AvatarUpload 
          currentAvatar={userData?.avatarUrl}
          userName={`${userData?.firstName || ''} ${userData?.lastName || ''}`.trim()}
        />
      </div>

      <div className="bg-background-card border border-border rounded-card p-4">
        <h4 className="text-lg font-medium mb-4">{t('personalInfo')}</h4>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
                              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('firstName')}</FormLabel>
                    <FormControl>
                      <Input 
                        type="text"
                        placeholder={t('firstNamePlaceholder')}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('lastName')}</FormLabel>
                    <FormControl>
                      <Input 
                        type="text"
                        placeholder={t('lastNamePlaceholder')}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('email')}</FormLabel>
                  <FormControl>
                    <Input 
                      type="text"
                      placeholder={t('emailPlaceholder')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="w-full flex gap-3 pt-4">
              <Button
                type="submit"
                variant="branding"
                className="flex-1"
                disabled={updateProfileMutation.isPending}
              >
                {t('saveChanges')}
              </Button>
              <Button 
                type="button" 
                variant="outline"
                className="flex-1"
                onClick={() => form.reset()}
              >
                {t('resetChanges')}
              </Button>
            </div>
          </form>
        </Form>
      </div>

      <DangerZone />
    </div>
  )
}

export { ProfileSettings } 