# Handoff: Home page redesign

## Overview

Rediseño de la home page de `nicogiraldez.com.ar` (portfolio de fotografía de arquitectura). Reduce el peso del hero, lo convierte en carrusel minimal de proyectos destacados, mueve el subtítulo "Fotografía de Arquitectura" al header, y unifica el ancho y ritmo vertical de todas las secciones.

## About the design files

`Home Redesign v3 - Option A.html` es una **referencia visual en HTML/CSS plano**. No está pensado para copiarse tal cual al repo: la tarea es **recrear este diseño dentro del codebase existente** (`arqphoto/`, que es Next.js 15 + Tailwind v4 + shadcn/ui + `lucide-react`), respetando los patrones del repo (Server Components, `next/image`, `next/link`, `buttonVariants`, etc.).

Los datos (proyectos destacados, "Sobre mí", etc.) ya viven en `data/projects.json`, `data/destacados.json` y `data/site.json` — el rediseño no cambia el modelo de datos, solo la presentación.

## Fidelity

**Hifi.** El HTML define exactamente los valores finales: tokens shadcn (`hsl(var(--background))`, `hsl(var(--muted))`, etc.), tipografía Inter, spacing en `rem`, breakpoints sm/md/lg estándar de Tailwind. Replicar pixel-perfecto.

## Files

- `Home Redesign v3 - Option A.html` — diseño completo de la home

## Target file in the codebase

- `arqphoto/app/page.tsx` — único archivo de página a modificar
- Reutilizar `MobileNav`, `buttonVariants`, `cn`, los íconos de `lucide-react` y los datos JSON ya existentes

## Screens / Views

### 1. Header (sticky)

- `sticky top-0 z-50`, fondo `hsl(var(--background) / 0.85)` con `backdrop-filter: saturate(180%) blur(8px)`
- Sin `border-bottom` directo en el `<header>`. El border vive dentro del contenedor (`.header-inner`), así no cruza todo el viewport — coincide con el ancho del resto del contenido.
- Altura: `76px`
- **Marca (izquierda)**:
  - Cuadrado `36×36px` con `border: 1px solid hsl(var(--border))`, `border-radius: 8px`, ícono `Camera` de lucide (20×20)
  - A la derecha del ícono, dos líneas:
    - "Nico Giraldez" — 17px, weight 600, letter-spacing -0.01em
    - "FOTOGRAFÍA DE ARQUITECTURA" — 12px, weight 500, uppercase, letter-spacing 0.08em, color `hsl(var(--muted-foreground))`, margin-top 2px
- **Nav (derecha)** (oculta debajo de md): Proyectos / Sobre mí / Contacto. 14px, weight 500. Hover: `underline underline-offset-4`. Mantener `MobileNav` para mobile.

### 2. Hero — Carrusel minimal

- Contenedor exterior `.hero-wrap` con padding horizontal `1rem` (mobile) → `1.5rem` (sm) → `2rem` (lg)
- El hero en sí: `max-width: 1280px; margin: 0 auto; height: 50vh; min-height: 420px; max-height: 620px; background: #0a0a0a; overflow: hidden`
- **Sin border-radius en la imagen** (look editorial)
- **Slides**:
  - `position: absolute; inset: 0; opacity: 0; transition: opacity 900ms ease`
  - El slide activo lleva `.active` → `opacity: 1`
  - Cada slide es un `<article>` que contiene:
    1. `<a class="slide-link">` que cubre toda la imagen y linkea a `/projects/{id}` — esto hace que toda la foto sea clickeable
    2. Una `<img>` que ocupa todo el slide (`object-fit: cover`)
    3. Un overlay `.slide-content` con el eyebrow (pointer-events: none para no bloquear el click)
  - Pseudo-element `::after` con doble gradient para legibilidad del eyebrow:
    - Vertical: `linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.5) 100%)`
    - Horizontal: `linear-gradient(90deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0) 100%)`
  - El gradient también lleva `pointer-events: none`
- **Ken Burns animation** en el slide activo: `transform: scale(1.04) → scale(1.12)` durante 12s, `ease-out`. Pausada en slides inactivos.
- **Contenido del slide** (bottom-left, dentro de `.container`):
  - Solo el eyebrow: `"Residencial · Caballito, Buenos Aires"`
  - Estilo: 12px, weight 600, uppercase, letter-spacing 0.16em, color `rgba(255,255,255,0.95)`
  - Separador `•`: círculo de 4×4px, `rgba(255,255,255,0.7)`, margin via gap 0.5rem
- **Controles** (bottom-right, dentro del hero):
  - Cluster `.hero-controls` con `right: 2rem; bottom: 2rem` (3rem/2.25rem en lg), `display: flex; align-items: center; gap: 1rem`
  - Orden visual: `[dots] [prev] [next]`
  - **Dots**: 3 botones rectangulares 28×3px, `border-radius: 2px`, background `rgba(255,255,255,0.35)`. El activo tiene un fill blanco que se llena en 6s con animation `progress 6s linear forwards`.
  - **Prev/Next**: círculos 40×40, `border: 1px solid rgba(255,255,255,0.4)`, background `rgba(0,0,0,0.25)`, `backdrop-filter: blur(6px)`. Íconos `ChevronLeft/Right` de lucide (16×16).

### 3. Proyectos destacados

- Padding vertical: `5rem` arriba, `2.5rem` abajo
- Contenedor `.container`: `width: 100%; max-width: calc(1280px + 4rem); margin: 0 auto; padding: 0 1rem` (sm: 1.5rem, lg: 2rem). **Importante**: el padding queda fuera del cap de 1280, así el contenido siempre es exactamente 1280px y alinea con el hero.
- **Section header**: solo `<h2>Proyectos destacados</h2>`, 26-32px (clamp), weight 600, letter-spacing -0.02em. Sin texto descriptivo debajo.
- Grid: `display: grid; gap: 1.5rem; grid-template-columns: repeat(1, 1fr)` → sm `repeat(2, 1fr)` → lg `repeat(3, 1fr)`
- **Cards**: sin borde, sin shadow. Estructura:
  - `.thumb` con `aspect-ratio: 4/3`, overflow hidden, fondo `hsl(var(--muted))`. La `<img>` con `object-fit: cover` y `transition: transform 500ms ease`. Hover: `transform: scale(1.04)`.
  - `.meta` con `padding: 1rem 0 0.5rem` (sólo vertical, así el texto alinea exactamente con la foto y con el hero):
    - `<h3>` 17px weight 600 — nombre del proyecto
    - `<p>` 14px color `hsl(var(--muted-foreground))` — ubicación
  - Card entera con `transition: transform 200ms ease`. Hover: `transform: translateY(-2px)`.
- **CTA "Ver todos los proyectos"**: centrado, `margin-top: 3rem`. Estilo outline (1px border, white bg, hover muted). Ícono ArrowRight 14×14.

### 4. Sobre mí

- Padding: `2.5rem 0` (top+bottom igual, para ritmo armónico)
- Dentro del `.container`, una **banda contenida** `.about-band`:
  - `background: hsl(var(--muted))`
  - `border: 1px solid hsl(var(--border))`
  - `border-radius: 0.5rem`
  - Padding: `2.5rem 1.75rem` (md: `3rem 2.5rem`, lg: `4rem 3.5rem`)
- **Grid interno**: `grid-template-columns: minmax(0, 1fr) minmax(0, 2fr)` (foto 1/3, texto 2/3) en md+, una columna debajo. Gap 3.5rem en md+.
- **Foto** (`/images/nico-giraldez.jpeg`):
  - `aspect-ratio: 4/5` (retrato), `max-width: 280px` (md: 320px)
  - **Sin border-radius**
  - `object-fit: cover`
- **Texto**:
  - `<h2>Sobre mí</h2>` 26-32px weight 600
  - 3 párrafos, 16px, line-height 1.6, `text-wrap: pretty`. Usar los párrafos definitivos del cliente (en `data/site.json` están como lorem ipsum actualmente). Si todavía no se tienen, dejar los del HTML como placeholder.
  - Pie: ícono `MapPin` 14×14 + "Buenos Aires, Argentina", 14px, color muted

### 5. Trabajemos juntos

- Padding: `2.5rem 0`
- Centrado, `max-width: 640px` para el bloque
- `<h2>Trabajemos juntos</h2>` 26-32px
- `<p>Contactame para hablar sobre tu proyecto.</p>` 17px color muted
- Dos botones en fila (`flex gap: 0.75rem; justify-content: center; flex-wrap: wrap`):
  - **Primary**: `mailto:contacto@nicogiraldez.com.ar`, fondo primary, ícono Mail. Texto: el mail mismo.
  - **Outline**: link a `/contact`, "Formulario de contacto", ícono ArrowRight

### 6. Footer

- Padding: `2.5rem 0 2rem`
- `border-top` **no en el `<footer>`** sino en el contenedor `.foot` interno → el border termina donde termina el contenido (igual que el header).
- `.foot`: flex column en mobile, flex row en md+, justify between, gap 1rem
- Izquierda: ícono Camera 18×18 + "Nico Giraldez Fotografía" (weight 600)
- Centro: copyright año actual + texto del campo `copyright` en `site.json` (14px muted)
- Derecha: nav con socials de `site.social` (14px weight 500, hover underline)

## Spacing / vertical rhythm

Todas las secciones tienen ~80px (5rem) de transición visual entre sus contenidos:

| Boundary | Valor |
|---|---|
| Hero → Proyectos destacados | 80px (5rem padding-top de `section.work`) |
| Cards → Sobre mí | 80px (2.5rem + 2.5rem) |
| Sobre mí → Trabajemos juntos | 80px |
| Trabajemos juntos → Footer | ~80px |

Mantener este ritmo: cada `<section>` después del hero usa `padding: 2.5rem 0`, excepto `section.work` que usa `5rem 0 2.5rem` para abrir respiro contra el hero.

## Interactions & Behavior

### Carrusel
- **Auto-rotate**: cada 6 segundos avanza al siguiente slide
- **Transición**: opacity crossfade de 900ms
- **Pausa en hover** sobre el hero (mouseenter pausa, mouseleave reanuda)
- **Reinicio del timer** cuando el usuario interactúa con prev/next/dots (no acumula)
- **Click en cualquier parte de la imagen del slide activo** → navega a `/projects/{id}`. Los botones prev/next y dots no triggerean el link gracias al z-index y `pointer-events`.
- **Dots clickeables**: salta a ese slide
- **Loop infinito**: prev en slide 0 → último; next en último → 0

### Header
- Mantener el blur sticky existente
- En mobile, conservar `MobileNav` actual

## State management

Solo el carrusel necesita estado client-side. Crear un componente cliente `<HeroCarousel>` (con `"use client"`) que reciba como prop el array de proyectos destacados ya filtrado en el Server Component padre.

Estado interno mínimo:
- `currentIndex` (número del slide activo)
- `intervalRef` para el timer de auto-rotate

Helpers:
- `goTo(n)`, `next()`, `prev()`, `restart()`, `stop()`, `start()`
- `useEffect` para registrar/limpiar el interval y los event listeners de hover en el hero

El resto de la home es Server Component que lee `projects.json`, `destacados.json` y `site.json` con `readSite()`/data helpers, igual que la versión actual.

## Design Tokens

Reutilizar los tokens shadcn que ya están en `globals.css` — no agregar nuevos:

| Token | Uso |
|---|---|
| `hsl(var(--background))` | Fondo body, header |
| `hsl(var(--foreground))` | Texto principal |
| `hsl(var(--muted))` | Fondo de `.about-band` y `.thumb` |
| `hsl(var(--muted-foreground))` | Texto secundario, ubicaciones, tagline del logo |
| `hsl(var(--border))` | Border del logo mark, about-band, header-inner, foot |
| `hsl(var(--primary))` | Botón primary (mailto) |
| `hsl(var(--primary-foreground))` | Texto del botón primary |

### Spacing scale
- Section vertical padding: `5rem` (work top) / `2.5rem` (resto)
- Container horizontal: `1rem` → `1.5rem` (sm) → `2rem` (lg)
- Grid gap (cards): `1.5rem`
- Gap interno controles hero: `1rem`

### Typography
- Familia: `Inter` (ya cargada en `layout.tsx`)
- H2 sección: `clamp(1.625rem, 2.5vw, 2rem)`, weight 600, letter-spacing -0.02em
- Card title H3: `1.0625rem`, weight 600, letter-spacing -0.01em
- Eyebrow hero: `0.75rem`, weight 600, uppercase, letter-spacing 0.16em
- Brand name header: `1.0625rem`, weight 600
- Brand tagline: `0.75rem`, weight 500, uppercase, letter-spacing 0.08em
- Body about: `1rem`, line-height 1.6, `text-wrap: pretty`

### Radii
- Logo mark: `8px`
- Botones (slide-cta, btn-outline, btn-primary): `8px`
- About-band: `0.5rem` (var --radius)
- Hero, fotos, cards: **sin radius**
- Dots del carrusel: `2px`
- Prev/next buttons: 50% (círculo)

### Animations
- Ken Burns: `scale(1.04) → scale(1.12)` durante 12s, `ease-out`, solo en slide activo
- Slide crossfade: `opacity` 900ms ease
- Dot progress fill: `width 0 → 100%` durante 6s, `linear`
- Card hover: `transform: translateY(-2px)` 200ms ease, `.thumb img scale(1.04)` 500ms ease

## Assets

Imágenes que usa el diseño (ya existen en `public/images/`):
- `bonifacio-cocina-general.jpg` — slide 1 + card 1 (Bonifacio)
- `cocina-minimalista.png` — slide 2 + card 2 (Arenales)
- `quirno-1.jpeg` — slide 3 + card 3 (Quirno)
- `nico-giraldez.jpeg` — foto de "Sobre mí"

Iconos (`lucide-react`, ya en deps):
- `Camera` — header + footer
- `ChevronLeft` / `ChevronRight` — prev/next carrusel
- `MapPin` — ubicación en "Sobre mí"
- `Mail` — botón de contacto
- `ArrowRight` — CTAs "Ver todos los proyectos" / "Formulario de contacto"

## Responsive behavior

- **Mobile (default)**: header con `MobileNav`, hero 50vh / min 420px, grid de cards a 1 columna, about-grid a 1 columna (foto arriba), footer en columna
- **sm (≥640px)**: cards a 2 columnas, padding horizontal a 1.5rem
- **md (≥768px)**: nav desktop visible, about-grid a 2 columnas (foto 1fr / texto 2fr), footer en row
- **lg (≥1024px)**: cards a 3 columnas, padding horizontal a 2rem, hero controls a `right: 3rem; bottom: 2.25rem`

## Notas finales

- El carrusel debe armarse a partir de los IDs en `data/destacados.json` (filtrar `projects.json` por esos IDs). Hoy son `["1","2","4"]` — el diseño asume 3 slides pero debe funcionar con N.
- El eyebrow de cada slide se compone como `{project.category} · {project.location}`.
- Si un proyecto tiene `crop: "top"/"bottom"`, respetarlo en `object-position` de la `<img>` del slide (igual que las cards de la versión actual).
- No incluir el campo `title` del proyecto en el slide (decisión de diseño: el hero es minimal y solo muestra categoría + ubicación; el nombre vive en el card debajo).
