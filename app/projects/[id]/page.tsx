"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, MapPin, ChevronLeft, ChevronRight, X } from "lucide-react"
import { useState, useEffect, use } from "react"

import { Button, buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { ImageGallery } from "@/components/image-gallery"

export default function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const project = projects.find((p) => p.id === id) || projects[0]

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
                    ;(galleryComponent as any).openMainImage()
                  }
                }}
              >
                <Image
                  src={project.mainImage || "/placeholder.svg?height=1080&width=1920"}
                  alt={project.title}
                  fill
                  priority
                  className={`transition-transform duration-300 ${
                    project.id === "3" ? "object-contain object-bottom hover:scale-105" : "object-cover hover:scale-105"
                  }`}
                />
              </div>

              <div className="prose max-w-none mb-8">
                <p>{project.description}</p>
                {project.id !== "3" && project.id !== "4" && (
                  <>
                    <p>
                      Este proyecto ejemplifica la relación armoniosa entre la arquitectura y su entorno. El diseño
                      considera cuidadosamente cómo la luz interactúa con la estructura a lo largo del día, creando
                      espacios interiores dinámicos que cambian con el paso de las horas.
                    </p>
                    <p>
                      Trabajando en estrecha colaboración con los arquitectos, mi objetivo fue capturar no solo la
                      estructura física, sino la experiencia de moverse a través de estos espacios cuidadosamente
                      diseñados.
                    </p>
                  </>
                )}
              </div>

              {project.id === "3" ? (
                <CasasAtrapadasGallery images={project.images} alt={project.title} mainImage={project.mainImage} />
              ) : (
                <ImageGallery images={project.images} alt={project.title} mainImage={project.mainImage} />
              )}
            </div>

            <div>
              <div className="sticky top-24">
                <h2 className="text-xl font-semibold mb-4">Detalles del Proyecto</h2>
                <dl className="grid gap-3 text-sm">
                  {project.id !== "2" && project.id !== "3" && project.id !== "4" && (
                    <div className="grid grid-cols-2 gap-1">
                      <dt className="font-medium text-muted-foreground">Cliente:</dt>
                      <dd>{project.client}</dd>
                    </div>
                  )}
                  {project.id !== "3" && (
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
                          src={related.image || "/placeholder.svg?height=400&width=400"}
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
          © {new Date().getFullYear()} Nico Giraldez Fotografía. Todos los derechos reservados.
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
    category: "Cultural",
    year: "2023",
    client: "Fundación de Artes de Buenos Aires",
    architect: "Estudio Rodríguez & Asociados",
    description:
      "El Pabellón de Cristal es un impresionante ejemplo de arquitectura contemporánea argentina, que combina conceptos tradicionales con materiales modernos. Esta estructura transparente sirve como centro cultural y espacio de exposición, diseñada para crear una conexión perfecta entre los ambientes interiores y exteriores.",
    mainImage: "/images/pabellon-cristal.jpeg",
    images: [
      "/images/pabellon-cristal.jpeg",
      "/images/pabellon-cristal.jpeg",
      "/images/pabellon-cristal.jpeg",
      "/images/pabellon-cristal.jpeg",
    ],
    services: [
      "Fotografía arquitectónica exterior",
      "Documentación de espacios interiores",
      "Fotografía de detalles",
      "Fotografía al amanecer y atardecer",
      "Imágenes editoriales para publicación",
    ],
  },
  {
    id: "2",
    title: "Arenales",
    location: "Recoleta, Buenos Aires",
    category: "Residencial",
    year: "2022",
    client: "Estudio Baires Arquitectura",
    architect: "Arq. Maite Goicochea",
    description:
      "Proyecto Arenales consiste en una reforma integral de cocina y baño en un apartamento ubicado en Recoleta. El diseño minimalista contemporáneo fusiona funcionalidad y estética, donde cada detalle ha sido cuidadosamente considerado para crear espacios armoniosos y elegantes que maximizan la luz natural y el flujo espacial.",
    mainImage: "/images/cocina-minimalista.png",
    images: [
      "/images/cocina-detalle.png",
      "/images/cocina-vista-completa.png",
      "/images/cocina-fregadero.png",
      "/images/refrigerador.png",
      "/images/vinoteca.png",
      "/images/bano-principal.png",
      "/images/bano-doble-lavabo.png",
      "/images/bano-ducha.png",
    ],
    services: [
      "Fotografía de interiores",
      "Fotografía de detalles arquitectónicos",
      "Iluminación especializada para interiores",
      "Documentación de proyecto completo",
      "Imágenes para portfolio de diseño de interiores",
      "Fotografía para publicaciones de arquitectura",
    ],
  },
  {
    id: "3",
    title: "Casas Atrapadas",
    location: "Buenos Aires, Argentina",
    category: "Urbano",
    year: "2022",
    client: "Proyecto Personal",
    architect: "Varios",
    description:
      "Esta serie fotográfica fue trabajada durante un Taller de Fotografía de Arquitectura en el Centro Cultural San Martín en 2022. El proyecto documenta casas históricas que han resistido el paso del tiempo y la modernización urbana, quedando 'atrapadas' entre edificios contemporáneos de mayor altura. Estas imágenes capturan el contraste entre lo antiguo y lo nuevo, la resistencia de la arquitectura patrimonial frente al avance inmobiliario, y la peculiar estética urbana que surge de esta yuxtaposición de estilos y épocas en el paisaje de Buenos Aires.",
    mainImage: "/images/casas-atrapadas-6.jpeg",
    images: [
      "/images/casas-atrapadas-1.jpeg",
      "/images/casas-atrapadas-2.jpeg",
      "/images/casas-atrapadas-3.jpeg",
      "/images/casas-atrapadas-4.jpeg",
      "/images/casas-atrapadas-5.jpeg",
      "/images/casas-atrapadas-7.jpeg",
    ],
    services: [
      "Fotografía arquitectónica urbana",
      "Documentación de patrimonio histórico",
      "Fotografía de contraste urbano",
      "Narrativa visual arquitectónica",
      "Fotografía para publicaciones especializadas",
      "Documentación de transformación urbana",
    ],
  },
  {
    id: "4",
    title: "Quirno",
    location: "Flores, Buenos Aires",
    category: "Residencial",
    year: "2023",
    client: "Privado",
    architect: "Estudio Nómade",
    description:
      "Este proyecto realizado durante un Taller de Fotografía de Arquitectura en el Centro Cultural San Martín en 2022 muestra la renovación integral de un apartamento en el barrio de Flores. La intervención destaca por el uso de murales botánicos de gran formato que aportan personalidad y color a los espacios, combinados con elementos de diseño contemporáneo como carpintería acanalada, pisos geométricos y un sistema de almacenamiento cuidadosamente planificado. El contraste entre los tonos neutros de la base arquitectónica y los acentos coloridos de los murales y accesorios crea un ambiente vibrante y acogedor.",
    mainImage: "/images/quirno-1.jpeg",
    images: [
      "/images/quirno-2.jpeg",
      "/images/quirno-3.jpeg",
      "/images/quirno-4.jpeg",
      "/images/quirno-5.jpeg",
      "/images/quirno-6.jpeg",
      "/images/quirno-7.jpeg",
      "/images/quirno-8.jpeg",
      "/images/quirno-9.jpeg",
    ],
    services: [
      "Fotografía de interiores residenciales",
      "Documentación de proyecto de renovación",
      "Fotografía de detalles decorativos",
      "Fotografía de mobiliario a medida",
      "Imágenes para portfolio de diseño de interiores",
      "Fotografía para publicaciones de arquitectura",
    ],
  },
  {
    id: "5",
    title: "Renovación Histórica",
    location: "Mendoza, Argentina",
    category: "Cultural",
    year: "2022",
    client: "Municipalidad de Mendoza",
    architect: "Estudio Histórico Mendocino",
    description:
      "Este proyecto de renovación histórica en Mendoza recupera un edificio patrimonial del siglo XIX, adaptándolo a usos contemporáneos mientras preserva sus elementos arquitectónicos originales. La intervención respeta la historia del edificio a la vez que incorpora tecnologías modernas para garantizar su funcionalidad y sostenibilidad para las generaciones futuras.",
    mainImage: "/images/renovacion-historica.jpeg",
    images: [
      "/images/renovacion-historica.jpeg",
      "/images/renovacion-historica.jpeg",
      "/images/renovacion-historica.jpeg",
      "/images/renovacion-historica.jpeg",
    ],
    services: [
      "Fotografía de patrimonio histórico",
      "Documentación de proceso de restauración",
      "Fotografía de detalles arquitectónicos históricos",
      "Fotografía de contraste entre lo antiguo y lo nuevo",
      "Imágenes para publicaciones especializadas en patrimonio",
    ],
  },
  {
    id: "6",
    title: "Complejo Habitacional Sustentable",
    location: "Bariloche, Argentina",
    category: "Residencial",
    year: "2023",
    client: "Cooperativa Vivienda Verde",
    architect: "Estudio Patagonia Sostenible",
    description:
      "Este innovador complejo habitacional en Bariloche integra principios de sustentabilidad y eficiencia energética adaptados al clima patagónico. El diseño aprovecha materiales locales y técnicas de construcción que minimizan el impacto ambiental, mientras maximiza el confort térmico y la integración con el paisaje natural circundante.",
    mainImage: "/images/complejo-sustentable.jpeg",
    images: [
      "/images/complejo-sustentable.jpeg",
      "/images/complejo-sustentable.jpeg",
      "/images/complejo-sustentable.jpeg",
      "/images/complejo-sustentable.jpeg",
    ],
    services: [
      "Fotografía arquitectónica exterior e interior",
      "Documentación de sistemas sustentables",
      "Fotografía de integración con el paisaje",
      "Fotografía de detalles constructivos",
      "Imágenes para publicaciones de arquitectura sustentable",
    ],
  },
  {
    id: "7",
    title: "Museo de Arte Moderno",
    location: "Salta, Argentina",
    category: "Cultural",
    year: "2021",
    client: "Gobierno de Salta",
    architect: "Estudio Noroeste Arquitectura",
    description:
      "El Museo de Arte Moderno de Salta es una intervención arquitectónica de gran audacia formal que dialoga con el paisaje andino circundante. Sus volúmenes geométricos y fachadas de hormigón visto generan juegos de luz y sombra que cambian a lo largo del día, convirtiendo al edificio en una obra de arte en sí mismo.",
    mainImage: "/images/museo-arte-moderno.jpeg",
    images: [
      "/images/museo-arte-moderno.jpeg",
      "/images/museo-arte-moderno.jpeg",
      "/images/museo-arte-moderno.jpeg",
      "/images/museo-arte-moderno.jpeg",
    ],
    services: [
      "Fotografía arquitectónica exterior e interior",
      "Fotografía de espacios expositivos",
      "Fotografía de detalles constructivos",
      "Fotografía al amanecer y atardecer",
      "Imágenes editoriales para publicación",
    ],
  },
  {
    id: "8",
    title: "Hotel de Lujo",
    location: "Ushuaia, Argentina",
    category: "Comercial",
    year: "2022",
    client: "Grupo Hotelero Austral",
    architect: "Estudio Fin del Mundo",
    description:
      "Este hotel de lujo en Ushuaia aprovecha el dramático paisaje fueguino para crear una experiencia de hospedaje única. La arquitectura se integra con el entorno natural mediante el uso de materiales locales como la madera de lenga y la piedra patagónica, mientras grandes ventanales enmarcan vistas al Canal Beagle y las montañas.",
    mainImage: "/images/hotel-lujo.jpeg",
    images: [
      "/images/hotel-lujo.jpeg",
      "/images/hotel-lujo.jpeg",
      "/images/hotel-lujo.jpeg",
      "/images/hotel-lujo.jpeg",
    ],
    services: [
      "Fotografía arquitectónica exterior e interior",
      "Fotografía de habitaciones y espacios comunes",
      "Fotografía de integración con el paisaje",
      "Fotografía gastronómica y de amenidades",
      "Imágenes para marketing hotelero",
    ],
  },
  {
    id: "9",
    title: "Pabellón de Parque Urbano",
    location: "La Plata, Argentina",
    category: "Espacios Públicos",
    year: "2023",
    client: "Municipalidad de La Plata",
    architect: "Estudio Ciudad Nueva",
    description:
      "El Pabellón de Parque Urbano de La Plata es una estructura liviana y permeaable diseñada para activar el espacio público. Su cubierta metálica plegada y sus pilares delgados crean un refugio abierto que invita a la permanencia sin interrumpir las visuales del parque, convirtiéndose en punto de encuentro para la comunidad.",
    mainImage: "/images/parque-urbano.jpeg",
    images: [
      "/images/parque-urbano.jpeg",
      "/images/parque-urbano.jpeg",
      "/images/parque-urbano.jpeg",
      "/images/parque-urbano.jpeg",
    ],
    services: [
      "Fotografía arquitectónica exterior",
      "Fotografía de espacio público y usuarios",
      "Fotografía de detalles estructurales",
      "Fotografía de integración con el entorno",
      "Imágenes para publicaciones de arquitectura pública",
    ],
  },
  {
    id: "10",
    title: "Refugio de Montaña",
    location: "San Martín de los Andes, Argentina",
    category: "Residencial",
    year: "2021",
    client: "Privado",
    architect: "Estudio Cordillera",
    description:
      "Este refugio de montaña en San Martín de los Andes combina la tradición constructiva de la región con una sensibilidad contemporánea. La madera y la piedra son los materiales protagonistas, mientras que grandes ventanales orientados al lago permiten disfrutar del paisaje patagónico desde el interior con máximo confort térmico.",
    mainImage: "/images/refugio-montana.jpeg",
    images: [
      "/images/refugio-montana.jpeg",
      "/images/refugio-montana.jpeg",
      "/images/refugio-montana.jpeg",
      "/images/refugio-montana.jpeg",
    ],
    services: [
      "Fotografía arquitectónica exterior e interior",
      "Fotografía de integración con el paisaje natural",
      "Fotografía de detalles en madera y piedra",
      "Fotografía en distintas condiciones climáticas",
      "Imágenes para publicaciones de arquitectura residencial",
    ],
  },
  {
    id: "11",
    title: "Sede Corporativa",
    location: "Buenos Aires, Argentina",
    category: "Comercial",
    year: "2022",
    client: "Corporación Río de la Plata",
    architect: "Estudio Metrópolis BA",
    description:
      "La sede corporativa de este grupo empresarial en el microcentro porteño redefine la imagen institucional a través de una arquitectura de vidrio y acero que transmite transparencia y modernidad. Los espacios de trabajo abiertos y flexibles favorecen la colaboración, mientras la terraza jardín en el último piso ofrece un oasis verde en el corazón de la ciudad.",
    mainImage: "/images/sede-corporativa.jpeg",
    images: [
      "/images/sede-corporativa.jpeg",
      "/images/sede-corporativa.jpeg",
      "/images/sede-corporativa.jpeg",
      "/images/sede-corporativa.jpeg",
    ],
    services: [
      "Fotografía arquitectónica exterior e interior",
      "Fotografía de espacios de trabajo",
      "Fotografía de detalles corporativos",
      "Fotografía de áreas comunes y amenidades",
      "Imágenes para comunicación institucional",
    ],
  },
  {
    id: "12",
    title: "Biblioteca Pública",
    location: "Tucumán, Argentina",
    category: "Espacios Públicos",
    year: "2023",
    client: "Gobierno de Tucumán",
    architect: "Estudio Norte Grande",
    description:
      "La nueva Biblioteca Pública de Tucumán es un edificio cívico que apuesta por la arquitectura como herramienta de inclusión social. Sus espacios de lectura con doble altura, iluminados cenitalmente, crean ambientes propicios para el estudio y la concentración, mientras la fachada permeable invita a toda la comunidad a hacer uso de sus instalaciones.",
    mainImage: "/images/biblioteca-publica.jpeg",
    images: [
      "/images/biblioteca-publica.jpeg",
      "/images/biblioteca-publica.jpeg",
      "/images/biblioteca-publica.jpeg",
      "/images/biblioteca-publica.jpeg",
    ],
    services: [
      "Fotografía arquitectónica exterior e interior",
      "Fotografía de espacios de lectura",
      "Fotografía de detalles de iluminación natural",
      "Fotografía de usuarios y comunidad",
      "Imágenes para publicaciones de arquitectura pública",
    ],
  },
]

const relatedProjects = [
  {
    id: "5",
    title: "Renovación Histórica",
    location: "Mendoza, Argentina",
    image: "/images/renovacion-historica.jpeg",
  },
  {
    id: "7",
    title: "Museo de Arte Moderno",
    location: "Salta, Argentina",
    image: "/images/museo-arte-moderno.jpeg",
  },
  {
    id: "9",
    title: "Pabellón de Parque Urbano",
    location: "La Plata, Argentina",
    image: "/images/parque-urbano.jpeg",
  },
]

// Componente de galería personalizado para el proyecto "Casas Atrapadas"
function CasasAtrapadasGallery({ images, alt, mainImage }: { images: string[]; alt: string; mainImage?: string }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  // Combinar la imagen principal con las demás imágenes para el lightbox
  const allImages = mainImage ? [mainImage, ...images] : images

  const openLightbox = (index: number) => {
    // Si hay una imagen principal, ajustamos el índice para el array combinado
    const adjustedIndex = mainImage ? index + 1 : index
    setSelectedIndex(adjustedIndex)
    setIsOpen(true)
    document.body.style.overflow = "hidden"
  }

  // Función para abrir el lightbox con la imagen principal
  const openMainImage = () => {
    setSelectedIndex(0)
    setIsOpen(true)
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = () => {
    setIsOpen(false)
    document.body.style.overflow = "auto"
  }

  const navigateToImage = (index: number) => {
    if (index < 0) {
      setSelectedIndex(allImages.length - 1)
    } else if (index >= allImages.length) {
      setSelectedIndex(0)
    } else {
      setSelectedIndex(index)
    }
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isOpen) return

    switch (e.key) {
      case "ArrowLeft":
        navigateToImage(selectedIndex! - 1)
        break
      case "ArrowRight":
        navigateToImage(selectedIndex! + 1)
        break
      case "Escape":
        closeLightbox()
        break
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, selectedIndex])

  // Exponer la función openMainImage al componente padre
  useEffect(() => {
    const galleryElement = document.querySelector("[data-gallery-component]")
    if (galleryElement) {
      ;(galleryElement as any).openMainImage = openMainImage
    }
  }, [])

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2" data-gallery-component>
        {images.map((image, index) => (
          <div
            key={index}
            className="aspect-[3/4] relative rounded-lg overflow-hidden cursor-pointer"
            onClick={() => openLightbox(index)}
          >
            <Image
              src={image || "/placeholder.svg?height=800&width=1200"}
              alt={`${alt} - Imagen ${index + 1}`}
              fill
              className="object-contain object-bottom transition-transform duration-300 hover:scale-105"
            />
          </div>
        ))}
      </div>

      {isOpen && selectedIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Botón cerrar */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              aria-label="Cerrar"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Imagen actual */}
            <div className="relative w-full h-full max-w-7xl max-h-[90vh] flex items-center justify-center p-4">
              <div className="relative w-full h-full">
                <Image
                  src={allImages[selectedIndex] || "/placeholder.svg?height=800&width=1200"}
                  alt={`${alt} - Imagen ${selectedIndex + 1}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 90vw"
                  priority
                />
              </div>
            </div>

            {/* Navegación */}
            <button
              onClick={() => navigateToImage(selectedIndex - 1)}
              className="absolute left-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              aria-label="Imagen anterior"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>

            <button
              onClick={() => navigateToImage(selectedIndex + 1)}
              className="absolute right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              aria-label="Imagen siguiente"
            >
              <ChevronRight className="h-8 w-8" />
            </button>

            {/* Contador de imágenes */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {selectedIndex + 1} / {allImages.length}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

