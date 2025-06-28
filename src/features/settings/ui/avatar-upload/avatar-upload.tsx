'use client'

import { Button } from "@/shared/ui"
import { useProfile } from "@/shared/hooks"
import { UploadIcon, TrashIcon } from "lucide-react"
import { useRef } from "react"
import { toast } from "sonner"
import { cn } from "@/shared/lib"
import Image from "next/image"

interface AvatarUploadProps {
  currentAvatar?: string
  userName?: string
}

const AvatarUpload = ({ currentAvatar, userName }: AvatarUploadProps) => {
  const { updateAvatarMutation, deleteAvatarMutation } = useProfile()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB')
      return
    }

    updateAvatarMutation.mutate(file, {
      onSuccess: () => {
        toast.success('Avatar updated successfully')
      },
      onError: (error) => {
        console.error('Avatar upload error:', error)
        toast.error('Failed to update avatar')
      }
    })
  }

  const handleDeleteAvatar = () => {
    deleteAvatarMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success('Avatar deleted successfully')
      },
      onError: () => {
        toast.error('Failed to delete avatar')
      }
    })
  }

  const getInitials = (name?: string) => {
    if (!name) return 'U'
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className={cn(
            "w-20 h-20 rounded-full border-2 border-border flex items-center justify-center overflow-hidden",
            "bg-background-card"
          )}>
            {currentAvatar ? (
              <Image 
                src={currentAvatar} 
                alt="Avatar" 
                fill
                className="w-full h-full object-cover overflow-hidden rounded-full"
              />
            ) : (
              <div className="w-full h-full bg-branding-primary-default flex items-center justify-center">
                <span className="text-lg font-medium text-text-checked">
                  {getInitials(userName)}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h4 className="text-lg font-medium">Profile Picture</h4>
          <p className="text-p2-regular text-text-secondary">
            Upload an image or leave blank to use initials
          </p>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleFileSelect}
              disabled={updateAvatarMutation.isPending}
              leftIcon={<UploadIcon className="w-4 h-4" />}
            >
              {updateAvatarMutation.isPending ? 'Uploading...' : 'Upload'}
            </Button>
            
            {currentAvatar && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleDeleteAvatar}
                disabled={deleteAvatarMutation.isPending}
                leftIcon={<TrashIcon className="w-4 h-4" />}
              >
                {deleteAvatarMutation.isPending ? 'Removing...' : 'Remove'}
              </Button>
            )}
          </div>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="text-c1-regular text-text-tertiary">
        Recommended: Square image, max 5MB (JPG, PNG, GIF)
      </div>
    </div>
  )
}

export { AvatarUpload } 