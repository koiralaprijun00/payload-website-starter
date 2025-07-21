import { useEffect, useRef, useState } from 'react'

interface UseIntersectionObserverOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

/**
 * Custom hook for intersection observer
 * Detects when an element is about to enter the viewport
 */
export const useIntersectionObserver = (options: UseIntersectionObserverOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '100px', // Load images 100px before they come into view
    triggerOnce = true,
  } = options

  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasIntersected, setHasIntersected] = useState(false)
  const targetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = targetRef.current
    if (!element) return

    // If already intersected and triggerOnce is true, don't observe again
    if (triggerOnce && hasIntersected) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry) return

        setIsIntersecting(entry.isIntersecting)
        if (entry.isIntersecting && triggerOnce) {
          setHasIntersected(true)
        }
      },
      {
        threshold,
        rootMargin,
      },
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [threshold, rootMargin, triggerOnce, hasIntersected])

  return {
    targetRef,
    isIntersecting,
    hasIntersected,
    shouldLoad: triggerOnce ? hasIntersected : isIntersecting,
  }
}
