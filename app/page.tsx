import Link from "next/link"
import Image from "next/image"
import { ArrowRight, MapPin, Mail } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { MobileNav } from "@/components/mobile-nav"
import { HeroCarousel } from "@/components/hero-carousel"
import { SiteFooter } from "@/components/site-footer"
import { ContactForm } from "@/components/contact-form"
import { readProjects, readSite, readDestacados } from "@/lib/data"

export const dynamic = 'force-dynamic'

export default async function Home() {
  const [allProjects, featuredIds, site] = await Promise.all([
    readProjects(),
    readDestacados(),
    readSite(),
  ])
  const destacados = allProjects.filter((p) => featuredIds.includes(p.id))
  const instagramUrl = site.social.find((s) => s.label === 'Instagram')?.url ?? '#'
  return (
    <div className="flex min-h-screen flex-col">

      {/* HEADER */}
      <header
        className="sticky top-0 z-50 w-full"
        style={{ background: "hsl(var(--background) / 0.85)", backdropFilter: "saturate(180%) blur(8px)" }}
      >
        <div className="container">
          <div
            className="flex items-center justify-between"
            style={{ height: "76px", borderBottom: "1px solid hsl(var(--border))" }}
          >
            <Link href="/" className="flex items-center" style={{ gap: "0.75rem" }}>
              {/* Brand mark: 40×36 */}
              <span aria-hidden="true" style={{ width: 40, height: 36, flexShrink: 0, display: "block" }}>
                <svg viewBox="0 0 220 200" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", display: "block" }}>
                  <rect width="220" height="200" fill="#0f172a" />
                  <path d="M 147.4 0 A 195 195 0 0 1 147.4 200" fill="none" stroke="#ffffff" strokeWidth="14" strokeLinecap="butt" />
                  <path d="M 0 67.7 A 38 38 0 0 1 0 132.3" fill="none" stroke="#ffffff" strokeWidth="14" strokeLinecap="butt" />
                  <line x1="188" y1="100" x2="220" y2="100" stroke="#ffffff" strokeWidth="16" strokeLinecap="butt" />
                  <text x="92.5" y="124" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="86" letterSpacing="-2" fill="#ffffff">Ng</text>
                </svg>
              </span>
              {/* Wordmark: "Nico Giraldez" + "fotografía" */}
              <svg width="110" height="36" viewBox="0 0 92 30" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Nico Giraldez Fotografía">
                <text x="0" y="13" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="14" letterSpacing="-0.35" textLength="92" lengthAdjust="spacing" fill="#0f172a">Nico Giraldez</text>
                <text x="0" y="27" fontFamily="Inter, sans-serif" fontWeight="500" fontSize="11" letterSpacing="0" textLength="92" lengthAdjust="spacing" fill="#64748b">fotografía</text>
              </svg>
            </Link>

            <nav className="hidden md:flex" style={{ gap: "1.75rem" }}>
              <Link href="/projects" className="text-sm font-medium hover:underline underline-offset-4">
                Portfolio
              </Link>
              <Link href="#about" className="text-sm font-medium hover:underline underline-offset-4">
                Sobre mí
              </Link>
              <Link href="#contact" className="text-sm font-medium hover:underline underline-offset-4">
                Contacto
              </Link>
            </nav>

            <MobileNav />
          </div>
        </div>
      </header>

      <main className="flex-1">

        {/* HERO CAROUSEL */}
        <HeroCarousel projects={destacados} />

        {/* PROYECTOS DESTACADOS */}
        <section id="work" style={{ padding: "5rem 0 2.5rem" }}>
          <div className="container">
            <div style={{ marginBottom: "2.5rem" }}>
              <h2 style={{ margin: 0, fontSize: "1.5rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", textAlign: "center" }}>
                Proyectos destacados
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {destacados.map((project) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.id}`}
                  className="group overflow-hidden border"
                >
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <Image
                      src={project.mainImage || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className={`object-cover ${{ top: "object-top", bottom: "object-bottom", center: "object-center" }[project.crop ?? "center"] ?? "object-center"} transition-transform duration-300 group-hover:scale-105`}
                    />
                  </div>
                  <div className="p-4">
                    <h3 style={{ fontSize: "1rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", margin: 0 }}>{project.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{project.location}</p>
                    <div className="flex gap-2 mt-2">
                      <span className="inline-flex items-center border px-2.5 py-0.5 text-xs font-semibold">{project.category}</span>
                      <span className="inline-flex items-center border px-2.5 py-0.5 text-xs font-semibold">{project.year}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center" style={{ marginTop: "3rem" }}>
              <Link href="/projects" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "gap-2")}>
                Ver todos los proyectos
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* SOBRE MÍ */}
        <section id="about" style={{ padding: "2.5rem 0" }}>
          <div className="container">
            <div style={{ marginBottom: "2.5rem" }}>
              <h2 style={{ margin: 0, fontSize: "1.5rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", textAlign: "center" }}>
                Sobre mí
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] items-start gap-10 md:gap-14">
              <div>
                <div style={{ marginBottom: "1.25rem" }}>
                  <p style={{ fontWeight: 600, fontSize: "1.25rem", margin: "0 0 0.25rem" }}>{site.about.name}</p>
                  <p className="text-muted-foreground" style={{ fontSize: "1rem", margin: "0 0 0.125rem" }}>{site.about.role}</p>
                  <p className="text-muted-foreground" style={{ fontSize: "1rem", margin: 0 }}>{site.about.location}</p>
                </div>
                {site.about.bio.map((para, i) => (
                  <p key={i} style={{ fontSize: "1rem", lineHeight: 1.6, margin: "0 0 0.875rem", textAlign: "justify", hyphens: "auto" }}>
                    {para}
                  </p>
                ))}
              </div>
              <div className="relative overflow-hidden aspect-[4/5]">
                <Image
                  src={site.about.photo}
                  alt={`${site.about.name}, ${site.about.role}`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CONTACTO */}
        <section id="contact" style={{ padding: "2.5rem 0" }}>
          <div className="container">
            <div style={{ marginBottom: "2.5rem" }}>
              <h2 style={{ margin: 0, fontSize: "1.5rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", textAlign: "center" }}>
                Contactame
              </h2>
            </div>
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
              <div>
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
                      <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:underline underline-offset-4">
                        @{site.contact.instagram}
                      </a>
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

              </div>

              <ContactForm />
            </div>
          </div>
        </section>

      </main>

      <SiteFooter />

    </div>
  )
}
