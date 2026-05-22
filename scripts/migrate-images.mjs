import { readFile, writeFile, mkdir, rename, readdir } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import { existsSync } from 'fs'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const IMAGES = path.join(ROOT, 'public', 'images')

const PROJECT_FOLDERS = {
  'bonifacio': [
    'bonifacio-cocina-hornos.jpg', 'bonifacio-cocina-general.jpg',
    'bonifacio-cocina-mesada.jpg', 'bonifacio-cocina-vertical.jpg',
    'bonifacio-cocina-detalle.jpg', 'bonifacio-cocina-tazas.jpg',
    'bonifacio-cocina-anafe.jpg', 'bonifacio-cocina-bacha.jpg',
    'bonifacio-cocina-isla.jpg', 'bonifacio-cocina-barra.jpg',
    'bonifacio-cocina-banquetas.jpg', 'bonifacio-cocina-panoramica.jpg',
    'bonifacio-lavadero.jpg', 'bonifacio-living.jpg',
    'bonifacio-comedor-cuadro.jpg', 'bonifacio-comedor-mesa.jpg',
    'bonifacio-cuarto-mesa.jpg', 'bonifacio-cuarto-puerta.jpg',
    'bonifacio-cuarto-cocinita.jpg', 'bonifacio-cuarto-conejos.jpg',
    'bonifacio-cuarto-juguetes.jpg', 'bonifacio-dormitorio-respaldo.jpg',
    'bonifacio-dormitorio-principal.jpg', 'bonifacio-vestidor.jpg',
    'bonifacio-toilette-negro.jpg', 'bonifacio-bano-colorido.jpg',
    'bonifacio-bano-detalle.jpg', 'bonifacio-bano-lavatorio.jpg',
    'bonifacio-bano-vertical.jpg',
  ],
  'arenales': [
    'cocina-minimalista.png', 'cocina-detalle.png',
    'cocina-vista-completa.png', 'cocina-fregadero.png',
    'refrigerador.png', 'vinoteca.png', 'bano-principal.png',
    'bano-doble-lavabo.png', 'bano-ducha.png',
  ],
  'casas-atrapadas': [
    'casas-atrapadas-1.jpeg', 'casas-atrapadas-2.jpeg',
    'casas-atrapadas-3.jpeg', 'casas-atrapadas-4.jpeg',
    'casas-atrapadas-5.jpeg', 'casas-atrapadas-6.jpeg',
    'casas-atrapadas-7.jpeg',
  ],
  'quirno': [
    'quirno-2.jpeg', 'quirno-3.jpeg', 'quirno-4.jpeg', 'quirno-5.jpeg',
    'quirno-6.jpeg', 'quirno-7.jpeg', 'quirno-8.jpeg', 'quirno-9.jpeg',
  ],
  'pasaje-palermo': [
    'palermo-pasaje-living.png', 'palermo-pasaje-cocina.png',
    'palermo-pasaje-bano.png',
  ],
  'hotel-san-telmo': [
    'hotel-san-telmo-lobby.png', 'hotel-san-telmo-suite.png',
    'hotel-san-telmo-terraza.png',
  ],
  'oficinas-puerto-madero': [
    'oficinas-puerto-madero-workspace.png',
    'oficinas-puerto-madero-sala.png',
    'oficinas-puerto-madero-lounge.png',
  ],
  'biblioteca-parque-patricios': [
    'biblioteca-parque-patricios-sala.png',
    'biblioteca-parque-patricios-patio.png',
    'biblioteca-parque-patricios-escalera.png',
  ],
  'viviendas-escobar': [
    'viviendas-escobar-exterior.png',
    'viviendas-escobar-aerea.png',
    'viviendas-escobar-amenity.png',
  ],
  'site': [
    'nico-giraldez.jpeg', 'buenos-aires.jpg',
  ],
}

// Build oldUrl → newUrl mapping
const urlMap = new Map()
for (const [folder, files] of Object.entries(PROJECT_FOLDERS)) {
  for (const filename of files) {
    urlMap.set(`/images/${filename}`, `/images/${folder}/${filename}`)
  }
}

// Also map fotografo-locacion.jpeg (referenced but missing file)
urlMap.set('/images/fotografo-locacion.jpeg', '/images/site/fotografo-locacion.jpeg')

async function main() {
  // Create all target directories
  const allFolders = [...Object.keys(PROJECT_FOLDERS), '_unref']
  for (const folder of allFolders) {
    await mkdir(path.join(IMAGES, folder), { recursive: true })
  }

  // Move known files
  let moved = 0
  let missing = 0
  for (const [folder, files] of Object.entries(PROJECT_FOLDERS)) {
    for (const filename of files) {
      const src = path.join(IMAGES, filename)
      const dest = path.join(IMAGES, folder, filename)
      if (existsSync(src)) {
        await rename(src, dest)
        moved++
        console.log(`✓ ${filename} → ${folder}/`)
      } else {
        missing++
        console.log(`⚠ missing: ${filename}`)
      }
    }
  }

  // Move remaining root files (not subfolders) to _unref/
  const remaining = await readdir(IMAGES)
  let unrefCount = 0
  for (const entry of remaining) {
    const fullPath = path.join(IMAGES, entry)
    const isDir = (await readdir(fullPath).catch(() => null)) !== null
    if (isDir) continue
    if (/\.(jpe?g|png|gif|webp|avif|svg)$/i.test(entry)) {
      await rename(fullPath, path.join(IMAGES, '_unref', entry))
      console.log(`→ _unref/${entry}`)
      unrefCount++
    }
  }

  // Update projects.json
  const projectsPath = path.join(ROOT, 'data', 'projects.json')
  let projectsJson = await readFile(projectsPath, 'utf-8')
  for (const [oldUrl, newUrl] of urlMap) {
    projectsJson = projectsJson.replaceAll(oldUrl, newUrl)
  }
  await writeFile(projectsPath, projectsJson)
  console.log('\n✓ data/projects.json updated')

  // Update site.json
  const sitePath = path.join(ROOT, 'data', 'site.json')
  let siteJson = await readFile(sitePath, 'utf-8')
  for (const [oldUrl, newUrl] of urlMap) {
    siteJson = siteJson.replaceAll(oldUrl, newUrl)
  }
  await writeFile(sitePath, siteJson)
  console.log('✓ data/site.json updated')

  console.log(`\nDone. Moved: ${moved}, Missing: ${missing}, Unreferenced→_unref: ${unrefCount}`)
}

main().catch(err => { console.error(err); process.exit(1) })
