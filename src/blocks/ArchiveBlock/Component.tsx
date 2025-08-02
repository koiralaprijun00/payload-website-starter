import type { Post, ArchiveBlock as ArchiveBlockProps } from '@/payload-types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import ArchiveBlockClient from './ArchiveBlockClient'

export const ArchiveBlock: React.FC<ArchiveBlockProps & { id?: string }> = async (props) => {
  const { categories, limit: limitFromProps, populateBy, selectedDocs } = props
  const limit = limitFromProps || 6
  let posts: Post[] = []

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })
    const flattenedCategories = categories?.map((category) =>
      typeof category === 'object' ? category.id : category,
    )
    const fetchedPosts = await payload.find({
      collection: 'posts',
      depth: 1,
      limit,
      sort: '-publishedAt', // Sort by publishedAt descending to show newest posts first
      ...(flattenedCategories && flattenedCategories.length > 0
        ? { where: { categories: { in: flattenedCategories } } }
        : {}),
    })
    posts = fetchedPosts.docs
  } else if (selectedDocs?.length) {
    posts = selectedDocs
      .map((post) => (typeof post.value === 'object' ? post.value : null))
      .filter(Boolean) as Post[]
  }

  return <ArchiveBlockClient {...props} posts={posts} />
}
