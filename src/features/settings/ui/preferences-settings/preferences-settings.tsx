'use client'

import { useTranslations, useLocale } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/shared/ui'
import { ChevronDownIcon, DollarSignIcon, GlobeIcon } from 'lucide-react'
import { useAuth, useProfile } from '@/shared/hooks'
import { useToggle } from 'usehooks-ts'
import { cn } from '@/shared/lib'

const PreferencesSettings = () => {
  const t = useTranslations('settings.preferences')
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  const [openCurrencyDropdown, setOpenCurrencyDropdown] = useToggle()

  const { getMeQuery } = useAuth()
  const { updateSettingsMutation } = useProfile()

  const user = getMeQuery.data?.data

  const currencies = ['USD', 'EUR', 'UAH']

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'ru', name: 'Russian', nativeName: 'Русский' },
    { code: 'ua', name: 'Ukrainian', nativeName: 'Українська' }
  ]

  const handleLanguageChange = (langCode: string) => {
    const newPathname = pathname.replace(`/${locale}`, `/${langCode}`)
    router.push(newPathname)
  }

  const handleCurrencyChange = (currency: string) => {
    updateSettingsMutation.mutate({ mainCurrency: currency })
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
        <div className="flex items-center gap-2 mb-4">
          <GlobeIcon className="w-5 h-5 text-text-secondary" />
          <h4 className="text-p1-medium font-medium">{t('language')}</h4>
        </div>
        
        <p className="text-p2-regular text-text-secondary mb-4">
          {t('languageDescription')}
        </p>
        
        <div className="space-y-2">
          {languages.map((lang) => (
            <Button
              key={lang.code}
              variant={locale === lang.code ? 'branding' : 'outline'}
              size="sm"
              onClick={() => handleLanguageChange(lang.code)}
              className="w-full justify-start"
            >
              {lang.nativeName}
            </Button>
          ))}
        </div>
      </div>

      <div className="bg-background-card border border-border rounded-card p-4">
        <div className="flex items-center gap-2 mb-4">
          <DollarSignIcon className="w-5 h-5 text-text-secondary" />
          <h4 className="text-p1-medium font-medium">{t('mainCurrency')}</h4>
        </div>
        
        <p className="text-p2-regular text-text-secondary mb-4">
          {t('mainCurrencyDescription')}
        </p>

        <DropdownMenu open={openCurrencyDropdown} onOpenChange={setOpenCurrencyDropdown}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              rightIcon={<ChevronDownIcon className={cn("w-4 h-4 transition-transform duration-300", openCurrencyDropdown && "rotate-180")} />}
              className="w-full justify-between"
            >
              {user?.mainCurrency}
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            {currencies.map((currency) => (
              <DropdownMenuItem key={currency} onClick={() => handleCurrencyChange(currency)}>
                {currency}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export { PreferencesSettings } 