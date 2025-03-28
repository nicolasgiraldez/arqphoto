import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Mail, MapPin, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="container py-12">
          <Button asChild variant="ghost" className="mb-6 -ml-4">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al Inicio
            </Link>
          </Button>

          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-4">Contactame</h1>
              <p className="text-lg mb-6">
                Estoy disponible para proyectos de fotografía arquitectónica en todo el país. Contactame para discutir
                tus necesidades o solicitar un presupuesto.
              </p>

              <div className="grid gap-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="bg-muted rounded-full p-2.5">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-muted-foreground">contacto@nicogiraldez.com.ar</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-muted rounded-full p-2.5">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Teléfono</h3>
                    <p className="text-muted-foreground">+54 11 5555-1234</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-muted rounded-full p-2.5">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Ubicación</h3>
                    <p className="text-muted-foreground">Buenos Aires, Argentina</p>
                    <p className="text-muted-foreground">Disponible para proyectos en todo el país</p>
                  </div>
                </div>
              </div>

              <div className="aspect-[4/3] relative rounded-lg overflow-hidden">
                <Image
                  src="/images/fotografo-locacion.jpeg"
                  alt="Nico Giraldez en locación"
                  fill
                  className="object-cover"
                  onError={(e) => {
                    // Fallback a un placeholder si la imagen falla
                    e.currentTarget.src = "/placeholder.svg?height=800&width=1200"
                  }}
                />
              </div>
            </div>

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
          </div>
        </div>
      </main>
      <footer className="border-t py-8">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Nico Giraldez Fotografía. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  )
}

