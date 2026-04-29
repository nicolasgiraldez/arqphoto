'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface Props {
  value: string[]
  onChange: (v: string[]) => void
  placeholder?: string
  addLabel?: string
}

export function ServicesEditor({ value, onChange, placeholder = 'Agregar ítem', addLabel = '+ Agregar' }: Props) {
  function update(index: number, text: string) {
    const next = [...value]
    next[index] = text
    onChange(next)
  }

  function remove(index: number) {
    onChange(value.filter((_, i) => i !== index))
  }

  function add() {
    onChange([...value, ''])
  }

  return (
    <div className="space-y-2">
      {value.map((item, i) => (
        <div key={i} className="flex gap-2">
          <Input
            value={item}
            onChange={e => update(i, e.target.value)}
            placeholder={placeholder}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => remove(i)}
            className="shrink-0 px-2"
          >
            ×
          </Button>
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" onClick={add}>
        {addLabel}
      </Button>
    </div>
  )
}
