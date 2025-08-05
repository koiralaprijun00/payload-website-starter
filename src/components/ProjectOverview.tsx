import React from 'react'
import Image from 'next/image'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import type { Media } from '@/payload-types'
import InteractiveMap from './InteractiveMap'

interface Species {
  species: string
  status: 'CR' | 'EN' | 'VU' | 'NT'
}

interface Partner {
  name: string
  description?: string
  website?: string
}

interface ProjectOverviewData {
  overviewDescription?: string
  speciesAtRisk?: {
    heading?: string
    species?: Species[]
  }
  partners?: {
    heading?: string
    partnersList?: Partner[]
  }
  metrics?: {
    carbonStored?: {
      heading?: string
      value?: string
      unit?: string
    }
    acresConserved?: {
      heading?: string
      value?: string
      method?: string
    }
    projectCost?: {
      heading?: string
      value?: string
    }
  }
  locationMap?: {
    mapImage?: Media | string
    coordinates?: {
      latitude?: number
      longitude?: number
    }
    locationDescription?: string
  }
}

interface ProjectOverviewProps {
  data: ProjectOverviewData
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getStatusLabel = (status: string) => {
  const statusMap = {
    CR: 'Critically Endangered (CR)',
    EN: 'Endangered (EN)',
    VU: 'Vulnerable (VU)',
    NT: 'Near Threatened (NT)',
  }
  return statusMap[status as keyof typeof statusMap] || status
}

const ProjectOverview: React.FC<ProjectOverviewProps> = ({ data }) => {
  if (!data) return null

  const { overviewDescription, speciesAtRisk, partners, metrics, locationMap } = data

  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Section Header */}
        <div className="mb-8">
          <div className="inline-block bg-white px-3 py-1 rounded border-l-4 border-green-600">
            <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">
              PROJECT OVERVIEW
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content (2/3 width) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overview Description */}
            {overviewDescription && (
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-green-700 leading-tight">
                  {overviewDescription}
                </h2>
              </div>
            )}

            {/* Content Grid - 2 columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Species at Risk */}
              {speciesAtRisk?.species && speciesAtRisk.species.length > 0 && (
                <div className="border-l-4 border-green-600 p-4">
                  <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">
                    {speciesAtRisk.heading || 'SPECIES AT RISK'}
                  </h3>
                  <div className="space-y-1">
                    {speciesAtRisk.species.map((species, idx) => (
                      <div key={idx} className="text-gray-900 text-sm leading-relaxed">
                        <span className="font-medium">{species.species}</span>
                        <span className="text-gray-600 ml-1">({species.status})</span>
                        {idx < speciesAtRisk.species!.length - 1 && <span>, </span>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Partners */}
              {partners?.partnersList && partners.partnersList.length > 0 && (
                <div className="border-l-4 border-green-600 p-4">
                  <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">
                    {partners.heading || 'PARTNER'}
                  </h3>
                  <div className="space-y-2">
                    {partners.partnersList.map((partner, idx) => (
                      <div key={idx}>
                        {partner.website ? (
                          <a
                            href={partner.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-900 hover:text-blue-600 font-medium text-sm"
                          >
                            {partner.name}
                          </a>
                        ) : (
                          <div className="text-gray-900 font-medium text-sm">{partner.name}</div>
                        )}
                        {partner.description && (
                          <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                            {partner.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Carbon Stored */}
              {metrics?.carbonStored?.value && (
                <div className="border-l-4 border-green-600 p-4">
                  <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">
                    {metrics.carbonStored.heading || 'CARBON STORED'}
                  </h3>
                  <div className="text-xl font-bold text-gray-900 mb-1">
                    {metrics.carbonStored.value}
                  </div>
                  {metrics.carbonStored.unit && (
                    <div className="text-xs text-gray-600">{metrics.carbonStored.unit}</div>
                  )}
                </div>
              )}

              {/* Acres Conserved */}
              {metrics?.acresConserved?.value && (
                <div className="border-l-4 border-green-600 p-4">
                  <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">
                    {metrics.acresConserved.heading ||
                      `${metrics.acresConserved.value} PROPOSED ACRES CONSERVED BY`}
                  </h3>
                  <div className="text-lg font-semibold text-gray-900">
                    {metrics.acresConserved.method || 'Designation'}
                  </div>
                </div>
              )}
            </div>

            {/* Project Cost - Full Width */}
            {metrics?.projectCost?.value && (
              <div className="border-l-4 border-green-600 p-4">
                <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">
                  {metrics.projectCost.heading || 'PROJECT COST'}
                </h3>
                <div className="text-xl font-bold text-gray-900">{metrics.projectCost.value}</div>
              </div>
            )}
          </div>

          {/* Right Column - Map (1/3 width) */}
          <div className="lg:col-span-1">
            {/* Interactive Map with Coordinates */}
            {locationMap?.coordinates?.latitude && locationMap?.coordinates?.longitude ? (
              <div className="h-[500px] lg:h-[600px]">
                <InteractiveMap
                  latitude={locationMap.coordinates.latitude}
                  longitude={locationMap.coordinates.longitude}
                  locationDescription={locationMap.locationDescription}
                  acresValue={metrics?.acresConserved?.value}
                  acresHeading={metrics?.acresConserved?.heading}
                  className="h-full"
                />
              </div>
            ) : locationMap?.mapImage ? (
              /* Fallback to Static Map Image */
              <div className="bg-white overflow-hidden h-[500px] lg:h-[600px] shadow-lg rounded-lg">
                {/* Map Image */}
                <div className="relative w-full h-full">
                  <Image
                    src={
                      typeof locationMap.mapImage === 'string'
                        ? locationMap.mapImage
                        : getMediaUrl(locationMap.mapImage.url)
                    }
                    alt={
                      typeof locationMap.mapImage === 'string'
                        ? 'Project Location Map'
                        : locationMap.mapImage.alt || 'Project Location Map'
                    }
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />

                  {/* Acres Overlay - positioned on the map */}
                  {metrics?.acresConserved?.value && (
                    <div className="absolute bottom-4 left-4 bg-blue-900 bg-opacity-90 text-white p-3 rounded">
                      <div className="text-xs font-bold uppercase tracking-wider mb-1">
                        PROPOSED ACRES
                      </div>
                      <div className="text-lg font-bold">{metrics.acresConserved.value}</div>
                    </div>
                  )}
                </div>

                {/* Location Description */}
                {locationMap.locationDescription && (
                  <div className="p-4 bg-white">
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {locationMap.locationDescription}
                    </p>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProjectOverview
