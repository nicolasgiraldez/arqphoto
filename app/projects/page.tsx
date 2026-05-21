import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { SiteFooter } from "@/components/site-footer"
import { readProjects } from "@/lib/data"

export const dynamic = 'force-dynamic'

export default async function ProjectsPage() {
  const projects = await readProjects()
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="container py-12">
          <div className="mb-8">
            <Link href="/" className={cn(buttonVariants({ variant: "ghost" }), "mb-2 -ml-4 h-8 px-2")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Ir al Inicio
            </Link>
            <h1 style={{ margin: "1.5rem 0 0", fontSize: "1.5rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", textAlign: "center" }}>Portfolio</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                className="group overflow-hidden border"
              >
                <div className={`aspect-[4/3] relative overflow-hidden`}>
                  <Image
                    src={project.mainImage || "/placeholder.svg?height=800&width=1200"}
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
                    <span className="inline-flex items-center border px-2.5 py-0.5 text-xs font-semibold">
                      {project.category}
                    </span>
                    <span className="inline-flex items-center border px-2.5 py-0.5 text-xs font-semibold">
                      {project.year}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}


