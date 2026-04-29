import { NextResponse } from 'next/server'
import { requireApiAuth } from '@/lib/admin-auth'
import { deleteImage } from '@/lib/data'

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ filename: string }> }
) {
  const auth = await requireApiAuth()
  if (auth !== true) return auth

  const { filename } = await params
  try {
    await deleteImage(filename)
    return NextResponse.json({ success: true })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Error al eliminar'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
