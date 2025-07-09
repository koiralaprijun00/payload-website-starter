import React from 'react'
import { Phone, Mail, Heart } from 'lucide-react'
import { siFacebook, siX, siInstagram } from 'simple-icons'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import type { Footer as FooterType } from '@/payload-types'

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

  // Debug: log the URL to console (remove this after debugging)
  console.log('Footer background URL:', backgroundImageUrl)

  return (
    <footer className="relative min-h-[90vh]">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url('${backgroundImageUrl}')`,
          backgroundPosition: 'center 20%',
          transform: 'translateY(-30%)',
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
      <div className="relative z-10 min-h-[90vh] flex flex-col items-center justify-center px-4 py-16">
        <div className="max-w-7xl w-full flex flex-col-reverse lg:flex-row justify-end items-center lg:items-center gap-16 text-center lg:text-left">
          {/* Left Column - Contact Info */}
          <div className="text-white space-y-6 flex-1 order-3 lg:order-1 text-center lg:text-right items-center lg:items-end flex flex-col">
            {/* Address */}
            <div className="mb-4">
              <p className="text-base text-gray-200 mr-0">Kathmandu, Nepal</p>
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
            <div className="bg-blue-800 bg-opacity-90 backdrop-blur-sm p-12 min-h-[32rem] shadow-2xl flex flex-col items-center">
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
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 flex items-center gap-2 mx-auto transition-all duration-300 transform hover:scale-105 shadow-lg text-base">
                <Heart className="w-5 h-5" />
                DONATE NOW
              </button>
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
          <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center text-gray-300 text-sm">
            {/* Left: Copyright */}
            <div className="flex-1 text-left">
              <p>&copy; 2024 Ujalyo Nepal. All rights reserved.</p>
            </div>

            {/* Center: Social Media Icons */}
            <div className="flex-1 flex justify-center">
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
                        <path d={siFacebook.path} />
                      </svg>
                    </a>
                    <a href="#" aria-label="Twitter">
                      <svg
                        className="w-5 h-5 text-white hover:text-blue-400 transition-colors duration-300"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d={siX.path} />
                      </svg>
                    </a>
                    <a href="#" aria-label="Instagram">
                      <svg
                        className="w-5 h-5 text-white hover:text-blue-400 transition-colors duration-300"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d={siInstagram.path} />
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
                            <path d={siFacebook.path} />
                          </svg>
                        )
                      case 'twitter':
                        return (
                          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
                            <path d={siX.path} />
                          </svg>
                        )
                      case 'instagram':
                        return (
                          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
                            <path d={siInstagram.path} />
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
            <div className="flex-1 text-right">
              <p>Protecting wildlife, preserving harmony.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
