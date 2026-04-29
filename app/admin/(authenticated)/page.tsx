import Link from 'next/link'
import { readProjects, readDestacados, listImages } from '@/lib/data'
import { buttonVariants } from '@/components/ui/button'

export default async function AdminDashboard() {
  const [projects, destacados, images] = await Promise.all([
    readProjects(),
    readDestacados(),
    listImages(),
  ])

  const stats = [
    { label: 'Proyectos', value: projects.length, href: '/admin/projects' },
    { label: 'Destacados', value: destacados.length, href: '/admin/destacados' },
    { label: 'Imágenes', value: images.length, href: '/admin/images' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Panel de administración del sitio</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {stats.map(s => (
          <Link key={s.label} href={s.href}>
            <div className="border rounded-lg p-5 hover:bg-muted/40 transition-colors cursor-pointer">
              <p className="text-3xl font-bold">{s.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex gap-3">
        <Link href="/admin/projects/new" className={buttonVariants()}>+ Nuevo proyecto</Link>
        <Link href="/admin/site" className={buttonVariants({ variant: 'outline' })}>Editar datos del sitio</Link>
      </div>

      <div>
        <h2 className="text-sm font-medium text-muted-foreground mb-3">Proyectos recientes</h2>
        <div className="space-y-1">
          {projects.slice(-5).reverse().map(p => (
            <Link
              key={p.id}
              href={`/admin/projects/${p.id}`}
              className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-muted/40 transition-colors text-sm"
            >
              <span>{p.title}</span>
              <span className="text-muted-foreground">{p.category} · {p.year}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
