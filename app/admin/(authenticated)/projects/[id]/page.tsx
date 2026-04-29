import Link from 'next/link'
import { notFound } from 'next/navigation'
import { readProjects } from '@/lib/data'
import { ProjectForm } from '@/components/admin/project-form'

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditProjectPage({ params }: Props) {
  const { id } = await params
  const projects = await readProjects()
  const project = projects.find(p => p.id === id)

  if (!project) notFound()

  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/projects" className="text-sm text-muted-foreground hover:text-foreground">
          ← Volver a proyectos
        </Link>
        <h1 className="text-2xl font-semibold mt-2">Editar: {project.title}</h1>
      </div>
      <ProjectForm mode="edit" initialData={project} allProjects={projects} />
    </div>
  )
}
