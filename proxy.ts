import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken, ADMIN_COOKIE } from '@/lib/auth'

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Forward pathname so Server Components can read it
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-pathname', pathname)

  const isAdminRoute = pathname.startsWith('/admin') || pathname.startsWith('/api/admin')

  if (isAdminRoute) {
    if (pathname === '/admin/login' || pathname.startsWith('/api/admin/auth/')) {
      return NextResponse.next({ request: { headers: requestHeaders } })
    }

    const token = request.cookies.get(ADMIN_COOKIE)?.value
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    const payload = await verifyToken(token)
    if (!payload) {
      const response = NextResponse.redirect(new URL('/admin/login', request.url))
      response.cookies.set(ADMIN_COOKIE, '', { maxAge: 0, path: '/' })
      return response
    }
  }

  return NextResponse.next({ request: { headers: requestHeaders } })
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|images/).*)'],
}
