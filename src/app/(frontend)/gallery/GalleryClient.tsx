'use client'
import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Masonry from 'react-masonry-css'
import { useImageLoadingQueue } from '@/hooks/useImageLoadingQueue'
import { OptimizedGalleryImage } from '@/components/OptimizedGalleryImage'
import { GalleryPreloader } from '@/components/GalleryPreloader'

interface GalleryImage {
  id: string
  url: string
  alt?: string | null
}

interface GalleryPageProps {
  images: GalleryImage[]
}

export default function GalleryClient({ images }: GalleryPageProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Initialize the image loading queue with max 4 concurrent loads
  const { requestImageLoad, getImageState } = useImageLoadingQueue({
    maxConcurrent: 4,
  })

  // Initialize first 6 images with high priority
  useEffect(() => {
    if (images.length > 0) {
      // Load first 6 images immediately with highest priority
      images.slice(0, 6).forEach((image, index) => {
        requestImageLoad(image.id, image.url, index) // Priority 0, 1, 2, 3, 4, 5
      })
      setIsLoading(false)
    }
  }, [images, requestImageLoad])

  // Masonry breakpoints
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  }

  const openLightbox = useCallback((image: GalleryImage) => {
    setSelectedImage(image)
    document.body.style.overflow = 'hidden'
  }, [])

  const closeLightbox = useCallback(() => {
    setSelectedImage(null)
    document.body.style.overflow = 'unset'
  }, [])

  const navigateImage = useCallback(
    (direction: 'next' | 'prev') => {
      if (!selectedImage) return

      const currentIndex = images.findIndex((img) => img.id === selectedImage.id)
      let newIndex

      if (direction === 'next') {
        newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1
      } else {
        newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1
      }

      const newImage = images[newIndex]
      if (newImage) {
        setSelectedImage(newImage)
      }
    },
    [selectedImage, images],
  )

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return

      switch (e.key) {
        case 'Escape':
          closeLightbox()
          break
        case 'ArrowLeft':
          navigateImage('prev')
          break
        case 'ArrowRight':
          navigateImage('next')
          break
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [selectedImage, navigateImage, closeLightbox])

  if (isLoading && images.length > 0) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
          Gallery
        </h1>

        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      </main>
    )
  }

  return (
    <>
      {/* LCP Optimization: Preload first 3 images */}
      <GalleryPreloader images={images} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
          Gallery
        </h1>

        {/* Optimized Masonry Grid */}
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex w-auto -ml-4"
          columnClassName="pl-4 flex flex-col space-y-4"
        >
          {images.map((image, index) => (
            <OptimizedGalleryImage
              key={image.id}
              image={image}
              index={index}
              onClick={openLightbox}
              onLoadRequest={(imageId, imageUrl, priority) =>
                requestImageLoad(imageId, imageUrl, priority)
              }
              imageState={getImageState(image.id)}
            />
          ))}
        </Masonry>

        {images.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No images found in the gallery.</p>
          </div>
        )}
      </main>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={closeLightbox}
        >
          <div className="relative max-w-4xl max-h-full">
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 text-xl font-bold z-60"
            >
              ✕ Close
            </button>

            {/* Navigation buttons */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                navigateImage('prev')
              }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 text-3xl font-bold z-60"
            >
              ‹
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                navigateImage('next')
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 text-3xl font-bold z-60"
            >
              ›
            </button>

            {/* Main image */}
            <div className="relative max-w-full max-h-[80vh]">
              <Image
                src={selectedImage.url}
                alt={selectedImage.alt || 'Gallery image'}
                width={1200}
                height={800}
                className="max-w-full max-h-[80vh] w-auto h-auto object-contain"
                priority={true}
                quality={90}
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            {/* Image counter */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-white text-sm">
              {images.findIndex((img) => img.id === selectedImage.id) + 1} of {images.length}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
