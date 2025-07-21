import React from 'react'
import { Phone, Mail, Heart } from 'lucide-react'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import type { Footer as FooterType } from '@/payload-types'

// Lightweight inline SVG icons
const socialIcons = {
  facebook:
    'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
  twitter:
    'M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z',
  instagram:
    'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
}

export async function Footer() {
  const footerData = (await getCachedGlobal('footer', 1)()) as FooterType

  // Get background image URL
  let backgroundImageUrl = '/footer-background.jpg' // fallback

  if (footerData?.backgroundImage) {
    if (typeof footerData.backgroundImage === 'string') {
      // If it's just an ID, we can't easily get the filename, so use the ID approach
      backgroundImageUrl = `/api/media/file/${footerData.backgroundImage}`
    } else {
      // If it's a media object, use the URL or filename
      if (footerData.backgroundImage.url) {
        backgroundImageUrl = getMediaUrl(footerData.backgroundImage.url)
      } else if (footerData.backgroundImage.filename) {
        backgroundImageUrl = getMediaUrl(`/media/${footerData.backgroundImage.filename}`)
      }
    }
  }

  return (
    <footer className="relative lg:min-h-[90vh]">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-no-repeat overflow-hidden"
        style={{
          backgroundImage: `url('${backgroundImageUrl}')`,
          backgroundPosition: 'center 20%',
          transform: 'translateY(-40%)',
          zIndex: -1,
        }}
      />

      {/* Gradient overlay - transparent to solid */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, transparent 0%, transparent 20%, rgba(30, 58, 138, 0.2) 30%, rgba(30, 58, 138, 0.6) 40%, rgba(30, 58, 138, 0.9) 50%, rgba(30, 58, 138, 1.0) 60%, rgba(30, 58, 138, 1.0) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 min-h-[70vh] lg:min-h-[90vh] flex flex-col items-center justify-center px-4 py-12 sm:py-16">
        <div className="max-w-7xl w-full flex flex-col lg:flex-row justify-end items-center lg:items-center gap-12 sm:gap-16 text-center lg:text-left">
          {/* Left Column - Contact Info */}
          <div className="text-white space-y-6 flex-1 order-3 lg:order-1 text-center lg:text-right items-center lg:items-end flex flex-col">
            {/* Address */}
            <div className="mb-4">
              <p className="text-base text-gray-200 mr-0">
                {footerData?.address || 'Kathmandu, Nepal'}
              </p>
            </div>
            {/* Phone */}
            <div className="flex items-center justify-end gap-3 mb-2">
              <Phone className="w-6 h-6 text-white" />
              <span className="text-base text-gray-200">{footerData?.phone || ''}</span>
            </div>
            {/* Email */}
            <div className="flex items-center justify-end gap-3">
              <Mail className="w-6 h-6 text-white" />
              <span className="text-base text-gray-200">{footerData?.email || ''}</span>
            </div>
          </div>

          {/* Center Column - Logo and Mission */}
          <div className="text-center flex-1 lg:flex-[1.4] order-1 lg:order-2 flex flex-col items-center">
            <div className="bg-blue-800 bg-opacity-90 backdrop-blur-sm p-8 md:p-12 min-h-[24rem] md:min-h-[32rem] shadow-2xl flex flex-col items-center">
              {/* Logo */}
              <div className="mb-6">
                <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-blue-800 rounded-full flex items-center justify-center relative">
                    <div className="text-white font-bold text-xs">
                      {/* Stylized logo representation */}
                      <svg viewBox="0 0 40 40" className="w-10 h-10 fill-current">
                        <circle cx="20" cy="15" r="8" />
                        <path d="M12 25 Q20 30 28 25 Q24 35 20 35 Q16 35 12 25" />
                        <circle cx="16" cy="18" r="2" />
                        <circle cx="24" cy="18" r="2" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-2xl lg:text-3xl font-bold text-white mb-6">Ujalyo Nepal</h1>

              {/* Mission Statement */}
              <p className="text-gray-100 text-base leading-relaxed mb-8">
                {footerData?.mission ||
                  'A world where humans and wildlife co-exist in harmony and both people and wildlife are equally valued.'}
              </p>

              {/* Donate Button */}
              {footerData?.donateButton?.url ? (
                <a
                  href={footerData.donateButton.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 flex items-center gap-2 mx-auto transition-all duration-300 transform hover:scale-105 shadow-lg text-base"
                >
                  <Heart className="w-5 h-5" />
                  {footerData.donateButton.text || 'DONATE NOW'}
                </a>
              ) : (
                <button
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 flex items-center gap-2 mx-auto transition-all duration-300 transform hover:scale-105 shadow-lg text-base"
                  disabled
                >
                  <Heart className="w-5 h-5" />
                  {footerData?.donateButton?.text || 'DONATE NOW'}
                </button>
              )}
            </div>
          </div>

          {/* Right Column - Navigation */}
          <div className="text-white flex-1 order-2 lg:order-3 text-center lg:text-left items-center lg:items-start flex flex-col">
            <nav className="space-y-4">
              {(footerData?.navItems || []).map((item, idx) => {
                if (!item?.link?.label) return null
                // Custom URL
                if (item.link.url) {
                  return (
                    <a
                      key={idx}
                      href={item.link.url}
                      className="block text-lg hover:text-orange-400 transition-colors duration-300 hover:translate-x-2 transform"
                      target={item.link.newTab ? '_blank' : undefined}
                      rel={item.link.newTab ? 'noopener noreferrer' : undefined}
                    >
                      {item.link.label}
                    </a>
                  )
                }
                // Internal reference
                if (item.link.reference && typeof item.link.reference === 'object') {
                  const ref = item.link.reference
                  let href = '/'
                  // ref.value can be a string (ID) or an object (Page/Post)
                  const value = ref.value
                  if (
                    ref.relationTo === 'pages' &&
                    value &&
                    typeof value === 'object' &&
                    'slug' in value &&
                    value.slug
                  ) {
                    href = `/${value.slug}`
                  } else if (
                    ref.relationTo === 'posts' &&
                    value &&
                    typeof value === 'object' &&
                    'slug' in value &&
                    value.slug
                  ) {
                    href = `/posts/${value.slug}`
                  }
                  return (
                    <a
                      key={idx}
                      href={href}
                      className="block text-lg hover:text-orange-400 transition-colors duration-300 hover:translate-x-2 transform"
                    >
                      {item.link.label}
                    </a>
                  )
                }
                return null
              })}
            </nav>
          </div>
        </div>

        {/* Copyright Bar with 3 sections - Below content */}
        <div className="w-full mt-8">
          <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center text-gray-300 text-sm gap-4 md:gap-0 text-center md:text-left">
            {/* Left: Copyright */}
            <div className="flex-1 md:text-left">
              <p>&copy; 2024 Ujalyo Nepal. All rights reserved.</p>
            </div>

            {/* Center: Social Media Icons */}
            <div className="flex-1 flex justify-center order-last md:order-none">
              <div className="flex gap-6">
                {/* Debug: Show all icons if no social data */}
                {(!footerData?.socials || footerData.socials.length === 0) && (
                  <>
                    <a href="#" aria-label="Facebook">
                      <svg
                        className="w-5 h-5 text-white hover:text-blue-400 transition-colors duration-300"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d={socialIcons.facebook} />
                      </svg>
                    </a>
                    <a href="#" aria-label="Twitter">
                      <svg
                        className="w-5 h-5 text-white hover:text-blue-400 transition-colors duration-300"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d={socialIcons.twitter} />
                      </svg>
                    </a>
                    <a href="#" aria-label="Instagram">
                      <svg
                        className="w-5 h-5 text-white hover:text-blue-400 transition-colors duration-300"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d={socialIcons.instagram} />
                      </svg>
                    </a>
                  </>
                )}

                {(footerData?.socials || []).map((social, idx) => {
                  if (!social?.platform || !social?.url) return null

                  const getSocialIcon = (platform: string) => {
                    const iconClass =
                      'w-5 h-5 text-white hover:text-blue-400 transition-colors duration-300'

                    switch (platform) {
                      case 'facebook':
                        return (
                          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
                            <path d={socialIcons.facebook} />
                          </svg>
                        )
                      case 'twitter':
                        return (
                          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
                            <path d={socialIcons.twitter} />
                          </svg>
                        )
                      case 'instagram':
                        return (
                          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
                            <path d={socialIcons.instagram} />
                          </svg>
                        )
                      default:
                        return null
                    }
                  }

                  const icon = getSocialIcon(social.platform)
                  if (!icon) return null

                  return (
                    <a
                      key={idx}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={
                        social.platform.charAt(0).toUpperCase() + social.platform.slice(1)
                      }
                    >
                      {icon}
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Right: Tagline */}
            <div className="flex-1 md:text-right">
              <p>Protecting wildlife, preserving harmony.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
