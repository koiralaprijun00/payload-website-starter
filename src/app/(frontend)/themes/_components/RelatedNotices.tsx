'use client'

import React, { useState, useEffect } from 'react'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'
import type { Notice, Category } from '@/payload-types'

interface RelatedNoticesProps {
  programmeCategory: string | Category | null
  heading?: string
  limit?: number
}

const categoryConfig: Record<string, { label: string; color: string }> = {
  biodiversity: { label: 'Biodiversity', color: 'bg-emerald-500' },
  livelihood: { label: 'Livelihood', color: 'bg-blue-500' },
  'climate-change': { label: 'Climate Change', color: 'bg-purple-500' },
  'capacity-building': { label: 'Capacity Building', color: 'bg-amber-500' },
  // Fallback for any other categories
  ecosystem: { label: 'Ecosystem', color: 'bg-emerald-500' },
  species: { label: 'Species', color: 'bg-blue-500' },
  community: { label: 'Community', color: 'bg-purple-500' },
  policy: { label: 'Policy', color: 'bg-amber-500' },
}

export default function RelatedNotices({
  programmeCategory,
  heading = 'Latest Notices',
  limit = 6,
}: RelatedNoticesProps) {
  const [notices, setNotices] = useState<Notice[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNotices = async () => {
      if (!programmeCategory) {
        setLoading(false)
        return
      }

      try {
        const categoryId =
          typeof programmeCategory === 'string' ? programmeCategory : programmeCategory.id

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/notices?where[categories][in]=${categoryId}&limit=${limit}&sort=-publishedAt`,
          { next: { revalidate: 300 } }, // Cache for 5 minutes
        )

        if (response.ok) {
          const data = await response.json()
          setNotices(data.docs || [])
        }
      } catch (error) {
        console.error('Error fetching related notices:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchNotices()
  }, [programmeCategory, limit])

  if (!programmeCategory || loading) {
    return loading ? (
      <div className="container mx-auto py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-200 h-64 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    ) : null
  }

  if (notices.length === 0) {
    return null
  }

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-mainBlue mb-4">{heading}</h2>
          <div className="w-24 h-1 bg-mainOrange mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {notices.map((notice) => {
            const rawCats = Array.isArray(notice.categories)
              ? notice.categories
              : notice.categories
                ? [notice.categories]
                : []
            const cats = rawCats
              .map((c: any) =>
                typeof c === 'string'
                  ? { slug: c, title: c }
                  : { slug: c?.slug || c?.id || '', title: c?.title || c?.slug || '' },
              )
              .filter((c: any) => c.slug)
            const first = cats[0]
            const config = first
              ? categoryConfig[first.slug] || { label: first.title, color: 'bg-gray-400' }
              : { label: '', color: 'bg-gray-400' }

            return (
              <article
                key={notice.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group"
              >
                {notice.image && typeof notice.image === 'object' && (
                  <div className="aspect-[16/9] relative overflow-hidden">
                    <Media
                      resource={notice.image}
                      fill
                      imgClassName="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    {cats.map((cat: any) => {
                      const cfg = categoryConfig[cat.slug] || {
                        label: cat.title,
                        color: 'bg-gray-400',
                      }
                      return (
                        <span
                          key={cat.slug}
                          className={`text-xs font-bold uppercase px-3 py-1 ${cfg.color} text-white rounded-full`}
                        >
                          {cfg.label}
                        </span>
                      )
                    })}
                    {notice.publishedAt && (
                      <span className="text-xs text-gray-500 font-medium">
                        {new Date(notice.publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-mainBlue mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    <CMSLink
                      url={`/notices/${notice.slug || notice.id}`}
                      label={notice.title}
                      className="hover:underline"
                    />
                  </h3>

                  <p className="text-gray-700 line-clamp-3 mb-4 leading-relaxed">
                    {notice.summary}
                  </p>

                  <CMSLink
                    url={`/notices/${notice.slug || notice.id}`}
                    label="Read More"
                    className="inline-flex items-center text-mainOrange font-semibold hover:text-orange-600 transition-all duration-300 hover:scale-105 hover:translate-x-1 group-hover:bg-orange-50 px-3 py-2 rounded-lg"
                  />
                </div>
              </article>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <CMSLink
            url="/notices"
            label="View All Notices"
            className="inline-block px-8 py-3 border-2 border-mainOrange text-mainOrange font-semibold hover:bg-mainOrange hover:text-white transition-all duration-300 rounded-lg hover:scale-105 hover:shadow-lg transform"
          />
        </div>
      </div>
    </section>
  )
}
