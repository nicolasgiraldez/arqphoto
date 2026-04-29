import { NextResponse } from 'next/server'
import { signToken, ADMIN_COOKIE, cookieOptions } from '@/lib/auth'

export async function POST(request: Request) {
  const { username, password } = await request.json()

  if (
    username !== process.env.ADMIN_USERNAME ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return NextResponse.json({ error: 'Credenciales incorrectas' }, { status: 401 })
  }

  const token = await signToken({ sub: username })
  const response = NextResponse.json({ success: true })
  response.cookies.set(ADMIN_COOKIE, token, cookieOptions)
  return response
}
