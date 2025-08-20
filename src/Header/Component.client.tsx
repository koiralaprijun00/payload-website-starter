'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Logo } from '@/components/Logo/Logo'
import HeaderNav from './Nav'
import type { Header as HeaderType, Media } from '@/payload-types'

export const HeaderClient: React.FC<{
  navItems: NonNullable<HeaderType['navItems']>
  logo: Media | null
}> = ({ navItems, logo }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <header className="relative z-20" {...(theme ? { 'data-theme': theme } : {})}>
      <div className="py-4 sm:py-6 lg:py-8 flex justify-between items-center px-0">
        <Link href="/">
          <Logo
            loading="eager"
            priority="high"
            className="max-h-12 sm:max-h-14 md:max-h-16 lg:max-h-18 xl:max-h-20"
            logo={logo}
          />
        </Link>
        <HeaderNav navItems={navItems} />
      </div>
    </header>
  )
}
