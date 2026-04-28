"use client"

import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" size="icon" className="md:hidden" />}>
        <Menu className="h-5 w-5" />
        <span className="sr-only">Abrir menú</span>
      </SheetTrigger>
      <SheetContent side="right">
        <nav className="flex flex-col gap-4 mt-8">
          <Link href="#work" className="text-lg font-medium hover:underline underline-offset-4">
            Proyectos
          </Link>
          <Link href="#about" className="text-lg font-medium hover:underline underline-offset-4">
            Sobre Mí
          </Link>
          <Link href="#contact" className="text-lg font-medium hover:underline underline-offset-4">
            Contacto
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
