'use client'

import React, { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle, ChevronRight } from 'lucide-react'

export interface AchievementTabItem {
  slug: string
  title: string
  description?: string
  image?: { url: string } | string
  bullets?: string[]
  ctaText?: string
}

export default function HomePageAchievementsTabs({ items }: { items: AchievementTabItem[] }) {
  const [activeIdx, setActiveIdx] = useState(0)
  const active = useMemo(() => items[activeIdx], [items, activeIdx])

  const activeImageUrl =
    typeof active?.image === 'string' ? active?.image : active?.image?.url || undefined

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16">
      <div className="flex items-center gap-2 mb-4">
        <span className="h-2 w-2 bg-orange-500 inline-block" />
        <span className="uppercase text-xs font-bold tracking-wider text-gray-700">
          Achievements
        </span>
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Achievements</h2>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-3 mb-8">
        {items.map((b, idx) => {
          const isActive = idx === activeIdx
          return (
            <button
              key={`${b.slug}-${idx}`}
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
              alt={active?.title || 'Achievement'}
              fill
              className="object-cover"
            />
          )}
        </div>
        {/* Right: Text */}
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{active?.title}</h3>
          {active?.description && (
            <p className="text-gray-700 mb-6 leading-relaxed">{active.description}</p>
          )}
          {!!active?.bullets?.length && (
            <ul className="space-y-3 mb-6">
              {active.bullets.map((t, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-800">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <span className="font-medium">{t}</span>
                </li>
              ))}
            </ul>
          )}

          <Link
            href={`/achievements/${active?.slug}`}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700"
          >
            {active?.ctaText || 'Learn more'}
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
