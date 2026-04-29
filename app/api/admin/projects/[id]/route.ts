import { NextResponse } from 'next/server'
import { requireApiAuth } from '@/lib/admin-auth'
import { readProjects, writeProjects, readDestacados, writeDestacados } from '@/lib/data'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireApiAuth()
  if (auth !== true) return auth

  const { id } = await params
  const projects = await readProjects()
  const project = projects.find(p => p.id === id)
  if (!project) return NextResponse.json({ error: 'No encontrado' }, { status: 404 })
  return NextResponse.json(project)
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireApiAuth()
  if (auth !== true) return auth

  const { id } = await params
  const body = await request.json()
  const projects = await readProjects()
  const index = projects.findIndex(p => p.id === id)
  if (index === -1) return NextResponse.json({ error: 'No encontrado' }, { status: 404 })

  projects[index] = { ...body, id }
  await writeProjects(projects)
  return NextResponse.json(projects[index])
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireApiAuth()
  if (auth !== true) return auth

  const { id } = await params
  let projects = await readProjects()
  const exists = projects.some(p => p.id === id)
  if (!exists) return NextResponse.json({ error: 'No encontrado' }, { status: 404 })

  projects = projects
    .filter(p => p.id !== id)
    .map(p => ({ ...p, related: p.related.filter(r => r !== id) }))

  await writeProjects(projects)

  const destacados = await readDestacados()
  await writeDestacados(destacados.filter(d => d !== id))

  return NextResponse.json({ success: true })
}
