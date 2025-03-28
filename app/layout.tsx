import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Nico Giraldez - Fotografía Arquitectónica",
  description: "Portfolio de fotografía arquitectónica de Nico Giraldez",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <div className="mx-auto max-w-screen-2xl">{children}</div>
      </body>
    </html>
  )
}

