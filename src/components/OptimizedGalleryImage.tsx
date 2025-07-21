'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

interface GalleryImage {
  id: string
  url: string
  alt?: string | null
}

interface OptimizedGalleryImageProps {
  image: GalleryImage
  index: number
  onClick: (image: GalleryImage) => void
  onLoadRequest: (imageId: string, imageUrl: string, priority: number) => void
  imageState: 'idle' | 'loading' | 'loaded' | 'error'
}

/**
 * Optimized gallery image component with progressive loading
 */
export const OptimizedGalleryImage: React.FC<OptimizedGalleryImageProps> = ({
  image,
  index,
  onClick,
  onLoadRequest,
  imageState,
}) => {
  const [imgSrc, setImgSrc] = useState<string | null>(null)
  const [imgError, setImgError] = useState(false)

  // Intersection observer to detect when image is near viewport
  const { targetRef, shouldLoad } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '100px', // Start loading 100px before image enters viewport
    triggerOnce: true,
  })

  // Priority calculation: higher priority for images that appear first
  // First 6 images get highest priority (1-6), then decreasing priority
  const priority = index < 6 ? index + 1 : Math.min(index + 3, 20)

  // Request image loading when it should load
  useEffect(() => {
    if (shouldLoad && imageState === 'idle') {
      onLoadRequest(image.id, image.url, priority)
    }
  }, [shouldLoad, imageState, image.id, priority, onLoadRequest, image.url])

  // Set image src when it's loaded
  useEffect(() => {
    if (imageState === 'loaded' && !imgSrc) {
      setImgSrc(image.url)
    }
  }, [imageState, image.url, imgSrc])

  const handleImageError = () => {
    setImgError(true)
  }

  const handleImageLoad = () => {
    setImgError(false)
  }

  const handleClick = () => {
    onClick(image)
  }

  return (
    <div
      ref={targetRef}
      className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-[1.02]"
      onClick={handleClick}
    >
      {/* Loading state */}
      {imageState === 'loading' && !imgSrc && (
        <div className="w-full aspect-[4/3] bg-gray-100 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
            <span className="text-xs text-gray-500">Loading...</span>
          </div>
        </div>
      )}

      {/* Placeholder for images not yet in viewport */}
      {!shouldLoad && imageState === 'idle' && (
        <div className="w-full aspect-[4/3] bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-2 bg-gray-200 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <span className="text-xs text-gray-400">Image {index + 1}</span>
          </div>
        </div>
      )}

      {/* Error state */}
      {imageState === 'error' && (
        <div className="w-full aspect-[4/3] bg-red-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-2 bg-red-100 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <span className="text-xs text-red-600">Failed to load</span>
          </div>
        </div>
      )}

      {/* Actual image using Next.js Image for WebP/AVIF optimization */}
      {imgSrc && !imgError && (
        <>
          <div className="relative w-full aspect-[4/3]">
            <Image
              src={imgSrc}
              alt={image.alt || 'Gallery image'}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              priority={index < 6} // High priority for first 6 images
              quality={85}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              onError={handleImageError}
              onLoad={handleImageLoad}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            />
          </div>

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
        </>
      )}

      {/* Loading indicator for first 6 images */}
      {index < 6 && imageState === 'loading' && imgSrc && (
        <div className="absolute top-2 left-2 bg-black/50 backdrop-blur-sm rounded px-2 py-1">
          <span className="text-xs text-white">Loading...</span>
        </div>
      )}
    </div>
  )
}
