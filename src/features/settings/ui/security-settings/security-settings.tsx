'use client'

import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui"
import { PasswordInput } from "@/shared/ui"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { securitySchema, SecurityValues } from "../../lib/validation"
import { useAuth, useProfile } from "@/shared/hooks"
import { toast } from "sonner"
import { useTranslations } from 'next-intl'

const SecuritySettings = () => {
  const { updatePasswordMutation } = useProfile()
  const { toggleTwoFactorMutation, getMeQuery } = useAuth();
  const t = useTranslations('settings.security')

  const user = getMeQuery.data?.data

  const form = useForm<SecurityValues>({
    resolver: zodResolver(securitySchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    }
  })

  const onSubmit = (data: SecurityValues) => {
    updatePasswordMutation.mutate(data)
  }

  const toggleTwoFactor = () => {
    if (user?.isTwoFactorEnabled) {
      toggleTwoFactorMutation.mutate()

      toast.success('Disabled successfully!')
    } else {
      toggleTwoFactorMutation.mutate()

      toast.success('Enabled successfully!')
    }
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h3 className="text-h3 font-medium">{t('title')}</h3>
        <p className="text-p2-regular text-text-secondary mt-1">
          {t('description')}
        </p>
      </div>

      <div className="bg-background-card border border-border rounded-card p-4">
        <h4 className="text-lg font-medium mb-2">{t('changePassword')}</h4>
        <p className="text-p2-regular text-text-secondary mb-4">
          {t('changePasswordDescription')}
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('currentPassword')}</FormLabel>
                  <FormControl>
                    <PasswordInput 
                      placeholder={t('currentPasswordPlaceholder')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('newPassword')}</FormLabel>
                  <FormControl>
                    <PasswordInput 
                      placeholder={t('newPasswordPlaceholder')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('confirmPassword')}</FormLabel>
                  <FormControl>
                    <PasswordInput 
                      placeholder={t('confirmPasswordPlaceholder')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3 pt-2">
              <Button type="submit" variant="branding">
                {t('updatePassword')}
              </Button>
            </div>
          </form>
        </Form>
      </div>

      <div className="bg-background-card border border-border rounded-card p-4">
        <h4 className="text-lg font-medium mb-2">{t('twoFactor')}</h4>
        <p className="text-p2-regular text-text-secondary mb-4">
          {t('twoFactorDescription')}
        </p>
        
        <Button variant="branding" onClick={toggleTwoFactor}>
          {user?.isTwoFactorEnabled ? t('disable2FA') : t('enable2FA')}
        </Button>
      </div>
    </div>
  )
}

export { SecuritySettings } 