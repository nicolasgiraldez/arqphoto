import { readFile, writeFile, readdir, unlink, mkdir } from 'fs/promises'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'data')
const IMAGES_DIR = path.join(process.cwd(), 'public', 'images')

export interface Project {
  id: string
  title: string
  location: string
  category: string
  year: string
  client: string
  architect?: string
  description: string
  mainImage: string
  carouselImage?: string
  images: string[]
  related: string[]
  services: string[]
  portrait?: boolean
  crop?: 'top' | 'center' | 'bottom'
}

export interface SocialLink {
  label: string
  url: string
}

export interface SiteData {
  maintenanceMode?: boolean
  about: {
    name: string
    role: string
    photo: string
    location: string
    locationNote?: string
    bio: string[]
  }
  contact: {
    email: string
    phone: string
    location: string
    locationNote?: string
    photo: string
    availability?: string
    instagram?: string
  }
  hero: {
    image: string
    alt: string
    title: string
    subtitle: string
  }
  copyright: string
  social: SocialLink[]
}

export async function readProjects(): Promise<Project[]> {
  const raw = await readFile(path.join(DATA_DIR, 'projects.json'), 'utf-8')
  return JSON.parse(raw)
}

export async function writeProjects(data: Project[]): Promise<void> {
  await writeFile(path.join(DATA_DIR, 'projects.json'), JSON.stringify(data, null, 2))
}

export async function readSite(): Promise<SiteData> {
  const raw = await readFile(path.join(DATA_DIR, 'site.json'), 'utf-8')
  return JSON.parse(raw)
}

export async function writeSite(data: SiteData): Promise<void> {
  await writeFile(path.join(DATA_DIR, 'site.json'), JSON.stringify(data, null, 2))
}

export async function readDestacados(): Promise<string[]> {
  const raw = await readFile(path.join(DATA_DIR, 'destacados.json'), 'utf-8')
  return JSON.parse(raw)
}

export async function writeDestacados(data: string[]): Promise<void> {
  await writeFile(path.join(DATA_DIR, 'destacados.json'), JSON.stringify(data, null, 2))
}

export function generateNextId(projects: Project[]): string {
  const numericIds = projects
    .map(p => parseInt(p.id, 10))
    .filter(n => !isNaN(n))
  if (numericIds.length === 0) return '1'
  return String(Math.max(...numericIds) + 1)
}

export interface ImageInfo {
  filename: string
  url: string
  folder?: string
}

export async function listImages(): Promise<ImageInfo[]> {
  const result: ImageInfo[] = []
  async function scan(dir: string, folder?: string) {
    const entries = await readdir(dir, { withFileTypes: true })
    for (const e of entries) {
      if (e.isDirectory()) {
        await scan(path.join(dir, e.name), e.name)
      } else if (/\.(jpe?g|png|gif|webp|avif|svg)$/i.test(e.name)) {
        result.push({
          filename: e.name,
          url: folder ? `/images/${folder}/${e.name}` : `/images/${e.name}`,
          folder,
        })
      }
    }
  }
  await scan(IMAGES_DIR)
  return result
}

export async function saveImage(file: File, folder?: string): Promise<ImageInfo> {
  if (!file.type.startsWith('image/')) throw new Error('Archivo no es una imagen')
  if (file.size > 10 * 1024 * 1024) throw new Error('Imagen supera 10MB')

  const sanitized = file.name
    .replace(/\s+/g, '-')
    .replace(/[^a-zA-Z0-9.\-_]/g, '')
    .replace(/\.\.+/g, '.')
    .toLowerCase()

  if (!sanitized || sanitized.includes('/')) throw new Error('Nombre de archivo inválido')

  const safeFolder = folder?.replace(/[^a-z0-9\-_]/g, '') || undefined
  const dir = safeFolder ? path.join(IMAGES_DIR, safeFolder) : IMAGES_DIR
  await mkdir(dir, { recursive: true })

  const buffer = Buffer.from(await file.arrayBuffer())
  await writeFile(path.join(dir, sanitized), buffer)

  const url = safeFolder ? `/images/${safeFolder}/${sanitized}` : `/images/${sanitized}`
  return { filename: sanitized, url, folder: safeFolder }
}

export async function deleteImage(filePath: string): Promise<void> {
  const normalized = path.normalize(filePath).replace(/\\/g, '/')
  if (normalized.includes('..') || normalized.startsWith('/')) throw new Error('Nombre inválido')
  const dest = path.join(IMAGES_DIR, normalized)
  if (!dest.startsWith(IMAGES_DIR + path.sep)) throw new Error('Nombre inválido')
  await unlink(dest)
}
