'use client'

import { useEffect, useRef } from 'react'

interface ScrollAnimationOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

export function useScrollAnimation<T extends HTMLElement = HTMLElement>(
  options: ScrollAnimationOptions = {},
) {
  const elementRef = useRef<T>(null)
  const { threshold = 0.2, rootMargin = '0px', triggerOnce = true } = options

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // Check if Intersection Observer is supported
    if (!('IntersectionObserver' in window)) {
      // Fallback: immediately show the element
      element.classList.add('in-view')
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')

            if (triggerOnce) {
              observer.unobserve(entry.target)
            }
          } else if (!triggerOnce) {
            entry.target.classList.remove('in-view')
          }
        })
      },
      {
        threshold,
        rootMargin,
      },
    )

    observer.observe(element)

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [threshold, rootMargin, triggerOnce])

  return elementRef
}

// Custom hook for staggered animations
export function useStaggeredAnimation<T extends HTMLElement = HTMLElement>(delay: number = 0) {
  const elementRef = useRef<T>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // Add delay class based on the provided delay
    if (delay === 200) {
      element.classList.add('animate-delay-200')
    } else if (delay === 400) {
      element.classList.add('animate-delay-400')
    } else if (delay === 600) {
      element.classList.add('animate-delay-600')
    }

    // Add base animation class
    element.classList.add('animate-on-scroll')
  }, [delay])

  const scrollRef = useScrollAnimation({ threshold: 0.2, triggerOnce: true })

  // Combine the refs
  useEffect(() => {
    if (elementRef.current && scrollRef.current !== elementRef.current) {
      scrollRef.current = elementRef.current
    }
  })

  return elementRef
}
