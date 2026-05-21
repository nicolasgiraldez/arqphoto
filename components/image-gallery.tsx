"use client"

import { useState, useEffect, useCallback, useImperativeHandle, forwardRef } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

interface ImageGalleryProps {
  images: string[]
  alt: string
  mainImage?: string
  portrait?: boolean
}

export interface ImageGalleryHandle {
  open: (index: number) => void
}

export const ImageGallery = forwardRef<ImageGalleryHandle, ImageGalleryProps>(
  function ImageGallery({ images, alt, mainImage, portrait = false }, ref) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
    const [isOpen, setIsOpen] = useState(false)

    const allImages = mainImage ? [mainImage, ...images] : images

    const open = useCallback((index: number) => {
      setSelectedIndex(index)
      setIsOpen(true)
    }, [])

    useImperativeHandle(ref, () => ({ open }), [open])

    const closeLightbox = useCallback(() => {
      setIsOpen(false)
    }, [])

    useEffect(() => {
      document.body.style.overflow = isOpen ? 'hidden' : ''
      return () => { document.body.style.overflow = '' }
    }, [isOpen])

    const navigateToImage = useCallback((index: number) => {
      if (index < 0) setSelectedIndex(allImages.length - 1)
      else if (index >= allImages.length) setSelectedIndex(0)
      else setSelectedIndex(index)
    }, [allImages.length])

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
      if (!isOpen) return
      switch (e.key) {
        case "ArrowLeft": navigateToImage(selectedIndex! - 1); break
        case "ArrowRight": navigateToImage(selectedIndex! + 1); break
        case "Escape": closeLightbox(); break
      }
    }, [isOpen, selectedIndex, navigateToImage, closeLightbox])

    useEffect(() => {
      window.addEventListener("keydown", handleKeyDown)
      return () => window.removeEventListener("keydown", handleKeyDown)
    }, [handleKeyDown])

    return (
      <>
        <div className="grid gap-6 md:grid-cols-2">
          {images.map((image, index) => (
            <div
              key={index}
              className={`${portrait ? "aspect-[3/4]" : "aspect-[4/3]"} relative overflow-hidden cursor-pointer`}
              onClick={() => open(mainImage ? index + 1 : index)}
            >
              <Image
                src={image || "/placeholder.svg?height=800&width=1200"}
                alt={`${alt} - Imagen ${index + 1}`}
                fill
                className={`${portrait ? "object-contain object-bottom" : "object-cover"} transition-transform duration-300 hover:scale-105`}
              />
            </div>
          ))}
        </div>

        {isOpen && selectedIndex !== null && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center" onClick={closeLightbox}>
            <div className="relative w-full h-full flex items-center justify-center">
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                aria-label="Cerrar"
              >
                <X className="h-6 w-6" />
              </button>

              <div className="relative w-full h-full max-w-7xl max-h-[90vh] flex items-center justify-center p-4" onClick={(e) => e.stopPropagation()}>
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

              <button
                onClick={(e) => { e.stopPropagation(); navigateToImage(selectedIndex - 1) }}
                className="absolute left-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                aria-label="Imagen anterior"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); navigateToImage(selectedIndex + 1) }}
                className="absolute right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                aria-label="Imagen siguiente"
              >
                <ChevronRight className="h-8 w-8" />
              </button>

              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {selectedIndex + 1} / {allImages.length}
              </div>
            </div>
          </div>
        )}
      </>
    )
  }
)
