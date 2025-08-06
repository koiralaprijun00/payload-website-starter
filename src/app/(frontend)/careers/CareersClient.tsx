'use client'
import React, { useState } from 'react'
import { ChevronDown, MapPin, Clock, Users, Mail } from 'lucide-react'
import { RichText } from '@/components/RichText'

interface Career {
  id: string
  title: string
  status: 'open' | 'closed'
  deadline?: string | null
  location?: string | null
  type?: string | null
  experience?: string | null
  summary?: string | null
  description?: any
  responsibilities?: Array<{ responsibility: string; id?: string }> | null
  requirements?: Array<{ requirement: string; id?: string }> | null
  applicationEmail?: string | null
  applicationInstructions?: string | null
  createdAt: string
  updatedAt: string
}

interface CareersClientProps {
  careers: Career[]
}

export default function CareersClient({ careers }: CareersClientProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

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
    <main className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Careers</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Join our team and make a difference in wildlife conservation. Explore current
          opportunities to contribute to our mission.
        </p>
      </div>

      {/* Open Positions */}
      {openPositions.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-green-800">Open Positions</h2>
          <div className="bg-white rounded-xl shadow divide-y divide-gray-200 overflow-hidden">
            {openPositions.map((career) => {
              const isExpanded = expandedItems.has(career.id)
              const hasContent =
                career.description || career.responsibilities || career.requirements

              return (
                <div key={career.id} className="border-b border-gray-200 last:border-b-0">
                  <div className="px-6 py-6">
                    {/* Header */}
                    <div className="flex items-start gap-4">
                      <div className="flex-1 min-w-0">
                        {/* Status Badge */}
                        <div className="flex items-center gap-3 mb-3">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Open
                          </span>
                          {career.deadline && (
                            <span className="text-sm text-orange-600 font-medium">
                              Deadline: {formatDate(career.deadline)}
                            </span>
                          )}
                        </div>

                        {/* Title and Details */}
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">{career.title}</h3>

                        {/* Job Details */}
                        <div className="flex flex-wrap items-center gap-4 mb-3 text-sm text-gray-600">
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

                        {/* Summary */}
                        {career.summary && (
                          <p className="text-gray-700 text-sm leading-relaxed mb-4">
                            {career.summary}
                          </p>
                        )}
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {/* Apply button */}
                        {career.applicationEmail && (
                          <a
                            href={`mailto:${career.applicationEmail}?subject=Application: ${career.title}`}
                            className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800 transition text-sm font-medium whitespace-nowrap flex items-center gap-1"
                          >
                            <Mail className="w-4 h-4" />
                            Apply Now
                          </a>
                        )}

                        {/* Expand/Collapse button */}
                        {hasContent && (
                          <button
                            onClick={() => toggleExpanded(career.id)}
                            className={`p-2 rounded-full transition-all duration-200 border ${
                              isExpanded
                                ? 'bg-green-100 border-green-200 text-green-700 hover:bg-green-200'
                                : 'bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200 hover:border-gray-300'
                            }`}
                            aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
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

                    {/* Expanded Content */}
                    {hasContent && isExpanded && (
                      <div className="mt-6 pt-6 border-t border-gray-100 transition-all duration-300 ease-out">
                        <div className="space-y-6">
                          {/* Job Description */}
                          {career.description && (
                            <div>
                              <h4 className="text-lg font-semibold text-gray-900 mb-3">
                                Job Description
                              </h4>
                              <div className="prose prose-sm max-w-none">
                                <RichText content={career.description} />
                              </div>
                            </div>
                          )}

                          {/* Key Responsibilities */}
                          {career.responsibilities && career.responsibilities.length > 0 && (
                            <div>
                              <h4 className="text-lg font-semibold text-gray-900 mb-3">
                                Key Responsibilities
                              </h4>
                              <ul className="space-y-2">
                                {career.responsibilities.map((item, index) => (
                                  <li key={item.id || index} className="flex items-start gap-2">
                                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                                    <span className="text-gray-700">{item.responsibility}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Requirements */}
                          {career.requirements && career.requirements.length > 0 && (
                            <div>
                              <h4 className="text-lg font-semibold text-gray-900 mb-3">
                                Requirements
                              </h4>
                              <ul className="space-y-2">
                                {career.requirements.map((item, index) => (
                                  <li key={item.id || index} className="flex items-start gap-2">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                                    <span className="text-gray-700">{item.requirement}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Application Instructions */}
                          {career.applicationInstructions && (
                            <div className="bg-gray-50 rounded-lg p-4">
                              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                                How to Apply
                              </h4>
                              <p className="text-gray-700 whitespace-pre-wrap">
                                {career.applicationInstructions}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
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
          <h2 className="text-2xl font-semibold mb-6 text-gray-600">Recently Closed Positions</h2>
          <div className="bg-white rounded-xl shadow divide-y divide-gray-200 overflow-hidden opacity-75">
            {closedPositions.map((career) => (
              <div key={career.id} className="px-6 py-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Closed
                      </span>
                      {career.deadline && (
                        <span className="text-sm text-gray-500">
                          Deadline was: {formatDate(career.deadline)}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-medium text-gray-700 mb-1">{career.title}</h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
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
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold text-gray-600 mb-4">No Current Openings</h2>
          <p className="text-gray-500 mb-6">
            We don't have any open positions at the moment, but we're always looking for talented
            individuals to join our mission.
          </p>
          <p className="text-gray-500">
            Feel free to send us your resume and we'll keep it on file for future opportunities.
          </p>
        </div>
      )}
    </main>
  )
}
