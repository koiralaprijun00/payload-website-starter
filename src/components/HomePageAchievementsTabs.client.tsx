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
  const bulletItem = {
    hidden: { opacity: 0, x: -12 },
    show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: 'easeOut' as const } },
  }

  return (
    <motion.section
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
    >
      <div className="flex items-center gap-2 mb-4 sm:mb-6">
        <span className="h-2 w-2 bg-orange-500 inline-block" />
        <span className="uppercase text-xs sm:text-sm font-bold tracking-wider text-gray-700">
          Achievements
        </span>
      </div>
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6 sm:mb-8 lg:mb-12">
        Achievements
      </h2>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6 sm:mb-8 lg:mb-12">
        {items.map((b, idx) => {
          const isActive = idx === activeIdx
          return (
            <motion.button
              key={`${b.slug}-${idx}`}
              type="button"
              onClick={() => setActiveIdx(idx)}
              className={`px-3 sm:px-4 lg:px-6 py-2 rounded-full border transition-all text-sm sm:text-base lg:text-lg ${
                isActive
                  ? 'bg-blue-600 text-white border-blue-600 shadow'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {b.title}
            </motion.button>
          )
        })}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active?.slug || 'default'}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={contentVariants}
        >
          {/* Left: Image */}
          <motion.div
            className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 2xl:h-96 rounded-xl overflow-hidden ring-2 ring-blue-200"
            variants={imageVariants}
          >
            {activeImageUrl && (
              <Image
                src={activeImageUrl}
                alt={active?.title || 'Achievement'}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
              />
            )}
          </motion.div>
          {/* Right: Text */}
          <div>
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 lg:mb-6">
              {active?.title}
            </h3>
            {active?.description && (
              <p className="text-gray-700 text-sm sm:text-base lg:text-lg xl:text-xl mb-4 sm:mb-6 leading-relaxed">
                {active.description}
              </p>
            )}
            {!!active?.bullets?.length && (
              <motion.ul
                className="space-y-2 sm:space-y-3 mb-4 sm:mb-6"
                initial="hidden"
                animate="show"
                variants={{ show: { transition: { staggerChildren: 0.1 } } }}
              >
                {active.bullets.map((t, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-2 sm:gap-3 text-gray-800 text-sm sm:text-base lg:text-lg"
                    variants={bulletItem}
                  >
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="font-medium">{t}</span>
                  </motion.li>
                ))}
              </motion.ul>
            )}

            <Link
              href={`/achievements/${active?.slug}`}
              className="inline-flex items-center gap-2 px-4 sm:px-5 lg:px-6 py-2 sm:py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 text-sm sm:text-base lg:text-lg"
            >
              {active?.ctaText || 'Learn more'}
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.section>
  )
}
