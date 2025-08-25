'use client'

import React, { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChevronDown } from 'lucide-react'
import type { Category } from '@/payload-types'

const YEARS = [2025, 2024, 2023, 2022, 2021, 2020, 2019]
const STATUS = [
  { label: 'Ongoing', value: 'ongoing' },
  { label: 'Completed', value: 'completed' },
]

interface ProjectsFilterProps {
  categories: Category[]
}

export default function ProjectsFilter({ categories }: ProjectsFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Local state for filters
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get('categories')?.split(',').filter(Boolean) || [],
  )
  const [selectedAreas, setSelectedAreas] = useState<string[]>(
    searchParams.get('area')?.split(',').filter(Boolean) || [],
  )
  const [selectedYears, setSelectedYears] = useState<string[]>(
    searchParams.get('year')?.split(',').filter(Boolean) || [],
  )
  const [selectedStatus, setSelectedStatus] = useState<string[]>(
    searchParams.get('status')?.split(',').filter(Boolean) || [],
  )

  // Update URL when filters change
  const updateURL = () => {
    const params = new URLSearchParams()

    if (search) params.set('search', search)
    if (selectedCategories.length > 0) params.set('categories', selectedCategories.join(','))
    if (selectedAreas.length > 0) params.set('area', selectedAreas.join(','))
    if (selectedYears.length > 0) params.set('year', selectedYears.join(','))
    if (selectedStatus.length > 0) params.set('status', selectedStatus.join(','))

    const newURL = params.toString() ? `?${params.toString()}` : ''
    router.push(`/projects${newURL}`)
  }

  // Handle category selection
  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  // Handle year selection
  const toggleYear = (year: string) => {
    setSelectedYears((prev) =>
      prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year],
    )
  }

  // Handle status selection
  const toggleStatus = (status: string) => {
    setSelectedStatus((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status],
    )
  }

  // Handle area input
  const handleAreaChange = (value: string) => {
    const areas = value
      .split(',')
      .map((area) => area.trim())
      .filter(Boolean)
    setSelectedAreas(areas)
  }

  // Apply filters
  const applyFilters = () => {
    updateURL()
  }

  // Reset filters
  const resetFilters = () => {
    setSearch('')
    setSelectedCategories([])
    setSelectedAreas([])
    setSelectedYears([])
    setSelectedStatus([])
    router.push('/projects')
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="mb-6 sm:mb-8">
        <div className="text-base sm:text-lg lg:text-xl font-bold text-mainBlue mb-1">
          Browse and read the latest projects
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-mainBlue">
          All our Projects
        </h1>
      </div>

      {/* Search Input */}
      <div>
        <input
          type="text"
          placeholder="Search projects"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 sm:px-4 py-2 mb-4 text-sm sm:text-base"
        />
      </div>

      {/* Mobile accordion to show/hide all filters */}
      <details className="block lg:hidden mb-6">
        <summary className="bg-mainBlue text-white py-2 px-4 rounded font-bold flex items-center justify-between cursor-pointer select-none text-sm sm:text-base">
          <span>Filter Options</span>
          <ChevronDown className="w-4 h-4" />
        </summary>
        <div className="mt-4 space-y-6 sm:space-y-8">
          {/* Categories */}
          <div>
            <div className="font-bold mb-2 text-sm sm:text-base">Categories</div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <label key={category.id} className="text-sm sm:text-base">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => toggleCategory(category.id)}
                    className="mr-1"
                  />
                  {category.title}
                </label>
              ))}
            </div>
          </div>

          {/* Project Area */}
          <div>
            <div className="font-bold mb-2 text-sm sm:text-base">Project Area</div>
            <input
              type="text"
              placeholder="e.g., Bardiya, Kathmandu"
              value={selectedAreas.join(', ')}
              onChange={(e) => handleAreaChange(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 sm:px-4 py-2 text-sm sm:text-base"
            />
            <p className="text-xs text-gray-500 mt-1">Use commas for multiple areas</p>
          </div>

          {/* Year */}
          <div>
            <div className="font-bold mb-2 text-sm sm:text-base">Year</div>
            <div className="flex flex-wrap gap-2">
              {YEARS.map((year) => (
                <label key={year} className="text-sm sm:text-base">
                  <input
                    type="checkbox"
                    checked={selectedYears.includes(String(year))}
                    onChange={() => toggleYear(String(year))}
                    className="mr-1"
                  />
                  {year}
                </label>
              ))}
            </div>
          </div>

          {/* Project Status */}
          <div>
            <div className="font-bold mb-2 text-sm sm:text-base">Project status</div>
            <div className="flex gap-2">
              {STATUS.map((s) => (
                <label key={s.value} className="text-sm sm:text-base">
                  <input
                    type="checkbox"
                    checked={selectedStatus.includes(s.value)}
                    onChange={() => toggleStatus(s.value)}
                    className="mr-1"
                  />
                  {s.label}
                </label>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={applyFilters}
              className="flex-1 bg-mainBlue text-white py-2 rounded font-bold text-sm sm:text-base"
            >
              Apply Filters
            </button>
            <button
              type="button"
              onClick={resetFilters}
              className="px-4 py-2 border border-gray-300 rounded text-sm sm:text-base"
            >
              Reset
            </button>
          </div>
        </div>
      </details>

      {/* Desktop filter groups */}
      <div className="hidden lg:block space-y-6 sm:space-y-8">
        {/* Categories */}
        <div>
          <div className="font-bold mb-2 text-sm sm:text-base">Categories</div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <label key={category.id} className="text-sm sm:text-base">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.id)}
                  onChange={() => toggleCategory(category.id)}
                  className="mr-1"
                />
                {category.title}
              </label>
            ))}
          </div>
        </div>

        {/* Project Area */}
        <div>
          <div className="font-bold mb-2 text-sm sm:text-base">Project Area</div>
          <input
            type="text"
            placeholder="e.g., Bardiya, Kathmandu"
            value={selectedAreas.join(', ')}
            onChange={(e) => handleAreaChange(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 sm:px-4 py-2 text-sm sm:text-base"
          />
          <p className="text-xs text-gray-500 mt-1">Use commas for multiple areas</p>
        </div>

        {/* Year */}
        <div>
          <div className="font-bold mb-2 text-sm sm:text-base">Year</div>
          <div className="flex flex-wrap gap-2">
            {YEARS.map((year) => (
              <label key={year} className="text-sm sm:text-base">
                <input
                  type="checkbox"
                  checked={selectedYears.includes(String(year))}
                  onChange={() => toggleYear(String(year))}
                  className="mr-1"
                />
                {year}
              </label>
            ))}
          </div>
        </div>

        {/* Project Status */}
        <div>
          <div className="font-bold mb-2 text-sm sm:text-base">Project status</div>
          <div className="flex gap-2">
            {STATUS.map((s) => (
              <label key={s.value} className="text-sm sm:text-base">
                <input
                  type="checkbox"
                  checked={selectedStatus.includes(s.value)}
                  onChange={() => toggleStatus(s.value)}
                  className="mr-1"
                />
                {s.label}
              </label>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={applyFilters}
            className="flex-1 bg-mainBlue text-white py-2 rounded font-bold text-sm sm:text-base"
          >
            Apply Filters
          </button>
          <button
            type="button"
            onClick={resetFilters}
            className="px-4 py-2 border border-gray-300 rounded text-sm sm:text-base"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}
