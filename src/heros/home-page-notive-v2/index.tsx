'use client'

import React, { useEffect, useState, useRef } from 'react'
import { Media } from '@/components/Media'
import { getClientSideURL } from '@/utilities/getURL'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import NoticeSidebar from '@/components/NoticeSidebar'
import { ChevronRight, Clock, Bell, X } from 'lucide-react'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'

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

const contentBoxVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
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
          <motion.div
            className="absolute left-8 bottom-8 max-w-md"
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.2 }}
            variants={contentBoxVariants}
          >
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
          </motion.div>
        </div>

        {/* Notices Sidebar */}
        <div
          className="absolute top-0 right-8 h-full w-96 bg-white transition-transform duration-700 ease-in-out z-20"
          style={{
            transform: noticesVisible ? 'translateX(0)' : 'translateX(calc(100% + 2rem))',
          }}
        >
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-slate-900">Latest Notices</h2>
              <button
                onClick={toggleNotices}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                aria-label="Close notices"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Notices List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
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
                    className={`group relative bg-white border border-gray-200 p-4 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 cursor-pointer transform ${
                      hoveredNotice === notice.id ? 'scale-[1.02]' : ''
                    }`}
                    style={{
                      animationDelay: `${index * 150}ms`,
                      animation: noticesVisible ? 'slideInRight 0.6s ease-out forwards' : 'none',
                    }}
                    onClick={() => handleNoticeClick(notice)}
                    onMouseEnter={() => setHoveredNotice(notice.id)}
                    onMouseLeave={() => setHoveredNotice(null)}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                        <span className={`w-2 h-2 rounded-full ${config.color}`} />
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
                      <p className="text-slate-600 line-clamp-2 leading-relaxed mb-3 group-hover:text-slate-800 transition-colors duration-200 text-sm">
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
                      className={`absolute left-0 top-0 bottom-0 w-1 ${config.color} rounded-l-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    />
                  </article>
                )
              })}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 transition-colors duration-200 flex items-center justify-center gap-2">
                View All Notices
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Sidebar */}
      <NoticeSidebar open={sidebarOpen} onClose={handleSidebarClose} notice={selectedNotice} />

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

      {/* Keyframes */}
      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  )
}

// Provide an alias export so this component can be easily imported elsewhere
export const HomePageNoticeV2Hero = EnhancedHeroSection
