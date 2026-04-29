import Link from 'next/link'
import { readProjects } from '@/lib/data'
import { ProjectForm } from '@/components/admin/project-form'

export default async function NewProjectPage() {
  const projects = await readProjects()

  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/projects" className="text-sm text-muted-foreground hover:text-foreground">
          ← Volver a proyectos
        </Link>
        <h1 className="text-2xl font-semibold mt-2">Nuevo proyecto</h1>
      </div>
      <ProjectForm mode="create" allProjects={projects} />
    </div>
  )
}
