'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { GripVertical } from 'lucide-react'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { buttonVariants } from '@/components/ui/button'
import { DeleteProjectButton } from '@/components/admin/delete-project-button'
import type { Project } from '@/lib/data'

function SortableRow({ project }: { project: Project }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: project.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : undefined,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center justify-between px-4 py-3 bg-background hover:bg-muted/30 transition-colors border-b last:border-b-0"
    >
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          className="text-muted-foreground hover:text-foreground cursor-grab active:cursor-grabbing shrink-0 touch-none"
          aria-label="Arrastrar para reordenar"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-4 w-4" />
        </button>
        <div className="min-w-0">
          <span className="font-medium text-sm">{project.title}</span>
          <span className="text-muted-foreground text-xs ml-2">{project.location} · {project.year}</span>
          <span className="text-muted-foreground text-xs ml-2 uppercase tracking-wide">{project.category}</span>
        </div>
      </div>
      <div className="flex gap-2 shrink-0">
        <Link href={`/admin/projects/${project.id}`} className={buttonVariants({ variant: 'ghost', size: 'sm' })}>
          Editar
        </Link>
        <DeleteProjectButton id={project.id} title={project.title} />
      </div>
    </div>
  )
}

export function SortableProjects({ projects: initial }: { projects: Project[] }) {
  const [projects, setProjects] = useState(initial)
  const [saved, setSaved] = useState(false)

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))

  const handleDragEnd = useCallback(async (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = projects.findIndex(p => p.id === active.id)
    const newIndex = projects.findIndex(p => p.id === over.id)
    const reordered = arrayMove(projects, oldIndex, newIndex)
    setProjects(reordered)

    await fetch('/api/admin/projects/reorder', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids: reordered.map(p => p.id) }),
    })

    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }, [projects])

  return (
    <div className="space-y-2">
      {saved && (
        <p className="text-xs text-muted-foreground text-right">Guardado ✓</p>
      )}
      <div className="border rounded-lg overflow-hidden">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={projects.map(p => p.id)} strategy={verticalListSortingStrategy}>
            {projects.map(p => (
              <SortableRow key={p.id} project={p} />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  )
}
