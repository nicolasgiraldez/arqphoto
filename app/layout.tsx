export const dynamic = 'force-dynamic'

import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { headers } from "next/headers"
import "./globals.css"
import { readSite } from "@/lib/data"
import { MaintenanceScreen } from "@/components/maintenance-screen"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Nico Giraldez - Fotografía Arquitectónica",
  description: "Portfolio de fotografía arquitectónica de Nico Giraldez",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headersList = await headers()
  const pathname = headersList.get('x-pathname') ?? ''
  const isAdminRoute = pathname.startsWith('/admin')

  const site = await readSite()
  const isMaintenanceMode = site.maintenanceMode === true

  const instagram = site.social.find(s => s.label.toLowerCase() === 'instagram')?.url

  return (
    <html lang="es">
      <body className={inter.className}>
        {isMaintenanceMode && !isAdminRoute ? (
          <MaintenanceScreen
            name={site.about.name}
            email={site.contact.email}
            phone={site.contact.phone}
            instagram={instagram}
          />
        ) : (
          <div className="mx-auto max-w-screen-2xl">{children}</div>
        )}
      </body>
    </html>
  )
}
