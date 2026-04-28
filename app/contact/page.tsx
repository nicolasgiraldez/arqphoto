import Link from "next/link"
import { ArrowLeft, Mail, MapPin, Phone } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { HeroImage } from "@/components/hero-image"
import { ContactForm } from "@/components/contact-form"
import site from "@/data/site.json"

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="container py-12">
          <Link href="/" className={cn(buttonVariants({ variant: "ghost" }), "mb-6 -ml-4")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al Inicio
          </Link>

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
                    <p className="text-muted-foreground">{site.contact.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-muted rounded-full p-2.5">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Teléfono</h3>
                    <p className="text-muted-foreground">{site.contact.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-muted rounded-full p-2.5">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Ubicación</h3>
                    <p className="text-muted-foreground">{site.contact.location}</p>
                    <p className="text-muted-foreground">{site.contact.locationNote}</p>
                  </div>
                </div>
              </div>

              <div className="aspect-[4/3] relative rounded-lg overflow-hidden">
                <HeroImage
                  src={site.contact.photo}
                  alt={`${site.about.name} en locación`}
                  fallbackSrc="/placeholder.svg?height=800&width=1200"
                />
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </main>
      <footer className="border-t py-8">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} {site.copyright}
        </div>
      </footer>
    </div>
  )
}
