'use client'

import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui"
import { PasswordInput } from "@/shared/ui"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const securitySchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type SecurityFormData = z.infer<typeof securitySchema>

const SecuritySettings = () => {
  const form = useForm<SecurityFormData>({
    resolver: zodResolver(securitySchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    }
  })

  const onSubmit = (data: SecurityFormData) => {
    console.log('Security update:', data)
    // TODO: Implement password change API call
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h3 className="text-h3 font-medium">Security Settings</h3>
        <p className="text-p2-regular text-text-secondary mt-1">
          Manage your password and account security
        </p>
      </div>

      <div className="bg-background-card border border-border rounded-card p-4">
        <h4 className="text-p1-medium font-medium mb-2">Change Password</h4>
        <p className="text-p2-regular text-text-secondary mb-4">
          Use a strong password to keep your account secure
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <PasswordInput 
                      placeholder="Enter your current password"
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
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <PasswordInput 
                      placeholder="Enter your new password"
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
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <PasswordInput 
                      placeholder="Confirm your new password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3 pt-2">
              <Button type="submit" variant="branding">
                Update Password
              </Button>
              <Button 
                type="button" 
                variant="outline"
                onClick={() => form.reset()}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </div>

      <div className="bg-background-card border border-border rounded-card p-4">
        <h4 className="text-p1-medium font-medium mb-2">Two-Factor Authentication</h4>
        <p className="text-p2-regular text-text-secondary mb-4">
          Add an extra layer of security to your account
        </p>
        
        <Button variant="outline" disabled>
          Enable 2FA (Coming Soon)
        </Button>
      </div>
    </div>
  )
}

export { SecuritySettings } 