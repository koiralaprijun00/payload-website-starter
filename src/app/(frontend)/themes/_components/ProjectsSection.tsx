import React from 'react'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import Image from 'next/image'
import { Project } from '@/payload-types'
import Link from 'next/link'

type Props = {
  themeId: string
}

async function fetchProjects(themeId: string): Promise<Project[]> {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/projects?where[themes][equals]=${themeId}&depth=1`,
    { cache: 'no-store' },
  )
  if (!req.ok) return []
  const { docs } = await req.json()
  return docs
}

const ProjectsSection = async ({ themeId }: Props) => {
  const projects = await fetchProjects(themeId)
  if (!projects.length) return null

  return (
    <section className="py-16">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Projects</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project) => {
            if (typeof project.image === 'string') return null
            const imageUrl = getMediaUrl(project.image.url)
            const url = project.slug ? `/projects/${project.slug}` : null
            return (
              <div key={project.id} className="text-left">
                {url ? (
                  <Link href={url} className="group block">
                    <Image
                      src={imageUrl}
                      alt={project.image.alt || project.title}
                      className="w-full h-auto mb-4 transition-transform group-hover:scale-105"
                      width={300}
                      height={300}
                    />
                    <p className="font-bold text-lg mb-2 group-hover:text-orange-500 transition-colors text-left">
                      {project.title}
                    </p>
                  </Link>
                ) : (
                  <>
                    <Image
                      src={imageUrl}
                      alt={project.image.alt || project.title}
                      className="w-full h-auto mb-4"
                      width={300}
                      height={300}
                    />
                    <p className="font-bold text-lg mb-2 text-left">{project.title}</p>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection
