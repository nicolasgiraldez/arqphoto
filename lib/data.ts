import { readFile, writeFile, readdir, unlink } from 'fs/promises'
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
}

export async function listImages(): Promise<ImageInfo[]> {
  const files = await readdir(IMAGES_DIR)
  return files
    .filter(f => /\.(jpe?g|png|gif|webp|avif|svg)$/i.test(f))
    .map(f => ({ filename: f, url: `/images/${f}` }))
}

export async function saveImage(file: File): Promise<ImageInfo> {
  if (!file.type.startsWith('image/')) throw new Error('Archivo no es una imagen')
  if (file.size > 10 * 1024 * 1024) throw new Error('Imagen supera 10MB')

  const sanitized = file.name
    .replace(/\s+/g, '-')
    .replace(/[^a-zA-Z0-9.\-_]/g, '')
    .replace(/\.\.+/g, '.')
    .toLowerCase()

  if (!sanitized || sanitized.includes('/')) throw new Error('Nombre de archivo inválido')

  const buffer = Buffer.from(await file.arrayBuffer())
  const dest = path.join(IMAGES_DIR, sanitized)
  await writeFile(dest, buffer)
  return { filename: sanitized, url: `/images/${sanitized}` }
}

export async function deleteImage(filename: string): Promise<void> {
  if (filename.includes('/') || filename.includes('..')) throw new Error('Nombre inválido')
  await unlink(path.join(IMAGES_DIR, filename))
}
