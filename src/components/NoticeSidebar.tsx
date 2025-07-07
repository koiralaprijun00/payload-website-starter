import React, { useEffect, useRef, useState } from 'react'
import { Media } from './Media'
import RichText from './RichText'

interface NoticeSidebarProps {
  open: boolean
  onClose: () => void
  notice: {
    title: string
    category: string
    summary?: string
    image?: never
    content?: never
  } | null
}

const categoryLabel: Record<string, string> = {
  ecosystem: 'Ecosystem',
  species: 'Species',
  community: 'Community',
  policy: 'Policy',
}

export const NoticeSidebar: React.FC<NoticeSidebarProps> = ({ open, onClose, notice }) => {
  const sidebarRef = useRef<HTMLDivElement>(null)
  const [imageModalOpen, setImageModalOpen] = useState(false)

  // Close on ESC for sidebar and modal
  useEffect(() => {
    if (!open && !imageModalOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (imageModalOpen) setImageModalOpen(false)
        else onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose, imageModalOpen])

  // Close sidebar on click outside
  useEffect(() => {
    if (!open) return
    const handleClick = (e: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open, onClose])

  // Close image modal on click outside
  const imageModalRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!imageModalOpen) return
    const handleClick = (e: MouseEvent) => {
      if (imageModalRef.current && !imageModalRef.current.contains(e.target as Node)) {
        setImageModalOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [imageModalOpen])

  useEffect(() => {
    // Reset image modal when notice changes or sidebar opens
    setImageModalOpen(false)
  }, [notice, open])

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}
      aria-hidden={!open}
    >
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 right-0 h-full bg-white shadow-2xl w-[45vw] max-w-xl transition-transform duration-300 flex flex-col overflow-y-auto
          ${open ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ minWidth: 320 }}
      >
        <button
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        {notice && (
          <div className="p-8 pt-14 overflow-x-hidden">
            <div className="mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                {categoryLabel[notice.category] || notice.category}
              </span>
              <h2 className="mt-1 text-2xl font-bold text-mainBlue break-words">{notice.title}</h2>
            </div>
            {notice.summary && <p className="mb-4 text-gray-600 text-base">{notice.summary}</p>}
            {notice.image && typeof notice.image === 'object' && (
              <div
                className="mb-6 w-full flex justify-center items-center border bg-gray-100 cursor-zoom-in relative group"
                style={{ maxHeight: '60vh' }}
                onClick={() => setImageModalOpen(true)}
                title="Click to enlarge"
              >
                <Media
                  resource={notice.image}
                  fill={false}
                  imgClassName="object-contain max-h-[60vh] w-auto h-auto"
                />
                {/* Magnifier icon overlay */}
                <div className="absolute bottom-2 right-2 bg-white/80 rounded-full p-1 shadow group-hover:scale-110 transition-transform">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-gray-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                    />
                  </svg>
                  {/* Tooltip */}
                  <span className="absolute bottom-10 right-0 mb-1 px-2 py-1 text-xs text-white bg-black/80 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                    Click to enlarge
                  </span>
                </div>
              </div>
            )}
            {notice.content && (
              <div className="prose max-w-none break-words">
                <RichText data={notice.content} />
              </div>
            )}
          </div>
        )}
      </div>
      {/* Image Modal */}
      {imageModalOpen && notice?.image && typeof notice.image === 'object' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div
            ref={imageModalRef}
            className="relative flex flex-col items-center bg-white rounded shadow-lg max-w-[80vw] max-h-[80vh] p-4"
          >
            <button
              className="absolute top-2 right-2 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition"
              onClick={() => setImageModalOpen(false)}
              aria-label="Close image modal"
            >
              <svg
                className="w-6 h-6 text-gray-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <Media
              resource={notice.image}
              fill={false}
              imgClassName="object-contain max-w-[75vw] max-h-[70vh] w-auto h-auto"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default NoticeSidebar
