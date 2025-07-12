/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useState, useEffect, useCallback } from 'react'
import Masonry from 'react-masonry-css'

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

  // Safe body style handling for modal
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [selectedImage])

  // Set loading false after mount (simulate image loading if needed)
  useEffect(() => {
    setIsLoading(false)
  }, [images])

  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const navigateImage = useCallback(
    (direction: 'prev' | 'next') => {
      if (!selectedImage) return
      const currentIndex = images.findIndex((img) => img.id === selectedImage.id)
      let newIndex
      if (direction === 'prev') {
        newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1
      } else {
        newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0
      }
      const newImage = images[newIndex]
      if (newImage) {
        setSelectedImage(newImage)
      }
    },
    [selectedImage, images],
  )

  // Handle keyboard navigation
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
  }, [selectedImage, navigateImage])

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

  // Masonry breakpoints
  const breakpointColumnsObj = {
    default: 3,
    1024: 3,
    640: 2,
    0: 1,
  }

  return (
    <>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
          Gallery
        </h1>
        {/* True Balanced Masonry Grid using react-masonry-css */}
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex w-auto -ml-4"
          columnClassName="pl-4 flex flex-col space-y-4"
        >
          {images.map((image, index) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-[1.02]"
              onClick={() => openLightbox(image)}
            >
              <img
                src={image.url}
                alt={image.alt || 'Gallery image'}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                draggable={false}
                loading={index < 6 ? 'eager' : 'lazy'}
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {/* Alt text overlay */}
              {image.alt && (
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-sm font-medium leading-relaxed">{image.alt}</p>
                </div>
              )}
              {/* Zoom icon */}
              <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                  />
                </svg>
              </div>
            </div>
          ))}
        </Masonry>
        {/* Empty state */}
        {images.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No images yet</h3>
            <p className="text-gray-600">
              Images will appear here once they&apos;re added to your gallery.
            </p>
          </div>
        )}
      </main>
      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
          <div className="relative max-w-7xl max-h-full mx-4 flex items-center justify-center">
            <img
              src={selectedImage.url}
              alt={selectedImage.alt || 'Gallery image'}
              className="max-w-full max-h-[90vh] object-contain shadow-2xl"
              draggable={false}
            />
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              aria-label="Close lightbox"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            {/* Navigation buttons */}
            {images.length > 1 && (
              <>
                <button
                  onClick={() => navigateImage('prev')}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                  aria-label="Previous image"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => navigateImage('next')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                  aria-label="Next image"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </>
            )}
            {/* Image info */}
            {selectedImage.alt && (
              <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg p-4 text-white">
                <p className="text-center font-medium">{selectedImage.alt}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
