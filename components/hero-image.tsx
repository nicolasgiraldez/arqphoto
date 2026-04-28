"use client"

import Image from "next/image"

interface HeroImageProps {
  src: string
  alt: string
  fallbackSrc?: string
  className?: string
  priority?: boolean
}

export function HeroImage({
  src,
  alt,
  fallbackSrc = "/placeholder.svg?height=1080&width=1920",
  className = "object-cover",
  priority = false,
}: HeroImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      className={className}
      onError={(e) => {
        e.currentTarget.src = fallbackSrc
      }}
    />
  )
}
