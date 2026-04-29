import Link from 'next/link'
import { readProjects } from '@/lib/data'
import { buttonVariants } from '@/components/ui/button'
import { DeleteProjectButton } from '@/components/admin/delete-project-button'

export default async function ProjectsPage() {
  const projects = await readProjects()

  const byCategory = projects.reduce<Record<string, typeof projects>>((acc, p) => {
    if (!acc[p.category]) acc[p.category] = []
    acc[p.category].push(p)
    return acc
  }, {})

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Proyectos</h1>
        <Link href="/admin/projects/new" className={buttonVariants()}>+ Nuevo proyecto</Link>
      </div>

      {Object.entries(byCategory).map(([category, items]) => (
        <div key={category}>
          <h2 className="text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wide">
            {category}
          </h2>
          <div className="border rounded-lg divide-y">
            {items.map(p => (
              <div key={p.id} className="flex items-center justify-between px-4 py-3 hover:bg-muted/30 transition-colors">
                <div>
                  <span className="font-medium text-sm">{p.title}</span>
                  <span className="text-muted-foreground text-xs ml-2">{p.location} · {p.year}</span>
                </div>
                <div className="flex gap-2">
                  <Link href={`/admin/projects/${p.id}`} className={buttonVariants({ variant: 'ghost', size: 'sm' })}>
                    Editar
                  </Link>
                  <DeleteProjectButton id={p.id} title={p.title} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
