'use client'
import React, { useEffect, useState } from 'react'

interface ScrollProgressSliderProps {
  className?: string
}

export const ScrollProgressSlider: React.FC<ScrollProgressSliderProps> = ({ className = '' }) => {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const calculateScrollProgress = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = (winScroll / height) * 100

      // Clamp between 0 and 100
      setScrollProgress(Math.min(100, Math.max(0, scrolled)))
    }

    // Calculate on mount
    calculateScrollProgress()

    // Add scroll listener
    window.addEventListener('scroll', calculateScrollProgress, { passive: true })

    // Cleanup
    return () => {
      window.removeEventListener('scroll', calculateScrollProgress)
    }
  }, [])

  return (
    <div className={`w-full ${className}`}>
      {/* Background track */}
      <div className="h-1 bg-gray-200 rounded-full">
        {/* Progress bar */}
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 transition-all duration-150 ease-out rounded-full"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </div>
  )
}
