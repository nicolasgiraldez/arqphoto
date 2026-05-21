"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type Status = "idle" | "submitting" | "success" | "error"

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("submitting")

    const form = e.currentTarget
    const data = new FormData(form)

    try {
      const res = await fetch(`https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      })

      if (res.ok) {
        setStatus("success")
        form.reset()

      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-start gap-4 min-h-[300px] justify-center">
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
    <div>
      <h2 style={{ fontSize: "1rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 1.5rem", textAlign: "center" }}>Dejame un mensaje</h2>
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
          <Label htmlFor="message">Mensaje</Label>
          <Textarea
            id="message"
            name="message"
            placeholder="Contame sobre tu proyecto, plazos y cualquier requisito específico."
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

