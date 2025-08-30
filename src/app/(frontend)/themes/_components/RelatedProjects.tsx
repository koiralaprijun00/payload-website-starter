'use client'

import React, { useState, useEffect } from 'react'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'
import type { Project, Category } from '@/payload-types'

interface RelatedProjectsProps {
  programmeCategory: string | Category | null
  heading?: string
  limit?: number
}

export default function RelatedProjects({
  programmeCategory,
  heading = 'Our Projects',
  limit = 6,
}: RelatedProjectsProps) {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      if (!programmeCategory) {
        setLoading(false)
        return
      }

      try {
        const categoryId =
          typeof programmeCategory === 'string' ? programmeCategory : programmeCategory.id

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/projects?where[categories][in]=${categoryId}&limit=${limit}&sort=-createdAt`,
          { next: { revalidate: 300 } },
        )

        if (response.ok) {
          const data = await response.json()
          setProjects(data.docs || [])
        }
      } catch (error) {
        console.error('Error fetching related projects:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [programmeCategory, limit])

  if (!programmeCategory || loading) {
    return loading ? (
      <div className="container mx-auto py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-200 h-80 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    ) : null
  }

  if (projects.length === 0) {
    return null
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-mainBlue mb-4">{heading}</h2>
          <div className="w-24 h-1 bg-mainOrange mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => {
            // Get the first category for display
            const firstCategory = Array.isArray(project.categories)
              ? project.categories[0]
              : project.categories

            const categoryTitle =
              typeof firstCategory === 'string' ? firstCategory : firstCategory?.title || ''

            return (
              <article
                key={project.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group"
              >
                {project.image && typeof project.image === 'object' && (
                  <div className="aspect-[16/9] relative overflow-hidden">
                    <Media
                      resource={project.image}
                      fill
                      imgClassName="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-mainBlue bg-blue-50 px-2 py-1 rounded">
                        {categoryTitle}
                      </span>
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded ${
                          project.status === 'ongoing'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {project.status === 'ongoing' ? 'Ongoing' : 'Completed'}
                      </span>
                    </div>
                    {project.year && (
                      <span className="text-xs text-gray-500 font-medium">{project.year}</span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-mainBlue mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    <CMSLink
                      url={`/projects/${project.slug || project.id}`}
                      label={project.title}
                      className="hover:underline"
                    />
                  </h3>

                  <p className="text-gray-700 line-clamp-3 mb-4 leading-relaxed">
                    {project.summary}
                  </p>

                  {project.area && (
                    <div className="mb-4">
                      <span className="text-sm text-gray-600">
                        <strong>Area:</strong> {project.area}
                      </span>
                    </div>
                  )}

                  <CMSLink
                    url={`/projects/${project.slug || project.id}`}
                    label="Learn More"
                    className="inline-flex items-center text-mainOrange font-semibold hover:text-orange-600 transition-colors"
                  >
                    Learn More
                    <svg
                      className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </CMSLink>
                </div>
              </article>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <CMSLink
            url="/projects"
            label="View All Projects"
            className="inline-block px-8 py-3 border-2 border-mainOrange text-mainOrange font-semibold hover:bg-mainOrange hover:text-white transition-colors duration-300 rounded-lg"
          />
        </div>
      </div>
    </section>
  )
}
