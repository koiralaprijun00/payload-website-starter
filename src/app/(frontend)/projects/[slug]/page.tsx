import type { Metadata } from 'next'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import Hero from '@/app/(frontend)/themes/_components/Hero'
import PageClient from '@/app/(frontend)/posts/[slug]/page.client'
import RichText from '@/components/RichText'
import Link from 'next/link'
import { ArrowLeft, Calendar, MapPin, Activity, Tag } from 'lucide-react'
import Image from 'next/image'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import ProjectOverview from '@/components/ProjectOverview'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const projects = await payload.find({
    collection: 'projects',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = projects.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function ProjectPage({ params: paramsPromise }: Args) {
  const { slug = '' } = await paramsPromise
  const url = '/projects/' + slug
  const project = await queryProjectBySlug({ slug })

  if (!project) return <PayloadRedirects url={url} />

  // Fetch related projects (same themes or area)
  const relatedProjects = await getRelatedProjects(project)

  return (
    <article className="min-h-screen">
      <PageClient />
      <PayloadRedirects disableNotFound url={url} />

      {/* Hero Section with Overlapping Project Overview */}
      <div className="relative">
        {/* Hero Section */}
        {typeof project.image === 'object' && project.image && (
          <div className="relative h-[70vh] lg:h-[80vh]">
            <Hero title={project.title} image={project.image} />
          </div>
        )}

        {/* Project Overview Section - Overlapping */}
        {project.projectOverview && (
          <div className="relative -mt-32 lg:-mt-40 z-10">
            <ProjectOverview data={project.projectOverview} />
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Breadcrumb Navigation */}
        <div className="mb-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-mainBlue hover:underline font-medium"
          >
            <ArrowLeft size={16} />
            Back to Projects
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content Column */}
          <div className="lg:col-span-2">
            {/* Project Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{project.title}</h1>

              {/* Project Themes */}
              {Array.isArray(project.themes) && project.themes.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.themes.map((themeRef, idx) => {
                    if (typeof themeRef === 'object' && themeRef !== null && 'title' in themeRef) {
                      return (
                        <span
                          key={themeRef.id || idx}
                          className="inline-flex items-center gap-2 bg-blue-100 text-mainBlue px-3 py-1 rounded-full text-sm font-semibold"
                        >
                          <Tag size={14} />
                          {themeRef.title}
                        </span>
                      )
                    }
                    return null
                  })}
                </div>
              )}

              <p className="text-xl text-gray-700 leading-relaxed">{project.summary}</p>
            </div>

            {/* Project Content */}
            {project.body && (
              <div className="prose prose-lg max-w-none mb-12">
                <RichText data={project.body} />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6 sticky top-8">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Project Details</h3>

              <div className="space-y-4">
                {/* Project Area */}
                <div className="flex items-center gap-3">
                  <MapPin size={20} className="text-mainBlue flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-gray-500">Location</div>
                    <div className="text-gray-900">{project.area}</div>
                  </div>
                </div>

                {/* Project Year */}
                <div className="flex items-center gap-3">
                  <Calendar size={20} className="text-mainBlue flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-gray-500">Year</div>
                    <div className="text-gray-900">{project.year}</div>
                  </div>
                </div>

                {/* Project Status */}
                <div className="flex items-center gap-3">
                  <Activity size={20} className="text-mainBlue flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-gray-500">Status</div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-block w-2 h-2 rounded-full ${
                          project.status === 'ongoing' ? 'bg-green-500' : 'bg-blue-500'
                        }`}
                      />
                      <span className="text-gray-900 capitalize">{project.status}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Projects Section */}
        {relatedProjects.length > 0 && (
          <div className="mt-16 pt-16 border-t border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProjects.slice(0, 3).map((relatedProject) => (
                <Link
                  key={relatedProject.id}
                  href={`/projects/${relatedProject.slug}`}
                  className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  {typeof relatedProject.image === 'object' && relatedProject.image && (
                    <div className="relative w-full h-48 overflow-hidden">
                      <Image
                        src={getMediaUrl(relatedProject.image.url)}
                        alt={relatedProject.image.alt || relatedProject.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-mainBlue transition-colors">
                      {relatedProject.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-3">
                      {relatedProject.summary}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{relatedProject.area}</span>
                      <span>{relatedProject.year}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center bg-mainBlue text-white rounded-lg p-8">
          <h3 className="text-2xl font-bold mb-4">Interested in Our Work?</h3>
          <p className="text-blue-100 mb-6">
            Learn more about our projects and how you can get involved in conservation efforts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/projects"
              className="bg-white text-mainBlue px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              View All Projects
            </Link>
            <Link
              href="/about-us"
              className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-mainBlue transition-colors"
            >
              About Our Mission
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const project = await queryProjectBySlug({ slug })
  return {
    title: project?.title || 'Project',
    description: project?.summary || '',
  }
}

const queryProjectBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'projects',
    draft,
    depth: 3, // Increased depth to populate relationships including projectOverview
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })
  return result.docs?.[0] || null
})

// Function to get related projects
const getRelatedProjects = cache(
  async (project: { id: string; themes?: unknown[]; area?: string }) => {
    const payload = await getPayload({ config: configPromise })

    // Get projects with same themes or area
    const themeIds = Array.isArray(project.themes)
      ? project.themes.map((theme: unknown) =>
          typeof theme === 'object' && theme !== null && 'id' in theme
            ? (theme as { id: string }).id
            : theme,
        )
      : []

    const result = await payload.find({
      collection: 'projects',
      depth: 2,
      limit: 6,
      pagination: false,
      where: {
        and: [
          {
            id: {
              not_equals: project.id,
            },
          },
          {
            or: [
              ...(themeIds.length > 0
                ? [
                    {
                      themes: {
                        in: themeIds,
                      },
                    },
                  ]
                : []),
              {
                area: {
                  equals: project.area,
                },
              },
            ],
          },
        ],
      },
    })

    return result.docs || []
  },
)
