'use client'
import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface Publication {
  id: string
  title: string
  summary?: string
  month?: string
  year?: number
  documentUrl: string
  category?: { id: string; title: string } | null
}

interface Category {
  id: string
  title: string
}

export default function PublicationsClient({
  publications,
  years,
  categories,
}: {
  publications: Publication[]
  years: (number | undefined)[]
  categories: Category[]
}) {
  const [selectedYear, setSelectedYear] = useState<number | ''>('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

  const filtered = publications.filter((pub) => {
    const yearMatch = selectedYear === '' || pub.year === selectedYear
    const categoryMatch =
      selectedCategory === '' || (pub.category && pub.category.id === selectedCategory)
    return yearMatch && categoryMatch
  })

  const toggleExpanded = (id: string) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Publications</h1>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-8 items-stretch sm:items-center sm:justify-center">
        <select
          className="border rounded px-3 py-2 text-sm w-full sm:w-auto"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value === '' ? '' : Number(e.target.value))}
        >
          <option value="">All Years</option>
          {years.map(
            (year) =>
              year && (
                <option key={year} value={year}>
                  {year}
                </option>
              ),
          )}
        </select>
        <select
          className="border rounded px-3 py-2 text-sm w-full sm:w-auto"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.title}
            </option>
          ))}
        </select>
      </div>
      {/* List */}
      <div className="divide-y divide-gray-200 bg-white rounded-xl shadow overflow-hidden">
        {filtered.length === 0 && (
          <div className="text-center text-gray-500 py-16">No publications found.</div>
        )}
        {filtered.map((pub) => {
          const isExpanded = expandedItems.has(pub.id)
          const hasSummary = pub.summary && pub.summary.trim().length > 0

          return (
            <div key={pub.id} className="border-b border-gray-200 last:border-b-0">
              <div className="px-4 py-6">
                {/* Header - Always visible */}
                <div className="flex items-start gap-4">
                  <div className="flex-1 min-w-0">
                    {/* Category badge */}
                    {pub.category && (
                      <span className="text-xs text-blue-700 bg-blue-100 rounded px-2 py-0.5 mb-2 inline-block">
                        {pub.category.title}
                      </span>
                    )}

                    {/* Title and Year */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                      <h2 className="text-lg font-semibold text-gray-900 leading-tight">
                        {pub.title}
                      </h2>
                      {pub.year && (
                        <span className="text-sm text-gray-500 whitespace-nowrap">{pub.year}</span>
                      )}
                    </div>

                    {/* Summary Preview - Only show if there's a summary and not expanded */}
                    {hasSummary && !isExpanded && (
                      <p className="text-gray-600 text-sm line-clamp-2 mb-3">{pub.summary}</p>
                    )}
                  </div>

                  {/* Action buttons - Positioned on the right */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {/* Download button */}
                    <a
                      href={pub.documentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition text-sm font-medium whitespace-nowrap"
                      download
                    >
                      Download
                    </a>

                    {/* Expand/Collapse button */}
                    {hasSummary && (
                      <button
                        onClick={() => toggleExpanded(pub.id)}
                        className={`p-2 rounded-full transition-all duration-200 border ${
                          isExpanded
                            ? 'bg-blue-100 border-blue-200 text-blue-700 hover:bg-blue-200'
                            : 'bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200 hover:border-gray-300'
                        }`}
                        aria-label={isExpanded ? 'Collapse summary' : 'Expand summary'}
                      >
                        <ChevronDown
                          className={`w-5 h-5 transition-transform duration-200 ${
                            isExpanded ? 'rotate-0' : '-rotate-90'
                          }`}
                        />
                      </button>
                    )}
                  </div>
                </div>

                {/* Expanded Summary */}
                {hasSummary && isExpanded && (
                  <div className="mt-4 pt-4 border-t border-gray-100 transition-all duration-300 ease-out">
                    <div className="prose prose-sm max-w-none">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {pub.summary}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </main>
  )
}
