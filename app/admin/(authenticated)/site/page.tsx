'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ServicesEditor } from '@/components/admin/services-editor'
import { SocialEditor } from '@/components/admin/social-editor'
import type { SiteData } from '@/lib/data'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground border-b pb-2">{title}</h2>
      {children}
    </section>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
    </div>
  )
}

export default function SitePage() {
  const [site, setSite] = useState<SiteData | null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetch('/api/admin/site').then(r => r.json()).then(setSite)
  }, [])

  function updateAbout(key: string, value: string | string[]) {
    setSite(prev => prev ? { ...prev, about: { ...prev.about, [key]: value } } : prev)
  }

  function updateContact(key: string, value: string) {
    setSite(prev => prev ? { ...prev, contact: { ...prev.contact, [key]: value } } : prev)
  }

  function updateHero(key: string, value: string) {
    setSite(prev => prev ? { ...prev, hero: { ...prev.hero, [key]: value } } : prev)
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    if (!site) return
    setSaving(true)
    const res = await fetch('/api/admin/site', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(site),
    })
    setSaving(false)
    if (res.ok) {
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }
  }

  if (!site) return <p className="text-muted-foreground text-sm">Cargando…</p>

  return (
    <form onSubmit={handleSave} className="space-y-10 max-w-2xl">
      <h1 className="text-2xl font-semibold">Datos del Sitio</h1>

      <Section title="Sobre mí">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Nombre">
            <Input value={site.about.name} onChange={e => updateAbout('name', e.target.value)} />
          </Field>
          <Field label="Rol / Profesión">
            <Input value={site.about.role} onChange={e => updateAbout('role', e.target.value)} />
          </Field>
          <Field label="Ubicación">
            <Input value={site.about.location} onChange={e => updateAbout('location', e.target.value)} />
          </Field>
          <Field label="Nota de ubicación">
            <Input value={site.about.locationNote ?? ''} onChange={e => updateAbout('locationNote', e.target.value)} />
          </Field>
          <div className="col-span-2">
            <Field label="Foto de perfil (URL)">
              <Input value={site.about.photo} onChange={e => updateAbout('photo', e.target.value)} />
            </Field>
          </div>
        </div>
        <div className="space-y-1.5">
          <Label>Biografía (párrafos)</Label>
          <ServicesEditor
            value={site.about.bio}
            onChange={v => updateAbout('bio', v)}
            placeholder="Párrafo de bio…"
            addLabel="+ Agregar párrafo"
          />
        </div>
      </Section>

      <Section title="Contacto">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Email">
            <Input value={site.contact.email} onChange={e => updateContact('email', e.target.value)} />
          </Field>
          <Field label="Teléfono">
            <Input value={site.contact.phone} onChange={e => updateContact('phone', e.target.value)} />
          </Field>
          <Field label="Ubicación">
            <Input value={site.contact.location} onChange={e => updateContact('location', e.target.value)} />
          </Field>
          <Field label="Nota de ubicación">
            <Input value={site.contact.locationNote ?? ''} onChange={e => updateContact('locationNote', e.target.value)} />
          </Field>
          <div className="col-span-2">
            <Field label="Foto (URL)">
              <Input value={site.contact.photo} onChange={e => updateContact('photo', e.target.value)} />
            </Field>
          </div>
        </div>
      </Section>

      <Section title="Hero (portada)">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Título">
            <Input value={site.hero.title} onChange={e => updateHero('title', e.target.value)} />
          </Field>
          <Field label="Subtítulo">
            <Input value={site.hero.subtitle} onChange={e => updateHero('subtitle', e.target.value)} />
          </Field>
          <div className="col-span-2">
            <Field label="Imagen (URL)">
              <Input value={site.hero.image} onChange={e => updateHero('image', e.target.value)} />
            </Field>
          </div>
          <div className="col-span-2">
            <Field label="Texto alternativo">
              <Input value={site.hero.alt} onChange={e => updateHero('alt', e.target.value)} />
            </Field>
          </div>
        </div>
      </Section>

      <Section title="Redes sociales">
        <SocialEditor
          value={site.social}
          onChange={v => setSite(prev => prev ? { ...prev, social: v } : prev)}
        />
      </Section>

      <Section title="Copyright">
        <Textarea
          value={site.copyright}
          onChange={e => setSite(prev => prev ? { ...prev, copyright: e.target.value } : prev)}
          rows={2}
        />
      </Section>

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={saving}>
          {saving ? 'Guardando…' : 'Guardar cambios'}
        </Button>
        {saved && <span className="text-sm text-green-600">Guardado</span>}
      </div>
    </form>
  )
}
