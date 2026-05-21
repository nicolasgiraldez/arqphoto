import Link from "next/link"
import Image from "next/image"
import { ArrowRight, MapPin } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { MobileNav } from "@/components/mobile-nav"
import { HeroCarousel } from "@/components/hero-carousel"
import { SiteFooter } from "@/components/site-footer"
import { readProjects, readSite, readDestacados } from "@/lib/data"

export const dynamic = 'force-dynamic'

export default async function Home() {
  const [allProjects, featuredIds, site] = await Promise.all([
    readProjects(),
    readDestacados(),
    readSite(),
  ])
  const destacados = allProjects.filter((p) => featuredIds.includes(p.id))
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
                Proyectos
              </Link>
              <Link href="#about" className="text-sm font-medium hover:underline underline-offset-4">
                Sobre mí
              </Link>
              <Link href="/contact" className="text-sm font-medium hover:underline underline-offset-4">
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
              <h2 style={{ margin: 0, fontSize: "clamp(1.625rem, 2.5vw, 2rem)", fontWeight: 600, letterSpacing: "-0.02em" }}>
                Proyectos destacados
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {destacados.map((project) => {
                const cropClass =
                  project.crop === "top" ? "object-top" :
                    project.crop === "bottom" ? "object-bottom" : "object-center"
                return (
                  <Link
                    key={project.id}
                    href={`/projects/${project.id}`}
                    className="group block transition-transform duration-200 ease-in-out hover:-translate-y-0.5"
                  >
                    <div className="relative overflow-hidden bg-muted" style={{ aspectRatio: "4/3" }}>
                      <Image
                        src={project.mainImage || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className={`object-cover ${cropClass} transition-transform duration-500 ease-in-out group-hover:scale-[1.04]`}
                      />
                    </div>
                    <div style={{ padding: "1rem 0 0.5rem" }}>
                      <h3 style={{ margin: 0, fontSize: "1.0625rem", fontWeight: 600, letterSpacing: "-0.01em" }}>
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground" style={{ margin: "0.25rem 0 0", fontSize: "0.875rem" }}>
                        {project.location}
                      </p>
                    </div>
                  </Link>
                )
              })}
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
            <div className="bg-muted border border-border rounded-[var(--radius)] px-7 py-10 md:px-10 md:py-12 lg:px-14 lg:py-16">
              <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] items-center gap-10 md:gap-14">
                <div className="relative overflow-hidden aspect-[4/5] max-w-[280px] md:max-w-[320px]">
                  <Image
                    src={site.about.photo}
                    alt={`${site.about.name}, ${site.about.role}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h2 style={{ fontSize: "clamp(1.625rem, 2.5vw, 2rem)", fontWeight: 600, letterSpacing: "-0.02em", margin: "0 0 1.25rem" }}>
                    Sobre mí
                  </h2>
                  {site.about.bio.map((para, i) => (
                    <p key={i} style={{ fontSize: "1rem", lineHeight: 1.6, margin: "0 0 0.875rem", textAlign: "justify", hyphens: "auto" }}>
                      {para}
                    </p>
                  ))}
                  <div className="inline-flex items-center text-muted-foreground" style={{ gap: 6, marginTop: "0.75rem", fontSize: "0.875rem" }}>
                    <MapPin className="h-[14px] w-[14px]" />
                    <span>{site.about.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACTO */}
        <section id="contact" style={{ padding: "2.5rem 0" }}>
          <div className="container">
            <div className="mx-auto text-center" style={{ maxWidth: 640 }}>
              <h2 style={{ fontSize: "clamp(1.625rem, 2.5vw, 2rem)", fontWeight: 600, letterSpacing: "-0.02em", margin: "0 0 1.75rem" }}>
                Trabajemos juntos
              </h2>
              <Link href="/contact" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "gap-2")}>
                Contactame para hablar sobre tu proyecto
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

      </main>

      <SiteFooter />

    </div>
  )
}
