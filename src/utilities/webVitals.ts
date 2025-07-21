'use client'

import { onCLS, onINP, onFCP, onLCP, onTTFB, type Metric } from 'web-vitals'

// Configuration for development vs production
const isDev = process.env.NODE_ENV === 'development'

interface VitalsConfig {
  analyticsId?: string
  debug?: boolean
  url?: string
}

export function reportWebVitals(config: VitalsConfig = {}) {
  const { analyticsId, debug = isDev, url } = config

  function sendToAnalytics(metric: Metric) {
    if (debug) {
      console.log(`[Web Vitals] ${metric.name}:`, metric.value, metric.entries)
    }

    // Send to your analytics service
    if (analyticsId && url) {
      const body = JSON.stringify({
        name: metric.name,
        value: metric.value,
        id: metric.id,
        delta: metric.delta,
        navigationType: metric.navigationType,
        url: window.location.href,
        timestamp: Date.now(),
      })

      // Use sendBeacon if available, otherwise fallback to fetch
      if ('sendBeacon' in navigator) {
        navigator.sendBeacon(url, body)
      } else {
        fetch(url, { body, method: 'POST', keepalive: true }).catch(() => {
          // Silently handle errors
        })
      }
    }
  }

  try {
    // Cumulative Layout Shift (CLS) - measures visual stability
    onCLS(sendToAnalytics)

    // Interaction to Next Paint (INP) - measures interactivity
    onINP(sendToAnalytics)

    // First Contentful Paint (FCP) - measures loading performance
    onFCP(sendToAnalytics)

    // Largest Contentful Paint (LCP) - measures loading performance
    onLCP(sendToAnalytics)

    // Time to First Byte (TTFB) - measures server response time
    onTTFB(sendToAnalytics)
  } catch (err) {
    console.warn('Failed to initialize Web Vitals:', err)
  }
}

// Utility to manually track custom metrics
export function trackCustomMetric(name: string, value: number, unit: string = 'ms') {
  if (isDev) {
    console.log(`[Custom Metric] ${name}: ${value}${unit}`)
  }

  // Send to your analytics service
  if ('sendBeacon' in navigator) {
    navigator.sendBeacon(
      '/api/analytics',
      JSON.stringify({
        name,
        value,
        unit,
        url: window.location.href,
        timestamp: Date.now(),
      }),
    )
  }
}

// Performance observer for resource loading times
export function observeResourceLoading() {
  if (!('PerformanceObserver' in window)) {
    return
  }

  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'resource') {
          const resourceEntry = entry as PerformanceResourceTiming

          // Track slow resources
          if (resourceEntry.duration > 1000) {
            console.warn(`[Slow Resource] ${resourceEntry.name}: ${resourceEntry.duration}ms`)
          }
        }
      }
    })

    observer.observe({ entryTypes: ['resource'] })
  } catch (err) {
    console.warn('Failed to observe resource loading:', err)
  }
}

// Track long tasks that block the main thread
export function observeLongTasks() {
  if (!('PerformanceObserver' in window)) {
    return
  }

  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'longtask') {
          console.warn(`[Long Task] Duration: ${entry.duration}ms, Start: ${entry.startTime}`)
        }
      }
    })

    observer.observe({ entryTypes: ['longtask'] })
  } catch (err) {
    console.warn('Failed to observe long tasks:', err)
  }
}
