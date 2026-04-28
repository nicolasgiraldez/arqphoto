import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Camera, Mail, MapPin } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { MobileNav } from "@/components/mobile-nav"
import site from "@/data/site.json"
import allProjects from "@/data/projects.json"
import featuredIds from "@/data/destacados.json"

const destacados = allProjects.filter((p) => featuredIds.includes(p.id))

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
            <Camera className="h-5 w-5" />
            <span>Nico Giraldez</span>
          </Link>
          <nav className="hidden md:flex gap-6">
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
      </header>
      <main className="flex-1">
        <section className="relative w-full">
          <Image
            src={site.hero.image}
            alt={site.hero.alt}
            width={1920}
            height={1080}
            priority
            className="w-full h-auto"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="container text-center text-white">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">{site.hero.title}</h1>
              <p className="mt-4 text-xl max-w-2xl mx-auto">{site.hero.subtitle}</p>
              <Link href="/projects" className={cn(buttonVariants({ size: "lg" }), "mt-8")}>
                Ver portfolio
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section id="work" className="py-16">
          <div className="container">
            <h2 className="text-3xl font-bold tracking-tight mb-8">Proyectos destacados</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {destacados.map((project) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.id}`}
                  className="group overflow-hidden rounded-lg border"
                >
                  <div className={`aspect-[4/3] relative overflow-hidden`}>
                    <Image
                      src={project.mainImage || "/placeholder.svg?height=800&width=1200"}
                      alt={project.title}
                      fill
                      className={`object-cover ${{ top: "object-top", bottom: "object-bottom", center: "object-center" }[project.crop ?? "center"] ?? "object-center"} transition-transform duration-300 group-hover:scale-105`}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg">{project.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{project.location}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link href="/projects" className={buttonVariants({ variant: "outline", size: "lg" })}>
                Ver todos los proyectos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section id="about" className="py-16 bg-muted">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src={site.about.photo}
                  alt={`${site.about.name}, ${site.about.role}`}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-6">Sobre mí</h2>
                <p className="text-lg mb-4">{site.about.bio[0]}</p>
                <p className="mb-4">{site.about.bio[1]}</p>
                <p className="mb-6">{site.about.bio[2]}</p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{site.about.location}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-16">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Trabajemos juntos</h2>
              <p className="text-lg mb-8">
                Contactame para hablar sobre tu proyecto.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href={`mailto:${site.contact.email}`} className={buttonVariants({ size: "lg" })}>
                  <Mail className="mr-2 h-4 w-4" />
                  {site.contact.email}
                </a>
                <Link href="/contact" className={buttonVariants({ variant: "outline", size: "lg" })}>
                  Formulario de Contacto
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-8">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            <span className="font-semibold">Nico Giraldez Fotografía</span>
          </div>
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {site.copyright}
          </div>
          <nav className="flex gap-6">
            {site.social.map((s) => (
              <Link key={s.label} href={s.url} className="text-sm font-medium hover:underline underline-offset-4">
                {s.label}
              </Link>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  )
}


