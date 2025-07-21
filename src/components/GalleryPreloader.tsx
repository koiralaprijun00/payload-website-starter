'use client'
import React, { useEffect } from 'react'

interface GalleryPreloaderProps {
  images: Array<{ id: string; url: string; alt?: string | null }>
}

/**
 * Preloads the first 3 gallery images to optimize LCP performance
 * Adds <link rel="preload"> tags to the document head
 */
export const GalleryPreloader: React.FC<GalleryPreloaderProps> = ({ images }) => {
  useEffect(() => {
    // Preload first 3 images for LCP optimization
    const preloadImages = images.slice(0, 3)
    const preloadLinks: HTMLLinkElement[] = []

    preloadImages.forEach((image, index) => {
      // Create preload link element
      const link = document.createElement('link')
      link.rel = 'preload'
      link.href = image.url
      link.as = 'image'
      link.type = 'image/webp' // Prefer WebP format
      link.setAttribute('fetchpriority', 'high')

      // Add to document head
      document.head.appendChild(link)
      preloadLinks.push(link)
    })

    // Cleanup function to remove preload links when component unmounts
    return () => {
      preloadLinks.forEach((link) => {
        if (document.head.contains(link)) {
          document.head.removeChild(link)
        }
      })
    }
  }, [images])

  return null // This component doesn't render anything visible
}
