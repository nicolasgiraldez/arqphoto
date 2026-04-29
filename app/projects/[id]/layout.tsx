import projects from '@/data/projects.json'

export function generateStaticParams() {
  return projects.map(p => ({ id: p.id }))
}

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
