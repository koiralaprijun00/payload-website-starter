import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'

import type { Post } from '@/payload-types'

import { PostHero } from '@/heros/PostHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'

export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config: configPromise })
    const posts = await payload.find({
      collection: 'posts',
      draft: false,
      limit: 1000,
      overrideAccess: false,
      pagination: false,
      select: {
        slug: true,
        title: true,
        id: true,
      },
    })

    // Filter out any posts with null/undefined slugs and log them for debugging
    const validPosts = posts.docs.filter(({ slug, title, id }) => {
      if (!slug || typeof slug !== 'string') {
        console.warn('Found post with invalid slug:', { id, title, slug, type: typeof slug })
        return false
      }
      return true
    })

    const params = validPosts.map(({ slug }) => {
      return { slug }
    })

    console.log(`Generated ${params.length} valid post params from ${posts.docs.length} total posts`)
    
    // If we have no valid posts, log a warning but don't fail the build
    if (validPosts.length === 0) {
      console.warn('No valid posts found for static generation')
    }
    
    return params
  } catch (error) {
    console.error('Error in generateStaticParams:', error)
    // Return empty array to prevent build failure, but log the error
    return []
  }
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Post({ params: paramsPromise }: Args) {
  try {
    const { isEnabled: draft } = await draftMode()
    const { slug = '' } = await paramsPromise
    
    if (!slug || typeof slug !== 'string') {
      console.warn('Post component received invalid slug:', { slug, type: typeof slug })
      return <PayloadRedirects url="/posts" />
    }
    
    const url = '/posts/' + slug
    const post = await queryPostBySlug({ slug })

    if (!post) {
      console.warn(`Post not found for slug: ${slug}, redirecting to posts list`)
      return <PayloadRedirects url="/posts" />
    }

    if (!post.slug || typeof post.slug !== 'string') {
      console.error(`Post found but has invalid slug:`, { postId: post.id, title: post.title, slug: post.slug })
      return <PayloadRedirects url="/posts" />
    }

    // Additional validation to ensure all required fields are present
    if (!post.title || !post.content) {
      console.error(`Post missing required fields:`, { 
        postId: post.id, 
        slug: post.slug, 
        hasTitle: !!post.title, 
        hasContent: !!post.content 
      })
      return <PayloadRedirects url="/posts" />
    }

      return (
      <article className="pt-8 pb-8">
        <PageClient />

        {/* Allows redirects for valid pages too */}
        <PayloadRedirects disableNotFound url={url} />

        {draft && <LivePreviewListener />}

        <PostHero post={post} />

        <div className="flex flex-col items-center gap-4 pt-8">
          <div className="container">
            <RichText className="max-w-[48rem] mx-auto" data={post.content} enableGutter={false} />
          </div>
        </div>
      </article>
    )
  } catch (error) {
    console.error(`Error rendering post with slug ${slug}:`, error)
    return <PayloadRedirects url="/posts" />
  }
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  try {
    const { slug = '' } = await paramsPromise
    
    if (!slug || typeof slug !== 'string') {
      console.warn('generateMetadata received invalid slug:', { slug, type: typeof slug })
      return {
        title: 'Posts | Payload Website Template',
        description: 'Browse all posts',
      }
    }
    
    const post = await queryPostBySlug({ slug })

    if (!post) {
      console.warn(`No post found for metadata generation with slug: ${slug}`)
      return {
        title: 'Post Not Found | Payload Website Template',
        description: 'The requested post could not be found',
      }
    }

    return generateMeta({ doc: post })
  } catch (error) {
    console.error(`Error generating metadata for slug ${slug}:`, error)
    return {
      title: 'Error | Payload Website Template',
      description: 'An error occurred while loading the post',
    }
  }
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
  if (!slug || typeof slug !== 'string') {
    console.warn('queryPostBySlug called with invalid slug:', { slug, type: typeof slug })
    return null
  }

  try {
    const { isEnabled: draft } = await draftMode()

    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
      collection: 'posts',
      draft,
      limit: 1,
      overrideAccess: draft,
      pagination: false,
      where: {
        slug: {
          equals: slug,
        },
      },
      depth: 2,
      select: {
        title: true,
        slug: true,
        categories: true,
        meta: true,
        heroImage: true,
        content: true,
        updatedAt: true,
        createdAt: true,
      },
    })

    const post = result.docs?.[0] || null
    
    if (!post) {
      console.warn(`No post found for slug: ${slug}`)
    } else if (!post.slug) {
      console.warn(`Post found but has no slug:`, { postId: post.id, title: post.title })
    }
    
    return post
  } catch (error) {
    console.error(`Error querying post with slug ${slug}:`, error)
    // Return null instead of throwing to prevent build failure
    return null
  }
})
