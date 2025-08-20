'use client'
import React, { useState } from 'react'
import { MapPin, Clock, Users, Mail, ChevronDown } from 'lucide-react'
import type { Career } from '@/payload-types'

interface CareersClientProps {
  careers: Career[]
}

export default function CareersClient({ careers }: CareersClientProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set())

  const toggleExpanded = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const openPositions = careers.filter((career) => career.status === 'open')
  const closedPositions = careers.filter((career) => career.status === 'closed')

  return (
    <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 xl:py-16">
      <div className="text-center mb-8 sm:mb-10 lg:mb-12">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">Careers</h1>
        <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-2xl xl:max-w-3xl mx-auto">
          Join our team and make a difference in wildlife conservation. Explore current
          opportunities to contribute to our mission.
        </p>
      </div>

      {/* Open Positions */}
      {openPositions.length > 0 && (
        <div className="mb-8 sm:mb-10 lg:mb-12">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4 sm:mb-6 text-green-800">
            Open Positions
          </h2>
          <div className="bg-white rounded-xl shadow divide-y divide-gray-200 overflow-hidden">
            {openPositions.map((career) => {
              const isExpanded = expandedIds.has(career.id)
              const hasDetails = Boolean(career.summary || career.applicationInstructions)
              return (
                <div key={career.id} className="border-b border-gray-200 last:border-b-0">
                  <div className="px-4 sm:px-6 py-4 sm:py-6">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
                      <div className="flex-1 min-w-0">
                        {/* Status Badge */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 w-fit">
                            Open
                          </span>
                          {career.deadline && (
                            <span className="text-sm text-orange-600 font-medium">
                              Deadline: {formatDate(career.deadline)}
                            </span>
                          )}
                        </div>

                        {/* Title and Details */}
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 mb-3">
                          {career.title}
                        </h3>

                        {/* Job Details */}
                        <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2 sm:gap-4 mb-3 text-sm text-gray-600">
                          {career.location && (
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {career.location}
                            </div>
                          )}
                          {career.type && (
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {career.type
                                .replace('-', ' ')
                                .replace(/\b\w/g, (l) => l.toUpperCase())}
                            </div>
                          )}
                          {career.experience && (
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {career.experience}
                            </div>
                          )}
                        </div>

                        {/* Details (collapsible) */}
                        {hasDetails && isExpanded && (
                          <div id={`career-details-${career.id}`} className="mt-2 space-y-4">
                            {career.summary && (
                              <p className="text-gray-700 text-sm leading-relaxed">
                                {career.summary}
                              </p>
                            )}
                            {career.applicationInstructions && (
                              <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                                <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                                  How to Apply
                                </h4>
                                <p className="text-gray-700 whitespace-pre-wrap text-sm">
                                  {career.applicationInstructions}
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 flex-shrink-0">
                        {career.applicationEmail && (
                          <a
                            href={`mailto:${career.applicationEmail}?subject=Application: ${career.title}`}
                            className="px-3 sm:px-4 py-2 bg-mainBlue text-white rounded hover:bg-mainBlue transition text-sm font-medium whitespace-nowrap flex items-center justify-center gap-1"
                          >
                            <Mail className="w-4 h-4" />
                            Apply Now
                          </a>
                        )}
                        {hasDetails && (
                          <button
                            onClick={() => toggleExpanded(career.id)}
                            className="px-3 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-100 inline-flex items-center justify-center gap-1"
                            aria-expanded={isExpanded}
                            aria-controls={`career-details-${career.id}`}
                          >
                            <ChevronDown
                              className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                            />
                            <span className="hidden sm:inline">
                              {isExpanded ? 'Hide details' : 'Details'}
                            </span>
                            <span className="sm:hidden">{isExpanded ? 'Hide' : 'More'}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Closed Positions */}
      {closedPositions.length > 0 && (
        <div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4 sm:mb-6 text-gray-600">
            Recently Closed Positions
          </h2>
          <div className="bg-white rounded-xl shadow divide-y divide-gray-200 overflow-hidden opacity-75">
            {closedPositions.map((career) => (
              <div key={career.id} className="px-4 sm:px-6 py-3 sm:py-4">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 w-fit">
                        Closed
                      </span>
                      {career.deadline && (
                        <span className="text-sm text-gray-500">
                          Deadline was: {formatDate(career.deadline)}
                        </span>
                      )}
                    </div>
                    <h3 className="text-base sm:text-lg font-medium text-gray-700 mb-1">
                      {career.title}
                    </h3>
                    <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2 sm:gap-4 text-sm text-gray-500">
                      {career.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {career.location}
                        </div>
                      )}
                      {career.type && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {career.type.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No positions message */}
      {careers.length === 0 && (
        <div className="text-center py-12 sm:py-16">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-600 mb-3 sm:mb-4">
            No Current Openings
          </h2>
          <p className="text-gray-500 mb-4 sm:mb-6 text-sm sm:text-base">
            We don&apos;t have any open positions at the moment, but we&apos;re always looking for
            talented individuals to join our mission.
          </p>
          <p className="text-gray-500 text-sm sm:text-base">
            Feel free to send us your resume and we&apos;ll keep it on file for future
            opportunities.
          </p>
        </div>
      )}
    </main>
  )
}
