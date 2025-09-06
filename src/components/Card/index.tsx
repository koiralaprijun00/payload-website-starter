'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'
import Image from 'next/image'

import type { Post } from '@/payload-types'

export type CardPostData = Pick<Post, 'slug' | 'categories' | 'meta' | 'title' | 'heroImage'>

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props

  const { slug, categories, meta, title } = doc || {}
  const { description } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`

  // Resolve hero image url if available
  let heroImageURL: string | null = null
  if (doc && 'heroImage' in doc && doc.heroImage) {
    const hero = doc.heroImage as unknown as { url?: string; filename?: string } | string
    if (typeof hero === 'object' && hero !== null) {
      if (hero.url && typeof hero.url === 'string') heroImageURL = hero.url
      else if (hero.filename && typeof hero.filename === 'string')
        heroImageURL = `/media/${hero.filename}`
    }
  }

  return (
    <article
      className={cn(
        'relative border border-border rounded-xl overflow-hidden bg-white hover:shadow-lg transition-shadow duration-200 hover:cursor-pointer group',
        className,
      )}
      ref={card.ref}
    >
      {/* Stretched link makes entire card clickable */}
      <Link
        href={href}
        aria-labelledby={`card-title-${slug}`}
        ref={link.ref}
        className="absolute inset-0 z-10"
      >
        <span className="sr-only">Open post</span>
      </Link>
      {heroImageURL && (
        <div className="relative w-full h-44 sm:h-48 overflow-hidden">
          <Image
            src={heroImageURL}
            alt={titleToUse || 'Post image'}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="p-5">
        {showCategories && hasCategories && (
          <div className="flex flex-wrap gap-2 mb-3">
            {categories?.map((category, index) => {
              if (typeof category === 'object' && category) {
                const { title: titleFromCategory } = category
                const categoryTitle = titleFromCategory || 'Category'
                return (
                  <span
                    key={index}
                    className="inline-flex items-center rounded-full bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide"
                  >
                    {categoryTitle}
                  </span>
                )
              }
              return null
            })}
          </div>
        )}
        {titleToUse && (
          <div className="prose">
            <h3 id={`card-title-${slug}`} className="group-hover:underline">
              {titleToUse}
            </h3>
          </div>
        )}
        {description && (
          <div className="mt-2 text-slate-600 text-sm">
            {description && <p>{sanitizedDescription}</p>}
          </div>
        )}
      </div>
    </article>
  )
}
