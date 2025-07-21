'use client'

import { useEffect } from 'react'
import { reportWebVitals, observeResourceLoading, observeLongTasks } from '@/utilities/webVitals'

export function WebVitalsProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize Web Vitals monitoring
    reportWebVitals({
      debug: process.env.NODE_ENV === 'development',
    })

    // Start observing performance
    observeResourceLoading()
    observeLongTasks()
  }, [])

  return <>{children}</>
}
