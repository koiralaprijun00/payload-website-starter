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
    <section className="w-full max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="h-2 w-2 rounded-full bg-orange-500 inline-block" />
          <span className="uppercase text-xs font-bold tracking-wider text-gray-700">
            {sectionLabel}
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{heading}</h2>
        {subheading && <p className="text-base md:text-lg text-gray-700">{subheading}</p>}
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
        {blocks.map((b, idx) => {
          const isActive = idx === activeIdx
          return (
            <button
              key={`${b.title}-${idx}`}
              type="button"
              onClick={() => setActiveIdx(idx)}
              className={`px-4 py-2 rounded-full border transition-all ${
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left: Image */}
        <div className="relative w-full h-64 sm:h-80 md:h-[28rem] rounded-xl overflow-hidden ring-2 ring-blue-200">
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
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            {active?.title || ''}
          </h3>
          {active?.description && (
            <p className="text-gray-700 mb-6 leading-relaxed">{active.description}</p>
          )}

          <ul className="space-y-3 mb-6">
            {active?.value && (
              <li className="flex items-start gap-3 text-gray-800">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                <span className="font-medium">{active.value}</span>
              </li>
            )}
          </ul>

          {activeUrl && (
            <Link
              href={activeUrl}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700"
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
