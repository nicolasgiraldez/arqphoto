import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Mail, MapPin, Linkedin } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { MobileNav } from "@/components/mobile-nav"
import { HeroCarousel } from "@/components/hero-carousel"
import site from "@/data/site.json"
import allProjects from "@/data/projects.json"
import featuredIds from "@/data/destacados.json"

const destacados = allProjects.filter((p) => featuredIds.includes(p.id))

const socialIcons: Record<string, React.ReactNode> = {
  Instagram: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  ),
  LinkedIn: <Linkedin width={18} height={18} />,
}

export default function Home() {
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
              <Link href="/projects" className={cn(buttonVariants({ variant: "outline" }), "gap-2")}>
                Ver todos los proyectos
                <ArrowRight className="h-[14px] w-[14px]" />
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
                    <p key={i} style={{ fontSize: "1rem", lineHeight: 1.6, margin: "0 0 0.875rem" }}>
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
              <h2 style={{ fontSize: "clamp(1.625rem, 2.5vw, 2rem)", fontWeight: 600, letterSpacing: "-0.02em", margin: "0 0 0.75rem" }}>
                Trabajemos juntos
              </h2>
              <p className="text-muted-foreground" style={{ fontSize: "1.0625rem", margin: "0 0 1.75rem" }}>
                Contactame para hablar sobre tu proyecto.
              </p>
              <div className="flex flex-wrap justify-center" style={{ gap: "0.75rem" }}>
                <a href={`mailto:${site.contact.email}`} className={cn(buttonVariants(), "gap-2")}>
                  <Mail className="h-[14px] w-[14px]" />
                  {site.contact.email}
                </a>
                <Link href="/contact" className={cn(buttonVariants({ variant: "outline" }), "gap-2")}>
                  Formulario de contacto
                  <ArrowRight className="h-[14px] w-[14px]" />
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer style={{ padding: "2.5rem 0 2rem" }}>
        <div className="container">
          <div
            className="flex flex-col md:flex-row items-center justify-between"
            style={{ gap: "1rem", borderTop: "1px solid hsl(var(--border))", paddingTop: "2rem" }}
          >
            <div className="flex items-center" style={{ gap: "0.75rem" }}>
              {/* Brand mark: 35×32 */}
              <span aria-hidden="true" style={{ width: 35, height: 32, flexShrink: 0, display: "block" }}>
                <svg viewBox="0 0 220 200" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", display: "block" }}>
                  <rect width="220" height="200" fill="#0f172a" />
                  <path d="M 147.4 0 A 195 195 0 0 1 147.4 200" fill="none" stroke="#ffffff" strokeWidth="14" strokeLinecap="butt" />
                  <path d="M 0 67.7 A 38 38 0 0 1 0 132.3" fill="none" stroke="#ffffff" strokeWidth="14" strokeLinecap="butt" />
                  <line x1="188" y1="100" x2="220" y2="100" stroke="#ffffff" strokeWidth="16" strokeLinecap="butt" />
                  <text x="92.5" y="124" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="86" letterSpacing="-2" fill="#ffffff">Ng</text>
                </svg>
              </span>
              {/* Wordmark: 97×32 */}
              <svg width="97" height="32" viewBox="0 0 92 30" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Nico Giraldez Fotografía">
                <text x="0" y="13" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="14" letterSpacing="-0.35" textLength="92" lengthAdjust="spacing" fill="#0f172a">Nico Giraldez</text>
                <text x="0" y="27" fontFamily="Inter, sans-serif" fontWeight="500" fontSize="11" letterSpacing="0" textLength="92" lengthAdjust="spacing" fill="#64748b">fotografía</text>
              </svg>
            </div>
            <div className="text-muted-foreground" style={{ fontSize: "0.875rem" }}>
              © {new Date().getFullYear()} {site.copyright}
            </div>
            <nav className="flex" style={{ gap: "0.75rem" }}>
              {site.social.map((s) => (
                <Link
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="inline-flex items-center justify-center transition-colors hover:bg-muted"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    border: "1px solid hsl(var(--muted-foreground) / 0.4)",
                  }}
                >
                  {socialIcons[s.label] ?? (
                    <span style={{ fontSize: "0.75rem", fontWeight: 500 }}>{s.label}</span>
                  )}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </footer>

    </div>
  )
}
