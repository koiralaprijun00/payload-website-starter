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
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-block bg-white px-4 py-2 rounded-lg shadow-sm mb-6">
            <span className="text-sm font-bold text-gray-600 uppercase tracking-wider">
              PROJECT OVERVIEW
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Content */}
          <div className="space-y-8">
            {/* Overview Description */}
            {overviewDescription && (
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight mb-6">
                  {overviewDescription}
                </h2>
              </div>
            )}

            {/* Grid of Information Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Species at Risk */}
              {speciesAtRisk?.species && speciesAtRisk.species.length > 0 && (
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wider mb-4">
                    {speciesAtRisk.heading || 'SPECIES AT RISK'}
                  </h3>
                  <div className="space-y-2">
                    {speciesAtRisk.species.map((species, idx) => (
                      <div key={idx} className="text-gray-800">
                        <span className="font-medium">{species.species}</span>
                        <span className="text-sm text-gray-600 ml-2">({species.status})</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Partners */}
              {partners?.partnersList && partners.partnersList.length > 0 && (
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wider mb-4">
                    {partners.heading || 'PARTNER'}
                  </h3>
                  <div className="space-y-3">
                    {partners.partnersList.map((partner, idx) => (
                      <div key={idx}>
                        {partner.website ? (
                          <a
                            href={partner.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-800 hover:text-mainBlue font-medium"
                          >
                            {partner.name}
                          </a>
                        ) : (
                          <div className="text-gray-800 font-medium">{partner.name}</div>
                        )}
                        {partner.description && (
                          <p className="text-sm text-gray-600 mt-1">{partner.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Carbon Stored */}
              {metrics?.carbonStored?.value && (
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wider mb-4">
                    {metrics.carbonStored.heading || 'CARBON STORED'}
                  </h3>
                  <div className="text-2xl font-bold text-gray-800 mb-1">
                    {metrics.carbonStored.value}
                  </div>
                  {metrics.carbonStored.unit && (
                    <div className="text-sm text-gray-600">{metrics.carbonStored.unit}</div>
                  )}
                </div>
              )}

              {/* Acres Conserved */}
              {metrics?.acresConserved?.value && (
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wider mb-4">
                    {metrics.acresConserved.heading ||
                      `${metrics.acresConserved.value} PROPOSED ACRES CONSERVED BY`}
                  </h3>
                  <div className="text-lg font-semibold text-gray-800">
                    {metrics.acresConserved.method || 'Designation'}
                  </div>
                </div>
              )}
            </div>

            {/* Project Cost */}
            {metrics?.projectCost?.value && (
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wider mb-4">
                  {metrics.projectCost.heading || 'PROJECT COST'}
                </h3>
                <div className="text-2xl font-bold text-gray-800">{metrics.projectCost.value}</div>
              </div>
            )}
          </div>

          {/* Right Column - Map */}
          <div className="lg:sticky lg:top-8">
            {/* Interactive Map with Coordinates */}
            {locationMap?.coordinates?.latitude && locationMap?.coordinates?.longitude ? (
              <InteractiveMap
                latitude={locationMap.coordinates.latitude}
                longitude={locationMap.coordinates.longitude}
                locationDescription={locationMap.locationDescription}
                acresValue={metrics?.acresConserved?.value}
                acresHeading={metrics?.acresConserved?.heading}
              />
            ) : locationMap?.mapImage ? (
              /* Fallback to Static Map Image */
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                {/* Map Header */}
                {metrics?.acresConserved?.value && (
                  <div className="bg-mainBlue text-white p-4">
                    <div className="text-sm font-bold uppercase tracking-wider mb-1">
                      {metrics.acresConserved.heading?.includes('ACRES')
                        ? metrics.acresConserved.heading.split(' ').slice(0, 2).join(' ')
                        : 'PROPOSED ACRES'}
                    </div>
                    <div className="text-2xl font-bold">{metrics.acresConserved.value}</div>
                  </div>
                )}

                {/* Static Map Image */}
                <div className="relative w-full h-96 lg:h-[500px]">
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
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>

                {/* Location Description */}
                {locationMap.locationDescription && (
                  <div className="p-4">
                    <p className="text-sm text-gray-600">{locationMap.locationDescription}</p>
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
