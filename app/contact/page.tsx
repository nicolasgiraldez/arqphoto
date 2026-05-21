import Link from "next/link"
import { ArrowLeft, Mail, MapPin } from "lucide-react"
import { SiteFooter } from "@/components/site-footer"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { HeroImage } from "@/components/hero-image"
import { ContactForm } from "@/components/contact-form"
import site from "@/data/site.json"

const instagramUrl = site.social.find(s => s.label === 'Instagram')?.url ?? '#'

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
              <p className="text-lg mb-6">{site.contact.availability}</p>

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
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">WhatsApp</h3>
                    <a
                      href={`https://wa.me/${site.contact.phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:underline"
                    >
                      {site.contact.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-muted rounded-full p-2.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Instagram</h3>
                    <Link href={instagramUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:underline underline-offset-4">
                      @{site.contact.instagram}
                    </Link>
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
      <SiteFooter />
    </div>
  )
}
