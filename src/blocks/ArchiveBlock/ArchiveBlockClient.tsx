'use client'

import type { Post, ArchiveBlock as ArchiveBlockProps } from '@/payload-types'
import React from 'react'
import RichText from '@/components/RichText'
import { CollectionArchive } from '@/components/CollectionArchive'

type Props = ArchiveBlockProps & {
  id?: string
  posts: Post[]
}

const ArchiveBlockClient: React.FC<Props> = ({ id, introContent, posts }) => (
  <div className="my-16" id={`block-${id}`}>
    {introContent && (
      <div className="container mb-16">
        <RichText className="ms-0 max-w-[48rem]" data={introContent} enableGutter={false} />
      </div>
    )}
    <div className="container">
      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {posts.map((post) => (
          <CollectionArchive key={post.id} posts={[post]} />
        ))}
      </div>
    </div>
  </div>
)

export default ArchiveBlockClient
