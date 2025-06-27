'use client'

import React, { useEffect, useState } from 'react'
import type { Page } from '@/payload-types'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'
import { getClientSideURL } from '@/utilities/getURL'
import { useHeaderTheme } from '@/providers/HeaderTheme'

interface Notice {
  id: string
  category: string
  title: string
  summary: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image?: any
  slug?: string
}

const categoryLabel: Record<string, string> = {
  ecosystem: 'Ecosystem',
  species: 'Species',
  community: 'Community',
  policy: 'Policy',
}

const categoryColors: Record<string, string> = {
  ecosystem: 'border-b-2 border-blue-400',
  species: 'border-b-2 border-blue-400',
  community: 'border-b-2 border-blue-400',
  policy: 'border-b-2 border-blue-400',
}

export const HomePageNoticeV1Hero: React.FC<Page['hero']> = ({
  media,
  title,
  buttonLink,
  buttonText,
}) => {
  const [notices, setNotices] = useState<Notice[]>([])
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme(null)
  }, [setHeaderTheme])

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await fetch(`${getClientSideURL()}/api/notices?limit=4&sort=-publishedAt`)
        const json = await res.json()
        setNotices(json?.docs || [])
      } catch (err) {
        console.error(err)
      }
    }

    fetchNotices()
  }, [])

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-blue-50/30 min-h-screen">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
          {/* Main Content Section */}
          <div className="xl:col-span-3 space-y-8">
            {media && typeof media === 'object' && (
              <div className="group relative">
                <div className="aspect-[4/3] lg:aspect-[16/10] relative overflow-hidden bg-white shadow-xl shadow-slate-900/10">
                  <Media
                    resource={media}
                    fill
                    imgClassName="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </div>
              </div>
            )}

            {title && (
              <div className="relative">
                <div className="bg-white/70 backdrop-blur-sm border border-white/20 p-2">
                  <h1 className="max-w-xl text-xl lg:text-2xl xl:text-3xl font-bold text-slate-900 leading-tight tracking-tight mb-6">
                    {title}
                  </h1>

                  {buttonLink && buttonText && (
                    <CMSLink
                      className="group inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white font-medium hover:bg-slate-800 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                      url={buttonLink}
                    >
                      {buttonText}
                      <svg
                        className="w-4 h-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </CMSLink>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Notices Sidebar */}
          <div className="xl:col-span-2 space-y-2">
            <div className="flex items-center gap-1 mb-2">
              <div className="w-3 h-3 rounded-full bg-[#F15A24]" />
              <h2 className="text-base lg:text-lg font-bold text-slate-900 tracking-tight">
                Notices
              </h2>
            </div>

            <div className="space-y-1">
              {notices.map((notice, index) => (
                <article
                  key={notice.id}
                  className="group relative bg-white/60 backdrop-blur-sm border border-white/40 p-1 hover:bg-white/80 hover:border-white/60 transition-all duration-300 hover:shadow-lg hover:shadow-slate-900/5 hover:-translate-y-1"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-1 min-w-0 space-y-3">
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-flex items-center text-xs font-medium pb-0.5 ${
                            categoryColors[notice.category] || 'border-b-2 border-gray-300'
                          }`}
                        >
                          {categoryLabel[notice.category] || notice.category}
                        </span>
                      </div>

                      <CMSLink
                        url={`/notices/${notice.slug || notice.id}`}
                        className="block group-hover:text-blue-600 transition-colors duration-200"
                      >
                        <h3 className="font-semibold text-slate-900 text-lg leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
                          <span className="text-sm">{notice.title}</span>
                        </h3>
                      </CMSLink>

                      {notice.summary && (
                        <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                          {notice.summary}
                        </p>
                      )}
                    </div>

                    {notice.image && typeof notice.image === 'object' && (
                      <div className="flex-shrink-0 w-16 h-16 overflow-hidden bg-slate-100 shadow-md">
                        <Media resource={notice.image} fill imgClassName="object-cover" />
                      </div>
                    )}
                  </div>

                  <CMSLink
                    url={`/notices/${notice.slug || notice.id}`}
                    aria-label={`Read more about ${notice.title}`}
                    className="absolute top-4 right-4 w-8 h-8 bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110"
                  >
                    <svg
                      className="w-4 h-4 text-slate-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </CMSLink>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
