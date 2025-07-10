'use client'

import React, { useState, useRef } from 'react'
import { CMSLink } from '@/components/Link'
import type { Header as HeaderType } from '@/payload-types'

const themeLinks = [
  { label: 'Research', href: '/research' },
  { label: 'Community', href: '/community' },
  { label: 'Species', href: '/species' },
  { label: 'Ecosystem', href: '/ecosystem' },
]

export default function HeaderNav({ navItems }: { navItems: NonNullable<HeaderType['navItems']> }) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const closeTimeout = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current)
    setDropdownOpen(true)
  }

  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => setDropdownOpen(false), 120)
  }

  return (
    <nav className="flex gap-8 items-center">
      {navItems.map((item, idx) => {
        if (item.link.label === 'Themes') {
          return (
            <div
              key={item.id || idx}
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className="font-semibold text-blue-900 hover:underline focus:outline-none"
                type="button"
              >
                {item.link.label}
              </button>
              {dropdownOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
                  {themeLinks.map((theme) => (
                    <a
                      key={theme.href}
                      href={theme.href}
                      className="block px-4 py-2 text-blue-900 hover:bg-blue-100"
                    >
                      {theme.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          )
        }
        // Default nav item
        return (
          <CMSLink
            key={item.id || idx}
            {...item.link}
            className="font-semibold text-blue-900 hover:underline"
          />
        )
      })}
    </nav>
  )
}
