'use client'

import React, { useState } from 'react'
import { Map, Marker, NavigationControl, FullscreenControl } from 'react-map-gl/mapbox'
import 'mapbox-gl/dist/mapbox-gl.css'

interface InteractiveMapProps {
  latitude: number
  longitude: number
  zoom?: number
  locationDescription?: string
  acresValue?: string
  acresHeading?: string
  className?: string
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({
  latitude,
  longitude,
  zoom = 10,
  locationDescription,
  acresValue,
  acresHeading,
  className = '',
}) => {
  const [viewState, setViewState] = useState({
    longitude,
    latitude,
    zoom,
  })

  // You'll need to set your Mapbox access token
  // You can get one for free at https://mapbox.com
  const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN

  if (!MAPBOX_TOKEN) {
    return (
      <div className={`bg-gray-100 rounded-lg p-8 text-center ${className}`}>
        <div className="text-gray-600">
          <p className="font-medium mb-2">Interactive Map Unavailable</p>
          <p className="text-sm">
            Mapbox access token not configured. Please add NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN to your
            environment variables.
          </p>
          {locationDescription && (
            <div className="mt-4 p-4 bg-white rounded-lg">
              <p className="text-sm text-gray-700">{locationDescription}</p>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-white rounded-lg shadow-sm overflow-hidden ${className}`}>
      {/* Interactive Map */}
      <div className="relative w-full h-full">
        <Map
          {...viewState}
          onMove={(evt) => setViewState(evt.viewState)}
          mapboxAccessToken={MAPBOX_TOKEN}
          style={{ width: '100%', height: '100%' }}
          mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
          attributionControl={false}
        >
          {/* Location Pin */}
          <Marker longitude={longitude} latitude={latitude} anchor="bottom">
            <div className="relative">
              {/* Pin Shadow */}
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-6 h-3 bg-black opacity-20 rounded-full blur-sm"></div>

              {/* Pin */}
              <div className="w-8 h-8 bg-red-500 rounded-full border-4 border-white shadow-lg relative">
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-red-500"></div>
              </div>
            </div>
          </Marker>

          {/* Map Controls */}
          <NavigationControl position="top-right" />
          <FullscreenControl position="top-right" />
        </Map>
      </div>
    </div>
  )
}

export default InteractiveMap
