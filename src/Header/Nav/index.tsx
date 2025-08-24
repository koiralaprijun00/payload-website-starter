'use client'

import React, { useState, useRef } from 'react'
import type { Header as HeaderType } from '@/payload-types'
import { ChevronDown, Menu, X, Loader2 } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'

// Removed hardcoded theme links - now using dynamic dropdown items from CMS

export default function HeaderNav({ navItems }: { navItems: NonNullable<HeaderType['navItems']> }) {
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(null)
  const [mobileSubDropdownOpen, setMobileSubDropdownOpen] = useState<string | null>(null)
  const [loadingLink, setLoadingLink] = useState<string | null>(null)
  const closeTimeout = useRef<NodeJS.Timeout | null>(null)
  const router = useRouter()
  const pathname = usePathname()

  // Reset loading state when pathname changes (navigation completes)
  React.useEffect(() => {
    setLoadingLink(null)
  }, [pathname])

  const handleMouseEnter = (navLabel: string) => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current)
    setDropdownOpen(navLabel)
  }

  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setDropdownOpen(null)
    }, 120)
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
      <nav className="gap-4 sm:gap-6 lg:gap-8 items-center hidden md:flex">
        {navItems.map((item, idx) => {
          // Handle missing link data
          if (!item.link || !item.link.label) {
            console.warn('Nav item missing link or label:', item)
            return null
          }

          // Render Donate button dynamically
          if (item.link.label && typeof item.link.label === 'string' && item.link.label.toLowerCase().includes('donate')) {
            return (
              <LoadingLink
                key={item.id || idx}
                href={item.link.url || '#'}
                label={item.link.label}
                className="font-light text-xs sm:text-sm px-4 sm:px-6 py-2 rounded bg-mainOrange text-white hover:bg-orange-600 transition flex items-center"
              >
                {item.link.label}
              </LoadingLink>
            )
          }
          // Any nav item with children (dynamic dropdown)
          if (item.children && item.children.length > 0) {
            return (
              <div
                key={item.id || idx}
                className="relative"
                onMouseEnter={() => handleMouseEnter(item.link.label || '')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className="font-light text-xs sm:text-sm text-blue-900 hover:underline focus:outline-none flex items-center gap-1"
                  type="button"
                >
                  {item.link.label}
                  <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                </button>
                {dropdownOpen === item.link.label && (
                  <div className="absolute left-0 mt-2 w-48 sm:w-56 bg-white border rounded shadow-lg z-50">
                    {item.children.map((child, childIdx) => {
                      if (!child.link || !child.link.label) return null

                      const childHref =
                        child.link.url ||
                        (child.link.reference &&
                        typeof child.link.reference === 'object' &&
                        child.link.reference.value &&
                        typeof child.link.reference.value === 'object' &&
                        'slug' in child.link.reference.value
                          ? `/${child.link.reference.value.slug}`
                          : '#')

                      // Check if this child has sub-children
                      const hasSubChildren = child.children && child.children.length > 0

                      // Check if this child has a valid URL (if not, render as label)
                      const hasValidUrl = child.link.url || 
                        (child.link.reference &&
                        typeof child.link.reference === 'object' &&
                        child.link.reference.value &&
                        typeof child.link.reference.value === 'object' &&
                        'slug' in child.link.reference.value)

                      if (hasSubChildren) {
                        return (
                          <div key={child.id || childIdx}>
                            {/* Render as button only if it has a valid URL */}
                            {hasValidUrl ? (
                              <button
                                onClick={() => handleLinkClick(childHref, child.link.label || '')}
                                className="w-full text-left px-3 sm:px-4 py-2 text-xs sm:text-sm font-light text-blue-900 hover:bg-blue-100 flex items-center gap-2"
                                disabled={loadingLink === child.link.label}
                              >
                                {loadingLink === child.link.label && (
                                  <Loader2 className="w-2 h-2 sm:w-3 sm:h-3 animate-spin" />
                                )}
                                {child.link.label}
                              </button>
                            ) : (
                              /* Render as non-clickable label */
                              <div className="w-full text-left px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-gray-700 bg-gray-50 border-b border-gray-200">
                                {child.link.label}
                              </div>
                            )}
                            {/* Show all grandchildren immediately */}
                            {child.children && (
                              <div className="ml-3 sm:ml-4 pl-2">
                                {child.children.map((grandChild, grandChildIdx) => {
                                  if (!grandChild.link || !grandChild.link.label) return null

                                  const grandChildHref =
                                    grandChild.link.url ||
                                    (grandChild.link.reference &&
                                    typeof grandChild.link.reference === 'object' &&
                                    grandChild.link.reference.value &&
                                    typeof grandChild.link.reference.value === 'object' &&
                                    'slug' in grandChild.link.reference.value
                                      ? `/${grandChild.link.reference.value.slug}`
                                      : '#')

                                  return (
                                    <button
                                      key={grandChild.id || grandChildIdx}
                                      onClick={() =>
                                        handleLinkClick(grandChildHref, grandChild.link.label || '')
                                      }
                                      className="w-full text-left py-1.5 sm:py-2 border-l-2 border-gray-200 pl-2 mb-1 text-xs sm:text-sm font-light text-gray-600 hover:bg-blue-100 flex items-center gap-2"
                                      disabled={loadingLink === grandChild.link.label}
                                    >
                                      {loadingLink === grandChild.link.label && (
                                        <Loader2 className="w-2 h-2 sm:w-3 sm:h-3 animate-spin" />
                                      )}
                                      {grandChild.link.label}
                                    </button>
                                  )
                                })}
                              </div>
                            )}
                          </div>
                        )
                      }

                      // For items without sub-children, render as button only if they have a valid URL
                      if (!hasValidUrl) {
                        return (
                          <div
                            key={child.id || childIdx}
                            className="w-full text-left px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-gray-700 bg-gray-50 border-b border-gray-200"
                          >
                            {child.link.label}
                          </div>
                        )
                      }

                      return (
                        <button
                          key={child.id || childIdx}
                          onClick={() => handleLinkClick(childHref, child.link.label || '')}
                          className="w-full text-left px-3 sm:px-4 py-2 text-xs sm:text-sm font-light text-blue-900 hover:bg-blue-100 flex items-center gap-2"
                          disabled={loadingLink === child.link.label}
                        >
                          {loadingLink === child.link.label && (
                            <Loader2 className="w-2 h-2 sm:w-3 sm:h-3 animate-spin" />
                          )}
                          {child.link.label}
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
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
              className="font-light text-xs sm:text-sm text-blue-900 hover:underline flex items-center"
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
            className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 w-[92vw] sm:w-[90vw] max-w-sm bg-white rounded-2xl shadow-2xl z-50 p-4 sm:p-6 pt-8 sm:pt-10 flex flex-col gap-3 sm:gap-4 animate-fade-in"
            style={{ minHeight: '60vh' }}
          >
            {/* Close button inside panel */}
            <button
              aria-label="Close navigation menu"
              className="absolute top-2 sm:top-3 right-2 sm:right-3 p-1.5 sm:p-2 rounded-full bg-gray-100 text-blue-900 hover:bg-gray-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            {navItems.map((item, idx) => {
              // Handle missing link data
              if (!item.link || !item.link.label) {
                console.warn('Mobile nav item missing link or label:', item)
                return null
              }

              // Donate button
              if (item.link.label && typeof item.link.label === 'string' && item.link.label.toLowerCase().includes('donate')) {
                return (
                  <LoadingLink
                    key={item.id || idx}
                    href={item.link.url || '#'}
                    label={item.link.label}
                    className="font-light text-sm px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-mainOrange text-white hover:bg-orange-600 transition text-center mt-3 sm:mt-4 flex items-center justify-center"
                  >
                    {item.link.label}
                  </LoadingLink>
                )
              }
              // Any nav item with children (dynamic dropdown - expand/collapse on tap)
              if (item.children && item.children.length > 0) {
                const isDropdownOpen = mobileDropdownOpen === item.link.label
                return (
                  <div key={item.id || idx} className="relative">
                    <button
                      className="font-light text-sm text-blue-900 flex items-center gap-1 w-full text-left px-2 py-2 rounded-lg hover:bg-blue-50 transition"
                      type="button"
                      onClick={() =>
                        setMobileDropdownOpen(isDropdownOpen ? null : item.link.label || null)
                      }
                    >
                      {item.link.label}
                      <ChevronDown
                        className={`w-4 h-4 ml-1 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {isDropdownOpen && (
                      <div className="mt-1 ml-3 sm:ml-4 border-l pl-3 sm:pl-4 flex flex-col gap-1 sm:gap-2">
                        {item.children.map((child, childIdx) => {
                          if (!child.link || !child.link.label) return null

                          const childHref =
                            child.link.url ||
                            (child.link.reference &&
                            typeof child.link.reference === 'object' &&
                            child.link.reference.value &&
                            typeof child.link.reference.value === 'object' &&
                            'slug' in child.link.reference.value
                              ? `/${child.link.reference.value.slug}`
                              : '#')

                          // Check if this child has sub-children
                          const hasSubChildren = child.children && child.children.length > 0
                          const isSubDropdownOpen = mobileSubDropdownOpen === child.link.label

                          if (hasSubChildren) {
                            return (
                              <div key={child.id || childIdx} className="relative">
                                <button
                                  className="w-full text-left px-2 py-1.5 sm:py-2 text-sm font-light text-blue-900 hover:bg-blue-100 rounded flex items-center justify-between"
                                  type="button"
                                  onClick={() =>
                                    setMobileSubDropdownOpen(
                                      isSubDropdownOpen ? null : child.link.label || null,
                                    )
                                  }
                                >
                                  <span>{child.link.label}</span>
                                  <ChevronDown
                                    className={`w-3 h-3 transition-transform ${isSubDropdownOpen ? 'rotate-180' : ''}`}
                                  />
                                </button>
                                {isSubDropdownOpen && child.children && (
                                  <div className="mt-1 ml-3 sm:ml-4 border-l pl-3 sm:pl-4 flex flex-col gap-1 sm:gap-2">
                                    {child.children.map((grandChild, grandChildIdx) => {
                                      if (!grandChild.link || !grandChild.link.label) return null

                                      const grandChildHref =
                                        grandChild.link.url ||
                                        (grandChild.link.reference &&
                                        typeof grandChild.link.reference === 'object' &&
                                        grandChild.link.reference.value &&
                                        typeof grandChild.link.reference.value === 'object' &&
                                        'slug' in grandChild.link.reference.value
                                          ? `/${grandChild.link.reference.value.slug}`
                                          : '#')

                                      return (
                                        <button
                                          key={grandChild.id || grandChildIdx}
                                          onClick={() =>
                                            handleLinkClick(
                                              grandChildHref,
                                              grandChild.link.label || '',
                                            )
                                          }
                                          className="w-full text-left px-2 py-1.5 sm:py-2 text-sm font-light text-blue-900 hover:bg-blue-100 rounded flex items-center gap-2"
                                          disabled={loadingLink === grandChild.link.label}
                                        >
                                          {loadingLink === grandChild.link.label && (
                                            <Loader2 className="w-3 h-3 animate-spin" />
                                          )}
                                          {grandChild.link.label}
                                        </button>
                                      )
                                    })}
                                  </div>
                                )}
                              </div>
                            )
                          }

                          return (
                            <button
                              key={child.id || childIdx}
                              onClick={() => handleLinkClick(childHref, child.link.label || '')}
                              className="w-full text-left px-2 py-1.5 sm:py-2 text-sm font-light text-blue-900 hover:bg-blue-100 rounded flex items-center gap-2"
                              disabled={loadingLink === child.link.label}
                            >
                              {loadingLink === child.link.label && (
                                <Loader2 className="w-3 h-3 animate-spin" />
                              )}
                              {child.link.label}
                            </button>
                          )
                        })}
                      </div>
                    )}
                  </div>
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
