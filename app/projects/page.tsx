import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ProjectsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="container py-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <Button asChild variant="ghost" className="mb-2 -ml-4 h-8 px-2">
                <Link href="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Volver al Inicio
                </Link>
              </Button>
              <h1 className="text-3xl font-bold tracking-tight">Todos los Proyectos</h1>
            </div>
            <div className="flex gap-4 w-full sm:w-auto">
              <Select defaultValue="all">
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las Categorías</SelectItem>
                  <SelectItem value="residential">Residencial</SelectItem>
                  <SelectItem value="commercial">Comercial</SelectItem>
                  <SelectItem value="cultural">Cultural</SelectItem>
                  <SelectItem value="public">Espacios Públicos</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="newest">
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Más Recientes</SelectItem>
                  <SelectItem value="oldest">Más Antiguos</SelectItem>
                  <SelectItem value="az">A-Z</SelectItem>
                  <SelectItem value="za">Z-A</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allProjects.map((project) => (
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
                  <div className="flex gap-2 mt-2">
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                      {project.category}
                    </span>
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                      {project.year}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
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

const allProjects = [
  {
    id: "1",
    title: "Pabellón de Cristal",
    location: "Buenos Aires, Argentina",
    category: "Cultural",
    year: "2023",
    image: "/images/pabellon-cristal.jpeg",
  },
  {
    id: "2",
    title: "Arenales",
    location: "Recoleta, Buenos Aires",
    category: "Residencial",
    year: "2022",
    image: "/images/cocina-minimalista.png",
  },
  {
    id: "3",
    title: "Casas Atrapadas",
    location: "Buenos Aires, Argentina",
    category: "Urbano",
    year: "2022",
    image: "/images/casas-atrapadas-6.jpeg",
  },
  {
    id: "4",
    title: "Quirno",
    location: "Flores, Buenos Aires",
    category: "Residencial",
    year: "2023",
    image: "/images/quirno-1.jpeg",
  },
  {
    id: "5",
    title: "Renovación Histórica",
    location: "Mendoza, Argentina",
    category: "Cultural",
    year: "2022",
    image: "/images/renovacion-historica.jpeg",
  },
  {
    id: "6",
    title: "Complejo Habitacional Sustentable",
    location: "Bariloche, Argentina",
    category: "Residencial",
    year: "2023",
    image: "/images/complejo-sustentable.jpeg",
  },
  {
    id: "7",
    title: "Museo de Arte Moderno",
    location: "Salta, Argentina",
    category: "Cultural",
    year: "2021",
    image: "/images/museo-arte-moderno.jpeg",
  },
  {
    id: "8",
    title: "Hotel de Lujo",
    location: "Ushuaia, Argentina",
    category: "Comercial",
    year: "2022",
    image: "/images/hotel-lujo.jpeg",
  },
  {
    id: "9",
    title: "Pabellón de Parque Urbano",
    location: "La Plata, Argentina",
    category: "Espacios Públicos",
    year: "2023",
    image: "/images/parque-urbano.jpeg",
  },
  {
    id: "10",
    title: "Refugio de Montaña",
    location: "San Martín de los Andes, Argentina",
    category: "Residencial",
    year: "2021",
    image: "/images/refugio-montana.jpeg",
  },
  {
    id: "11",
    title: "Sede Corporativa",
    location: "Buenos Aires, Argentina",
    category: "Comercial",
    year: "2022",
    image: "/images/sede-corporativa.jpeg",
  },
  {
    id: "12",
    title: "Biblioteca Pública",
    location: "Tucumán, Argentina",
    category: "Espacios Públicos",
    year: "2023",
    image: "/images/biblioteca-publica.jpeg",
  },
]

