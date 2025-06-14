'use client'

import type { Post, ArchiveBlock as ArchiveBlockProps } from '@/payload-types'
import React, { useRef } from 'react'
import Link from 'next/link'
import { Media } from '@/components/Media'
import { ArrowLeft, ArrowRight } from 'lucide-react'

type Props = ArchiveBlockProps & {
  id?: string
  posts: Post[]
}

const CARD_WIDTH = 340 + 32 // card width + gap

const ArchiveBlockClient: React.FC<Props> = ({ id, posts }) => {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const amount = direction === 'left' ? -CARD_WIDTH : CARD_WIDTH
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' })
    }
  }

  return (
    <div className="my-16" id={`block-${id}`}>
      {/* Header Row */}
      <div className="container flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <span className="w-4 h-4 rounded-full bg-orange-500 inline-block" />
          <span className="font-bold text-xl">OUR BLOG</span>
        </div>
        <div className="flex gap-4">
          <button
            className="w-12 h-12 bg-orange-500 hover:bg-orange-600 flex items-center justify-center rounded-none transition-colors"
            onClick={() => scroll('left')}
            aria-label="Scroll left"
            type="button"
          >
            <ArrowLeft className="text-white w-6 h-6" />
          </button>
          <button
            className="w-12 h-12 bg-orange-500 hover:bg-orange-600 flex items-center justify-center rounded-none transition-colors"
            onClick={() => scroll('right')}
            aria-label="Scroll right"
            type="button"
          >
            <ArrowRight className="text-white w-6 h-6" />
          </button>
        </div>
      </div>
      {/* Posts Row */}
      <div className="container overflow-x-auto pb-4">
        <div ref={scrollRef} className="flex gap-8 min-w-full overflow-x-auto scroll-smooth">
          {posts.map((post) => {
            const metaImage = post.meta?.image
            const title = post.title
            const href = `/posts/${post.slug}`
            return (
              <div key={post.id} className="flex flex-col min-w-[340px] max-w-[340px]">
                <div className="relative aspect-[4/3] w-full rounded-none overflow-hidden">
                  {metaImage && typeof metaImage !== 'string' && (
                    <Media resource={metaImage} className="object-cover w-full h-full" fill />
                  )}
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-orange-600/80 via-transparent to-transparent" />
                </div>
                <Link
                  href={href}
                  className="mt-6 block font-bold text-xl text-blue-900 leading-snug hover:underline"
                >
                  {title}
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ArchiveBlockClient
