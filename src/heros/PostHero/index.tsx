import { formatDateTime } from 'src/utilities/formatDateTime'
import React from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import { formatAuthors } from '@/utilities/formatAuthors'

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const { categories, heroImage, populatedAuthors, publishedAt, title } = post

  // Defensive programming - ensure all values are safe
  const safeTitle = title && typeof title === 'string' ? title : 'Untitled Post'
  const safeCategories = categories && Array.isArray(categories) ? categories : []
  const safeAuthors = populatedAuthors && Array.isArray(populatedAuthors) ? populatedAuthors : []
  const safePublishedAt = publishedAt && typeof publishedAt === 'string' ? publishedAt : null

  const hasAuthors = safeAuthors.length > 0 && formatAuthors(safeAuthors) !== ''

  const hasHeroImage = heroImage && typeof heroImage !== 'string'
  const hasCategories = safeCategories.length > 0

  return (
    <div
      className={`relative pt-4 flex items-end ${hasHeroImage ? 'min-h-[65vh]' : 'min-h-[20vh]'}`}
    >
      <div
        className={`container z-10 relative lg:grid lg:grid-cols-[1fr_48rem_1fr] pb-8 ${hasHeroImage ? 'text-white' : 'text-gray-900'}`}
      >
        <div className="col-start-1 col-span-1 md:col-start-2 md:col-span-2">
          {hasCategories && (
            <div className="uppercase text-sm mb-6">
              {safeCategories.map((category, index) => {
                if (typeof category === 'object' && category !== null) {
                  const { title: categoryTitle } = category

                  const titleToUse =
                    categoryTitle && typeof categoryTitle === 'string'
                      ? categoryTitle
                      : 'Untitled category'

                  const isLast = index === safeCategories.length - 1

                  return (
                    <React.Fragment key={index}>
                      {titleToUse}
                      {!isLast && <React.Fragment>, &nbsp;</React.Fragment>}
                    </React.Fragment>
                  )
                }
                return null
              })}
            </div>
          )}

          <div className="">
            <h1 className="mb-6 text-3xl md:text-5xl lg:text-6xl">{safeTitle}</h1>
          </div>

          <div className="flex flex-col md:gap-16">
            {hasAuthors && (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <p className="text-sm">Author</p>

                  <p>{formatAuthors(safeAuthors)}</p>
                </div>
              </div>
            )}
            {safePublishedAt && (
              <div className="flex flex-col gap-1">
                <p className="text-sm">Date Published</p>

                <time dateTime={safePublishedAt}>{formatDateTime(safePublishedAt)}</time>
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        className={`absolute inset-0 select-none ${!hasHeroImage ? 'bg-gradient-to-br from-gray-50 to-gray-100' : ''}`}
      >
        {hasHeroImage && <Media fill priority imgClassName="object-cover" resource={heroImage} />}
        {hasHeroImage && (
          <div className="absolute pointer-events-none left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent" />
        )}
      </div>
    </div>
  )
}
