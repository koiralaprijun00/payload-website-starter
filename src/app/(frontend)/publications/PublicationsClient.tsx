'use client'
import React, { useState } from 'react'

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

// Removed months array - no longer needed

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

  const filtered = publications.filter((pub) => {
    const yearMatch = selectedYear === '' || pub.year === selectedYear
    const categoryMatch =
      selectedCategory === '' || (pub.category && pub.category.id === selectedCategory)
    return yearMatch && categoryMatch
  })

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
        {filtered.map((pub) => (
          <div
            key={pub.id}
            className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 px-4 py-6"
          >
            <div className="flex-1 min-w-0">
              {/* Category badge at the top */}
              {pub.category && (
                <span className="text-xs text-blue-700 bg-blue-100 rounded px-2 py-0.5 mb-1 inline-block">
                  {pub.category.title}
                </span>
              )}
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                <h2 className="text-lg font-semibold truncate">{pub.title}</h2>
                <span className="text-xs text-gray-500 whitespace-nowrap">{pub.year}</span>
              </div>
              {pub.summary && (
                <p className="text-gray-600 text-sm mt-1 line-clamp-2">{pub.summary}</p>
              )}
            </div>
            <a
              href={pub.documentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto mt-2 md:mt-0 px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition text-center font-medium"
              download
            >
              Download
            </a>
          </div>
        ))}
      </div>
    </main>
  )
}
