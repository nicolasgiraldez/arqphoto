"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ContactForm() {
  return (
    <div className="bg-muted p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-6">Enviame un Mensaje</h2>
      <form className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="name">Nombre</Label>
          <Input id="name" placeholder="Tu nombre" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="Tu dirección de email" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="project-type">Tipo de Proyecto</Label>
          <Select>
            <SelectTrigger id="project-type">
              <SelectValue placeholder="Seleccioná el tipo de proyecto" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="residential">Residencial</SelectItem>
              <SelectItem value="commercial">Comercial</SelectItem>
              <SelectItem value="cultural">Cultural</SelectItem>
              <SelectItem value="public">Espacios Públicos</SelectItem>
              <SelectItem value="other">Otro</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="message">Mensaje</Label>
          <Textarea
            id="message"
            placeholder="Contame sobre tu proyecto, plazos y cualquier requisito específico"
            rows={6}
          />
        </div>
        <Button type="submit" size="lg">
          Enviar Mensaje
        </Button>
        <p className="text-xs text-muted-foreground text-center">
          Responderé a tu consulta dentro de las 48 horas.
        </p>
      </form>
    </div>
  )
}
