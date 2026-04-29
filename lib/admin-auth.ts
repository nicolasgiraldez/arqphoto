import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifyToken, ADMIN_COOKIE } from './auth'
import { NextResponse } from 'next/server'

export async function requireAuth() {
  const cookieStore = await cookies()
  const token = cookieStore.get(ADMIN_COOKIE)?.value
  if (!token) redirect('/admin/login')
  const payload = await verifyToken(token)
  if (!payload) redirect('/admin/login')
  return payload
}

export async function requireApiAuth(): Promise<true | NextResponse> {
  const cookieStore = await cookies()
  const token = cookieStore.get(ADMIN_COOKIE)?.value
  if (!token) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  const payload = await verifyToken(token)
  if (!payload) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  return true
}
