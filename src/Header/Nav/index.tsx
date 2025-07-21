'use client'

import React, { useState, useRef } from 'react'
import type { Header as HeaderType } from '@/payload-types'
import { ChevronDown, Menu, X, Loader2 } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'

const themeLinks = [
  { label: 'Research', href: '/research' },
  { label: 'Community', href: '/community' },
  { label: 'Species', href: '/species' },
  { label: 'Ecosystem', href: '/ecosystem' },
]

export default function HeaderNav({ navItems }: { navItems: NonNullable<HeaderType['navItems']> }) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false)
  const [loadingLink, setLoadingLink] = useState<string | null>(null)
  const closeTimeout = useRef<NodeJS.Timeout | null>(null)
  const router = useRouter()
  const pathname = usePathname()

  // Reset loading state when pathname changes (navigation completes)
  React.useEffect(() => {
    setLoadingLink(null)
  }, [pathname])

  const handleMouseEnter = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current)
    setDropdownOpen(true)
  }

  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => setDropdownOpen(false), 120)
  }

  const handleLinkClick = (href: string, label: string) => {
    setLoadingLink(label)
    router.push(href)
  }

  // Custom link component with loading state
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const LoadingLink = ({ href, label, className, children, ...props }: any) => {
    const isLoading = loadingLink === label
    return (
      <button
        onClick={() => handleLinkClick(href, label)}
        className={className}
        disabled={isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="w-3 h-3 animate-spin mr-1" />}
        {children}
      </button>
    )
  }

  // Prevent scrolling when mobile menu is open
  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  return (
    <>
      {/* Hamburger for mobile */}
      <button
        className="md:hidden p-2 text-blue-900 z-50"
        onClick={() => setMobileMenuOpen((open) => !open)}
        aria-label="Toggle navigation menu"
      >
        {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
      </button>
      {/* Desktop nav */}
      <nav className="gap-8 items-center hidden md:flex">
        {navItems.map((item, idx) => {
          // Handle missing link data
          if (!item.link || !item.link.label) {
            console.warn('Nav item missing link or label:', item)
            return null
          }

          // Render Donate button dynamically
          if (item.link.label && item.link.label.toLowerCase().includes('donate')) {
            return (
              <LoadingLink
                key={item.id || idx}
                href={item.link.url || '#'}
                label={item.link.label}
                className="font-light text-sm px-6 py-2 rounded bg-mainOrange text-white hover:bg-orange-600 transition flex items-center"
              >
                {item.link.label}
              </LoadingLink>
            )
          }
          // Themes dropdown
          if (item.link.label === 'Themes') {
            return (
              <div
                key={item.id || idx}
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className="font-light text-sm text-blue-900 hover:underline focus:outline-none flex items-center gap-1"
                  type="button"
                >
                  {item.link.label}
                  <ChevronDown className="w-4 h-4 ml-1" />
                </button>
                {dropdownOpen && (
                  <div className="absolute left-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
                    {themeLinks.map((theme) => (
                      <button
                        key={theme.href}
                        onClick={() => handleLinkClick(theme.href, theme.label)}
                        className="w-full text-left px-4 py-2 text-sm font-light text-blue-900 hover:bg-blue-100 flex items-center gap-2"
                        disabled={loadingLink === theme.label}
                      >
                        {loadingLink === theme.label && (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        )}
                        {theme.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )
          }
          // Any other nav item with children (show arrow, but no dropdown logic yet)
          if (item.children && item.children.length > 0) {
            return (
              <span
                key={item.id || idx}
                className="font-light text-sm text-blue-900 flex items-center gap-1"
              >
                {item.link.label}
                <ChevronDown className="w-4 h-4 ml-1" />
              </span>
            )
          }
          // Default nav item (including Home)
          const href =
            item.link.url ||
            (item.link.reference &&
            typeof item.link.reference === 'object' &&
            item.link.reference.value &&
            typeof item.link.reference.value === 'object' &&
            'slug' in item.link.reference.value
              ? `/${item.link.reference.value.slug}`
              : '#')

          return (
            <LoadingLink
              key={item.id || idx}
              href={href}
              label={item.link.label}
              className="font-light text-sm text-blue-900 hover:underline flex items-center"
            >
              {item.link.label}
            </LoadingLink>
          )
        })}
      </nav>
      {/* Mobile nav overlay and menu */}
      {mobileMenuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity duration-200"
            onClick={() => setMobileMenuOpen(false)}
          />
          {/* Menu panel */}
          <nav
            className="fixed top-6 left-1/2 -translate-x-1/2 w-[90vw] max-w-sm bg-white rounded-2xl shadow-2xl z-50 p-6 flex flex-col gap-4 animate-fade-in"
            style={{ minHeight: '60vh' }}
          >
            {navItems.map((item, idx) => {
              // Handle missing link data
              if (!item.link || !item.link.label) {
                console.warn('Mobile nav item missing link or label:', item)
                return null
              }

              // Donate button
              if (item.link.label && item.link.label.toLowerCase().includes('donate')) {
                return (
                  <LoadingLink
                    key={item.id || idx}
                    href={item.link.url || '#'}
                    label={item.link.label}
                    className="font-light text-sm px-6 py-3 rounded-lg bg-mainOrange text-white hover:bg-orange-600 transition text-center mt-4 flex items-center justify-center"
                  >
                    {item.link.label}
                  </LoadingLink>
                )
              }
              // Themes dropdown (expand/collapse on tap)
              if (item.link.label === 'Themes') {
                return (
                  <div key={item.id || idx} className="relative">
                    <button
                      className="font-light text-sm text-blue-900 flex items-center gap-1 w-full text-left px-2 py-2 rounded-lg hover:bg-blue-50 transition"
                      type="button"
                      onClick={() => setMobileDropdownOpen((open) => !open)}
                    >
                      {item.link.label}
                      <ChevronDown
                        className={`w-4 h-4 ml-1 transition-transform ${mobileDropdownOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {mobileDropdownOpen && (
                      <div className="mt-1 ml-4 border-l pl-4 flex flex-col gap-2">
                        {themeLinks.map((theme) => (
                          <button
                            key={theme.href}
                            onClick={() => handleLinkClick(theme.href, theme.label)}
                            className="w-full text-left px-2 py-2 text-sm font-light text-blue-900 hover:bg-blue-100 rounded flex items-center gap-2"
                            disabled={loadingLink === theme.label}
                          >
                            {loadingLink === theme.label && (
                              <Loader2 className="w-3 h-3 animate-spin" />
                            )}
                            {theme.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )
              }
              // Any other nav item with children (show arrow, but no dropdown logic yet)
              if (item.children && item.children.length > 0) {
                return (
                  <span
                    key={item.id || idx}
                    className="font-light text-sm text-blue-900 flex items-center gap-1 px-2 py-2 rounded-lg"
                  >
                    {item.link.label}
                    <ChevronDown className="w-4 h-4 ml-1" />
                  </span>
                )
              }
              // Default nav item (including Home)
              const href =
                item.link.url ||
                (item.link.reference &&
                typeof item.link.reference === 'object' &&
                item.link.reference.value &&
                typeof item.link.reference.value === 'object' &&
                'slug' in item.link.reference.value
                  ? `/${item.link.reference.value.slug}`
                  : '#')

              return (
                <LoadingLink
                  key={item.id || idx}
                  href={href}
                  label={item.link.label}
                  className="font-light text-sm text-blue-900 hover:underline px-2 py-2 rounded-lg hover:bg-blue-50 transition flex items-center"
                >
                  {item.link.label}
                </LoadingLink>
              )
            })}
          </nav>
        </>
      )}
    </>
  )
}

// Add fade-in animation
// In your global CSS or Tailwind config, add:
// @keyframes fade-in { from { opacity: 0; transform: translateY(-10px);} to { opacity: 1; transform: none; } }
// .animate-fade-in { animation: fade-in 0.25s ease; }
