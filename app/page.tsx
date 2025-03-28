import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Camera, Mail, MapPin, Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

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
            <Link href="#work" className="text-sm font-medium hover:underline underline-offset-4">
              Trabajos
            </Link>
            <Link href="#about" className="text-sm font-medium hover:underline underline-offset-4">
              Sobre Mí
            </Link>
            <Link href="#contact" className="text-sm font-medium hover:underline underline-offset-4">
              Contacto
            </Link>
          </nav>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="#work" className="text-lg font-medium hover:underline underline-offset-4">
                  Trabajos
                </Link>
                <Link href="#about" className="text-lg font-medium hover:underline underline-offset-4">
                  Sobre Mí
                </Link>
                <Link href="#contact" className="text-lg font-medium hover:underline underline-offset-4">
                  Contacto
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      <main className="flex-1">
        <section className="relative h-[80vh] w-full overflow-hidden">
          <Image
            src="/images/hero-arquitectura.jpeg"
            alt="Edificio arquitectónico moderno con iluminación dramática"
            fill
            priority
            className="object-cover"
            onError={(e) => {
              // Fallback a un placeholder si la imagen falla
              e.currentTarget.src = "/placeholder.svg?height=1080&width=1920"
            }}
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="container text-center text-white">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">Capturando Arquitectura</h1>
              <p className="mt-4 text-xl max-w-2xl mx-auto">
                Fotografía arquitectónica que destaca la belleza, forma y función de los espacios construidos.
              </p>
              <Button asChild className="mt-8" size="lg">
                <Link href="#work">
                  Ver Portfolio
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="work" className="py-16">
          <div className="container">
            <h2 className="text-3xl font-bold tracking-tight mb-8">Trabajos Destacados</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.id}`}
                  className="group overflow-hidden rounded-lg border"
                >
                  <div className={`aspect-[4/3] relative overflow-hidden`}>
                    <Image
                      src={project.image || "/placeholder.svg?height=800&width=1200"}
                      alt={project.title}
                      fill
                      className={`${
                        project.id === "3" ? "object-contain object-bottom" : "object-cover"
                      } transition-transform duration-300 group-hover:scale-105`}
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
              <Button asChild variant="outline" size="lg">
                <Link href="/projects">
                  Ver Todos los Proyectos
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="about" className="py-16 bg-muted">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src="/images/alex-morgan.jpeg"
                  alt="Nico Giraldez, Fotógrafo de Arquitectura"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-6">Sobre Mí</h2>
                <p className="text-lg mb-4">
                  Soy Nico Giraldez, fotógrafo de arquitectura con más de 10 años de experiencia capturando la esencia
                  de los entornos construidos.
                </p>
                <p className="mb-4">
                  Mi trabajo se centra en destacar la interacción entre la luz, el espacio y la estructura. Creo que la
                  gran fotografía arquitectónica no solo documenta un edificio, sino que revela su alma y la visión de
                  sus creadores.
                </p>
                <p className="mb-6">
                  He colaborado con destacados arquitectos, diseñadores de interiores y publicaciones de todo el mundo
                  para crear narrativas visuales convincentes de espacios excepcionales.
                </p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>Basado en Buenos Aires, disponible en todo el país</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-16">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Trabajemos Juntos</h2>
              <p className="text-lg mb-8">
                Estoy disponible para encargos en todo el país. Contactame para hablar sobre tu proyecto.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <a href="mailto:contacto@nicogiraldez.com.ar">
                    <Mail className="mr-2 h-4 w-4" />
                    contacto@nicogiraldez.com.ar
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/contact">
                    Formulario de Contacto
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
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
            © {new Date().getFullYear()} Nico Giraldez. Todos los derechos reservados.
          </div>
          <nav className="flex gap-6">
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
              Instagram
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
              LinkedIn
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
              Behance
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}

const projects = [
  {
    id: "1",
    title: "Pabellón de Cristal",
    location: "Buenos Aires, Argentina",
    image: "/images/pabellon-cristal.jpeg",
  },
  {
    id: "2",
    title: "Arenales",
    location: "Recoleta, Buenos Aires",
    image: "/images/cocina-minimalista.png",
  },
  {
    id: "3",
    title: "Casas Atrapadas",
    location: "Buenos Aires, Argentina",
    image: "/images/casas-atrapadas-6.jpeg",
  },
  {
    id: "4",
    title: "Quirno",
    location: "Flores, Buenos Aires",
    image: "/images/quirno-1.jpeg",
  },
  {
    id: "5",
    title: "Renovación Histórica",
    location: "Mendoza, Argentina",
    image: "/images/renovacion-historica.jpeg",
  },
  {
    id: "6",
    title: "Complejo Habitacional Sustentable",
    location: "Bariloche, Argentina",
    image: "/images/complejo-sustentable.jpeg",
  },
]

