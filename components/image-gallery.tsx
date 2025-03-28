"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

interface ImageGalleryProps {
  images: string[]
  alt: string
  mainImage?: string
}

export function ImageGallery({ images, alt, mainImage }: ImageGalleryProps) {
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
            className="aspect-[4/3] relative rounded-lg overflow-hidden cursor-pointer"
            onClick={() => openLightbox(index)}
          >
            <Image
              src={image || "/placeholder.svg?height=800&width=1200"}
              alt={`${alt} - Imagen ${index + 1}`}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
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

