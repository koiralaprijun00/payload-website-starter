import React from 'react'
import { getGalleryMedia } from '@/utilities/getGalleryMedia'
import GalleryClient from './GalleryClient'

export const dynamic = 'force-static'

export default async function GalleryPage() {
  const images: Array<{ id: string; url: string; alt?: string | null }> = await getGalleryMedia()
  return <GalleryClient images={images} />
}
