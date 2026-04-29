'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

const navLinks = [
  { href: '/admin', label: 'Dashboard', exact: true },
  { href: '/admin/projects', label: 'Proyectos' },
  { href: '/admin/site', label: 'Datos del Sitio' },
  { href: '/admin/destacados', label: 'Destacados' },
  { href: '/admin/images', label: 'Imágenes' },
]

function NavLink({ href, label, exact }: { href: string; label: string; exact?: boolean }) {
  const pathname = usePathname()
  const isActive = exact ? pathname === href : pathname.startsWith(href)

  return (
    <Link
      href={href}
      className={`block px-3 py-2 rounded-md text-sm transition-colors ${
        isActive
          ? 'bg-foreground text-background font-medium'
          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
      }`}
    >
      {label}
    </Link>
  )
}

export function AdminSidebar() {
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/admin/auth/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <aside className="w-56 shrink-0 border-r flex flex-col bg-muted/20">
      <div className="p-4 border-b">
        <p className="font-semibold text-sm">Panel de Admin</p>
        <p className="text-xs text-muted-foreground mt-0.5">Nico Giraldez</p>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {navLinks.map(link => (
          <NavLink key={link.href} {...link} />
        ))}
      </nav>

      <div className="p-3 border-t space-y-2">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="block px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        >
          Ver sitio ↗
        </a>
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={handleLogout}
        >
          Cerrar sesión
        </Button>
      </div>
    </aside>
  )
}
