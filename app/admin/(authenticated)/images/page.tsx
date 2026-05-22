'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

interface ImageInfo {
  filename: string
  url: string
  folder?: string
}

export default function ImagesPage() {
  const [images, setImages] = useState<ImageInfo[]>([])
  const [uploading, setUploading] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [uploadFolder, setUploadFolder] = useState('')
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
      if (uploadFolder) fd.append('folder', uploadFolder)
      await fetch('/api/admin/images', { method: 'POST', body: fd })
    }
    await load()
    setUploading(false)
    if (fileRef.current) fileRef.current.value = ''
  }

  async function handleDelete(img: ImageInfo) {
    const key = img.url
    setDeletingId(key)
    const urlPath = img.folder
      ? `${img.folder}/${encodeURIComponent(img.filename)}`
      : encodeURIComponent(img.filename)
    await fetch(`/api/admin/images/${urlPath}`, { method: 'DELETE' })
    await load()
    setDeletingId(null)
  }

  // Group by folder (undefined = root)
  const grouped = new Map<string, ImageInfo[]>()
  for (const img of images) {
    const key = img.folder ?? ''
    if (!grouped.has(key)) grouped.set(key, [])
    grouped.get(key)!.push(img)
  }
  const sortedFolders = Array.from(grouped.keys()).sort((a, b) => {
    if (a === '') return 1
    if (b === '') return -1
    return a.localeCompare(b)
  })

  const knownFolders = sortedFolders.filter(f => f !== '')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Imágenes</h1>
          <p className="text-sm text-muted-foreground mt-1">{images.length} imágenes en /public/images/</p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={uploadFolder}
            onChange={e => setUploadFolder(e.target.value)}
            className="text-sm border rounded px-2 py-1.5 bg-background"
          >
            <option value="">/ raíz</option>
            {knownFolders.map(f => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
          <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={handleUpload} />
          <Button variant="outline" disabled={uploading} onClick={() => fileRef.current?.click()}>
            {uploading ? 'Subiendo…' : '↑ Subir imágenes'}
          </Button>
        </div>
      </div>

      {sortedFolders.map(folder => {
        const items = grouped.get(folder)!
        const label = folder === '' ? 'Raíz' : folder
        return (
          <div key={folder}>
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
              {label} <span className="font-normal normal-case">({items.length})</span>
            </h2>
            <div className="grid grid-cols-5 gap-3">
              {items.map(img => (
                <div key={img.url} className="group relative aspect-square rounded-md overflow-hidden border bg-muted">
                  <Image src={img.url} alt={img.filename} fill className="object-cover" unoptimized />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1 p-2">
                    <p className="text-white text-xs text-center truncate w-full leading-tight">{img.filename}</p>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="text-xs h-7"
                      disabled={deletingId === img.url}
                      onClick={() => handleDelete(img)}
                    >
                      {deletingId === img.url ? '…' : 'Eliminar'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
