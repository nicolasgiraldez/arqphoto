import Link from 'next/link'
import { readProjects } from '@/lib/data'
import { buttonVariants } from '@/components/ui/button'
import { SortableProjects } from '@/components/admin/sortable-projects'

export default async function ProjectsPage() {
  const projects = await readProjects()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Proyectos</h1>
        <Link href="/admin/projects/new" className={buttonVariants()}>+ Nuevo proyecto</Link>
      </div>
      <SortableProjects projects={projects} />
    </div>
  )
}
