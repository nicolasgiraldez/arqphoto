'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

interface ImageInfo {
  filename: string
  url: string
}

export default function ImagesPage() {
  const [images, setImages] = useState<ImageInfo[]>([])
  const [uploading, setUploading] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  async function load() {
    const res = await fetch('/api/admin/images')
    if (res.ok) setImages(await res.json())
  }

  useEffect(() => { load() }, [])

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    if (!files.length) return
    setUploading(true)
    for (const file of files) {
      const fd = new FormData()
      fd.append('file', file)
      await fetch('/api/admin/images', { method: 'POST', body: fd })
    }
    await load()
    setUploading(false)
    if (fileRef.current) fileRef.current.value = ''
  }

  async function handleDelete(filename: string) {
    setDeletingId(filename)
    await fetch(`/api/admin/images/${encodeURIComponent(filename)}`, { method: 'DELETE' })
    await load()
    setDeletingId(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Imágenes</h1>
          <p className="text-sm text-muted-foreground mt-1">{images.length} imágenes en /public/images/</p>
        </div>
        <div>
          <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={handleUpload} />
          <Button variant="outline" disabled={uploading} onClick={() => fileRef.current?.click()}>
            {uploading ? 'Subiendo…' : '↑ Subir imágenes'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-3">
        {images.map(img => (
          <div key={img.filename} className="group relative aspect-square rounded-md overflow-hidden border bg-muted">
            <Image src={img.url} alt={img.filename} fill className="object-cover" unoptimized />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1 p-2">
              <p className="text-white text-xs text-center truncate w-full leading-tight">{img.filename}</p>
              <Button
                size="sm"
                variant="destructive"
                className="text-xs h-7"
                disabled={deletingId === img.filename}
                onClick={() => handleDelete(img.filename)}
              >
                {deletingId === img.filename ? '…' : 'Eliminar'}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
