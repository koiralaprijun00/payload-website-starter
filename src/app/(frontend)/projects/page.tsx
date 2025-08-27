/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Project, Category } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import Image from 'next/image'
import Link from 'next/link'
import ProjectsHero from '@/components/ProjectsHero'
import ProjectsFilter from '@/components/ProjectsFilter'

type ProjectSearchParams = {
  search?: string
  categories?: string
  area?: string
  year?: string
  status?: string
}

async function fetchProjects({
  search = '',
  categories = [],
  area = [],
  year = [],
  status = [],
}: {
  search?: string
  categories?: string[]
  area?: string[]
  year?: (string | number)[]
  status?: string[]
}): Promise<Project[]> {
  try {
    const params = new URLSearchParams()
    if (search) params.append('where[title][contains]', search)
    if (categories.length) params.append('where[categories][in]', categories.join(','))
    if (area.length) params.append('where[area][in]', area.join(','))
    if (year.length) params.append('where[year][in]', year.join(','))
    if (status.length) params.append('where[status][in]', status.join(','))
    params.append('depth', '2')

    const baseUrl = process.env.NEXT_PUBLIC_PAYLOAD_URL
    if (!baseUrl) {
      console.warn('NEXT_PUBLIC_PAYLOAD_URL is not set, returning empty projects')
      return []
    }

    const url = `${baseUrl}/api/projects?${params.toString()}`
    const req = await fetch(url, { next: { revalidate: 86400 } })
    if (!req.ok) return []
    const { docs } = await req.json()
    return docs
  } catch (error) {
    console.warn('Failed to fetch projects during build, returning empty array:', error)
    return []
  }
}

async function fetchCategories(): Promise<Category[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_PAYLOAD_URL
    if (!baseUrl) {
      console.warn('NEXT_PUBLIC_PAYLOAD_URL is not set, returning empty categories')
      return []
    }

    const req = await fetch(`${baseUrl}/api/categories`, {
      next: { revalidate: 86400 },
    })
    if (!req.ok) return []
    const { docs } = await req.json()
    return docs
  } catch (error) {
    console.warn('Failed to fetch categories during build, returning empty array:', error)
    return []
  }
}

async function fetchProjectsPageSettings() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_PAYLOAD_URL
    if (!baseUrl) {
      console.warn('NEXT_PUBLIC_PAYLOAD_URL is not set, returning null for projects page settings')
      return null
    }

    const req = await fetch(`${baseUrl}/api/globals/projects-page-settings`, {
      next: { revalidate: 86400 },
    })
    if (!req.ok) return null
    return await req.json()
  } catch (error) {
    console.warn('Failed to fetch projects page settings during build, returning null:', error)
    return null
  }
}

export default async function ProjectsPage({
  searchParams: searchParamsPromise,
}: {
  searchParams: Promise<ProjectSearchParams>
}) {
  const _settings = await fetchProjectsPageSettings()
  const searchParams = await searchParamsPromise

  // Helper function to parse multiple values from search params
  const parseMulti = (val?: string | string[]) => {
    if (!val) return []
    if (Array.isArray(val)) return val.filter(Boolean)
    if (typeof val === 'string') {
      // Handle comma-separated values
      return val.split(',').filter(Boolean)
    }
    return []
  }

  // Parse search parameters
  const selectedCategories = parseMulti(searchParams.categories)
  const selectedAreas = parseMulti(searchParams.area)
  const selectedYears = parseMulti(searchParams.year)
  const selectedStatus = parseMulti(searchParams.status)

  const [categories, projects] = await Promise.all([
    fetchCategories(),
    fetchProjects({
      search: searchParams?.search || '',
      categories: selectedCategories,
      area: selectedAreas,
      year: selectedYears,
      status: selectedStatus,
    }),
  ])

  return (
    <>
      <ProjectsHero
        title="Our Projects"
        subtitle="Conservation & Community"
        description="Discover our impactful conservation and community development projects across Nepal, protecting wildlife and empowering local communities."
      />
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-6 xl:gap-12 max-w-6xl mx-auto py-6 sm:py-8 lg:py-8 xl:py-16 px-4 sm:px-6 lg:px-6">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 xl:w-80 shrink-0 mb-6 lg:mb-0">
          <ProjectsFilter categories={categories} />
        </aside>

        {/* Project List */}
        <main className="flex-1 space-y-6 sm:space-y-8 lg:space-y-8 xl:space-y-16">
          {projects.length === 0 && (
            <div className="text-center py-8 text-gray-500">No projects found.</div>
          )}
          {projects.map((project) => {
            const href = `/projects/${project.slug}`
            return (
              <Link
                href={href}
                key={project.id}
                className="group flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 items-start border-b pb-8 sm:pb-10 lg:pb-12 last:border-b-0 focus:outline-none focus:ring-2 focus:ring-mainOrange"
              >
                {typeof project.image !== 'string' && project.image && (
                  <Image
                    src={getMediaUrl(project.image.url)}
                    alt={project.image.alt || project.title}
                    width={350}
                    height={400}
                    className="rounded shadow-lg object-cover w-full lg:w-[350px] h-48 sm:h-56 md:h-64 lg:h-[400px]"
                  />
                )}
                <div className="flex-1">
                  {Array.isArray((project as any).categories) &&
                    (project as any).categories.length > 0 && (
                      <div className="mb-2 flex flex-wrap gap-2 items-center">
                        {(project as any).categories.map((categoryRef: any, idx: number) => {
                          if (
                            typeof categoryRef === 'object' &&
                            categoryRef !== null &&
                            'title' in categoryRef
                          ) {
                            return (
                              <span
                                key={categoryRef.id || idx}
                                className="flex items-center gap-2 uppercase text-xs sm:text-sm font-bold text-mainBlue"
                              >
                                <span className="h-2 w-2 rounded-full bg-orange-500 inline-block" />
                                {categoryRef.title}
                              </span>
                            )
                          }
                          const categoryObj = categories.find((c) => c.id === categoryRef)
                          return (
                            <span
                              key={categoryRef}
                              className="flex items-center gap-2 uppercase text-xs sm:text-sm font-bold text-mainBlue"
                            >
                              <span className="h-2 w-2 rounded-full bg-orange-500 inline-block" />
                              {categoryObj?.title}
                            </span>
                          )
                        })}
                      </div>
                    )}
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-mainBlue mb-2 group-hover:underline">
                    {project.title}
                  </h2>
                  <p className="mb-4 text-gray-700 text-sm sm:text-base lg:text-lg">
                    {project.summary}
                  </p>
                  <div className="text-mainBlue font-bold flex items-center gap-2 text-sm sm:text-base lg:text-lg">
                    <span>Learn More</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </Link>
            )
          })}
        </main>
      </div>
    </>
  )
}
