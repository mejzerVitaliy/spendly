import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { ROUTES } from '@/shared/consts'

export function middleware(request: NextRequest) {
  const authTokens = request.cookies.get('authTokens')
  const isAuthPage = request.nextUrl.pathname === ROUTES.LOGIN || request.nextUrl.pathname === ROUTES.REGISTRATION

  if (!authTokens && !isAuthPage) {
    return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url))
  }

  if (authTokens && isAuthPage) {
    return NextResponse.redirect(new URL(ROUTES.DASHBOARD, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/login',
    '/register'
  ]
} 