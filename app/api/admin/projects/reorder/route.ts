import { NextResponse } from 'next/server'
import { readProjects, writeProjects } from '@/lib/data'

export async function PUT(req: Request) {
  const { ids } = await req.json() as { ids: string[] }
  const projects = await readProjects()
  const map = Object.fromEntries(projects.map(p => [p.id, p]))
  await writeProjects(ids.map(id => map[id]).filter(Boolean))
  return NextResponse.json({ ok: true })
}
