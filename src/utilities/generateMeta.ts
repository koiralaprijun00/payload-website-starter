import type { Metadata } from 'next'

import type { Media, Page, Post, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/website-template-OG.webp'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | null
}): Promise<Metadata> => {
  const { doc } = args

  // Early return if doc is null or undefined
  if (!doc) {
    return {
      title: 'Ujalyo Bardiya',
      description: '',
      openGraph: mergeOpenGraph({
        description: '',
        images: undefined,
        title: 'Ujalyo Bardiya',
        url: '/',
      }),
    }
  }

  const ogImage = getImageURL(doc?.meta?.image)

  const title = 'Ujalyo Bardiya'

  // Safe slug handling - ensure slug is a string or array before processing
  let url = '/'
  if (doc?.slug) {
    if (Array.isArray(doc.slug)) {
      url = doc.slug.join('/')
    } else if (typeof doc.slug === 'string') {
      url = '/' + doc.slug
    }
  }

  return {
    description: doc?.meta?.description || '',
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url,
    }),
    title,
  }
}
