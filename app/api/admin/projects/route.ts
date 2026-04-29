import { NextResponse } from 'next/server'
import { requireApiAuth } from '@/lib/admin-auth'
import { readProjects, writeProjects, generateNextId, type Project } from '@/lib/data'

export async function GET() {
  const auth = await requireApiAuth()
  if (auth !== true) return auth

  const projects = await readProjects()
  return NextResponse.json(projects)
}

export async function POST(request: Request) {
  const auth = await requireApiAuth()
  if (auth !== true) return auth

  const body = await request.json()
  const projects = await readProjects()

  const newProject: Project = {
    id: generateNextId(projects),
    title: body.title ?? '',
    location: body.location ?? '',
    category: body.category ?? '',
    year: body.year ?? '',
    client: body.client ?? '',
    description: body.description ?? '',
    mainImage: body.mainImage ?? '',
    images: body.images ?? [],
    related: body.related ?? [],
    services: body.services ?? [],
  }

  if (body.architect) newProject.architect = body.architect
  if (body.portrait !== undefined) newProject.portrait = body.portrait
  if (body.crop) newProject.crop = body.crop

  await writeProjects([...projects, newProject])
  return NextResponse.json(newProject, { status: 201 })
}
