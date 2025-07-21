import React from 'react'
import type { Metadata } from 'next'
import { getGalleryMedia } from '@/utilities/getGalleryMedia'
import GalleryClient from './GalleryClient'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Gallery | Wildlife Conservation',
  description:
    'Explore our collection of wildlife photography showcasing conservation efforts and biodiversity.',
}

export default async function GalleryPage() {
  const images: Array<{ id: string; url: string; alt?: string | null }> = await getGalleryMedia()
  return <GalleryClient images={images} />
}
