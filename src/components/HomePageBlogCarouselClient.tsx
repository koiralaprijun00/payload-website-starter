'use client'
import React, { useRef } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

interface BlogPost {
  id: string
  title: string
  slug: string
  heroImage?: { url: string; alt?: string }
}

interface HomePageBlogCarouselClientProps {
  posts: BlogPost[]
}

export default function HomePageBlogCarouselClient({ posts }: HomePageBlogCarouselClientProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current
      const scrollAmount = clientWidth * 0.8
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 xl:py-16">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-4 sm:gap-0">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-orange-500 inline-block"></span>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-gray-900">
            OUR BLOG
          </h2>
        </div>
        <div className="flex gap-2">
          <button
            aria-label="Scroll left"
            onClick={() => scroll('left')}
            className="p-1.5 sm:p-2 rounded-full bg-gray-100 hover:bg-gray-200 border border-gray-200"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            aria-label="Scroll right"
            onClick={() => scroll('right')}
            className="p-1.5 sm:p-2 rounded-full bg-gray-100 hover:bg-gray-200 border border-gray-200"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
      <div ref={scrollRef} className="flex gap-4 sm:gap-6 lg:gap-8 overflow-x-hidden pb-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="min-w-[280px] sm:min-w-[320px] max-w-xs flex-shrink-0 bg-white rounded-lg shadow hover:shadow-lg transition p-3 sm:p-4"
          >
            <Link href={`/posts/${post.slug}`}>
              <div className="w-full h-40 sm:h-48 md:h-56 rounded-md overflow-hidden mb-3 sm:mb-4 bg-gray-100">
                {post.heroImage?.url && (
                  <Image
                    src={post.heroImage.url}
                    alt={post.heroImage.alt || post.title}
                    width={640}
                    height={360}
                    className="w-full h-full object-cover"
                    sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, 320px"
                  />
                )}
              </div>
              <div className="text-base sm:text-lg lg:text-xl font-bold text-blue-900 leading-tight hover:underline">
                {post.title}
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="mt-4 sm:mt-6 text-center">
        <Link
          href="/posts"
          className="inline-flex items-center gap-2 text-blue-900 font-semibold hover:underline text-sm sm:text-base lg:text-lg"
        >
          See all posts
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </Link>
      </div>
    </section>
  )
}
