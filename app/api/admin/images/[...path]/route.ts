import { NextResponse } from 'next/server'
import { requireApiAuth } from '@/lib/admin-auth'
import { deleteImage } from '@/lib/data'

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const auth = await requireApiAuth()
  if (auth !== true) return auth

  const { path: segments } = await params
  const filePath = segments.join('/')
  try {
    await deleteImage(filePath)
    return NextResponse.json({ success: true })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Error al eliminar'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
