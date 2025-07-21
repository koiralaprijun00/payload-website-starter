'use client'

import React, { useEffect, useState, useRef } from 'react'
import { Media } from '@/components/Media'
import { getClientSideURL } from '@/utilities/getURL'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import NoticeSidebar from '@/components/NoticeSidebar'
import { ChevronRight, Clock, Bell, X } from 'lucide-react'

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

interface EnhancedHeroSectionProps {
  type:
    | 'none'
    | 'highImpact'
    | 'mediumImpact'
    | 'lowImpact'
    | 'homePageV1'
    | 'homePageNoticeV1'
    | 'homePageNoticeV2'
  title?: string | null
  buttonText?: string | null
  buttonLink?: string | null
  pillLabel?: string | null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  media?: any
  notices?: Notice[]
  description?: string | null
}

export const EnhancedHeroSection: React.FC<EnhancedHeroSectionProps> = ({
  media,
  title,
  pillLabel,
  description,
  notices: noticesProp,
  buttonText,
  buttonLink,
}) => {
  const displayTitle = title ?? 'Help create harmony between humans and wildlife.'
  const displayDescription = description ?? ''
  const displayPill = pillLabel ?? 'Latest Updates'
  const displayButtonText = buttonText ?? 'Learn More'

  const heroRef = useRef<HTMLDivElement>(null)

  const [notices, setNotices] = useState<Notice[]>(noticesProp || [])
  const [noticesVisible, setNoticesVisible] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null)
  const [hoveredNotice, setHoveredNotice] = useState<string | null>(null)
  const [isHeroInView, setIsHeroInView] = useState(true)
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

  // Observe hero visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) setIsHeroInView(entry.isIntersecting)
      },
      { threshold: 0.6 },
    )

    if (heroRef.current) {
      observer.observe(heroRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  const handleNoticeClick = (notice: Notice) => {
    setSelectedNotice(notice)
    setSidebarOpen(true)
  }

  const handleSidebarClose = () => {
    setSidebarOpen(false)
    setSelectedNotice(null)
  }

  const toggleNotices = () => {
    setNoticesVisible(!noticesVisible)
  }

  const handleButtonClick = () => {
    if (buttonLink) {
      window.open(buttonLink, '_blank')
    }
  }

  return (
    <div ref={heroRef} className="relative h-[75vh] bg-white overflow-hidden mb-36">
      <div className="flex h-full">
        {/* Image + Content */}
        <div
          className="relative flex-grow transition-all duration-700 ease-in-out"
          style={{ marginRight: noticesVisible ? '26rem' : undefined }}
        >
          {media && (
            <>
              <Media resource={media} fill imgClassName="object-cover w-full h-full" />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-20" />
            </>
          )}

          {/* Blue Content Box */}
          <div className="absolute left-8 bottom-8 max-w-md animate-fade-in-up">
            <div className="bg-blue-900 bg-opacity-95 backdrop-blur-sm p-6 shadow-2xl">
              {/* Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 bg-opacity-20 border border-blue-200 border-opacity-30 mb-4">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-blue-100">{displayPill}</span>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
                {displayTitle}
              </h1>

              {/* Description */}
              {displayDescription && (
                <p className="text-base text-blue-100 leading-relaxed mb-6">{displayDescription}</p>
              )}

              {/* Button */}
              <button
                onClick={handleButtonClick}
                className="group inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-900 font-semibold hover:bg-blue-50 transition-colors duration-200 hover:shadow-lg"
              >
                {displayButtonText}
                <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-2" />
              </button>
            </div>
          </div>
        </div>

        {/* Notices Sidebar */}
        <div
          className={`fixed top-0 right-0 h-full bg-white shadow-2xl border-l border-gray-200 transition-transform duration-700 ease-in-out z-20 ${
            noticesVisible ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{ width: '26rem' }}
        >
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">Latest Updates</h3>
              <button
                onClick={toggleNotices}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                aria-label="Close notices"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Notices List */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-4">
                {notices.length > 0 ? (
                  notices.map((notice, index) => (
                    <article
                      key={notice.id}
                      onClick={() => handleNoticeClick(notice)}
                      onMouseEnter={() => setHoveredNotice(notice.id)}
                      onMouseLeave={() => setHoveredNotice(null)}
                      className="block p-4 border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 cursor-pointer group animate-fade-in-up"
                      style={{
                        animationDelay: `${index * 100 + 200}ms`,
                        animationFillMode: 'both',
                      }}
                    >
                      {/* Category & Date */}
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                        <span className="uppercase font-medium">{notice.category}</span>
                        {notice.publishedAt && (
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <time>{new Date(notice.publishedAt).toLocaleDateString()}</time>
                          </div>
                        )}
                      </div>

                      {/* Title */}
                      <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
                        {notice.title}
                      </h4>

                      {/* Summary */}
                      <p className="text-sm text-gray-600 line-clamp-3 mb-3">{notice.summary}</p>

                      {/* Read more indicator */}
                      <div className="flex items-center gap-1 text-sm text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <span>Read more</span>
                        <ChevronRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform duration-200" />
                      </div>
                    </article>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Bell className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No recent updates available.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      {isHeroInView && (
        <button
          onClick={toggleNotices}
          className="fixed top-1/2 right-0 transform -translate-y-1/2 z-30 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-l-lg shadow-lg transition-all duration-300"
          aria-label={noticesVisible ? 'Hide notices' : 'Show notices'}
        >
          {noticesVisible ? (
            <ChevronRight className="w-6 h-6" />
          ) : (
            <div className="relative">
              <Bell className="w-6 h-6" />
              {notices.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {notices.length}
                </span>
              )}
            </div>
          )}
        </button>
      )}

      {/* Sidebar for notice details */}
      <NoticeSidebar open={sidebarOpen} onClose={handleSidebarClose} notice={selectedNotice} />
    </div>
  )
}

// Provide an alias export so this component can be easily imported elsewhere
export const HomePageNoticeV2Hero = EnhancedHeroSection
