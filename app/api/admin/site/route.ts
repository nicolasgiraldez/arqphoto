import { NextResponse } from 'next/server'
import { requireApiAuth } from '@/lib/admin-auth'
import { readSite, writeSite } from '@/lib/data'

export async function GET() {
  const auth = await requireApiAuth()
  if (auth !== true) return auth

  const site = await readSite()
  return NextResponse.json(site)
}

export async function PUT(request: Request) {
  const auth = await requireApiAuth()
  if (auth !== true) return auth

  const body = await request.json()
  await writeSite(body)
  return NextResponse.json({ success: true })
}
