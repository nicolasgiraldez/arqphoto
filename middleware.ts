import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken, ADMIN_COOKIE } from '@/lib/auth'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (
    pathname === '/admin/login' ||
    pathname.startsWith('/api/admin/auth/')
  ) {
    return NextResponse.next()
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

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
