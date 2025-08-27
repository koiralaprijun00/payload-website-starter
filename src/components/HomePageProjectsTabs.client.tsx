'use client'

import React, { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle, ChevronRight } from 'lucide-react'

export interface ProjectRelationship {
  id: string
  slug: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export interface ProjectBlock {
  title: string
  description?: string
  value?: string
  image?: { url: string } | string
  link?: string | ProjectRelationship | null
}

export interface HomePageProjectsTabsProps {
  sectionLabel: string
  heading: string
  subheading: string
  blocks: ProjectBlock[]
}

const getProjectUrl = (link: string | ProjectRelationship | null | undefined): string | null => {
  if (!link) return null
  if (typeof link === 'string') return link
  if (typeof link === 'object' && link.slug) return `/projects/${link.slug}`
  return null
}

export default function HomePageProjectsTabs({
  sectionLabel,
  heading,
  subheading,
  blocks,
}: HomePageProjectsTabsProps) {
  const [activeIdx, setActiveIdx] = useState(0)
  const active = useMemo(() => blocks[activeIdx], [blocks, activeIdx])

  const activeImageUrl =
    typeof active?.image === 'string' ? active?.image : active?.image?.url || undefined
  const activeUrl = getProjectUrl(active?.link)

  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-6 py-16 sm:py-20 lg:py-20 xl:py-28">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="h-2 w-2 rounded-full bg-orange-500 inline-block" />
          <span className="uppercase text-xs font-bold tracking-wider text-gray-700">
            {sectionLabel}
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-2">
          {heading}
        </h2>
        {subheading && (
          <p className="text-sm sm:text-base lg:text-base xl:text-lg text-gray-700">{subheading}</p>
        )}
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
        {blocks.map((b, idx) => {
          const isActive = idx === activeIdx
          return (
            <button
              key={`${b.title}-${idx}`}
              type="button"
              onClick={() => setActiveIdx(idx)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 text-sm rounded-full border transition-all ${
                isActive
                  ? 'bg-blue-600 text-white border-blue-600 shadow'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              {b.title}
            </button>
          )
        })}
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-6 xl:gap-8 items-start">
        {/* Left: Image */}
        <div className="relative w-full h-56 sm:h-64 md:h-72 lg:h-80 xl:h-[28rem] rounded-xl overflow-hidden ring-2 ring-blue-200">
          {activeImageUrl && (
            <Image
              src={activeImageUrl}
              alt={active?.title || 'Project'}
              fill
              className="object-cover"
            />
          )}
        </div>
        {/* Right: Text */}
        <div>
          <h3 className="text-xl sm:text-2xl lg:text-2xl xl:text-3xl font-bold text-gray-900 mb-3">
            {active?.title || ''}
          </h3>
          {active?.description && (
            <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6 leading-relaxed">
              {active.description}
            </p>
          )}

          <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
            {active?.value && (
              <li className="flex items-start gap-3 text-gray-800">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                <span className="text-sm sm:text-base font-medium">{active.value}</span>
              </li>
            )}
          </ul>

          {activeUrl && (
            <Link
              href={activeUrl}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-3 text-sm sm:text-base rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700"
            >
              Learn more
              <ChevronRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
