'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

interface Props {
  id: string
  title: string
}

export function DeleteProjectButton({ id, title }: Props) {
  const router = useRouter()
  const [confirming, setConfirming] = useState(false)
  const [deleting, setDeleting] = useState(false)

  async function handleDelete() {
    setDeleting(true)
    const res = await fetch(`/api/admin/projects/${id}`, { method: 'DELETE' })
    if (res.ok) {
      router.refresh()
    } else {
      setDeleting(false)
      setConfirming(false)
    }
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-1">
        <span className="text-xs text-muted-foreground mr-1">¿Eliminar?</span>
        <Button size="sm" variant="destructive" disabled={deleting} onClick={handleDelete}>
          {deleting ? '…' : 'Sí'}
        </Button>
        <Button size="sm" variant="ghost" onClick={() => setConfirming(false)}>No</Button>
      </div>
    )
  }

  return (
    <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive" onClick={() => setConfirming(true)}>
      Eliminar
    </Button>
  )
}
