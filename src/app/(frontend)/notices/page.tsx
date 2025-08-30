'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'

const categoryConfig: Record<string, { label: string; color: string }> = {
  biodiversity: { label: 'Biodiversity', color: 'bg-emerald-500' },
  livelihood: { label: 'Livelihood', color: 'bg-blue-500' },
  'climate-change': { label: 'Climate Change', color: 'bg-purple-500' },
  'capacity-building': { label: 'Capacity Building', color: 'bg-amber-500' },
  // Fallback for legacy categories
  ecosystem: { label: 'Ecosystem', color: 'bg-emerald-500' },
  species: { label: 'Species', color: 'bg-blue-500' },
  community: { label: 'Community', color: 'bg-purple-500' },
  policy: { label: 'Policy', color: 'bg-amber-500' },
}

function getYear(dateString?: string) {
  if (!dateString) return ''
  return new Date(dateString).getFullYear().toString()
}

export default function NoticesPage() {
  const [notices, setNotices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchNotices() {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/notices?limit=100&sort=-publishedAt`,
        { cache: 'no-store' },
      )
      const json = await res.json()
      setNotices(json?.docs || [])
      setLoading(false)
    }
    fetchNotices()
  }, [])

  // Extract unique categories from notices
  const categories: string[] = Array.from(
    new Set(
      notices.flatMap((n: any) => {
        if (!n.categories) return []
        return Array.isArray(n.categories)
          ? n.categories.map((cat: any) => (typeof cat === 'string' ? cat : cat.slug || cat.id))
          : [typeof n.categories === 'string' ? n.categories : n.categories.slug || n.categories.id]
      }),
    ),
  )

  const years = Array.from(new Set(notices.map((n: any) => getYear(n.publishedAt)))).filter(
    Boolean,
  ) as string[]

  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedYear, setSelectedYear] = useState<string>('all')

  const filteredNotices: any[] = notices.filter((notice: any) => {
    const noticeCategories = notice.categories
      ? Array.isArray(notice.categories)
        ? notice.categories.map((cat: any) => (typeof cat === 'string' ? cat : cat.slug || cat.id))
        : [
            typeof notice.categories === 'string'
              ? notice.categories
              : notice.categories.slug || notice.categories.id,
          ]
      : []

    const matchCategory = selectedCategory === 'all' || noticeCategories.includes(selectedCategory)
    const matchYear = selectedYear === 'all' || getYear(notice.publishedAt) === selectedYear
    return matchCategory && matchYear
  })

  return (
    <div className="container mx-auto py-8 lg:py-12">
      <h1 className="mb-8 text-4xl font-bold text-mainBlue">Notices</h1>
      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8 items-center">
        {/* Category filter */}
        <div className="flex gap-2 flex-wrap">
          <button
            className={`px-4 py-2 border font-semibold transition ${selectedCategory === 'all' ? 'bg-mainBlue text-white' : 'bg-white text-mainBlue border-mainBlue hover:bg-blue-50'}`}
            onClick={() => setSelectedCategory('all')}
          >
            All Categories
          </button>
          {categories.map((cat: string) => (
            <button
              key={cat}
              className={`px-4 py-2 border font-semibold transition ${selectedCategory === cat ? (categoryConfig[cat]?.color || 'bg-gray-500') + ' text-white' : 'bg-white text-mainBlue border-mainBlue hover:bg-blue-50'}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {categoryConfig[cat]?.label || cat}
            </button>
          ))}
        </div>
        {/* Year filter */}
        <div className="flex gap-2 flex-wrap ml-auto">
          <button
            className={`px-4 py-2 border font-semibold transition ${selectedYear === 'all' ? 'bg-mainBlue text-white' : 'bg-white text-mainBlue border-mainBlue hover:bg-blue-50'}`}
            onClick={() => setSelectedYear('all')}
          >
            All Years
          </button>
          {years.map((year: string) => (
            <button
              key={year}
              className={`px-4 py-2 border font-semibold transition ${selectedYear === year ? 'bg-mainOrange text-white' : 'bg-white text-mainBlue border-mainBlue hover:bg-orange-50'}`}
              onClick={() => setSelectedYear(year)}
            >
              {year}
            </button>
          ))}
        </div>
      </div>
      {/* Notice cards */}
      {loading ? (
        <div className="text-center text-gray-500 py-12 text-lg">Loading...</div>
      ) : (
        <ul className="flex flex-col gap-8">
          {filteredNotices.length === 0 && (
            <li className="col-span-full text-center text-gray-500 py-12 text-lg">
              No notices found.
            </li>
          )}
          {filteredNotices.map((notice: any) => {
            // Get the first category for display
            const firstCategory = notice.categories
              ? Array.isArray(notice.categories)
                ? notice.categories[0]
                : notice.categories
              : null

            const categorySlug = firstCategory
              ? typeof firstCategory === 'string'
                ? firstCategory
                : firstCategory.slug || firstCategory.id
              : ''

            const categoryTitle = firstCategory
              ? typeof firstCategory === 'string'
                ? firstCategory
                : firstCategory.title || categorySlug
              : ''

            const config = categoryConfig[categorySlug] || {
              label: categoryTitle,
              color: 'bg-gray-400',
            }
            return (
              <li
                key={notice.id}
                className="flex flex-col md:flex-row-reverse bg-white shadow-md hover:shadow-lg transition-shadow border border-gray-100 overflow-hidden"
              >
                {notice.image && typeof notice.image === 'object' && (
                  <div className="w-full md:w-60 h-56 md:h-auto relative bg-gray-100 border-l md:border-b-0 border-b md:border-l overflow-hidden flex-shrink-0">
                    <Media resource={notice.image} fill imgClassName="object-cover" />
                  </div>
                )}
                <div className="flex-1 flex flex-col p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className={`text-xs font-bold uppercase px-3 py-1 ${config.color} text-white`}
                    >
                      {config.label}
                    </span>
                    {notice.publishedAt && (
                      <span className="text-xs text-gray-500 font-semibold ml-2">
                        {new Date(notice.publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl font-bold text-mainBlue mb-2 line-clamp-2">
                    <CMSLink url={`/notices/${notice.slug || notice.id}`} label={notice.title} />
                  </h2>
                  <p className="text-gray-700 line-clamp-3 mb-4">{notice.summary}</p>
                  <div className="mt-auto">
                    <CMSLink
                      url={`/notices/${notice.slug || notice.id}`}
                      label="Read More"
                      className="inline-block px-5 py-2 border border-mainOrange text-mainOrange font-semibold hover:bg-mainOrange hover:text-white transition"
                    />
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
