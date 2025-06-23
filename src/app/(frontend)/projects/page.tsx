import React from 'react'
import { Project, ThemePage } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import Image from 'next/image'

const AREAS = ['Bardiya', 'Surkhet', 'Salyan', 'Banke', 'Kailali', 'Dailekh', 'Kathmandu']
const YEARS = [2025, 2024, 2023, 2022, 2021, 2020, 2019]
const STATUS = [
  { label: 'Ongoing', value: 'ongoing' },
  { label: 'Completed', value: 'completed' },
]

type ProjectSearchParams = {
  search?: string
  themes?: string
  area?: string
  year?: string
  status?: string
}

async function fetchProjects({
  search = '',
  themes = [],
  area = '',
  year = '',
  status = '',
}: {
  search?: string
  themes?: string[]
  area?: string
  year?: string | number
  status?: string
}): Promise<Project[]> {
  // Build query string
  const params = new URLSearchParams()
  if (search) params.append('where[title][contains]', search)
  if (themes.length) params.append('where[themes][in]', themes.join(','))
  if (area) params.append('where[area][equals]', area)
  if (year) params.append('where[year][equals]', String(year))
  if (status) params.append('where[status][equals]', status)
  params.append('depth', '2')
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/projects?${params.toString()}`,
    { cache: 'no-store' },
  )
  if (!req.ok) return []
  const { docs } = await req.json()
  return docs
}

async function fetchThemes(): Promise<ThemePage[]> {
  const req = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/theme-pages`, {
    cache: 'no-store',
  })
  if (!req.ok) return []
  const { docs } = await req.json()
  return docs
}

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: ProjectSearchParams
}) {
  const [themes, projects] = await Promise.all([
    fetchThemes(),
    fetchProjects({
      search: searchParams?.search || '',
      themes: searchParams?.themes ? searchParams.themes.split(',') : [],
      area: searchParams?.area || '',
      year: searchParams?.year || '',
      status: searchParams?.status || '',
    }),
  ])

  return (
    <div className="flex gap-12 max-w-7xl mx-auto py-12">
      {/* Sidebar Filters */}
      <aside className="w-72 shrink-0">
        <form className="space-y-8" method="GET">
          <input
            type="text"
            name="search"
            placeholder="Search posts"
            defaultValue={searchParams?.search || ''}
            className="w-full border border-gray-300 rounded px-4 py-2 mb-4"
          />
          <div>
            <div className="font-bold mb-2">Projects</div>
            <div className="flex flex-wrap gap-2">
              {themes.map((theme) => (
                <label key={theme.id} className="">
                  <input
                    type="checkbox"
                    name="themes"
                    value={theme.id}
                    defaultChecked={searchParams?.themes?.split(',').includes(theme.id)}
                    className="mr-1"
                  />
                  {theme.title}
                </label>
              ))}
            </div>
          </div>
          <div>
            <div className="font-bold mb-2">Project Area</div>
            <div className="flex flex-wrap gap-2">
              {AREAS.map((area) => (
                <label key={area}>
                  <input
                    type="radio"
                    name="area"
                    value={area}
                    defaultChecked={searchParams?.area === area}
                    className="mr-1"
                  />
                  {area}
                </label>
              ))}
            </div>
          </div>
          <div>
            <div className="font-bold mb-2">Year</div>
            <div className="flex flex-wrap gap-2">
              {YEARS.map((year) => (
                <label key={year}>
                  <input
                    type="radio"
                    name="year"
                    value={year}
                    defaultChecked={Number(searchParams?.year) === year}
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
                    type="radio"
                    name="status"
                    value={s.value}
                    defaultChecked={searchParams?.status === s.value}
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
        </form>
      </aside>
      {/* Project List */}
      <main className="flex-1 space-y-16">
        <h1 className="text-4xl font-extrabold text-mainBlue mb-8">All our Projects</h1>
        {projects.length === 0 && <div>No projects found.</div>}
        {projects.map((project) => {
          if (typeof project.image === 'string') return null
          const theme = themes.find((t) => project.themes?.includes(t.id))
          return (
            <div key={project.id} className="flex gap-8 items-start border-b pb-12 last:border-b-0">
              <Image
                src={getMediaUrl(project.image.url)}
                alt={project.image.alt || project.title}
                width={350}
                height={250}
                className="rounded shadow-lg object-cover"
              />
              <div className="flex-1">
                {theme && (
                  <span className="uppercase text-xs font-bold text-mainBlue mb-2 inline-block">
                    {theme.title}
                  </span>
                )}
                <h2 className="text-2xl font-extrabold text-mainBlue mb-2">{project.title}</h2>
                <p className="mb-4 text-gray-700">{project.description}</p>
                <a
                  href={`/projects/${project.slug}`}
                  className="text-mainBlue font-bold flex items-center gap-2 group"
                >
                  Learn More{' '}
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>
            </div>
          )
        })}
      </main>
    </div>
  )
}
