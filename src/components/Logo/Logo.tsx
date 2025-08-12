import clsx from 'clsx'
import React from 'react'
import type { Media } from '@/payload-types'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
  logo?: Media | null
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className, logo } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  // Use dynamic logo if available, otherwise fallback to default
  const logoSrc = logo?.url || '/ujyalo-logo.png'
  const logoAlt = logo?.alt || 'Ujalyo Logo'
  const logoWidth = logo?.width || 193
  const logoHeight = logo?.height || 34

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt={logoAlt}
      width={logoWidth}
      height={logoHeight}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx(
        // Size
        'w-auto h-auto max-h-16 md:max-h-20',
        // Appearance: support both transparent and non-transparent assets
        'bg-transparent',
        className,
      )}
      src={logoSrc}
    />
  )
}
