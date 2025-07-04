'use client'

import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from "@/shared/ui"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { twoFactorSchema, TwoFactorValues } from "../lib"
import { useAuth } from "@/shared/hooks"
import { useAuthStore, useTwoFactorStore } from "@/shared/stores"
import { useRouter } from "next/navigation"
import { ROUTES } from "@/shared/consts"
import { useEffect } from "react"
import { toast } from "sonner"

const TwoFactorForm = () => {
  const { verifyTwoFactorMutation, resendTwoFactorMutation } = useAuth()
  const { email, clearEmail } = useTwoFactorStore()
  const router = useRouter()
  const { accessToken } = useAuthStore()

  const form = useForm<TwoFactorValues>({
    resolver: zodResolver(twoFactorSchema),
    defaultValues: {
      code: ''
    }
  })

  useEffect(() => {
    if (!email && !accessToken) {
      toast.error('Session expired. Please login again.')
      router.push(ROUTES.LOGIN)
    }
  }, [email, router, accessToken])

  const onSubmit = async (data: TwoFactorValues) => {
    if (!email) {
      toast.error('Session expired. Please login again.')
      router.push(ROUTES.LOGIN)

      return
    }

    try {
      await verifyTwoFactorMutation.mutateAsync({
        email,
        code: data.code
      })
      
      clearEmail()
      
      toast.success('Two-factor authentication successful!')
      
      setTimeout(() => {
        router.replace(ROUTES.DASHBOARD)
      }, 500)
    } catch (error) {
      toast.error('Invalid code. Please try again.')
      form.reset()
    }
  }

  const handleResendCode = async () => {
    if (!email) return
    
    try {
      await resendTwoFactorMutation.mutateAsync(email)
      toast.success('Code resent to your email!')
    } catch (error) {
      toast.error('Failed to resend code. Please try again.')
    }
  }

  if (!email) {
    return null
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Two-Factor Authentication</CardTitle>
        <CardDescription className="text-c1-regular">
          Enter the 6-digit code sent to<br />
          <span className="font-medium">{email}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification Code</FormLabel>
                  <FormControl>
                    <Input 
                      type="text"
                      placeholder="Enter 6-digit code"
                      maxLength={6}
                      className="text-center text-lg tracking-widest"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-4">
              <Button 
                className="w-full" 
                type="submit"
                disabled={verifyTwoFactorMutation.isPending}
              >
                {verifyTwoFactorMutation.isPending ? 'Verifying...' : 'Verify Code'}
              </Button>

              <div className="text-center">
                <Button 
                  type="button"
                  variant="ghost"
                  onClick={handleResendCode}
                  disabled={resendTwoFactorMutation.isPending}
                  className="text-sm"
                >
                  {resendTwoFactorMutation.isPending ? 'Sending...' : "Didn't receive the code? Resend"}
                </Button>
              </div>

              <Button 
                type="button"
                variant="outline"
                onClick={() => {
                  clearEmail()
                  router.push(ROUTES.LOGIN)
                }}
                className="w-full"
              >
                Back to Login
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export { TwoFactorForm } 