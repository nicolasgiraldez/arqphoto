import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import projects from "@/data/projects.json"
import site from "@/data/site.json"

export default function ProjectsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="container py-12">
          <div className="mb-8">
            <Link href="/" className={cn(buttonVariants({ variant: "ghost" }), "mb-2 -ml-4 h-8 px-2")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al Inicio
            </Link>
            <h1 className="text-3xl font-bold tracking-tight">Todos los Proyectos</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
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
          © {new Date().getFullYear()} {site.copyright}
        </div>
      </footer>
    </div>
  )
}


