'use client'

import React, { useEffect, useState } from 'react'
import { Media } from '@/components/Media'
import { getClientSideURL } from '@/utilities/getURL'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import NoticeSidebar from '@/components/NoticeSidebar'

export interface Notice {
  id: string
  category: string
  title: string
  summary: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image?: any
  slug?: string
}

interface HomePageNoticeV1HeroProps {
  type: 'none' | 'highImpact' | 'mediumImpact' | 'lowImpact' | 'homePageV1' | 'homePageNoticeV1'
  title?: string | null
  buttonText?: string | null
  buttonLink?: string | null
  media?: never
  notices?: Notice[]
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

export const HomePageNoticeV1Hero: React.FC<HomePageNoticeV1HeroProps> = ({
  media,
  title,
  notices: noticesProp,
}) => {
  const [notices, setNotices] = useState<Notice[]>(noticesProp || [])
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null)
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme(null)
  }, [setHeaderTheme])

  useEffect(() => {
    if (noticesProp) return // Don't fetch if notices are provided as prop
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
  }, [noticesProp])

  const handleNoticeClick = (notice: Notice) => {
    setSelectedNotice(notice)
    setSidebarOpen(true)
  }

  const handleSidebarClose = () => {
    setSidebarOpen(false)
    setSelectedNotice(null)
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-blue-50/30 mb-48">
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
                  className="group relative bg-white/60 backdrop-blur-sm border border-white/40 p-1 hover:bg-white/80 hover:border-white/60 transition-all duration-300 hover:shadow-lg hover:shadow-slate-900/5 hover:-translate-y-1 cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => handleNoticeClick(notice)}
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

                      <h3 className="font-semibold text-slate-900 text-lg leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
                        <span className="text-sm">{notice.title}</span>
                      </h3>

                      {notice.summary && (
                        <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                          {notice.summary}
                        </p>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
      <NoticeSidebar open={sidebarOpen} onClose={handleSidebarClose} notice={selectedNotice} />
    </div>
  )
}
