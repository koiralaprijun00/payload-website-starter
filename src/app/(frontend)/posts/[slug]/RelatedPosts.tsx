import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Post } from '@/payload-types'
import { Card } from '@/components/Card'

export default async function RelatedPosts({
  currentPostId,
  categoryIds,
}: {
  currentPostId: string
  categoryIds: string[]
}) {
  if (!categoryIds || categoryIds.length === 0) return null

  const payload = await getPayload({ config: configPromise })
  const related = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 4,
    pagination: false,
    where: {
      and: [{ id: { not_equals: currentPostId } }, { categories: { in: categoryIds } }],
    },
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      heroImage: true,
    },
  })

  const posts = related.docs as Post[]
  if (!posts || posts.length === 0) return null

  return (
    <section className="pt-12 pb-4">
      <div className="container">
        <h2 className="text-xl sm:text-2xl font-bold mb-6">Related Posts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((p) => (
            <Card key={p.id} relationTo="posts" doc={p as any} showCategories className="h-full" />
          ))}
        </div>
      </div>
    </section>
  )
}
