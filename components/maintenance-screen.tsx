interface Props {
  name: string
  email: string
  phone: string
  instagram?: string
}

export function MaintenanceScreen({ name, email, phone, instagram }: Props) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-background">
      <div className="max-w-md w-full text-center space-y-10">
        <div className="space-y-2">
          <h1 className="text-3xl font-light tracking-widest uppercase">{name}</h1>
          <p className="text-sm text-muted-foreground tracking-wider uppercase">
            Fotografía de Arquitectura
          </p>
        </div>

        <div className="border-t border-border" />

        <div className="space-y-2">
          <p className="text-lg font-light">Sitio en construcción</p>
          <p className="text-sm text-muted-foreground">
            Estamos preparando algo nuevo. Volvé pronto.
          </p>
        </div>

        <div className="space-y-2 text-sm text-muted-foreground">
          <p>
            <a href={`mailto:${email}`} className="hover:text-foreground transition-colors">
              {email}
            </a>
          </p>
          {phone && (
            <p>
              <a href={`tel:${phone.replace(/\s/g, '')}`} className="hover:text-foreground transition-colors">
                {phone}
              </a>
            </p>
          )}
          {instagram && instagram !== '#' && (
            <p>
              <a href={instagram} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                Instagram
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
