'use client'

import React, { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

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

  // Animation variants
  const sectionInitial = { opacity: 0, y: 40 }
  const sectionAnimate = { opacity: 1, y: 0 }
  const sectionTransition = { duration: 0.8, ease: 'easeOut' as const, delay: 0.2 }

  const tabsContainer = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.08 },
    },
  }
  const tabItem = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
  }
  const imageVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut' as const } },
    exit: { opacity: 0.8, scale: 0.98, transition: { duration: 0.3, ease: 'easeInOut' as const } },
  }
  const contentVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
    exit: { opacity: 0, y: 10, transition: { duration: 0.2 } },
  }
  const bulletsContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06 } },
  }
  const bulletItem = {
    hidden: { opacity: 0, x: -12 },
    show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: 'easeOut' as const } },
  }

  return (
    <motion.section
      className="w-full max-w-7xl mx-auto px-4 py-16"
      initial={sectionInitial}
      whileInView={sectionAnimate}
      viewport={{ once: true, amount: 0.2 }}
      transition={sectionTransition}
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="h-2 w-2 bg-orange-500 inline-block" />
        <span className="uppercase text-xs font-bold tracking-wider text-gray-700">
          Achievements
        </span>
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Achievements</h2>

      {/* Tabs */}
      <motion.div
        className="flex flex-wrap items-center gap-3 mb-8"
        variants={tabsContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {items.map((b, idx) => {
          const isActive = idx === activeIdx
          return (
            <motion.button
              variants={tabItem}
              key={`${b.slug}-${idx}`}
              type="button"
              onClick={() => setActiveIdx(idx)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              className={`px-4 py-2 border transition-all ${
                isActive
                  ? 'bg-blue-600 text-white border-blue-600 shadow'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              {b.title}
            </motion.button>
          )
        })}
      </motion.div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left: Image */}
        <div className="relative w-full h-64 sm:h-80 md:h-[28rem] overflow-hidden ring-2 ring-blue-200">
          <AnimatePresence mode="wait">
            {activeImageUrl && (
              <motion.div
                key={active?.slug || activeImageUrl}
                {...imageVariants}
                className="absolute inset-0"
              >
                <Image
                  src={activeImageUrl}
                  alt={active?.title || 'Achievement'}
                  fill
                  className="object-cover"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {/* Right: Text */}
        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${active?.slug}`}
              variants={contentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{active?.title}</h3>
              {active?.description && (
                <p className="text-gray-700 mb-6 leading-relaxed">{active.description}</p>
              )}
              {!!active?.bullets?.length && (
                <motion.ul
                  className="space-y-3 mb-6"
                  variants={bulletsContainer}
                  initial="hidden"
                  animate="show"
                >
                  {active.bullets.map((t, i) => (
                    <motion.li
                      key={i}
                      variants={bulletItem}
                      className="flex items-start gap-3 text-gray-800"
                    >
                      <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                      <span className="font-medium">{t}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              )}

              <Link
                href={`/achievements/${active?.slug}`}
                className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 text-white font-semibold hover:bg-blue-700"
              >
                {active?.ctaText || 'Learn more'}
                <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  )
}
