'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { ImageGallery, type ImageGalleryHandle } from '@/components/image-gallery'

interface Props {
  mainImage: string
  images: string[]
  alt: string
  portrait: boolean
  description?: string
}

export function ProjectImageViewer({ mainImage, images, alt, portrait, description }: Props) {
  const galleryRef = useRef<ImageGalleryHandle>(null)

  return (
    <>
      <div
        className="aspect-[3/2] relative overflow-hidden mb-8 cursor-pointer"
        onClick={() => galleryRef.current?.open(0)}
      >
        <Image
          src={mainImage || '/placeholder.svg?height=1080&width=1920'}
          alt={alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 66vw"
          className={`transition-transform duration-300 ${portrait ? 'object-contain object-bottom hover:scale-105' : 'object-cover hover:scale-105'}`}
        />
      </div>
      {description && (
        <p style={{ margin: "1.75rem 0", fontSize: "1rem", lineHeight: 1.7 }}>{description}</p>
      )}
      <ImageGallery ref={galleryRef} images={images} alt={alt} mainImage={mainImage} portrait={portrait} />
    </>
  )
}
