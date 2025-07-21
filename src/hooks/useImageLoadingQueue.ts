import { useCallback, useRef, useState, useEffect } from 'react'

interface ImageLoadingState {
  id: string
  status: 'idle' | 'loading' | 'loaded' | 'error'
  priority: number
  url: string
}

interface UseImageLoadingQueueOptions {
  maxConcurrent?: number
  retryAttempts?: number
  retryDelay?: number
}

/**
 * Custom hook for managing image loading with priority queue
 * Uses a simplified periodic processing approach to avoid circular dependencies
 */
export const useImageLoadingQueue = (options: UseImageLoadingQueueOptions = {}) => {
  const { maxConcurrent = 4 } = options

  const [loadingStates, setLoadingStates] = useState<Map<string, ImageLoadingState>>(new Map())
  const queueRef = useRef<ImageLoadingState[]>([])
  const loadingCountRef = useRef(0)
  const mountedRef = useRef(true)

  // Simple image loading function
  const loadSingleImage = useCallback(async (imageState: ImageLoadingState) => {
    if (!mountedRef.current) return

    try {
      const img = new Image()

      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve()
        img.onerror = () => reject(new Error('Failed to load'))
        img.src = imageState.url
      })

      if (!mountedRef.current) return

      // Update state to loaded
      setLoadingStates((prev) => {
        const newMap = new Map(prev)
        newMap.set(imageState.id, { ...imageState, status: 'loaded' })
        return newMap
      })
    } catch (_error) {
      if (!mountedRef.current) return

      // Update state to error
      setLoadingStates((prev) => {
        const newMap = new Map(prev)
        newMap.set(imageState.id, { ...imageState, status: 'error' })
        return newMap
      })
    } finally {
      if (mountedRef.current) {
        loadingCountRef.current = Math.max(0, loadingCountRef.current - 1)
      }
    }
  }, [])

  // Process queue periodically
  const processQueue = useCallback(() => {
    if (!mountedRef.current || queueRef.current.length === 0) return

    const availableSlots = maxConcurrent - loadingCountRef.current
    if (availableSlots <= 0) return

    // Sort by priority and take available slots
    const sortedQueue = [...queueRef.current].sort((a, b) => a.priority - b.priority)
    const toLoad = sortedQueue.slice(0, availableSlots)

    if (toLoad.length === 0) return

    // Remove from queue
    queueRef.current = queueRef.current.filter((item) => !toLoad.includes(item))

    // Update loading count
    loadingCountRef.current += toLoad.length

    // Update states to loading
    setLoadingStates((prev) => {
      const newMap = new Map(prev)
      toLoad.forEach((item) => {
        newMap.set(item.id, { ...item, status: 'loading' })
      })
      return newMap
    })

    // Start loading (async, non-blocking)
    toLoad.forEach((item) => {
      loadSingleImage(item)
    })
  }, [maxConcurrent, loadSingleImage])

  // Periodic queue processing (every 100ms)
  useEffect(() => {
    const interval = setInterval(processQueue, 100)
    return () => clearInterval(interval)
  }, [processQueue])

  // Cleanup on unmount
  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])

  /**
   * Add image to loading queue
   */
  const requestImageLoad = useCallback(
    (imageId: string, imageUrl: string, priority: number = 10) => {
      // Don't add if already exists
      const existing = loadingStates.get(imageId)
      if (existing && (existing.status === 'loaded' || existing.status === 'loading')) {
        return
      }

      // Check if already in queue
      const inQueue = queueRef.current.some((item) => item.id === imageId)
      if (inQueue) return

      const imageState: ImageLoadingState = {
        id: imageId,
        status: 'idle',
        priority,
        url: imageUrl,
      }

      // Add to states
      setLoadingStates((prev) => {
        const newMap = new Map(prev)
        newMap.set(imageId, imageState)
        return newMap
      })

      // Add to queue
      queueRef.current.push(imageState)
    },
    [loadingStates],
  )

  /**
   * Get loading state for an image
   */
  const getImageState = useCallback(
    (imageId: string): 'idle' | 'loading' | 'loaded' | 'error' => {
      return loadingStates.get(imageId)?.status ?? 'idle'
    },
    [loadingStates],
  )

  return {
    requestImageLoad,
    getImageState,
    loadingStates,
  }
}
