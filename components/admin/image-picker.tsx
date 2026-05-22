'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

interface ImageInfo {
  filename: string
  url: string
  folder?: string
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
  const [currentFolder, setCurrentFolder] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  async function loadImages() {
    const res = await fetch('/api/admin/images')
    if (res.ok) setImages(await res.json())
  }

  useEffect(() => {
    if (open) {
      loadImages()
      setCurrentFolder(null)
    }
  }, [open])

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
      await loadImages()
      onSelect(info.url)
      setOpen(false)
    }
    setUploading(false)
    if (fileRef.current) fileRef.current.value = ''
  }

  const folders = Array.from(new Set(
    images
      .filter(i => i.folder && i.folder !== '_unref')
      .map(i => i.folder!)
  )).sort()

  const displayed = currentFolder
    ? images.filter(i => i.folder === currentFolder)
    : images.filter(i => !i.folder)

  function folderPreview(folder: string) {
    return images.find(i => i.folder === folder)?.url
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
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b shrink-0">
              <div className="flex items-center gap-3">
                <h3 className="font-semibold">Galería de imágenes</h3>
                {currentFolder && (
                  <span className="text-sm text-muted-foreground">/ {currentFolder}</span>
                )}
              </div>
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

            <div className="overflow-auto p-4 space-y-4">
              {/* Back button when inside a folder */}
              {currentFolder && (
                <button
                  type="button"
                  onClick={() => setCurrentFolder(null)}
                  className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
                >
                  ← Inicio
                </button>
              )}

              {/* Folder grid (shown at root) */}
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

              {/* Image grid */}
              {displayed.length > 0 ? (
                <div>
                  {!currentFolder && displayed.length > 0 && (
                    <p className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wide">Raíz</p>
                  )}
                  <div className="grid grid-cols-5 gap-2">
                    {displayed.map(img => (
                      <button
                        key={img.url}
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
              ) : (
                currentFolder && (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    Esta carpeta está vacía
                  </p>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
