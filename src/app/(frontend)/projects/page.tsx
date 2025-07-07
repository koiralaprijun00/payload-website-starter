import React from 'react'
import { Project, ThemePage } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import Image from 'next/image'
import { RenderBlocks } from '@/blocks/RenderBlocks'

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
  area = [],
  year = [],
  status = [],
}: {
  search?: string
  themes?: string[]
  area?: string[]
  year?: (string | number)[]
  status?: string[]
}): Promise<Project[]> {
  const params = new URLSearchParams()
  if (search) params.append('where[title][contains]', search)
  if (themes.length) params.append('where[themes][in]', themes.join(','))
  if (area.length) params.append('where[area][in]', area.join(','))
  if (year.length) params.append('where[year][in]', year.join(','))
  if (status.length) params.append('where[status][in]', status.join(','))
  params.append('depth', '2')
  const baseUrl = process.env.NEXT_PUBLIC_PAYLOAD_URL
  if (!baseUrl) throw new Error('NEXT_PUBLIC_PAYLOAD_URL is not set')
  const url = `${baseUrl}/api/projects?${params.toString()}`
  const req = await fetch(url, { cache: 'no-store' })
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

async function fetchProjectsPageSettings() {
  const baseUrl = process.env.NEXT_PUBLIC_PAYLOAD_URL
  if (!baseUrl) throw new Error('NEXT_PUBLIC_PAYLOAD_URL is not set')
  const req = await fetch(`${baseUrl}/api/globals/projects-page-settings`, {
    cache: 'no-store',
  })
  if (!req.ok) return null
  return await req.json()
}

export default async function ProjectsPage({
  searchParams: searchParamsPromise,
}: {
  searchParams: Promise<ProjectSearchParams>
}) {
  const settings = await fetchProjectsPageSettings()
  const searchParams = await searchParamsPromise
  const parseMulti = (val?: string | string[]) => {
    if (!val) return []
    if (Array.isArray(val)) return val.filter(Boolean)
    return val.split(',').filter(Boolean)
  }
  const selectedThemes = parseMulti(searchParams.themes)
  const selectedAreas = parseMulti(searchParams.area)
  const selectedYears = parseMulti(searchParams.year)
  const selectedStatus = parseMulti(searchParams.status)
  const [themes, projects] = await Promise.all([
    fetchThemes(),
    fetchProjects({
      search: searchParams?.search || '',
      themes: selectedThemes,
      area: selectedAreas,
      year: selectedYears,
      status: selectedStatus,
    }),
  ])

  return (
    <>
      {settings?.hero && <RenderBlocks blocks={settings.hero} />}
      <div className="flex gap-12 max-w-7xl mx-auto py-12">
        {/* Sidebar Filters */}
        <aside className="w-72 shrink-0">
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
                      defaultChecked={selectedThemes.includes(theme.id)}
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
                      type="checkbox"
                      name="area"
                      value={area}
                      defaultChecked={selectedAreas.includes(area)}
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
          </form>
        </aside>
        {/* Project List */}
        <main className="flex-1 space-y-16">
          {projects.length === 0 && <div>No projects found.</div>}
          {projects.map((project) => {
            return (
              <div
                key={project.id}
                className="flex gap-8 items-start border-b pb-12 last:border-b-0"
              >
                {typeof project.image !== 'string' && project.image && (
                  <Image
                    src={getMediaUrl(project.image.url)}
                    alt={project.image.alt || project.title}
                    width={350}
                    height={550}
                    className="rounded shadow-lg object-cover"
                    style={{ width: '350px', height: '400px' }}
                  />
                )}
                <div className="flex-1">
                  {Array.isArray(project.themes) && project.themes.length > 0 && (
                    <div className="mb-2 flex flex-wrap gap-2 items-center">
                      {project.themes.map((themeRef, idx) => {
                        if (
                          typeof themeRef === 'object' &&
                          themeRef !== null &&
                          'title' in themeRef
                        ) {
                          return (
                            <span
                              key={themeRef.id || idx}
                              className="flex items-center gap-2 uppercase text-sm font-bold text-mainBlue"
                            >
                              <span className="h-2 w-2 rounded-full bg-orange-500 inline-block" />
                              {themeRef.title}
                            </span>
                          )
                        }
                        const themeObj = themes.find((t) => t.id === themeRef)
                        return (
                          <span
                            key={themeRef}
                            className="flex items-center gap-2 uppercase text-sm font-bold text-mainBlue"
                          >
                            <span className="h-3 w-3 rounded-full bg-orange-500 inline-block" />
                            {themeObj?.title}
                          </span>
                        )
                      })}
                    </div>
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
    </>
  )
}
