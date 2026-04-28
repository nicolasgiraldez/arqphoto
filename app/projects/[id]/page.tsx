"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, MapPin } from "lucide-react"
import { use } from "react"

import projects from "@/data/projects.json"
import site from "@/data/site.json"

import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { ImageGallery } from "@/components/image-gallery"

export default function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const project = projects.find((p) => p.id === id) || projects[0]
  const relatedProjects = (project.related ?? [])
    .map((rid) => projects.find((p) => p.id === rid))
    .filter(Boolean) as typeof projects

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="container py-12">
          <Link href="/projects" className={cn(buttonVariants({ variant: "ghost" }), "mb-6 -ml-4")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a Proyectos
          </Link>

          <div className="grid gap-8 lg:grid-cols-[2fr_1fr] lg:gap-12">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-2">{project.title}</h1>
              <div className="flex flex-wrap gap-4 mb-6 text-muted-foreground">
                <div className="flex items-center">
                  <MapPin className="mr-1 h-4 w-4" />
                  {project.location}
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-1 h-4 w-4" />
                  {project.year}
                </div>
                <div className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-sm font-semibold">
                  {project.category}
                </div>
              </div>

              <div
                className="aspect-[16/9] relative rounded-lg overflow-hidden mb-8 cursor-pointer"
                onClick={() => {
                  const galleryComponent = document.querySelector("[data-gallery-component]")
                  if (galleryComponent) {
                    ; (galleryComponent as any).openMainImage()
                  }
                }}
              >
                <Image
                  src={project.mainImage || "/placeholder.svg?height=1080&width=1920"}
                  alt={project.title}
                  fill
                  priority
                  className={`transition-transform duration-300 ${project.id === "3" ? "object-contain object-bottom hover:scale-105" : "object-cover hover:scale-105"
                    }`}
                />
              </div>

              <div className="prose max-w-none mb-8">
                <p>{project.description}</p>
              </div>

              <ImageGallery images={project.images} alt={project.title} mainImage={project.mainImage} portrait={project.portrait ?? false} />
            </div>

            <div>
              <div className="sticky top-24">
                <h2 className="text-xl font-semibold mb-4">Detalles del Proyecto</h2>
                <dl className="grid gap-3 text-sm">
                  {project.client && (
                    <div className="grid grid-cols-2 gap-1">
                      <dt className="font-medium text-muted-foreground">Cliente:</dt>
                      <dd>{project.client}</dd>
                    </div>
                  )}
                  {project.architect && (
                    <div className="grid grid-cols-2 gap-1">
                      <dt className="font-medium text-muted-foreground">Arquitecto:</dt>
                      <dd>{project.architect}</dd>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-1">
                    <dt className="font-medium text-muted-foreground">Año:</dt>
                    <dd>{project.year}</dd>
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    <dt className="font-medium text-muted-foreground">Ubicación:</dt>
                    <dd>{project.location}</dd>
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    <dt className="font-medium text-muted-foreground">Categoría:</dt>
                    <dd>{project.category}</dd>
                  </div>
                </dl>

                <Separator className="my-6" />

                <h2 className="text-xl font-semibold mb-4">Servicios Proporcionados</h2>
                <ul className="grid gap-2 text-sm">
                  {project.services.map((service, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2">•</span>
                      {service}
                    </li>
                  ))}
                </ul>

                <Separator className="my-6" />

                <h2 className="text-xl font-semibold mb-4">Proyectos Relacionados</h2>
                <div className="grid gap-4">
                  {relatedProjects.map((related) => (
                    <Link
                      key={related.id}
                      href={`/projects/${related.id}`}
                      className="group grid grid-cols-[80px_1fr] gap-3 items-center"
                    >
                      <div className="aspect-square relative rounded overflow-hidden">
                        <Image
                          src={related.mainImage || "/placeholder.svg?height=400&width=400"}
                          alt={related.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium group-hover:underline">{related.title}</h3>
                        <p className="text-xs text-muted-foreground">{related.location}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
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



