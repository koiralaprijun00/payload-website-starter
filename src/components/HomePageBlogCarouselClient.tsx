'use client'
import React, { useRef } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

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
    <section className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <span className="w-4 h-4 rounded-full bg-orange-500 inline-block"></span>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900">
            OUR BLOG
          </h2>
        </div>
        <div className="flex gap-2">
          <button
            aria-label="Scroll left"
            onClick={() => scroll('left')}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 border border-gray-200"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            aria-label="Scroll right"
            onClick={() => scroll('right')}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 border border-gray-200"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="flex gap-8 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-300"
        style={{ scrollBehavior: 'smooth' }}
      >
        {posts.map((post) => (
          <div
            key={post.id}
            className="min-w-[320px] max-w-xs flex-shrink-0 bg-white rounded-lg shadow hover:shadow-lg transition p-4"
          >
            <Link href={`/posts/${post.slug}`}>
              <div className="w-full h-56 rounded-md overflow-hidden mb-4 bg-gray-100">
                {post.heroImage?.url && (
                  <img
                    src={post.heroImage.url}
                    alt={post.heroImage.alt || post.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="text-lg font-bold text-blue-900 leading-tight hover:underline">
                {post.title}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}
