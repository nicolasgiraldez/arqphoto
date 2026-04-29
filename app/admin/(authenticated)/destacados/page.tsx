'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import type { Project } from '@/lib/data'

export default function DestacadosPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [selected, setSelected] = useState<string[]>([])
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/projects').then(r => r.json()),
      fetch('/api/admin/destacados').then(r => r.json()),
    ]).then(([projs, dest]) => {
      setProjects(projs)
      setSelected(dest)
    })
  }, [])

  function toggle(id: string) {
    setSelected(prev => prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id])
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const res = await fetch('/api/admin/destacados', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(selected),
    })
    setSaving(false)
    if (res.ok) {
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }
  }

  return (
    <form onSubmit={handleSave} className="space-y-6 max-w-xl">
      <div>
        <h1 className="text-2xl font-semibold">Proyectos destacados</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Seleccioná los proyectos que aparecen en la portada del sitio.
        </p>
      </div>

      <div className="border rounded-lg divide-y">
        {projects.map(p => (
          <label key={p.id} className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-muted/30 transition-colors">
            <input
              type="checkbox"
              checked={selected.includes(p.id)}
              onChange={() => toggle(p.id)}
              className="w-4 h-4 rounded border"
            />
            <div>
              <span className="text-sm font-medium">{p.title}</span>
              <span className="text-xs text-muted-foreground ml-2">{p.category} · {p.year}</span>
            </div>
          </label>
        ))}
      </div>

      <p className="text-xs text-muted-foreground">{selected.length} proyecto(s) seleccionado(s)</p>

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={saving}>
          {saving ? 'Guardando…' : 'Guardar destacados'}
        </Button>
        {saved && <span className="text-sm text-green-600">Guardado</span>}
      </div>
    </form>
  )
}
