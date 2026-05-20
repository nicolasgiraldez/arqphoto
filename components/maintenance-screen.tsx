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
        <div className="flex items-center justify-center" style={{ gap: "0.75rem" }}>
          {/* Brand mark */}
          <span aria-hidden="true" style={{ width: 48, height: 44, flexShrink: 0, display: "block" }}>
            <svg viewBox="0 0 220 200" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", display: "block" }}>
              <rect width="220" height="200" fill="#0f172a" />
              <path d="M 147.4 0 A 195 195 0 0 1 147.4 200" fill="none" stroke="#ffffff" strokeWidth="14" strokeLinecap="butt" />
              <path d="M 0 67.7 A 38 38 0 0 1 0 132.3" fill="none" stroke="#ffffff" strokeWidth="14" strokeLinecap="butt" />
              <line x1="188" y1="100" x2="220" y2="100" stroke="#ffffff" strokeWidth="16" strokeLinecap="butt" />
              <text x="92.5" y="124" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="86" letterSpacing="-2" fill="#ffffff">Ng</text>
            </svg>
          </span>
          {/* Wordmark */}
          <svg width="132" height="44" viewBox="0 0 92 30" xmlns="http://www.w3.org/2000/svg" role="img" aria-label={`${name} Fotografía`}>
            <text x="0" y="13" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="14" letterSpacing="-0.35" textLength="92" lengthAdjust="spacing" fill="#0f172a">{name}</text>
            <text x="0" y="27" fontFamily="Inter, sans-serif" fontWeight="500" fontSize="11" letterSpacing="0" textLength="92" lengthAdjust="spacing" fill="#64748b">fotografía</text>
          </svg>
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
