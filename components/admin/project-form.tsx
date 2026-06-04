'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ServicesEditor } from '@/components/admin/services-editor'
import type { Project } from '@/lib/data'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  rectSortingStrategy,
  useSortable,
  arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

const CATEGORIES = ['Residencial', 'Comercial', 'Cultural', 'Urbano', 'Espacios Públicos']
const CROP_OPTIONS = [
  { value: 'top', label: 'Arriba' },
  { value: 'center', label: 'Centro' },
  { value: 'bottom', label: 'Abajo' },
]

// ── Inline image browser modal ────────────────────────────────────────────────

interface ImageInfo {
  filename: string
  url: string
  folder?: string
}

interface ImageModalProps {
  onSelect: (url: string) => void
  onClose: () => void
  currentValue?: string
}

function ImageModal({ onSelect, onClose, currentValue }: ImageModalProps) {
  const [images, setImages] = useState<ImageInfo[]>([])
  const [uploading, setUploading] = useState(false)
  const [currentFolder, setCurrentFolder] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetch('/api/admin/images').then(r => r.json()).then(setImages)
  }, [])

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const fd = new FormData()
    fd.append('file', file)
    if (currentFolder) fd.append('folder', currentFolder)
    const res = await fetch('/api/admin/images', { method: 'POST', body: fd })
    if (res.ok) {
      const info: ImageInfo = await res.json()
      setImages(prev => [...prev, info])
      onSelect(info.url)
    }
    setUploading(false)
    if (fileRef.current) fileRef.current.value = ''
  }

  const folders = Array.from(new Set(
    images.filter(i => i.folder && i.folder !== '_unref').map(i => i.folder!)
  )).sort()

  const displayed = currentFolder
    ? images.filter(i => i.folder === currentFolder)
    : images.filter(i => !i.folder)

  function folderPreview(folder: string) {
    return images.find(i => i.folder === folder)?.url
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg shadow-xl w-full max-w-3xl max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b shrink-0">
          <div className="flex items-center gap-3">
            <h3 className="font-semibold">Galería de imágenes</h3>
            {currentFolder && (
              <span className="text-sm text-muted-foreground">/ {currentFolder}</span>
            )}
          </div>
          <div className="flex gap-2">
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
            <Button type="button" size="sm" variant="outline" disabled={uploading}
              onClick={() => fileRef.current?.click()}>
              {uploading ? 'Subiendo…' : '↑ Subir imagen'}
            </Button>
            <Button type="button" size="sm" variant="ghost" onClick={onClose}>✕</Button>
          </div>
        </div>

        <div className="overflow-auto p-4 space-y-4">
          {currentFolder && (
            <button
              type="button"
              onClick={() => setCurrentFolder(null)}
              className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              ← Inicio
            </button>
          )}

          {!currentFolder && folders.length > 0 && (
            <div>
              <p className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wide">Carpetas</p>
              <div className="grid grid-cols-5 gap-2 mb-4">
                {folders.map(folder => (
                  <button
                    key={folder}
                    type="button"
                    onClick={() => setCurrentFolder(folder)}
                    className="relative aspect-square rounded-md overflow-hidden border-2 border-transparent hover:border-foreground transition-colors bg-muted group"
                  >
                    {folderPreview(folder) && (
                      <Image
                        src={folderPreview(folder)!}
                        alt={folder}
                        fill
                        className="object-cover opacity-70 group-hover:opacity-90 transition-opacity"
                        unoptimized
                      />
                    )}
                    <div className="absolute inset-0 flex items-end p-1 bg-gradient-to-t from-black/60 to-transparent">
                      <span className="text-white text-xs leading-tight truncate w-full">{folder}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {displayed.length > 0 && (
            <div>
              {!currentFolder && <p className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wide">Raíz</p>}
              <div className="grid grid-cols-5 gap-2">
                {displayed.map(img => (
                  <button
                    key={img.url}
                    type="button"
                    onClick={() => onSelect(img.url)}
                    className={`relative aspect-square rounded-md overflow-hidden border-2 transition-colors hover:border-foreground ${
                      currentValue === img.url ? 'border-foreground' : 'border-transparent'
                    }`}
                  >
                    <Image src={img.url} alt={img.filename} fill className="object-cover" unoptimized />
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentFolder && displayed.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-8">Esta carpeta está vacía</p>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Inline image picker (preview + button) ────────────────────────────────────

function InlineImagePicker({ value, onSelect, label }: { value: string; onSelect: (url: string) => void; label: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="space-y-2">
      {label && <p className="text-sm font-medium">{label}</p>}
      <div className="flex items-center gap-3">
        {value && (
          <div className="relative w-20 h-20 rounded-md overflow-hidden border bg-muted shrink-0">
            <Image src={value} alt="" fill className="object-cover" unoptimized />
          </div>
        )}
        <div className="space-y-1">
          {value && <p className="text-xs text-muted-foreground truncate max-w-xs">{value}</p>}
          <Button type="button" variant="outline" size="sm" onClick={() => setOpen(true)}>
            {value ? 'Cambiar imagen' : 'Seleccionar imagen'}
          </Button>
        </div>
      </div>
      {open && <ImageModal currentValue={value} onSelect={url => { onSelect(url); setOpen(false) }} onClose={() => setOpen(false)} />}
    </div>
  )
}

// ── Sortable gallery ──────────────────────────────────────────────────────────

function SortableImage({ url, onRemove }: { url: string; onRemove: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: url })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative group w-20 h-20 rounded-md overflow-hidden border bg-muted cursor-grab active:cursor-grabbing touch-none"
      {...attributes}
      {...listeners}
    >
      <Image src={url} alt="" fill className="object-cover" unoptimized draggable={false} />
      <button
        type="button"
        onPointerDown={e => e.stopPropagation()}
        onClick={onRemove}
        className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/70 text-white text-xs leading-none flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black cursor-pointer"
      >
        ×
      </button>
    </div>
  )
}

// ── Main form ─────────────────────────────────────────────────────────────────

interface Props {
  initialData?: Project
  allProjects: Project[]
  mode: 'create' | 'edit'
}

export function ProjectForm({ initialData, allProjects, mode }: Props) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [galleryOpen, setGalleryOpen] = useState(false)

  const [activeImageUrl, setActiveImageUrl] = useState<string | null>(null)
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))

  const [form, setForm] = useState({
    title: initialData?.title ?? '',
    location: initialData?.location ?? '',
    category: initialData?.category ?? '',
    year: initialData?.year ?? '',
    client: initialData?.client ?? '',
    architect: initialData?.architect ?? '',
    description: initialData?.description ?? '',
    mainImage: initialData?.mainImage ?? '',
    carouselImage: initialData?.carouselImage ?? '',
    images: initialData?.images ?? [] as string[],
    related: initialData?.related ?? [] as string[],
    services: initialData?.services ?? [] as string[],
    portrait: initialData?.portrait ?? false,
    crop: initialData?.crop ?? '' as string,
    hidden: initialData?.hidden ?? false,
  })

  function set<K extends keyof typeof form>(key: K, value: typeof form[K]) {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  function addGalleryImage(url: string) {
    setForm(prev => ({
      ...prev,
      images: prev.images.includes(url) ? prev.images : [...prev.images, url],
    }))
  }

  function removeGalleryImage(url: string) {
    set('images', form.images.filter(i => i !== url))
  }

  function toggleRelated(id: string) {
    set('related', form.related.includes(id)
      ? form.related.filter(r => r !== id)
      : [...form.related, id]
    )
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')

    const payload: Partial<Project> = {
      title: form.title,
      location: form.location,
      category: form.category,
      year: form.year,
      client: form.client,
      description: form.description,
      mainImage: form.mainImage,
      images: form.images,
      related: form.related,
      services: form.services,
      portrait: form.portrait,
      hidden: form.hidden,
    }
    if (form.architect) payload.architect = form.architect
    if (form.crop) payload.crop = form.crop as Project['crop']
    if (form.carouselImage) payload.carouselImage = form.carouselImage

    const url = mode === 'create' ? '/api/admin/projects' : `/api/admin/projects/${initialData!.id}`
    const method = mode === 'create' ? 'POST' : 'PUT'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (res.ok) {
      router.push('/admin/projects')
      router.refresh()
    } else {
      const data = await res.json()
      setError(data.error || 'Error al guardar')
      setSaving(false)
    }
  }

  const otherProjects = allProjects.filter(p => p.id !== initialData?.id)

  return (
    <form onSubmit={handleSubmit} className="space-y-10 max-w-2xl">

      {/* Información básica */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground border-b pb-2">
          Información básica
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 space-y-1.5">
            <Label htmlFor="title">Título *</Label>
            <Input id="title" value={form.title} onChange={e => set('title', e.target.value)} required />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="location">Ubicación *</Label>
            <Input id="location" value={form.location} onChange={e => set('location', e.target.value)} required />
          </div>
          <div className="space-y-1.5">
            <Label>Categoría *</Label>
            <Select value={form.category} onValueChange={v => set('category', v ?? '')}>
              <SelectTrigger><SelectValue placeholder="Seleccionar…" /></SelectTrigger>
              <SelectContent>
                {CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="year">Año *</Label>
            <Input id="year" value={form.year} onChange={e => set('year', e.target.value)} required />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="client">Cliente</Label>
            <Input id="client" value={form.client} onChange={e => set('client', e.target.value)} />
          </div>
          <div className="col-span-2 space-y-1.5">
            <Label htmlFor="architect">Arquitecto</Label>
            <Input id="architect" value={form.architect} onChange={e => set('architect', e.target.value)} />
          </div>
        </div>
      </section>

      {/* Descripción */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground border-b pb-2">
          Descripción
        </h2>
        <Textarea value={form.description} onChange={e => set('description', e.target.value)} rows={5} />
      </section>

      {/* Imagen principal */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground border-b pb-2">
          Imagen principal
        </h2>
        <InlineImagePicker value={form.mainImage} onSelect={url => set('mainImage', url)} label="" />
      </section>

      {/* Imagen para carrusel */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground border-b pb-2">
          Imagen para carrusel
        </h2>
        <p className="text-xs text-muted-foreground">
          Opcional. Si se deja vacío se usa la imagen principal.
        </p>
        <InlineImagePicker value={form.carouselImage} onSelect={url => set('carouselImage', url)} label="" />
      </section>

      {/* Galería */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground border-b pb-2">
          Galería de imágenes
        </h2>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={(event) => setActiveImageUrl(event.active.id as string)}
          onDragEnd={(event: DragEndEvent) => {
            setActiveImageUrl(null)
            const { active, over } = event
            if (!over || active.id === over.id) return
            const oldIndex = form.images.indexOf(active.id as string)
            const newIndex = form.images.indexOf(over.id as string)
            set('images', arrayMove(form.images, oldIndex, newIndex))
          }}
          onDragCancel={() => setActiveImageUrl(null)}
        >
          <SortableContext items={form.images} strategy={rectSortingStrategy}>
            <div className="flex flex-wrap gap-2">
              {form.images.map(url => (
                <SortableImage key={url} url={url} onRemove={() => removeGalleryImage(url)} />
              ))}
              <button
                type="button"
                onClick={() => setGalleryOpen(true)}
                className="w-20 h-20 rounded-md border-2 border-dashed flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors text-2xl"
              >
                +
              </button>
            </div>
          </SortableContext>
          <DragOverlay>
            {activeImageUrl && (
              <div className="relative w-20 h-20 rounded-md overflow-hidden border bg-muted shadow-xl opacity-90">
                <Image src={activeImageUrl} alt="" fill className="object-cover" unoptimized draggable={false} />
              </div>
            )}
          </DragOverlay>
        </DndContext>
        {galleryOpen && (
          <ImageModal
            onSelect={url => { addGalleryImage(url); setGalleryOpen(false) }}
            onClose={() => setGalleryOpen(false)}
          />
        )}
      </section>

      {/* Opciones de visualización */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground border-b pb-2">
          Opciones de visualización
        </h2>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={form.portrait}
            onChange={e => set('portrait', e.target.checked)}
            className="w-4 h-4 rounded border"
          />
          <span className="text-sm">Formato retrato (portrait)</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={form.hidden}
            onChange={e => set('hidden', e.target.checked)}
            className="w-4 h-4 rounded border"
          />
          <span className="text-sm">Ocultar proyecto del sitio</span>
        </label>
        <div className="space-y-1.5">
          <Label>Recorte de imagen</Label>
          <Select value={form.crop} onValueChange={v => set('crop', v ?? '')}>
            <SelectTrigger className="w-48"><SelectValue placeholder="Sin recorte especial" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="">Sin recorte especial</SelectItem>
              {CROP_OPTIONS.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </section>

      {/* Servicios */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground border-b pb-2">
          Servicios fotografiados
        </h2>
        <ServicesEditor
          value={form.services}
          onChange={v => set('services', v)}
          placeholder="Ej: Fotografía arquitectónica exterior"
          addLabel="+ Agregar servicio"
        />
      </section>

      {/* Proyectos relacionados */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground border-b pb-2">
          Proyectos relacionados
        </h2>
        <div className="space-y-2">
          {otherProjects.map(p => (
            <label key={p.id} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.related.includes(p.id)}
                onChange={() => toggleRelated(p.id)}
                className="w-4 h-4 rounded border"
              />
              <span className="text-sm">
                {p.title} <span className="text-muted-foreground">({p.category} · {p.year})</span>
              </span>
            </label>
          ))}
        </div>
      </section>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={saving}>
          {saving ? 'Guardando…' : mode === 'create' ? 'Crear proyecto' : 'Guardar cambios'}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push('/admin/projects')}>
          Cancelar
        </Button>
      </div>
    </form>
  )
}
