import { NextResponse } from 'next/server'
import { requireApiAuth } from '@/lib/admin-auth'
import { readDestacados, writeDestacados } from '@/lib/data'

export async function GET() {
  const auth = await requireApiAuth()
  if (auth !== true) return auth

  const destacados = await readDestacados()
  return NextResponse.json(destacados)
}

export async function PUT(request: Request) {
  const auth = await requireApiAuth()
  if (auth !== true) return auth

  const body = await request.json()
  const ids: string[] = Array.isArray(body) ? body : body.ids ?? []
  await writeDestacados(ids)
  return NextResponse.json({ success: true })
}
