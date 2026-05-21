"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

const links = [
  { href: "/projects", label: "Portfolio" },
  { href: "/#about", label: "Sobre mí" },
  { href: "/#contact", label: "Contacto" },
]

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [open])

  return (
    <div ref={ref} className="relative md:hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-center w-9 h-9 border border-border rounded-md hover:bg-muted transition-colors"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
      >
        {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </button>

      {open && (
        <div
          className="absolute right-0 top-[calc(100%+8px)] bg-background border border-border shadow-md z-50 min-w-[160px]"
        >
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="block px-5 py-3 text-sm font-medium hover:bg-muted transition-colors border-b border-border/40 last:border-b-0"
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
