'use client'

import React, { useEffect, useState } from 'react'
import { Media } from '@/components/Media'
import { getClientSideURL } from '@/utilities/getURL'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import NoticeSidebar from '@/components/NoticeSidebar'
import { ChevronRight, Clock } from 'lucide-react'

export interface Notice {
  id: string
  category: string
  title: string
  summary: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image?: any
  slug?: string
  publishedAt?: string
  viewCount?: number
}

interface HomePageNoticeV1HeroProps {
  type: 'none' | 'highImpact' | 'mediumImpact' | 'lowImpact' | 'homePageV1' | 'homePageNoticeV1'
  title?: string | null
  buttonText?: string | null
  buttonLink?: string | null
  pillLabel?: string | null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  media?: any
  notices?: Notice[]
  description?: string | null
}

const categoryConfig: Record<
  string,
  {
    label: string
    color: string
    bgColor: string
    textColor: string
    hoverColor: string
  }
> = {
  ecosystem: {
    label: 'Ecosystem',
    color: 'bg-emerald-500',
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-700',
    hoverColor: 'hover:bg-emerald-500',
  },
  species: {
    label: 'Species',
    color: 'bg-blue-500',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700',
    hoverColor: 'hover:bg-blue-500',
  },
  community: {
    label: 'Community',
    color: 'bg-purple-500',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-700',
    hoverColor: 'hover:bg-purple-500',
  },
  policy: {
    label: 'Policy',
    color: 'bg-amber-500',
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-700',
    hoverColor: 'hover:bg-amber-500',
  },
}

const formatDate = (dateString?: string) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export const HomePageNoticeV1Hero: React.FC<HomePageNoticeV1HeroProps> = ({
  media,
  title,
  pillLabel,
  description,
  notices: noticesProp,
}) => {
  const displayTitle = title ?? "Protecting Our Planet's Future Through Conservation Innovation"
  const displayDescription = description ?? ''
  const displayPill = pillLabel ?? 'Latest Updates'
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

  const [hoveredNotice, setHoveredNotice] = useState<string | null>(null)

  return (
    <div className="relative h-[80vh] bg-white overflow-visible mb-48 px-12 py-0">
      {/* Accent shapes removed in light theme */}
      <div className="hidden" />

      <div className="relative z-10 container mx-auto h-full flex flex-col px-4 sm:px-6 lg:px-8 pt-0 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start h-full">
          {/* Main content */}
          <div className="lg:col-span-7 space-y-8 flex flex-col justify-center overflow-y-auto">
            {/* Title */}
            {displayTitle && (
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded border border-blue-200">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-blue-800">{displayPill}</span>
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
                  {displayTitle}
                </h1>

                {displayDescription && (
                  <p className="text-xl text-slate-700 leading-relaxed max-w-2xl">
                    {displayDescription}
                  </p>
                )}
              </div>
            )}

            {/* Hero Media */}
            {media && (
              <div className="group relative">
                <div className="aspect-[16/9] relative overflow-hidden bg-gray-100 border border-gray-200">
                  <Media
                    resource={media}
                    fill
                    imgClassName="object-cover transition-all duration-700"
                  />
                  {/* Overlay removed to avoid hiding edges */}
                </div>
              </div>
            )}
          </div>

          {/* Notices sidebar */}
          <div className="lg:col-span-5 space-y-6 flex flex-col h-full">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">Latest Notices</h2>
              {/* <button className="text-blue-600 hover:text-blue-800 transition-colors duration-200 flex items-center gap-1 text-sm">
                View all
                <ExternalLink className="w-4 h-4" />
              </button> */}
            </div>

            <div className="space-y-3 flex-1 overflow-y-auto pr-1">
              {notices.map((notice, index) => {
                const config = (categoryConfig[notice.category] ?? categoryConfig.ecosystem) as {
                  label: string
                  color: string
                  bgColor: string
                  textColor: string
                  hoverColor: string
                }

                return (
                  <article
                    key={notice.id}
                    className={`group relative bg-white border border-gray-200 rounded-lg p-3 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 cursor-pointer transform ${
                      hoveredNotice === notice.id ? 'scale-[1.02]' : ''
                    }`}
                    style={{
                      animationDelay: `${index * 150}ms`,
                      animation: 'fadeInUp 0.6s ease-out forwards',
                    }}
                    onClick={() => handleNoticeClick(notice)}
                    onMouseEnter={() => setHoveredNotice(notice.id)}
                    onMouseLeave={() => setHoveredNotice(null)}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                        <span className={`w-1.5 h-1.5 rounded-full ${config.color}`} />
                        <span>{config.label}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Clock className="w-3 h-3" />
                        {formatDate(notice.publishedAt || '')}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-semibold text-slate-900 text-lg leading-snug mb-2 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                      {notice.title}
                    </h3>

                    {/* Summary */}
                    {notice.summary && (
                      <p className="text-slate-600 line-clamp-1 leading-relaxed mb-2 group-hover:text-slate-800 transition-colors duration-200 text-sm">
                        {notice.summary}
                      </p>
                    )}

                    {/* Read more */}
                    <div className="flex items-center gap-1 text-sm text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <span>Read more</span>
                      <ChevronRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform duration-200" />
                    </div>

                    {/* Accent bar */}
                    <div
                      className={`absolute left-0 top-0 bottom-0 w-1 ${config.color} rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    />
                  </article>
                )
              })}
            </div>

            {/* View All button removed for compactness */}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <NoticeSidebar open={sidebarOpen} onClose={handleSidebarClose} notice={selectedNotice} />

      {/* Keyframes */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
