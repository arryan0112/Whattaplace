"use client"

import { useEffect, useRef, useState } from "react"
import { MapPin, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Space } from "@/types/space"

interface GoogleMapProps {
  space: Space
  className?: string
}

// Mock coordinates for Indian cities
const cityCoordinates: Record<string, { lat: number; lng: number }> = {
  Delhi: { lat: 28.6139, lng: 77.209 },
  Mumbai: { lat: 19.076, lng: 72.8777 },
  Bangalore: { lat: 12.9716, lng: 77.5946 },
  Hyderabad: { lat: 17.385, lng: 78.4867 },
  Pune: { lat: 18.5204, lng: 73.8567 },
  Chennai: { lat: 13.0827, lng: 80.2707 },
  Kolkata: { lat: 22.5726, lng: 88.3639 },
  Gurgaon: { lat: 28.4595, lng: 77.0266 },
}

export function GoogleMap({ space, className = "" }: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const coordinates = cityCoordinates[space.location] || cityCoordinates.Delhi

  useEffect(() => {
    // Mock Google Maps integration
    // In a real implementation, you would load the Google Maps JavaScript API
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleGetDirections = () => {
    // Open Google Maps with directions
    const url = `https://www.google.com/maps/dir/?api=1&destination=${coordinates.lat},${coordinates.lng}`
    window.open(url, "_blank")
  }

  const handleViewOnMaps = () => {
    // Open Google Maps at the location
    const url = `https://www.google.com/maps/search/?api=1&query=${coordinates.lat},${coordinates.lng}`
    window.open(url, "_blank")
  }

  if (error) {
    return (
      <div className={`bg-gray-100 rounded-lg p-6 text-center ${className}`}>
        <MapPin className="w-8 h-8 mx-auto mb-2 text-gray-400" />
        <p className="text-sm text-gray-600">Unable to load map</p>
        <Button variant="outline" size="sm" className="mt-2 bg-transparent" onClick={handleViewOnMaps}>
          View on Google Maps
        </Button>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      <div ref={mapRef} className="w-full h-64 bg-gray-100 rounded-lg overflow-hidden relative">
        {!isLoaded ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
              <p className="text-sm text-gray-600">Loading map...</p>
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 mx-auto mb-2 text-blue-600" />
              <p className="font-semibold text-gray-800">{space.name}</p>
              <p className="text-sm text-gray-600">{space.location}</p>
              <p className="text-xs text-gray-500 mt-1">
                {coordinates.lat.toFixed(4)}, {coordinates.lng.toFixed(4)}
              </p>
            </div>
          </div>
        )}

        {/* Map Controls */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <Button size="sm" variant="secondary" className="bg-white/90 backdrop-blur-sm" onClick={handleViewOnMaps}>
            <MapPin className="w-3 h-3" />
          </Button>
          <Button size="sm" variant="secondary" className="bg-white/90 backdrop-blur-sm" onClick={handleGetDirections}>
            <Navigation className="w-3 h-3" />
          </Button>
        </div>
      </div>

      {/* Map Actions */}
      <div className="flex gap-2 mt-3">
        <Button variant="outline" size="sm" onClick={handleViewOnMaps} className="flex-1 bg-transparent">
          <MapPin className="w-4 h-4 mr-1" />
          View on Maps
        </Button>
        <Button variant="outline" size="sm" onClick={handleGetDirections} className="flex-1 bg-transparent">
          <Navigation className="w-4 h-4 mr-1" />
          Get Directions
        </Button>
      </div>

      {/* Location Details */}
      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-sm mb-1">Location Details</h4>
        <p className="text-xs text-gray-600">
          This space is located in {space.location}, easily accessible by public transport and private vehicles.
          {space.facilities.parking && " Parking is available on-site."}
        </p>
      </div>
    </div>
  )
}
