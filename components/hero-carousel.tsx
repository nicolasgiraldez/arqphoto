"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
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

            </article>
          )
        })}

        {/* Dots — centered */}
        <div className="hc-dots-bar">
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

        {/* Prev */}
        <button className="hc-btn hc-btn-prev" onClick={() => goTo(current - 1)} aria-label="Anterior">
          <svg width="29" height="45" viewBox="0 0 36 56" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="30,4 6,28 30,52" />
          </svg>
        </button>

        {/* Next */}
        <button className="hc-btn hc-btn-next" onClick={() => goTo(current + 1)} aria-label="Siguiente">
          <svg width="29" height="45" viewBox="0 0 36 56" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6,4 30,28 6,52" />
          </svg>
        </button>
      </div>
    </div>
  )
}
