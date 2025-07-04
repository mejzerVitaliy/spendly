'use client'

import { useState } from 'react'
import { Button, Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, Input } from "@/shared/ui"
import { useAuth, useProfile } from "@/shared/hooks"
import { toast } from "sonner"
import { Trash2Icon, LogOutIcon, AlertTriangleIcon } from "lucide-react"
import { useTranslations } from 'next-intl'

const DangerZone = () => {
  const { logoutMutation } = useAuth()
  const { deleteAccountMutation } = useProfile()
  const [deleteConfirmText, setDeleteConfirmText] = useState('')
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false)
  const t = useTranslations('settings.dangerZone')

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync()
      setIsLogoutDialogOpen(false)
      toast.success('Logged out successfully')
    } catch (error) {
      toast.error('Failed to logout')
    }
  }

  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== 'DELETE') {
      toast.error('Please type "DELETE" to confirm')
      return
    }

    try {
      await deleteAccountMutation.mutateAsync()
      setIsDeleteDialogOpen(false)
    } catch (error) {
      toast.error('Failed to delete account')
    }
  }

  return (
    <div className="bg-background-card border border-red-200 rounded-card p-4">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangleIcon className="w-5 h-5 text-red-500" />
        <h4 className="text-lg font-medium text-red-700">{t('title')}</h4>
      </div>
      
      <p className="text-p2-regular text-text-secondary mb-6">
        {t('description')}
      </p>

      <div className="space-y-4">
        {/* Logout Section */}
        <div className="flex items-center justify-between p-3 border border-border rounded-card">
          <div>
            <h5 className="font-medium">{t('logOut')}</h5>
            <p className="text-sm text-text-secondary">
              {t('logOutDescription')}
            </p>
          </div>
          
          <Dialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="text-orange-600 border-orange-200 hover:bg-orange-50">
                <LogOutIcon className="w-4 h-4 mr-2" />
                {t('logOut')}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t('confirmLogout')}</DialogTitle>
                <DialogDescription>
                  {t('confirmLogoutDescription')}
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => setIsLogoutDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={handleLogout}
                  disabled={logoutMutation.isPending}
                >
                  {logoutMutation.isPending ? t('loggingOut') : t('logOut')}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Delete Account Section */}
        <div className="flex items-center justify-between p-3 border border-red-200 rounded-card bg-red-50">
          <div>
            <h5 className="font-medium text-red-700">{t('deleteAccount')}</h5>
            <p className="text-sm text-red-600">
              {t('deleteAccountDescription')}
            </p>
          </div>
          
          <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <Trash2Icon className="w-4 h-4 mr-2" />
                {t('deleteAccount')}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-red-600">{t('confirmDelete')}</DialogTitle>
                <DialogDescription>
                  {t('confirmDeleteDescription')}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-2">
                    {t('typeDelete')}
                  </p>
                  <Input
                    type="text"
                    placeholder={t('typeDeletePlaceholder')}
                    value={deleteConfirmText}
                    onChange={(e) => setDeleteConfirmText(e.target.value)}
                    className="font-mono"
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsDeleteDialogOpen(false)
                    setDeleteConfirmText('')
                  }}
                >
                  Cancel
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={handleDeleteAccount}
                  disabled={deleteConfirmText !== 'DELETE' || deleteAccountMutation.isPending}
                >
                  {deleteAccountMutation.isPending ? t('deleting') : t('deleteAccount')}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}

export { DangerZone } 