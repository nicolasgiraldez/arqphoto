'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { SocialLink } from '@/lib/data'

interface Props {
  value: SocialLink[]
  onChange: (v: SocialLink[]) => void
}

export function SocialEditor({ value, onChange }: Props) {
  function update(index: number, field: keyof SocialLink, text: string) {
    const next = value.map((item, i) => i === index ? { ...item, [field]: text } : item)
    onChange(next)
  }

  function remove(index: number) {
    onChange(value.filter((_, i) => i !== index))
  }

  function add() {
    onChange([...value, { label: '', url: '' }])
  }

  return (
    <div className="space-y-2">
      {value.map((item, i) => (
        <div key={i} className="flex gap-2">
          <Input
            value={item.label}
            onChange={e => update(i, 'label', e.target.value)}
            placeholder="Nombre (Instagram, LinkedIn…)"
            className="w-40 shrink-0"
          />
          <Input
            value={item.url}
            onChange={e => update(i, 'url', e.target.value)}
            placeholder="URL"
          />
          <Button type="button" variant="outline" size="sm" onClick={() => remove(i)} className="shrink-0 px-2">
            ×
          </Button>
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" onClick={add}>
        + Agregar red social
      </Button>
    </div>
  )
}
