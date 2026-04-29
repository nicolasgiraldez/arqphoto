'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

interface ImageInfo {
  filename: string
  url: string
}

interface Props {
  value: string
  onSelect: (url: string) => void
  label?: string
}

export function ImagePicker({ value, onSelect, label = 'Imagen' }: Props) {
  const [open, setOpen] = useState(false)
  const [images, setImages] = useState<ImageInfo[]>([])
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  async function loadImages() {
    const res = await fetch('/api/admin/images')
    if (res.ok) setImages(await res.json())
  }

  useEffect(() => {
    if (open) loadImages()
  }, [open])

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const fd = new FormData()
    fd.append('file', file)
    const res = await fetch('/api/admin/images', { method: 'POST', body: fd })
    if (res.ok) {
      const info: ImageInfo = await res.json()
      await loadImages()
      onSelect(info.url)
      setOpen(false)
    }
    setUploading(false)
    if (fileRef.current) fileRef.current.value = ''
  }

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">{label}</p>
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

      {open && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg shadow-xl w-full max-w-3xl max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-semibold">Galería de imágenes</h3>
              <div className="flex gap-2">
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleUpload}
                />
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  disabled={uploading}
                  onClick={() => fileRef.current?.click()}
                >
                  {uploading ? 'Subiendo…' : '↑ Subir imagen'}
                </Button>
                <Button type="button" size="sm" variant="ghost" onClick={() => setOpen(false)}>
                  ✕
                </Button>
              </div>
            </div>
            <div className="overflow-auto p-4">
              <div className="grid grid-cols-5 gap-2">
                {images.map(img => (
                  <button
                    key={img.filename}
                    type="button"
                    onClick={() => { onSelect(img.url); setOpen(false) }}
                    className={`relative aspect-square rounded-md overflow-hidden border-2 transition-colors hover:border-foreground ${
                      value === img.url ? 'border-foreground' : 'border-transparent'
                    }`}
                  >
                    <Image src={img.url} alt={img.filename} fill className="object-cover" unoptimized />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
