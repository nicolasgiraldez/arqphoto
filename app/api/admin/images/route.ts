import { NextResponse } from 'next/server'
import { requireApiAuth } from '@/lib/admin-auth'
import { listImages, saveImage } from '@/lib/data'

export async function GET() {
  const auth = await requireApiAuth()
  if (auth !== true) return auth

  const images = await listImages()
  return NextResponse.json(images)
}

export async function POST(request: Request) {
  const auth = await requireApiAuth()
  if (auth !== true) return auth

  const formData = await request.formData()
  const file = formData.get('file') as File | null
  if (!file) return NextResponse.json({ error: 'No se recibió archivo' }, { status: 400 })

  try {
    const info = await saveImage(file)
    return NextResponse.json(info, { status: 201 })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Error al guardar'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
