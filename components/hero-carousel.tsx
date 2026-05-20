"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface SlideProject {
  id: string
  title: string
  mainImage: string
  carouselImage?: string
  category: string
  location: string
  crop?: string
}

export function HeroCarousel({ projects }: { projects: SlideProject[] }) {
  const [current, setCurrent] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const total = projects.length
  const DURATION = 6000

  const stop = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const start = useCallback(() => {
    stop()
    timerRef.current = setInterval(() => setCurrent((c) => (c + 1) % total), DURATION)
  }, [stop, total])

  useEffect(() => {
    start()
    return stop
  }, [start, stop])

  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    el.addEventListener("mouseenter", stop)
    el.addEventListener("mouseleave", start)
    return () => {
      el.removeEventListener("mouseenter", stop)
      el.removeEventListener("mouseleave", start)
    }
  }, [start, stop])

  const goTo = useCallback(
    (n: number) => {
      setCurrent(((n % total) + total) % total)
      stop()
      timerRef.current = setInterval(() => setCurrent((c) => (c + 1) % total), DURATION)
    },
    [total, stop],
  )

  const cropClass = (crop?: string) =>
    crop === "top" ? "object-top" : crop === "bottom" ? "object-bottom" : "object-center"

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div
        ref={heroRef}
        className="relative overflow-hidden bg-[#0a0a0a] mx-auto"
        style={{ maxWidth: 1280, height: "50vh", minHeight: 420, maxHeight: 620 }}
        aria-label="Proyectos destacados — carrusel"
      >
        {projects.map((p, i) => {
          const isActive = i === current
          return (
            <article
              key={p.id}
              className={cn(
                "absolute inset-0 transition-opacity duration-[900ms] ease-in-out",
                isActive ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
              )}
            >
              {/* Clickable image link */}
              <Link
                href={`/projects/${p.id}`}
                className="absolute inset-0 z-[1] block"
                aria-label={`Ver proyecto ${p.title}`}
              >
                <Image
                  src={p.carouselImage ?? p.mainImage}
                  alt={p.title}
                  fill
                  className={cn("object-cover", cropClass(p.crop), "hc-img")}
                  style={isActive ? { animationPlayState: "running" } : undefined}
                  priority={i === 0}
                  loading={i === 0 ? "eager" : undefined}
                />
              </Link>

              {/* Gradient overlay */}
              <div
                className="absolute inset-0 z-[1] pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg,rgba(0,0,0,0) 40%,rgba(0,0,0,.5) 100%),linear-gradient(90deg,rgba(0,0,0,.5) 0%,rgba(0,0,0,.05) 50%,rgba(0,0,0,0) 100%)",
                }}
              />

              {/* Eyebrow */}
              <div
                className="absolute inset-x-0 bottom-0 z-[2] pointer-events-none text-white"
                style={{ padding: "2rem 0 2.25rem" }}
              >
                <div className="container">
                  <div className="hc-eyebrow">
                    <span>{p.category}</span>
                    <span className="hc-eyebrow-dot" />
                    <span>{p.location}</span>
                  </div>
                </div>
              </div>
            </article>
          )
        })}

        {/* Controls: dots + prev/next */}
        <div className="hc-controls">
          <div className="hc-dots">
            {projects.map((_, i) => (
              <button
                key={i}
                className={`hc-dot${i === current ? " active" : ""}`}
                onClick={() => goTo(i)}
                aria-label={`Slide ${i + 1}`}
              >
                <span className="fill" />
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button className="hc-btn" onClick={() => goTo(current - 1)} aria-label="Anterior">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="hc-btn" onClick={() => goTo(current + 1)} aria-label="Siguiente">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
