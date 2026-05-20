import Link from "next/link"
import { Mail, Linkedin } from "lucide-react"
import site from "@/data/site.json"

const socialIcons: Record<string, React.ReactNode> = {
  Instagram: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  ),
  LinkedIn: <Linkedin width={18} height={18} />,
}

const iconButtonStyle = {
  width: 36,
  height: 36,
  borderRadius: "50%",
  border: "1px solid hsl(var(--muted-foreground) / 0.4)",
}

export function SiteFooter() {
  return (
    <footer style={{ padding: "2.5rem 0 2rem" }}>
      <div className="container">
        <div
          className="flex flex-col items-center gap-4 md:grid md:grid-cols-3 md:items-center"
          style={{ borderTop: "1px solid hsl(var(--border))", paddingTop: "2rem" }}
        >
          <div className="flex items-center" style={{ gap: "0.75rem" }}>
            {/* Brand mark: 35×32 */}
            <span aria-hidden="true" style={{ width: 35, height: 32, flexShrink: 0, display: "block" }}>
              <svg viewBox="0 0 220 200" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", display: "block" }}>
                <rect width="220" height="200" fill="#0f172a" />
                <path d="M 147.4 0 A 195 195 0 0 1 147.4 200" fill="none" stroke="#ffffff" strokeWidth="14" strokeLinecap="butt" />
                <path d="M 0 67.7 A 38 38 0 0 1 0 132.3" fill="none" stroke="#ffffff" strokeWidth="14" strokeLinecap="butt" />
                <line x1="188" y1="100" x2="220" y2="100" stroke="#ffffff" strokeWidth="16" strokeLinecap="butt" />
                <text x="92.5" y="124" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="86" letterSpacing="-2" fill="#ffffff">Ng</text>
              </svg>
            </span>
            {/* Wordmark: 97×32 */}
            <svg width="97" height="32" viewBox="0 0 92 30" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Nico Giraldez Fotografía">
              <text x="0" y="13" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="14" letterSpacing="-0.35" textLength="92" lengthAdjust="spacing" fill="#0f172a">Nico Giraldez</text>
              <text x="0" y="27" fontFamily="Inter, sans-serif" fontWeight="500" fontSize="11" letterSpacing="0" textLength="92" lengthAdjust="spacing" fill="#64748b">fotografía</text>
            </svg>
          </div>

          <div className="flex-1 text-center text-muted-foreground" style={{ fontSize: "0.875rem" }}>
            © {new Date().getFullYear()} {site.copyright}
          </div>

          <nav className="flex md:justify-end" style={{ gap: "0.75rem" }}>
            <a
              href={`mailto:${site.contact.email}`}
              aria-label="Email"
              className="inline-flex items-center justify-center transition-colors hover:bg-muted"
              style={iconButtonStyle}
            >
              <Mail className="h-[18px] w-[18px]" />
            </a>
            {site.social.map((s) => (
              <Link
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="inline-flex items-center justify-center transition-colors hover:bg-muted"
                style={iconButtonStyle}
              >
                {socialIcons[s.label] ?? (
                  <span style={{ fontSize: "0.75rem", fontWeight: 500 }}>{s.label}</span>
                )}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
