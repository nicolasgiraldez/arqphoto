"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Status = "idle" | "submitting" | "success" | "error"

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle")
  const [projectType, setProjectType] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("submitting")

    const form = e.currentTarget
    const data = new FormData(form)
    data.set("project-type", projectType)

    try {
      const res = await fetch("https://formspree.io/f/mdayrvgb", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      })

      if (res.ok) {
        setStatus("success")
        form.reset()
        setProjectType("")
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div className="bg-muted p-6 rounded-lg flex flex-col items-center justify-center gap-4 text-center min-h-[300px]">
        <p className="text-2xl">✓</p>
        <h2 className="text-xl font-semibold">Mensaje enviado</h2>
        <p className="text-muted-foreground">Gracias por contactarme. Respondré dentro de las 48 horas.</p>
        <Button variant="outline" onClick={() => setStatus("idle")}>
          Enviar otro mensaje
        </Button>
      </div>
    )
  }

  return (
    <div className="bg-muted p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-6">Enviame un Mensaje</h2>
      <form className="grid gap-6" onSubmit={handleSubmit}>
        <div className="grid gap-2">
          <Label htmlFor="name">Nombre</Label>
          <Input id="name" name="name" placeholder="Tu nombre" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="Tu dirección de email" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="project-type">Tipo de Proyecto</Label>
          <Select value={projectType} onValueChange={(v) => setProjectType(v ?? "")}>
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
            name="message"
            placeholder="Contame sobre tu proyecto, plazos y cualquier requisito específico"
            rows={6}
            required
          />
        </div>
        {status === "error" && (
          <p className="text-sm text-destructive text-center">
            Hubo un error al enviar el mensaje. Por favor intentá de nuevo.
          </p>
        )}
        <Button type="submit" size="lg" disabled={status === "submitting"}>
          {status === "submitting" ? "Enviando…" : "Enviar Mensaje"}
        </Button>
        <p className="text-xs text-muted-foreground text-center">
          Responderé a tu consulta dentro de las 48 horas.
        </p>
      </form>
    </div>
  )
}
