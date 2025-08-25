import { unstable_cache } from 'next/cache'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

/**
 * Cached home page data fetching with request deduplication
 */
export const getCachedHomePageData = () =>
  unstable_cache(
    async () => {
      const payload = await getPayload({ config: configPromise })
      const homePageData = await payload.find({
        collection: 'pages',
        where: { slug: { equals: 'home' } },
        depth: 2,
        limit: 1,
      })
      return homePageData.docs[0] || null
    },
    ['home-page-data'],
    {
      tags: ['pages', 'home-page'],
      revalidate: 300, // 5 minutes
    }
  )

/**
 * Cached theme pages fetching with request deduplication
 */
export const getCachedThemePages = () =>
  unstable_cache(
    async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_PAYLOAD_URL
        if (!baseUrl) {
          console.warn('NEXT_PUBLIC_PAYLOAD_URL is not set, returning empty theme pages')
          return []
        }

        const req = await fetch(`${baseUrl}/api/theme-pages?depth=2&limit=10`, {
          next: { revalidate: 300 }, // 5 minutes
        })
        if (!req.ok) return []
        const { docs } = await req.json()
        return docs || []
      } catch (error) {
        console.warn('Failed to fetch theme pages during build, returning empty array:', error)
        return []
      }
    },
    ['theme-pages'],
    {
      tags: ['theme-pages'],
      revalidate: 300, // 5 minutes
    }
  )

/**
 * Generic cached Payload collection fetching
 */
export const getCachedCollection = <T = any>(
  collection: string,
  options: {
    where?: any
    depth?: number
    limit?: number
    sort?: string
    select?: any
  } = {}
) =>
  unstable_cache(
    async (): Promise<T[]> => {
      const payload = await getPayload({ config: configPromise })
      const result = await payload.find({
        collection,
        depth: options.depth || 1,
        limit: options.limit || 100,
        sort: options.sort || '-createdAt',
        where: options.where,
        select: options.select,
        overrideAccess: false,
        pagination: false,
      })
      return result.docs as T[]
    },
    [`${collection}-${JSON.stringify(options)}`],
    {
      tags: [collection],
      revalidate: 300,
    }
  )
