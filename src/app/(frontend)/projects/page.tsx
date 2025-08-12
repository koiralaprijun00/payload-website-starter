/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Project, Category } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import Image from 'next/image'
import Link from 'next/link'
import ProjectsHero from '@/components/ProjectsHero'
import { ChevronDown } from 'lucide-react'

const YEARS = [2025, 2024, 2023, 2022, 2021, 2020, 2019]
const STATUS = [
  { label: 'Ongoing', value: 'ongoing' },
  { label: 'Completed', value: 'completed' },
]

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
  const params = new URLSearchParams()
  if (search) params.append('where[title][contains]', search)
  if (categories.length) params.append('where[categories][in]', categories.join(','))
  if (area.length) params.append('where[area][in]', area.join(','))
  if (year.length) params.append('where[year][in]', year.join(','))
  if (status.length) params.append('where[status][in]', status.join(','))
  params.append('depth', '2')
  const baseUrl = process.env.NEXT_PUBLIC_PAYLOAD_URL
  if (!baseUrl) throw new Error('NEXT_PUBLIC_PAYLOAD_URL is not set')
  const url = `${baseUrl}/api/projects?${params.toString()}`
  const req = await fetch(url, { next: { revalidate: 86400 } })
  if (!req.ok) return []
  const { docs } = await req.json()
  return docs
}

async function fetchCategories(): Promise<Category[]> {
  const req = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/categories`, {
    next: { revalidate: 86400 },
  })
  if (!req.ok) return []
  const { docs } = await req.json()
  return docs
}

async function fetchProjectsPageSettings() {
  const baseUrl = process.env.NEXT_PUBLIC_PAYLOAD_URL
  if (!baseUrl) throw new Error('NEXT_PUBLIC_PAYLOAD_URL is not set')
  const req = await fetch(`${baseUrl}/api/globals/projects-page-settings`, {
    next: { revalidate: 86400 },
  })
  if (!req.ok) return null
  return await req.json()
}

export default async function ProjectsPage({
  searchParams: searchParamsPromise,
}: {
  searchParams: Promise<ProjectSearchParams>
}) {
  const _settings = await fetchProjectsPageSettings()
  const searchParams = await searchParamsPromise
  const parseMulti = (val?: string | string[]) => {
    if (!val) return []
    if (Array.isArray(val)) return val.filter(Boolean)
    return val.split(',').filter(Boolean)
  }
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
      <div className="flex flex-col md:flex-row gap-8 md:gap-12 max-w-7xl mx-auto py-8 md:py-12 px-4">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-72 shrink-0 mb-8 md:mb-0">
          <div className="mb-8">
            <div className="text-lg font-bold text-mainBlue mb-1">
              Browse and read the latest projects
            </div>
            <h1 className="text-4xl font-extrabold text-mainBlue">All our Projects</h1>
          </div>
          <form className="space-y-8" method="GET">
            <input
              type="text"
              name="search"
              placeholder="Search projects"
              defaultValue={searchParams?.search || ''}
              className="w-full border border-gray-300 rounded px-4 py-2 mb-4"
            />

            {/* Mobile accordion to show/hide all filters */}
            <details className="block md:hidden mb-6">
              <summary className="bg-mainBlue text-white py-2 px-4 rounded font-bold flex items-center justify-between cursor-pointer select-none">
                <span>Filter Options</span>
                <ChevronDown className="w-4 h-4" />
              </summary>
              <div className="mt-4 space-y-8">
                {/* Filter groups */}
                <div>
                  <div className="font-bold mb-2">Projects</div>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <label key={category.id}>
                        <input
                          type="checkbox"
                          name="categories"
                          value={category.id}
                          defaultChecked={selectedCategories.includes(category.id)}
                          className="mr-1"
                        />
                        {category.title}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="font-bold mb-2">Project Area</div>
                  <input
                    type="text"
                    name="area"
                    placeholder="e.g., Bardiya, Kathmandu"
                    defaultValue={selectedAreas.join(',')}
                    className="w-full border border-gray-300 rounded px-4 py-2"
                  />
                  <p className="text-xs text-gray-500 mt-1">Use commas for multiple areas</p>
                </div>
                <div>
                  <div className="font-bold mb-2">Year</div>
                  <div className="flex flex-wrap gap-2">
                    {YEARS.map((year) => (
                      <label key={year}>
                        <input
                          type="checkbox"
                          name="year"
                          value={year}
                          defaultChecked={selectedYears.includes(String(year))}
                          className="mr-1"
                        />
                        {year}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="font-bold mb-2">Project status</div>
                  <div className="flex gap-2">
                    {STATUS.map((s) => (
                      <label key={s.value}>
                        <input
                          type="checkbox"
                          name="status"
                          value={s.value}
                          defaultChecked={selectedStatus.includes(s.value)}
                          className="mr-1"
                        />
                        {s.label}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Apply button inside accordion on mobile */}
                <button
                  type="submit"
                  className="w-full bg-mainBlue text-white py-2 rounded font-bold"
                >
                  Apply Filters
                </button>
              </div>
            </details>

            {/* Desktop filter groups */}
            <div className="hidden md:block space-y-8">
              <div>
                <div className="font-bold mb-2">Categories</div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <label key={category.id}>
                      <input
                        type="checkbox"
                        name="categories"
                        value={category.id}
                        defaultChecked={selectedCategories.includes(category.id)}
                        className="mr-1"
                      />
                      {category.title}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <div className="font-bold mb-2">Project Area</div>
                <input
                  type="text"
                  name="area"
                  placeholder="e.g., Bardiya, Kathmandu"
                  defaultValue={selectedAreas.join(',')}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                />
                <p className="text-xs text-gray-500 mt-1">Use commas for multiple areas</p>
              </div>
              <div>
                <div className="font-bold mb-2">Year</div>
                <div className="flex flex-wrap gap-2">
                  {YEARS.map((year) => (
                    <label key={year}>
                      <input
                        type="checkbox"
                        name="year"
                        value={year}
                        defaultChecked={selectedYears.includes(String(year))}
                        className="mr-1"
                      />
                      {year}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <div className="font-bold mb-2">Project status</div>
                <div className="flex gap-2">
                  {STATUS.map((s) => (
                    <label key={s.value}>
                      <input
                        type="checkbox"
                        name="status"
                        value={s.value}
                        defaultChecked={selectedStatus.includes(s.value)}
                        className="mr-1"
                      />
                      {s.label}
                    </label>
                  ))}
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-mainBlue text-white py-2 rounded mt-4 font-bold"
              >
                Apply Filters
              </button>
            </div>
          </form>
        </aside>
        {/* Project List */}
        <main className="flex-1 space-y-12 md:space-y-16">
          {projects.length === 0 && <div>No projects found.</div>}
          {projects.map((project) => {
            const href = `/projects/${project.slug}`
            return (
              <Link
                href={href}
                key={project.id}
                className="group flex flex-col md:flex-row gap-4 md:gap-8 items-start border-b pb-12 last:border-b-0 focus:outline-none focus:ring-2 focus:ring-mainOrange"
              >
                {typeof project.image !== 'string' && project.image && (
                  <Image
                    src={getMediaUrl(project.image.url)}
                    alt={project.image.alt || project.title}
                    width={350}
                    height={400}
                    className="rounded shadow-lg object-cover w-full md:w-[350px] h-64 md:h-[400px]"
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
                                className="flex items-center gap-2 uppercase text-sm font-bold text-mainBlue"
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
                              className="flex items-center gap-2 uppercase text-sm font-bold text-mainBlue"
                            >
                              <span className="h-3 w-3 rounded-full bg-orange-500 inline-block" />
                              {categoryObj?.title}
                            </span>
                          )
                        })}
                      </div>
                    )}
                  <h2 className="text-2xl font-extrabold text-mainBlue mb-2 group-hover:underline">
                    {project.title}
                  </h2>
                  <p className="mb-4 text-gray-700">{project.summary}</p>
                  <div className="text-mainBlue font-bold flex items-center gap-2">
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
