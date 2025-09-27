"use client"

import type { Space } from "@/types/space"
import { SpaceCard } from "./space-card"

interface SpacesGridProps {
  spaces: Space[]
  onSpaceClick: (space: Space) => void
  isLoading?: boolean
}

export function SpacesGrid({ spaces, onSpaceClick, isLoading }: SpacesGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-200 aspect-[4/3] rounded-t-lg"></div>
            <div className="bg-white p-4 rounded-b-lg border border-t-0">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (spaces.length === 0) {
    return (
      <div className="text-center py-12 animate-fade-in">
        <div className="max-w-md mx-auto mobile-spacing">
          <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center animate-bounce-in">
            <svg
              className="w-10 h-10 md:w-12 md:h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No spaces found</h3>
          <p className="text-gray-600 text-sm md:text-base">
            Try adjusting your filters or search terms to find more spaces.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {spaces.map((space, index) => (
        <div key={space.id} className={`animate-scale-in animate-stagger-${Math.min((index % 4) + 1, 4)}`}>
          <SpaceCard space={space} onClick={onSpaceClick} />
        </div>
      ))}
    </div>
  )
}
